import {Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {CategoriesService} from './categories.service';
import {CreateCategoriesDto} from './dto/create-categories.dto';

@Controller('categories')
export class CategoriesController {
    public constructor(private readonly categoriesService: CategoriesService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createCategoriesDto: CreateCategoriesDto) {
        return this.categoriesService.create(createCategoriesDto)
    }
}
