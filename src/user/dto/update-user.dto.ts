import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'User previous password', nullable: false })
  oldPassword: string;

  @ApiProperty({ description: 'User new password', nullable: false })
  newPassword: string;
}
