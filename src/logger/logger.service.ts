import {
  Logger,
  ConsoleLogger,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MyLogger extends ConsoleLogger implements LoggerService {
  error(...args: (string | unknown[])[]) {
    super.error(args);
  }
}
