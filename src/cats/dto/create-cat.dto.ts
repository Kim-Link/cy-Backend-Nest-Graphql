import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

/**
 * CreateCatDto
 */
@InputType()
export class CreateCatDto {
  /**
   * ## name
   */
  @ApiProperty({
    name: 'name',
    description: 'The name of the cat',
    required: true,
    example: 'Tom',
    type: String,
    maxLength: 50,
    minLength: 2,
  })
  @Field(() => String, {
    nullable: false,
    description: 'The name of the cat',
  })
  @MaxLength(50)
  @MinLength(2)
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  readonly name: string;

  /**
   * ## age
   */
  @ApiProperty({
    name: 'age',
    description: 'The age of the cat',
    required: true,
    example: 2,
    type: Number,
    minimum: 0,
    maximum: 30,
  })
  @Field(() => Number, {
    nullable: false,
    description: 'The age of the cat',
  })
  @IsNumber({}, { message: 'Age must be a number' })
  @IsNotEmpty({ message: 'Age is required' })
  @Min(0, { message: 'Age must be greater than 0' })
  @Max(30, { message: 'Age must be less than 30' })
  readonly age: number;

  /**
   * ## breed
   */
  @ApiProperty({
    name: 'breed',
    description: 'The breed of the cat',
    required: true,
    example: 'Persian',
    type: String,
    minLength: 2,
    maxLength: 50,
  })
  @Field(() => String, {
    nullable: true,
    description: 'The breed of the cat',
  })
  @MinLength(2, { message: 'Breed must be at least 2 characters' })
  @MaxLength(50, { message: 'Breed must be less than 50 characters' })
  @IsOptional()
  readonly breed?: string;
}
