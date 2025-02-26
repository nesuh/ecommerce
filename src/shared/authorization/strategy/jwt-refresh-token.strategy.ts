/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions } from 'passport-jwt';

Injectable();
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    const strategyOptions: StrategyOptions = {
      jwtFromRequest: (req) => req.body.refresh_token,
      ignoreExpiration: false,
      secretOrKey:
        process.env.JWT_REFRESH_TOKEN_SECRET ?? 'OfvWfxHrOjwhXuaTKQee',
    };

    super(strategyOptions);
  }

  async validate(payload: any) {
    return payload;
  }
}
