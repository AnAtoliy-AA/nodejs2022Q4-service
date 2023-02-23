import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @ApiProperty({ description: 'Artist name', nullable: false })
  name: string;

  @ApiProperty({ description: 'Artist Id', nullable: false })
  artistId: string;

  @ApiProperty({
    description: 'Album integer number of creating',
    nullable: false,
  })
  year: number;
}
