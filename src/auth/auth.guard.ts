import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from './../user/entities/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  public handleRequest(err: unknown, user: User): any {
    return user;
  }

  public async canActivateU(context: ExecutionContext): Promise<boolean> {
    try {
      await super.canActivate(context);

      const { user }: Request = context.switchToHttp().getRequest();

      return user ? true : false;
    } catch (error) {
      console.error(error);
    }
  }
}
