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
    if (!login || !password) {
      throw new HttpException(
        'Empty login or password fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    const id = uuidv4();
    const version = 1;
    const createdAt: number = new Date().getTime();
    const updatedAt: number = new Date().getTime();
    const user = new User(id, login, password, version, createdAt, updatedAt);
    this._users.push(user);
    const result = { ...user };
    delete result.password;
    return result;
    return user;
  }

  findAll() {
    return this._users;
  }

  getById(userId: string) {
    if (!validate(userId)) {
      throw new HttpException('Not valid user id', HttpStatus.BAD_REQUEST);
    }
    const findUser = this._users.find((user) => user.id === userId);

    if (!findUser) {
      throw new NotFoundException('User not found.');
    }

    const result = { ...findUser };
    delete result.password;
    return result;
  }

  update(userUniqueId: string, dto: UpdateUserDto) {
    if (!validate(userUniqueId)) {
      throw new HttpException('Not valid user id', HttpStatus.BAD_REQUEST);
    }

    if (!dto.newPassword || !dto.oldPassword) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'incorrect newPassword or oldPassword.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const index = this._users.findIndex((user) => user.id == userUniqueId);

    if (index === -1) {
      throw new NotFoundException('User not found.');
    }
    const { id, login, password, version, createdAt } = this._users[index];

    if (dto.oldPassword !== password) {
      throw new HttpException('Not correct old password', HttpStatus.FORBIDDEN);
    }
    const updatedAt: number = new Date().getTime();

    this._users[index] = new User(
      id,
      login,
      dto.newPassword,
      version + 1,
      createdAt,
      updatedAt,
    );

    const response = { ...this._users[index] };
    delete response.password;

    return response;
  }

  delete(userId: string) {
    if (!validate(userId)) {
      throw new HttpException('Not valid user id', HttpStatus.BAD_REQUEST);
    }
    const filteredUsers = this._users.filter((user) => user.id !== userId);

    if (this._users.length !== filteredUsers.length) {
      this._users = filteredUsers;
    } else {
      throw new NotFoundException('User not found.');
    }
  }
}
