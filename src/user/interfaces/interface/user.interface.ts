import { Document } from 'mongoose';
import { Sex } from 'src/user/enums/Sex';
import { UserRole } from 'src/user/enums/UserRole';

export interface User extends Document {
  readonly _id: object;
  readonly email: string;
  readonly name: string;
  readonly birth: string;
  readonly password: string;
  readonly sex: Sex;
  readonly role: UserRole;
  readonly photo: string;
  readonly currentHashedRefreshToken: string;
}
