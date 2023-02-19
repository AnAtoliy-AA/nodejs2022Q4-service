import { User } from './../user/entities/user.entity';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthHelper } from './auth.helper';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';
import { ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: config.get('TOKEN_EXPIRE_TIME') },
      }),
    }),
    TypeOrmModule.forFeature([User]),
    UserModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthHelper, JwtStrategy],
  exports: [AuthHelper],
})
export class AuthModule {}
