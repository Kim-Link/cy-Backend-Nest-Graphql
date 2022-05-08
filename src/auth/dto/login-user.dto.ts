import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class LoginUserDto {
  /**
   * 유저 이메일
   */
  @IsString()
  @Field()
  readonly email: string;

  /**
   * 유저 비밀번호
   */
  @IsString()
  @Field()
  readonly password: string;
}
