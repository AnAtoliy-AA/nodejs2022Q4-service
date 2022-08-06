import { ConsoleLogger } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
  error(...args: (string | unknown[])[]) {
    super.error(args);
  }
}
