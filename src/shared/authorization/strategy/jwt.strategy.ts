import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { AuthHelper } from '../helper/auth.helper';

Injectable();
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const strategyOptions: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        process.env.JWT_ACCESS_TOKEN_SECRET ?? 'MAXWS4Fw5v6Dqvomjz7s',
    };

    super(strategyOptions);
  }

  async validate(payload: any) {
    return payload;
  }
}
