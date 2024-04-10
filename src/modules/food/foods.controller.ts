import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { FoodsService } from './foods.service';

import { PaginationDto } from 'src/middlewares/dto/pagination.dto';
import { CreateDtoFood } from './dto/create_foods.dto';
import { UpdateDtoFood } from './dto/update_foods.dto';
import { FindDtoFood } from './dto/find_foods.dto';
import { SearchDtoFood } from './dto/search_foods.dto';

import { Foods } from '../../swagger/foods.class';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('foods')
@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  // Create a new food
  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Created Food', type: Foods })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async create(@Body() body: CreateDtoFood, @Req() req: any) {
    console.log(req.user);
    return await this.foodsService.create(body, req.user.userId);
  }

  // Update an existing food
  @Post(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Updated Food', type: Foods })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async update(@Param('id', ValidationPipe) id: FindDtoFood['_id'], @Body() body: UpdateDtoFood) {
    return await this.foodsService.update(id, body);
  }

  // Search for foods by title
  @Get('search')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Search Foods by title', type: Foods })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async search(
    @Query(ValidationPipe) searchDto: SearchDtoFood,
    @Query(ValidationPipe) paginationDto: PaginationDto,
  ) {
    return await this.foodsService.search(searchDto.title, paginationDto.page, paginationDto.limit);
  }

  // Get all foods
  @Get()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Find All Foods', type: Foods })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findAll() {
    return await this.foodsService.findAll();
  }

  // Get a specific food by ID
  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Find One Food', type: Foods })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findOne(@Param('id', ValidationPipe) id: FindDtoFood['_id']) {
    return await this.foodsService.findOne(id);
  }

  // Delete a specific food by ID
  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Delete One Food', type: Foods })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async delete(@Param('id', ValidationPipe) id: FindDtoFood['_id']) {
    return await this.foodsService.delete(id);
  }
}
