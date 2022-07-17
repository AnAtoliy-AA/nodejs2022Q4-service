import { Track } from './entities/track.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful',
    type: Track,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Track identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Not valid track id',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Track not found.',
  })
  getById(@Param('id') id: string) {
    return this.trackService.getById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates a track with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Track identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully updated',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No content' })
  delete(@Param('id') id: string) {
    return this.trackService.delete(id);
  }
}
