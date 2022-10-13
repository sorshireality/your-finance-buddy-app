import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
    @Prop({unique: true, required: true})
    title: string;

    @Prop()
    description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
