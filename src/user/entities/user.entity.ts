import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'User identifier uuid v4', nullable: false })
  id: string;

  @Column()
  @ApiProperty({ description: 'User login', nullable: false })
  login: string;

  @Column()
  @ApiProperty({ description: 'User password', nullable: false })
  password: string;

  @Column()
  @ApiProperty({
    description: 'User version integer number, increments on update',
    nullable: false,
  })
  version: number;

  @Column()
  @ApiProperty({ description: 'User timestamp of creation', nullable: true })
  createdAt: number;

  @Column()
  @ApiProperty({
    description: 'User timestamp of last update',
    nullable: true,
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
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;

    return { id, login, version, createdAt, updatedAt };
  }
}
