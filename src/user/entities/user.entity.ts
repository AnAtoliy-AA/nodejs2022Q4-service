import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
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

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'User timestamp of creation', nullable: false })
  createdAt: number;

  @CreateDateColumn({ type: 'timestamp' })
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
