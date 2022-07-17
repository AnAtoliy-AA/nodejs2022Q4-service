import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private _users: User[] = [];

  create(dto: CreateUserDto) {
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
    return this._users.filter((user) => user.id == userId);
  }

  update(userUniqueId: string, dto: UpdateUserDto) {
    const index = this._users.findIndex((user) => user.id == userUniqueId);

    if (index === -1) {
      return;
    }
    const { id, login, version, createdAt } = this._users[index];
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
    this._users = this._users.filter((user) => user.id != userId);
  }
}
