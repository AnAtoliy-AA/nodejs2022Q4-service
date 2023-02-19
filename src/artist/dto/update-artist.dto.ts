import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @ApiProperty({ description: 'Artist name', nullable: false })
  name: string;

  @ApiProperty({
    description: 'Artist duration integer number, increments on update',
    nullable: false,
  })
  grammy: boolean;
}
