import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Artist identifier uuid v4', nullable: false })
  id: string;

  @Column()
  @ApiProperty({ description: 'Artist name', nullable: false })
  name: string;

  @Column()
  @ApiProperty({
    description: 'Artist has grammy',
    nullable: false,
  })
  grammy: boolean;

  constructor(id: string, name: string, grammy: boolean) {
    this.id = id;
    this.name = name;
    this.grammy = grammy;
  }
}
