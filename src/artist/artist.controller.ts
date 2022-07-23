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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
    type: Artist,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get artist with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Artist identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
    type: Artist,
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Not valid artist id',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Artist not found.',
  })
  getById(@Param('id') id: string) {
    return this.artistService.getById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No content' })
  delete(@Param('id') id: string) {
    return this.artistService.delete(id);
  }
}
