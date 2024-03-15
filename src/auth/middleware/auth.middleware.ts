import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction, Request as ExpressRequest } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../../user/entities/user.entity';
import { AppConfig } from 'src/configs/app.config';

export interface RequestWithUser extends ExpressRequest {
  user: User;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<AppConfig>,
  ) {}

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];

    if (!authHeader || !token) {
      req.user = null;
      return next();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      req.user = payload;
      next();
    } catch (error) {
      req.user = null;
    }
    next();
  }
}
