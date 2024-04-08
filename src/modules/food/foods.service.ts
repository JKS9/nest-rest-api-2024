import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Foods } from './schemas/foods.schema';

import { CreateDtoFood } from './dto/create_foods.dto';
import { UpdateDtoFood } from './dto/update_foods.dto';

@Injectable()
export class FoodsService {
  constructor(@InjectModel(Foods.name) private FoodsModel: Model<Foods>) {}

  // Create a new food
  async create(createDtoFood: CreateDtoFood) {
    return new this.FoodsModel(createDtoFood).save();
  }

  // Update an existing food
  async update(id: string, updateDtoFood: UpdateDtoFood) {
    return this.FoodsModel.updateOne(
      {
        _id: new Types.ObjectId(id),
      },
      updateDtoFood,
    ).exec();
  }

  // Find a food by its ID
  async findOne(id: string) {
    return await this.FoodsModel.findOne({
      _id: new Types.ObjectId(id),
    }).exec();
  }

  // Find all foods
  async findAll() {
    return await this.FoodsModel.find().exec();
  }

  // Delete a food by its ID
  async delete(id: string) {
    await this.FoodsModel.findOneAndDelete({
      _id: new Types.ObjectId(id),
    }).exec();

    return true;
  }

  // Search for foods by title with pagination
  async search(input: string, page: number, limit: number) {
    const regex = new RegExp(input, 'i');

    return await this.FoodsModel.find({ title: regex })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }
}
