import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

const schema = {
  //JWT:
  JWT_SECRET: Joi.string().required(),
};

export const rootConfigOptions: ConfigModuleOptions = {
  validationSchema: Joi.object(schema),
  cache: true,
  isGlobal: true,
  envFilePath: '.env',
};

export type AppConfig = {
  readonly [key in keyof typeof schema]: unknown;
};
