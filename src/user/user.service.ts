import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { hashSync } from 'bcrypt';
import { hashRound } from 'src/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findUserByUsername(username: string): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ username });
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ email });
  }

  async findUserById(id: number): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ id });
  }

  async createUser(body: CreateUserDto): Promise<UserEntity> {
    const user = this.usersRepository.create(body);
    user.password = hashSync(user.password, hashRound);
    return this.usersRepository.save(user);
  }
}
