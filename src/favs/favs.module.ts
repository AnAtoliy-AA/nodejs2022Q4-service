import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './entities/fav.entity';

@Module({
  imports: [
    ArtistModule,
    TrackModule,
    AlbumModule,
    TypeOrmModule.forFeature([Favorites]),
  ],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
