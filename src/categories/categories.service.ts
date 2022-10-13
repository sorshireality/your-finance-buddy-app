import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Category, CategoryDocument} from './schemas/categorie.schema';
import {Model} from 'mongoose';
import {CreateCategoriesDto} from './dto/create-categories.dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {
    }

    findAll(){
        return this.categoryModel.find().exec();
    }

    create(createCategoriesDto: CreateCategoriesDto){
        const newCategory = new this.categoryModel(createCategoriesDto);
        return newCategory.save();
    }
}
