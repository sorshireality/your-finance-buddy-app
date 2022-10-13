import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Category, CategorySchema} from './schemas/categorie.schema'
import {CategoriesController} from './categories.controller';
import {CategoriesService} from './categories.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Category.name, schema: CategorySchema}]),
        ],
    controllers: [CategoriesController],
    providers: [CategoriesService],
})

export class CategoryModule {}
