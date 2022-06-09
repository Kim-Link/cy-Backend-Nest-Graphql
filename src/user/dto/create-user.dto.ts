import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field((type) => String)
  email: string;
}
