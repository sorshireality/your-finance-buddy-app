import * as dotenv from 'dotenv';
import * as AWS from 'aws-sdk';

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

        if (this.envConfig.AWS_ACTIVE == 'true') {
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

    public async upAWSConfig() {
        let error;

        const client = new AWS.SecretsManager({
            region: this.region,
        });

        const secrets = await client
            .getSecretValue({SecretId: this.secretName})
            .promise()
            .catch(err => (error = err));

        if (error) {
            if (error.code === 'DecryptionFailureException') {
                throw error;
            }
            throw error;
        }

        this.readAWSConfig = false;

        const resultSecrets = JSON.parse(secrets.SecretString);

        for (let key in resultSecrets) {
            this.envConfig[key] = resultSecrets[key];
        }
    }
}
