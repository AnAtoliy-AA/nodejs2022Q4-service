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
import { DataObj } from 'src/data';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const { login, password } = dto;
    if (!login || !password) {
      throw new HttpException(
        'Empty login or password fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    const id = uuidv4();
    const version = 1;
    const createdAt = new Date().getDate();
    const updatedAt = new Date().getDate();

    const createdUser = this.userRepository.create({
      id,
      login,
      password,
      version,
      createdAt,
      updatedAt,
    });

    return (await this.userRepository.save(createdUser)).toResponse() as User;
    // const user = new User(id, login, password, version, createdAt, updatedAt);
    // DataObj.usersData.push(user);
    // const result = { ...user };
    // delete result.password;
    // return result;
    // return user;
  }

  async findAll() {
    // return DataObj.usersData;
    const users = await this.userRepository.find();

    return users.map((_user) => _user.toResponse());
  }

  async getById(userId: string) {
    if (!validate(userId)) {
      throw new HttpException('Not valid user id', HttpStatus.BAD_REQUEST);
    }
    // const findUser = DataObj.usersData.find((user) => user.id === userId);

    const findUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!findUser) {
      throw new NotFoundException('User not found.');
    }

    // const result = { ...findUser };
    // delete result.password;
    // return result;

    return findUser.toResponse();
  }

  async update(userUniqueId: string, dto: UpdateUserDto) {
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

    // const index = DataObj.usersData.findIndex(
    //   (user) => user.id == userUniqueId,
    // );

    // if (index === -1) {
    //   throw new NotFoundException('User not found.');
    // }
    // const { id, login, password, version, createdAt } =
    //   DataObj.usersData[index];

    const updatedUser = await this.userRepository.findOne({
      where: { id: userUniqueId },
    });

    if (dto.oldPassword !== updatedUser?.password) {
      throw new HttpException('Not correct old password', HttpStatus.FORBIDDEN);
    }
    const updatedAt = new Date();

    if (updatedUser) {
      Object.assign(updatedUser, dto, { updatedAt });

      return (await this.userRepository.save(updatedUser)).toResponse();
    } else {
      throw new NotFoundException('User not found.');
    }

    // DataObj.usersData[index] = new User(
    //   id,
    //   login,
    //   dto.newPassword,
    //   version + 1,
    //   createdAt,
    //   updatedAt,
    // );

    // const response = { ...DataObj.usersData[index] };
    // delete response.password;

    // return response;
  }

  async delete(userId: string) {
    if (!validate(userId)) {
      throw new HttpException('Not valid user id', HttpStatus.BAD_REQUEST);
    }
    // const filteredUsers = DataObj.usersData.filter(
    //   (user) => user.id !== userId,
    // );
    // const deletedUser = await this.userRepository.findOne({
    //   where: { id: userId },
    // });

    // if (!deletedUser) {
    //   throw new NotFoundException('User not found.');
    // }

    const result = await this.userRepository.delete({ id: userId });


    if (result.affected === 0) {
      throw new NotFoundException('User not found.');
    }
    // if (DataObj.usersData.length !== filteredUsers.length) {
    //   DataObj.usersData = filteredUsers;
    // } else {
    //   throw new NotFoundException('User not found.');
    // }
  }
}
