import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({ description: 'Album identifier uuid v4', nullable: false })
  id: string;

  @ApiProperty({ description: 'Album name', nullable: false })
  name: string;

  @ApiProperty({
    description: 'Album artistId refers to Artist',
    nullable: true,
  })
  artistId: string | null;

  @ApiProperty({
    description: 'Album duration integer number',
    nullable: false,
  })
  year: number;

  constructor(id: string, name: string, year: number, artistId: string | null) {
    this.id = id;
    this.name = name;
    this.artistId = artistId;
    this.year = year;
  }
}
