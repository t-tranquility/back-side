import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

import { AppConfig } from './app.config';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService<AppConfig>) {}

  public createJwtOptions(): JwtModuleOptions {
    return {
      secret: process.env.JWT_SECRET,
    };
  }
}
