import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Favourites')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) { }

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  // track
  @Post('track/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful',
  })
  @HttpCode(HttpStatus.CREATED)
  createTrack(@Param() track: { id: string }) {
    // const tracks = this.trackService.findAll();
    return this.favsService.addTrack(track?.id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param() track: { id: string }) {
    return this.favsService.removeTrack(track?.id);
  }

  // artist
  @Post('artist/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful',
  })
  @HttpCode(HttpStatus.CREATED)
  createArtist(@Param() artist: { id: string }) {
    return this.favsService.addArtist(artist?.id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param() artist: { id: string }) {
    return this.favsService.removeArtist(artist?.id);
  }

  // album
  @Post('album/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful',
  })
  @HttpCode(HttpStatus.CREATED)
  addAlbum(@Param() album: { id: string }) {
    return this.favsService.addAlbum(album?.id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param() album: { id: string }) {
    return this.favsService.removeAlbum(album?.id);
  }
}
