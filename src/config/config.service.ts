import * as dotenv from 'dotenv';
import * as AWS from 'aws-sdk';

export interface IJwtConfig {
    secret: string,
    signOptions: {
        expiresIn: string
    }
}


export class ConfigService {
    private readonly envConfig: Record<string, string>;
    private readAWSConfig: boolean;
    private region = '';
    private secretName = '';

    constructor() {
        const result = dotenv.config();

        if (result.error) {
            this.envConfig = process.env;
        } else {
            this.envConfig = result.parsed;
        }

        if (this.envConfig.AWS_ACTIVE === 'true') {
            this.readAWSConfig = true;
            this.region = this.get('REGION');
            this.secretName = this.get('SECRET_NAME');
        } else {
            this.readAWSConfig = false;
        }
    }

    public get(key: string): string {
        return this.envConfig[key];
    }

    public async getMongoConfig() {
        if (this.readAWSConfig) {
            await this.upAWSConfig();
        }
        return {
            uri: this.get('MONGO_DB'),
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
    }

    public async getJwtConfig(): Promise<{secret: string, signOptions: {expiresIn: string}}> {
        if (this.readAWSConfig) {
            await this.upAWSConfig();
        }
        return {
            secret: this.get('JWT_SECRET'),
            signOptions: {
                expiresIn: '10m'
            }
        };
    }

    public async upAWSConfig() {
        let error;

        const client = new AWS.SecretsManager({
            region: this.region,
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const secrets = await client
            .getSecretValue({SecretId: this.secretName})
            .promise()
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-return
            .catch(err => (error = err));

        if (error) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (error.code === 'DecryptionFailureException') {
                throw error;
            }
            throw error;
        }

        this.readAWSConfig = false;

        // eslint-disable-next-line max-len
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
        const resultSecrets = JSON.parse(secrets.SecretString);

        // eslint-disable-next-line guard-for-in
        for (const key in resultSecrets) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
            this.envConfig[key] = resultSecrets[key];
        }
    }
}
