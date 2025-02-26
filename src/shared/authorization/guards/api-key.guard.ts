import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const headers = request.headers;
      const apiKey = headers['x-api-key'];
      if (!apiKey) {
        throw new UnauthorizedException('api_key_not_provided');
      }

      const API_KEY = process.env.API_KEY ?? '25bc1622e5fb42cca3d3e62e90a3a20f';

      if (apiKey != API_KEY) {
        throw new UnauthorizedException('invalid_api_key');
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
