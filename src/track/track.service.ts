import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class TrackService {
  private _tracks: Track[] = [];

  create(dto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = dto;

    if (!name) {
      throw new HttpException('Empty required fields', HttpStatus.BAD_REQUEST);
    }

    const id = uuidv4();
    const createdAt: string = new Date(Date.now()).toDateString();
    const updatedAt: string = new Date(Date.now()).toDateString();
    const track = new Track(
      id,
      name,
      artistId,
      albumId,
      duration,
      createdAt,
      updatedAt,
    );
    this._tracks.push(track);
    return track;
  }

  findAll() {
    return this._tracks;
  }

  findOne(trackId: string) {
    if (!validate(trackId)) {
      throw new HttpException('Not valid track id', HttpStatus.BAD_REQUEST);
    }
    return this._tracks.filter((track) => track.id == trackId);
  }

  update(trackUniqueId: string, dto: UpdateTrackDto) {
    if (!validate(trackUniqueId)) {
      throw new HttpException('Not valid track id', HttpStatus.BAD_REQUEST);
    }

    const index = this._tracks.findIndex((track) => track.id == trackUniqueId);

    if (index === -1) {
      throw new NotFoundException('Track not found.');
    }

    const { id, name, artistId, albumId, duration, createdAt } =
      this._tracks[index];

    const updatedAt: string = new Date(Date.now()).toDateString();

    this._tracks[index] = new Track(
      id,
      name,
      artistId,
      albumId,
      duration,
      createdAt,
      updatedAt,
    );
    return this._tracks[index];
  }

  remove(trackId: string) {
    if (!validate(trackId)) {
      throw new HttpException('Not valid track id', HttpStatus.BAD_REQUEST);
    }
    const filteredTracks = this._tracks.filter((track) => track.id != trackId);

    if (this._tracks.length !== filteredTracks.length) {
      this._tracks = filteredTracks;
    } else {
      throw new NotFoundException('Track not found.');
    }
  }
}
