import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp().getRequest();

    const authHeader = ctx.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing.');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization header.');
    }

    let payload;

    try {
      payload = this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token.');
    }

    const userRole = payload.role;

    if (userRole !== 'user') {
      throw new UnauthorizedException('User role is required.');
    }

    ctx.authUser = payload;

    return true;
  }
}
