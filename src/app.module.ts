import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavouritesModule } from './favourites/favourites.module';
import { FavsModule } from './favs/favs.module';

@Module({
  imports: [UserModule, TrackModule, ArtistModule, AlbumModule, FavouritesModule, FavsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
