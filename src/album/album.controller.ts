import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  get() {
    return this.albumService.get();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.albumService.getById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No content' })
  delete(@Param('id') id: string) {
    const trackWithSuchAlbumId = this.trackService
      .findAll()
      .find((track) => track.albumId === id);

    if (trackWithSuchAlbumId) {
      this.trackService.resetAlbumId(trackWithSuchAlbumId.id, id);
    }
    return this.albumService.delete(id);
  }
}
