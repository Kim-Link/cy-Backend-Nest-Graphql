import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field((type) => String)
  email: string;
}
