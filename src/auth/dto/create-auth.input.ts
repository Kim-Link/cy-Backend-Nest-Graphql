import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateAuthInput {
  @Field((type) => String)
  email?: string;
}
