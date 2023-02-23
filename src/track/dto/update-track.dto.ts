import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
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
}
