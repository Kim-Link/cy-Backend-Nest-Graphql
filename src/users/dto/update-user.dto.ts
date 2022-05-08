import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// export class UpdateMovieDto {
//   @IsString()
//   readonly title?: string;

//   @IsNumber()
//   readonly year?: number;

//   @IsString({ each: true })
//   readonly genres?: string[];
// }
export class UpdateUserDto extends PartialType(CreateUserDto) {}
