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
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async create(dto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = dto;

    if (!name) {
      throw new HttpException('Empty required fields', HttpStatus.BAD_REQUEST);
    }

    const id = uuidv4();
    // const track = new Track(
    //   id,
    //   name,
    //   artistId || null,
    //   albumId || null,
    //   duration,
    // );
    // DataObj.tracksData.push(track);
    // return track;

    const track = await this.trackRepository.create({
      id,
      name,
      artistId,
      albumId,
      duration,
    });

    // const album = new Album(id, name, year, artistId);
    // DataObj.albumsData.push(album);
    return track;
  }

  async findAll() {
    // return DataObj.tracksData;
    return await this.trackRepository.find();
  }

  private validateId(id: string) {
    if (!validate(id)) {
      throw new HttpException('Not valid track id', HttpStatus.BAD_REQUEST);
    }
  }

  async getById(trackId: string) {
    this.validateId(trackId);
    // const findTrack = DataObj.tracksData.find((track) => track.id == trackId);

    // if (!findTrack) {
    //   throw new NotFoundException('Track not found.');
    // }

    // return findTrack;

    const findTrack = await this.trackRepository.findOne({
      where: { id: trackId },
    });

    if (!findTrack) {
      throw new NotFoundException('Track not found.');
    }

    return findTrack;
  }

  update(trackUniqueId: string, dto: UpdateTrackDto) {
    if (!validate(trackUniqueId)) {
      throw new HttpException('Not valid track id', HttpStatus.BAD_REQUEST);
    }

    const index = DataObj.tracksData.findIndex(
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

    const { id, name, artistId, albumId, duration } = DataObj.tracksData[index];

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

    DataObj.tracksData[index] = new Track(
      id,
      updatedName,
      updatedArtistId,
      updatedAlbumId,
      updatedDuration,
    );
    return DataObj.tracksData[index];
  }

  async delete(trackId: string) {
    if (!validate(trackId)) {
      throw new HttpException('Not valid track id', HttpStatus.BAD_REQUEST);
    }
    // const filteredTracks = this.tracksData.filter((track) => track.id != trackId);
    // const findTrackIndex = DataObj.tracksData?.findIndex(
    //   (track) => track.id === trackId,
    // );

    // if (findTrackIndex !== -1) {
    //   DataObj.tracksData.splice(findTrackIndex, 1);
    // } else {
    //   throw new NotFoundException('Track not found.');
    // }
    const result = await this.trackRepository.delete({ id: trackId });

    if (result.affected === 0) {
      throw new NotFoundException('Track not found.');
    }
  }

  async resetAlbumId(trackId: string, albumId: string) {
    const track = await this.getById(trackId);

    if (track.albumId === albumId) {
      track.albumId = null;
    }
  }

  async resetArtistId(trackId: string, artistId: string) {
    const track = await this.getById(trackId);

    if (track.artistId === artistId) {
      const updatedTrack = { ...track, artistId: null };

      this.update(trackId, updatedTrack);
    }
  }
}
