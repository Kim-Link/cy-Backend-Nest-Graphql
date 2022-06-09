import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthRepository {}
