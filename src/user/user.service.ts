import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4, validate } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthHelper } from 'src/auth/auth.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  async create(dto: CreateUserDto) {
    const { login, password } = dto;
    if (!login || !password) {
      throw new HttpException(
        'Empty login or password fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    // const existingUser = await this.getByLogin(login);

    // if (!existingUser) {
    const id = uuidv4();
    const version = 1;
    const createdAt = new Date().getMilliseconds();
    const updatedAt = new Date().getMilliseconds();

    const createdUser = this.userRepository.create({
      id,
      login,
      password: this.helper.encodePassword(password),
      version,
      createdAt,
      updatedAt,
    });

    return (await this.userRepository.save(createdUser)).toResponse() as User;
    // } else {

    //   throw new HttpException(
    //     'User with this login already exists',
    //     HttpStatus.CREATED,
    //   );
    // }
  }

  async findAll() {
    const users = await this.userRepository.find();

    return users.map((_user) => _user.toResponse());
  }

  async getById(userId: string) {
    if (!validate(userId)) {
      throw new HttpException('Not valid user id', HttpStatus.BAD_REQUEST);
    }

    const findUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!findUser) {
      throw new NotFoundException('User not found.');
    }

    return findUser.toResponse();
  }

  async getByLogin(login: string) {
    const findUser = await this.userRepository.findOne({
      where: { login },
    });

    return findUser;
  }

  async updateLastLogin(id: string, lastUpdatedAt: Date) {
    const updatedUser = await this.userRepository.findOne({
      where: { id },
    });
    // if (!findUser) {
    //   throw new NotFoundException('User not found.');
    // }
    Object.assign(updatedUser, { lastUpdatedAt });

    return (await this.userRepository.save(updatedUser)).toResponse();
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

    const updatedUser = await this.userRepository.findOne({
      where: { id: userUniqueId },
    });

    if (updatedUser) {
      // if (
      //   dto?.oldPassword !== updatedUser?.password ||
      //   dto?.newPassword === updatedUser?.password
      // ) {
      if (
        !this.helper.isPasswordValid(dto?.oldPassword, updatedUser?.password) ||
        this.helper.isPasswordValid(dto?.newPassword, updatedUser?.password)
      ) {
        throw new HttpException(
          'Not correct old password',
          HttpStatus.FORBIDDEN,
        );
      }
      const updatedAt = new Date().getMilliseconds();
      Object.assign(
        updatedUser,
        { password: this.helper.encodePassword(dto?.newPassword) },
        { version: updatedUser?.version + 1 },
        { updatedAt },
      );

      return (await this.userRepository.save(updatedUser)).toResponse();
    } else {
      throw new NotFoundException('User not found.');
    }
  }

  async delete(userId: string) {
    if (!validate(userId)) {
      throw new HttpException('Not valid user id', HttpStatus.BAD_REQUEST);
    }

    const result = await this.userRepository.delete({ id: userId });

    if (result.affected === 0) {
      throw new NotFoundException('User not found.');
    }
  }
}
