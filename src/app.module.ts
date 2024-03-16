import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { SunsModule } from './suns/suns.module';
import { BankQuestionsModule } from './bank-questions/bank-questions.module';
import { BankQuestion } from './bank-questions/entities/bank-question.entity';
import * as dotenv from 'dotenv';
import { rootConfigOptions } from './configs/app.config';
import { ConfigModule } from '@nestjs/config';
import { JwtConfigService } from './configs/jwt-config.service';
import { JwtModule } from '@nestjs/jwt';
import { TheoryModule } from './theory/theory.module';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: +process.env.PORT,
      password: process.env.POSTGRES_PASSWORD,
      username: 'postgres',
      entities: [User, BankQuestion],
      database: 'postgres',
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    SunsModule,
    BankQuestionsModule,
    JwtModule.registerAsync({ useClass: JwtConfigService }),
    ConfigModule.forRoot(rootConfigOptions),
    TheoryModule,
  ],
  controllers: [UserController],
  providers: [UserService, AuthMiddleware],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ method: RequestMethod.ALL, path: '*' });
  }
}
