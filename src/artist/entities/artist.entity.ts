import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({ description: 'Artist identifier uuid v4', nullable: false })
  id: string;

  @ApiProperty({ description: 'Artist name', nullable: false })
  name: string;

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
