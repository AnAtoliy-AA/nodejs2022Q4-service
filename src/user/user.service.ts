import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class UserService {
  private _users: User[] = [];

  create(dto: CreateUserDto) {
    const { login, password } = dto;
    if (!login && !password) {
      throw new HttpException(
        'Empty login or password fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    const id = uuidv4();
    const version = 1;
    const createdAt: string = new Date(Date.now()).toDateString();
    const updatedAt: string = new Date(Date.now()).toDateString();
    const user = new User(
      id,
      dto.login,
      dto.password,
      version,
      createdAt,
      updatedAt,
    );
    this._users.push(user);
    return user;
  }

  findAll() {
    return this._users;
  }

  findOne(userId: string) {
    if (!validate(userId)) {
      throw new HttpException('Not valid user id', HttpStatus.BAD_REQUEST);
    }
    return this._users.filter((user) => user.id == userId);
  }

  update(userUniqueId: string, dto: UpdateUserDto) {
    if (!validate(userUniqueId)) {
      throw new HttpException('Not valid user id', HttpStatus.BAD_REQUEST);
    }

    const index = this._users.findIndex((user) => user.id == userUniqueId);

    if (index === -1) {
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    }
    const { id, login, password, version, createdAt } = this._users[index];

    if (dto.oldPassword !== password) {
      throw new HttpException(
        'Not correct old password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const updatedAt: string = new Date(Date.now()).toDateString();

    this._users[index] = new User(
      id,
      login,
      dto.password,
      version + 1,
      createdAt,
      updatedAt,
    );
    return this._users[index];
  }

  remove(userId: string) {
    if (!validate(userId)) {
      throw new HttpException('Not valid user id', HttpStatus.BAD_REQUEST);
    }
    const filteredUsers = this._users.filter((user) => user.id != userId);

    if (this._users.length !== filteredUsers.length) {
      this._users = filteredUsers;
    } else {
      throw new NotFoundException('User not found.');
    }
  }
}
