import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
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
