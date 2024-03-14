import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new NotFoundException('Username already exists');
    }

    const newUser = this.userRepository.create({ username, password });
    return await this.userRepository.save(newUser);
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { username } });

    console.log('Found user:', user);

    return user;
  }

  async viewUser(id: any): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { username } = updateUserDto;
    const userToUpdate = await this.userRepository.findOneBy({ id });
    userToUpdate.username = username;
    return await this.userRepository.save(userToUpdate);
  }

  async removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
