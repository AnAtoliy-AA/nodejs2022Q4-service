import { User } from './../user/entities/user.entity';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { AuthHelper } from './auth.helper';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<User | null> {
    const { login, password }: RegisterDto = body;
    // const user: User = await this.usersService.findOne({
    //   where: { login },
    // });

    // if (user) {
    //   throw new HttpException('Conflict', HttpStatus.CONFLICT);
    // }

    // this.repository.create({ login, password });
    return await this.usersService.create({ login, password });
  }

  public async login(body: LoginDto): Promise<string | never> {
    const { login, password }: LoginDto = body;
    const user: User = await this.usersService.getByLogin(login);

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Not valid password', HttpStatus.NOT_FOUND);
    }

    const lastLoginAt = new Date();

    this.usersService.updateLastLogin(user.id, lastLoginAt);

    return this.helper.generateToken(user);
  }

  public async refresh(user: User): Promise<string> {
    // this.repository.update(user.id, { lastLoginAt: new Date() });
    const lastLoginAt = new Date();
    this.usersService.updateLastLogin(user.id, lastLoginAt);

    return this.helper.generateToken(user);
  }
}
