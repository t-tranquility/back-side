import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.signUp({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new HttpException('user doesnt exist', HttpStatus.FORBIDDEN);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException('passwort not correct', HttpStatus.FORBIDDEN);
    }

    const payload = { sub: user.id, username: user.username };
    console.log('payload', payload);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getUserByAccessToken(access_token: string): Promise<User> {
    try {
      const payload = await this.jwtService.verify(access_token, {
        secret: process.env.JWT_SECRET,
      });
      console.log('gev', payload);
      const user = await this.usersService.findOne(payload.username);
      return user;
    } catch (error) {
      console.log('error', error);
      throw new Error('Invalid access token хехехе');
    }
  }
}
