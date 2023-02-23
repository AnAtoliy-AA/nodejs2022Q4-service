import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'User identifier uuid v4', nullable: false })
  id: string;

  @Column()
  @ApiProperty({ description: 'User login', nullable: false })
  login: string;

  @Exclude()
  @Column({ type: 'varchar' })
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

  @Column({ type: 'timestamp', nullable: true, default: null })
  public lastLoginAt: Date | null;

  constructor(
    id: string,
    login: string,
    password: string,
    version: number,
    createdAt: number,
    updatedAt: number,
    lastLoginAt: Date | null,
  ) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.version = version;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.lastLoginAt = lastLoginAt;
  }

  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;

    return { id, login, version, createdAt, updatedAt };
  }
}
