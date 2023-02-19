import { User } from './../user/entities/user.entity';
import {
  Body,
  Controller,
  Inject,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Req,
  HttpCode,
} from '@nestjs/common';
import { RegisterDto, LoginDto, RefreshDto } from './dto/auth.dto';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(StatusCodes.CREATED)
  signup(@Body() body: RegisterDto): Promise<User | null> {
    return this.service.register(body);
  }

  @Post('login')
  login(@Body() body: LoginDto): Promise<string | null> {
    return this.service.login(body);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  refresh(@Body() body: RefreshDto): Promise<string | null> {
    return this.service.refresh(body);
  }
}
