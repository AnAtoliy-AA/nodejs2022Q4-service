import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { UserService } from 'src/user/user.service';
import { AlbumService } from 'src/album/album.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ArtistModule, TrackModule, AlbumModule, UserModule],
  controllers: [FavsController],
  providers: [
    FavsService,
    ArtistService,
    TrackService,
    UserService,
    AlbumService,
  ],
})
export class FavsModule {}
