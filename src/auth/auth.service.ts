import { User } from './../user/entities/user.entity';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RegisterDto, LoginDto, RefreshDto } from './dto/auth.dto';
import { AuthHelper } from './auth.helper';
import { UserService } from 'src/user/user.service';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<User | null> {
    const { login, password }: RegisterDto = body;

    const user = await this.usersService.create({ login, password });

    return user || null;
  }

  public async login(body: LoginDto): Promise<Auth | null> {
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

  public async refresh(dto: RefreshDto): Promise<Auth | null> {
    const { token } = dto;

    const decoded = (await this.helper.decode(token)) as User;

    if (decoded && decoded.hasOwnProperty('id')) {
      const lastLoginAt = new Date();
      this.usersService.updateLastLogin(decoded?.id, lastLoginAt);

      return this.helper.generateToken(decoded);
    }

    return null;
  }
}
