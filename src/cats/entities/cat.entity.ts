import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
@Schema()
@ObjectType()
export class Cat {
  /**
   * ## id
   * @property {mongoose.Schema.Types.ObjectId | String} id
   */
  @ApiProperty({
    name: 'id',
    description: 'The unique identifier of the cat',
    example: '5e8f8f8f8f8f8f8f8f8f8f8',
    type: String,
  })
  @Field(() => ID, {
    name: 'id',
    description: 'The unique identifier of the cat',
  })
  _id: mongoose.Schema.Types.ObjectId;

  /**
   * ## name
   * @property {String} name
   */
  @ApiProperty({
    name: 'name',
    description: 'The name of the cat',
    example: 'Tom',
  })
  @Field(() => String, { name: 'name', description: 'The name of the cat' })
  @Prop({ type: String, required: true })
  name: string;

  /**
   * ## age
   * @property {Number} age
   */
  @ApiProperty({
    name: 'age',
    description: 'The age of the cat',
    required: true,
    example: 2,
  })
  @Field(() => Int, { name: 'age', description: 'The age of the cat' })
  @Prop({ type: Number, required: true })
  age: number;

  /**
   * ## Breed
   * @property {String} breed
   */
  @ApiProperty({
    name: 'breed',
    description: 'The breed of the cat',
    example: 'Persian',
  })
  @Field(() => String, { name: 'breed', description: 'The breed of the cat' })
  @Prop({ type: String, required: true })
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
