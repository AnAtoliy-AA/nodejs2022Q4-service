import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from 'src/track/track.module';
import { TrackService } from 'src/track/track.service';

@Module({
  imports: [TrackModule],
  controllers: [ArtistController],
  providers: [ArtistService, TrackService],
  exports: [ArtistService],
})
export class ArtistModule { }
