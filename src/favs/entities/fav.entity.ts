import { ApiProperty } from '@nestjs/swagger';

export class Fav {
  @ApiProperty({ description: 'Tracks', nullable: false })
  tracks: string[];

  @ApiProperty({ description: 'Albums', nullable: false })
  albums: string[];

  @ApiProperty({ description: 'Artists', nullable: false })
  artists: string[];
}
