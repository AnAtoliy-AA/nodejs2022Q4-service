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
import { DataObj } from 'src/data';

@Injectable()
export class TrackService {
  tracksData: Array<Track> = DataObj.tracksData;

  async create(dto: CreateTrackDto) {
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
      artistId || null,
      albumId || null,
      duration,
      createdAt,
      updatedAt,
    );
    this.tracksData.push(track);
    return track;
  }

  findAll() {
    return this.tracksData;
  }

  private validateId(id: string) {
    if (!validate(id)) {
      throw new HttpException('Not valid track id', HttpStatus.BAD_REQUEST);
    }
  }

  getById(trackId: string) {
    this.validateId(trackId);
    const findTrack = this.tracksData.find((track) => track.id == trackId);

    if (!findTrack) {
      throw new NotFoundException('Track not found.');
    }

    return findTrack;
  }

  update(trackUniqueId: string, dto: UpdateTrackDto) {
    if (!validate(trackUniqueId)) {
      throw new HttpException('Not valid track id', HttpStatus.BAD_REQUEST);
    }

    const index = this.tracksData.findIndex(
      (track) => track.id === trackUniqueId,
    );

    if (index === -1) {
      throw new NotFoundException('Track not found.');
    }

    if (!dto.name || typeof dto.duration !== 'number') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'incorrect newPassword or oldPassword.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const { id, name, artistId, albumId, duration, createdAt } =
      this.tracksData[index];

    const updatedName =
      dto.hasOwnProperty('name') && dto?.name !== undefined ? dto.name : name;
    const updatedArtistId =
      dto.hasOwnProperty('artistId') && dto?.artistId !== undefined
        ? dto.artistId
        : artistId;

    const updatedAlbumId =
      dto.hasOwnProperty('albumId') && dto?.albumId !== undefined
        ? dto.albumId
        : albumId;
    const updatedDuration =
      dto.hasOwnProperty('duration') && dto?.duration !== undefined
        ? dto.duration
        : duration;

    const updatedAt: string = new Date(Date.now()).toDateString();

    this.tracksData[index] = new Track(
      id,
      updatedName,
      updatedArtistId,
      updatedAlbumId,
      updatedDuration,
      createdAt,
      updatedAt,
    );
    return this.tracksData[index];
  }

  delete(trackId: string) {
    if (!validate(trackId)) {
      throw new HttpException('Not valid track id', HttpStatus.BAD_REQUEST);
    }
    // const filteredTracks = this.tracksData.filter((track) => track.id != trackId);
    const findTrackIndex = this.tracksData?.findIndex(
      (track) => track.id === trackId,
    );

    if (findTrackIndex !== -1) {
      this.tracksData.splice(findTrackIndex, 1);
    } else {
      throw new NotFoundException('Track not found.');
    }
  }

  resetAlbumId(trackId: string, albumId: string) {
    const track = this.getById(trackId);

    if (track.albumId === albumId) {
      track.albumId = null;
    }
  }

  resetArtistId(trackId: string, artistId: string) {
    const track = this.getById(trackId);

    if (track.artistId === artistId) {
      const updatedTrack = { ...track, artistId: null };

      this.update(trackId, updatedTrack);
    }
  }
}
