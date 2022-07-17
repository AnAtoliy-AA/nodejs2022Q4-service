import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty({ description: 'Track identifier uuid v4', nullable: false })
  id: string;

  @ApiProperty({ description: 'Track name', nullable: false })
  name: string;

  @ApiProperty({
    description: 'Track artistId refers to Artist',
    nullable: true,
  })
  artistId: string | null;

  @ApiProperty({
    description: 'Track albumId refers to Album',
    nullable: true,
  })
  albumId: string | null;

  @ApiProperty({
    description: 'Track duration integer number, increments on update',
    nullable: false,
  })
  duration: number;

  @ApiProperty({ description: 'Track timestamp of creation', nullable: false })
  createdAt: string;

  @ApiProperty({
    description: 'Track timestamp of last update',
    nullable: false,
  })
  updatedAt: string;

  constructor(
    id: string,
    name: string,
    artistId: string | null,
    albumId: string | null,
    duration: number,
    createdAt: string,
    updatedAt: string,
  ) {
    this.id = id;
    this.name = name;
    this.artistId = artistId;
    this.albumId = this.albumId;
    this.duration = duration;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
