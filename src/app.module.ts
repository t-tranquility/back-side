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
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/signup', method: RequestMethod.POST },
        { path: 'bank-questions', method: RequestMethod.POST },
        { path: 'bank-questions/submit-answers', method: RequestMethod.POST },
        { path: 'bank-questions', method: RequestMethod.GET },
        { path: 'bank-questions', method: RequestMethod.PATCH },
        { path: 'bank-questions', method: RequestMethod.DELETE },
      )
      .forRoutes({ method: RequestMethod.ALL, path: '*' });
  }
}
