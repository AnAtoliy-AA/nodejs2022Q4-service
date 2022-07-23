import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavsService } from './favs.service';
import { CreateFavDto } from './dto/create-fav.dto';
import { ApiTags } from '@nestjs/swagger';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';

@ApiTags('Favourites')
@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}

  @Get()
  findAll() {
    const tracks = this.trackService.findAll();
    const artists = this.artistService.findAll();
    const albums = this.albumService.findAll();
    return this.favsService.findAll(tracks, artists, albums);
  }

  // track
  @Post('track/:id')
  createTrack(@Param() id: string) {
    const tracks = this.trackService.findAll();
    return this.favsService.addTrack(id, tracks);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param() id: string) {
    const tracks = this.trackService.findAll();
    return this.favsService.removeTrack(id, tracks);
  }

  // artist
  @Post('artist/:id')
  createArtist(@Param() id: string) {
    const artists = this.artistService.findAll();
    return this.favsService.addArtist(id, artists);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param() id: string) {
    const artists = this.artistService.findAll();
    return this.favsService.removeArtist(id, artists);
  }

  // album
  @Post('album/:id')
  addAlbum(@Param() id: string) {
    const albums = this.albumService.findAll();
    return this.favsService.addAlbum(id, albums);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param() id: string) {
    const albums = this.albumService.findAll();
    return this.favsService.removeAlbum(id, albums);
  }
}
