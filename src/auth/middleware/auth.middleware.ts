import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction, Request as ExpressRequest } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../../user/user.service';
import { User } from '../../user/entities/user.entity';

interface JwtPayload {
  username: string;
}
export interface RequestWithUser extends ExpressRequest {
  user: User;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: 'Authorization header is missing.' });
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Invalid authorization header.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      const user = await this.userService.findOneByUsername(decoded.username);

      if (!user) {
        return res.status(401).json({ message: 'User not found.' });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  }
}
