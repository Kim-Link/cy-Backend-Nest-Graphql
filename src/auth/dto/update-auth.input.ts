import { CreateAuthInput } from './create-auth.input';
import { PartialType } from '@nestjs/mapped-types';
import { InputType, ObjectType } from '@nestjs/graphql';
@InputType()
export class UpdateAuthInput extends PartialType(CreateAuthInput) {
  id: number;
}
