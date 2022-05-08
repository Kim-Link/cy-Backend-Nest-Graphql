import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, plainTextPassword: string): Promise<any> {
    try {
      const salt = 'qwieffoh';
      const user = await this.usersService.findOne(email);
      await this.verifyPassword(salt + plainTextPassword, user.password);
      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatch = await compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatch) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async register(user: CreateUserDto) {
    const salt = 'qwieffoh';
    const hashedPassword = await hash(salt + user.password, 10);
    try {
      const { password, ...returnUser } = await this.usersService.create({
        ...user,
        password: hashedPassword,
      });
      // !TODO: have to delete password from user object.
      return returnUser['_doc'];
    } catch (error) {
      this.logger.debug(error);
      if (error?.code === 11000) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  getCookieWithJwtAccessToken(id: string) {
    const payload = { id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    return {
      accessToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge:
        Number(this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')) *
        1000,
    };
  }

  getCookieWithJwtRefreshToken(id: string) {
    const payload = { id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    return {
      refreshToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge:
        Number(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')) *
        1000,
    };
  }

  getCookiesForLogOut() {
    return {
      accessOption: {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
      refreshOption: {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
    };
  }
}
