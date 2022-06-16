import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { Algorithm } from 'jsonwebtoken';
import { CreateUserDto } from 'src/user/dto';
import { UserService } from 'src/user/service/user.service';
import { AuthRepository } from '../repository/auth.repository';
import { compare, hash } from 'bcrypt';
import { User } from 'src/user/interfaces/interface/user.interface';
import { UserEntity } from 'src/user/entities/user.entity';
import { PayloadDto } from '../dto/jwt.payload.dto';

@Injectable()
export class AuthService {
  private readonly salt: string;
  private readonly round: number;
  private readonly secret: string;
  private readonly algorithm: Algorithm;
  private readonly access_token_expiresIn: number;
  private readonly refresh_token_expiresIn: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {
    this.salt = this.configService.get<string>('SALT');
    this.round = this.configService.get<number>('SALT_ROUND');
    this.secret = this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET');
    this.algorithm = this.configService.get<Algorithm>('JWT_ALGORITHM');
    this.access_token_expiresIn = this.configService.get<number>(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    );
    this.refresh_token_expiresIn = this.configService.get<number>(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    );
  }

  async validateUser(
    email: string,
    plainTextPassword: string,
  ): Promise<UserEntity> {
    const user = await this.userService.findOne(email);

    await this.verifyPassword(this.salt + plainTextPassword, user.password);

    return user;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatch = await compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatch) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  async register(user: CreateUserDto) {
    const hashedPassword = await hash(this.salt + user.password, this.round);

    const returnUser = await this.authRepository.createUser({
      ...user,
      password: hashedPassword,
    });

    const { password, ...newUser } = returnUser['_doc'];

    return newUser;
  }

  async login(user: User): Promise<any> {
    const { token: accessToken, ...accessOption } = await this.getToken(
      { id: user._id.toString() },
      'ACCESS_TOKEN',
    );

    const { token: refreshToken, ...refreshOption } = await this.getToken(
      { id: user._id.toString() },
      'REFRESH_TOKEN',
    );

    return {
      accessToken,
      accessOption,
      refreshToken,
      refreshOption,
    };
  }

  public async getToken(payload: PayloadDto, subject: string) {
    const [tokenGenerator, cookieOptions] = await Promise.all([
      this.getTokenGenerator({ subject }),
      this.genCookieOption({ subject }),
    ]);

    return { token: tokenGenerator(payload), ...cookieOptions };
  }

  private getTokenGenerator = ({ subject }) => {
    const jwtOptions = <JwtSignOptions>{
      algorithm: this.algorithm,
      secret: this.secret,
      expiresIn:
        subject === 'ACCESS_TOKEN'
          ? Number(this.access_token_expiresIn)
          : Number(this.refresh_token_expiresIn),
      subject,
    };

    if (subject === 'ACCESS_TOKEN') {
      return (payload: PayloadDto) => this.jwtService.sign(payload, jwtOptions);
    }
    if (subject === 'REFRESH_TOKEN') {
      return (payload: PayloadDto) => this.jwtService.sign(payload, jwtOptions);
    }

    return () => this.jwtService.sign({}, jwtOptions);
  };

  private async genCookieOption({ subject }) {
    const cookieOptions = {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge:
        subject === 'ACCESS_TOKEN'
          ? Number(this.access_token_expiresIn)
          : Number(this.refresh_token_expiresIn),
    };

    return cookieOptions;
  }
}
