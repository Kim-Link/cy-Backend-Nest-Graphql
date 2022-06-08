import { Module } from '@nestjs/common';
import { AuthResolver } from './resolver/auth.resolver';
import { AuthService } from './service/auth.service';

@Module({
  imports: [],
  providers: [AuthResolver, AuthService],
  controllers: [],
  exports: [],
})
export class AuthModule {}
