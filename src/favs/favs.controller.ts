import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavsService } from './favs.service';
import { CreateFavDto } from './dto/create-fav.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Favourites')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post('/album')
  createAlbum(@Body() createFavDto: CreateFavDto) {
    return this.favsService.createAlbum(createFavDto);
  }

  @Get('/album')
  get() {
    return this.favsService.get();
  }

  @Delete('/album:id')
  removeAlbum(@Param('id') id: string) {
    return this.favsService.removeAlbum(id);
  }

  @Post('/artist')
  createArtist(@Body() createFavDto: CreateFavDto) {
    return this.favsService.createArtist(createFavDto);
  }

  @Get('/artist')
  findAllArtists() {
    return this.favsService.findAllArtists();
  }

  @Delete('/artist:id')
  removeArtist(@Param('id') id: string) {
    return this.favsService.removeArtist(id);
  }

  @Post('/track')
  createTrack(@Body() createFavDto: CreateFavDto) {
    return this.favsService.createTrack(createFavDto);
  }

  @Get('/track')
  findAllTracks() {
    return this.favsService.get();
  }

  @Delete('/track:id')
  removeTrack(@Param('id') id: string) {
    return this.favsService.removeTrack(id);
  }
}
