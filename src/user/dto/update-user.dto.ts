import { CreateUserInput } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field((type) => String)
  email: string;
}
