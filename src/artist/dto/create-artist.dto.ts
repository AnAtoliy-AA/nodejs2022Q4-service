import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty({ description: 'Artist name', nullable: false })
  name: string;

  @ApiProperty({
    description: 'Artist duration integer number, increments on update',
    nullable: false,
  })
  grammy: boolean;
}
