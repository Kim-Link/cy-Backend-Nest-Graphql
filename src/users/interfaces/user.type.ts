import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.interface';
import { Sex } from '../enums/Sex';
import { UserRole } from '../enums/UserRole';

@ObjectType({ description: 'User' })
export class UserType {
  constructor(user: User) {
    Object.assign(this, user);
  }
  @Field({ description: 'The id of the user' })
  readonly _id: string;

  @Field({ description: 'The email of the user' })
  readonly email: string;

  @Field({ description: 'The name of the user' })
  readonly name: string;

  @Field({ description: 'The birthday of the user' })
  readonly birth: Date;

  @Field({ description: 'The password of the user' })
  readonly password: string;

  @Field({ description: 'The sex of the user' })
  readonly sex: Sex;

  @Field({ description: 'The sex of the user' })
  readonly role: UserRole;

  @Field({ description: 'The sex of the user', nullable: true })
  readonly photo?: string;

  @Field({ description: 'The sex of the user', nullable: true })
  readonly currentHashedRefreshToken?: string;
}
