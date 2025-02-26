/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ALLOW_ANONYMOUS_META_KEY } from '../decorators/allow-anonymous.decorator';
import { AuthHelper } from '../helper/auth.helper';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authHelper: AuthHelper,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAnonymousAllowed = this.reflector.getAllAndOverride<boolean>(
      ALLOW_ANONYMOUS_META_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isAnonymousAllowed) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new Error('Unauthorized: No token provided.');
    }

    const secret = process.env.JWT_ACCESS_TOKEN_SECRET ?? 'default_secret';
    const user = await this.authHelper.verify(token, secret);

    request.user = user;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
