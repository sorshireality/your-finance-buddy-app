import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    password: string;

    @Prop({unique: true, required: true})
    email: string;
}

export interface IAuthUser{
    firstName: string,
    lastName: string,
    email: string,
}

export const UserSchema = SchemaFactory.createForClass(User);
