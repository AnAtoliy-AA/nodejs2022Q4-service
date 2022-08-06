import { Trim } from 'class-sanitizer';
import { IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @Trim()
  public readonly login: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;
}

export class LoginDto {
  @Trim()
  public readonly login: string;

  @IsString()
  public readonly password: string;
}
