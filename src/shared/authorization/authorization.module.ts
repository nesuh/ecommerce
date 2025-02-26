/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthHelper } from './helper/auth.helper';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh-token.strategy';
import JwtRefreshGuard from './guards/jwt-refresh.guard';
import { JwtGuard } from './guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.register({}),
  ],
  controllers: [],
  providers: [
    AuthHelper,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    JwtGuard,
    { provide: APP_GUARD, useClass: JwtGuard },
    JwtRefreshGuard,
    ApiKeyGuard,
  ],
  exports: [AuthHelper],
})
export class AuthorizationModule {}
