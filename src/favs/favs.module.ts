import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ArtistModule, TrackModule, AlbumModule, UserModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
