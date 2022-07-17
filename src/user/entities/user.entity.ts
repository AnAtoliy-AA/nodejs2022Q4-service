import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'User identifier uuid v4', nullable: false })
  id: string;

  @ApiProperty({ description: 'User login', nullable: false })
  login: string;

  @ApiProperty({ description: 'User password', nullable: false })
  password: string;

  @ApiProperty({
    description: 'User version integer number, increments on update',
    nullable: false,
  })
  version: number;

  @ApiProperty({ description: 'User timestamp of creation', nullable: false })
  createdAt: number;

  @ApiProperty({
    description: 'User timestamp of last update',
    nullable: false,
  })
  updatedAt: number;

  constructor(
    id: string,
    login: string,
    password: string,
    version: number,
    createdAt: number,
    updatedAt: number,
  ) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.version = version;
    this.createdAt = +createdAt;
    this.updatedAt = +updatedAt;
  }
}
