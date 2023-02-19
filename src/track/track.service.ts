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
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async create(dto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = dto;

    if (!name) {
      throw new HttpException('Empty required fields', HttpStatus.BAD_REQUEST);
    }

    const id = uuidv4();
    const track = this.trackRepository.create({
      id,
      name,
      artistId,
      albumId,
      duration,
    });

    return await this.trackRepository.save(track);
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  private validateId(id: string) {
    if (!validate(id)) {
      throw new HttpException('Not valid track id', HttpStatus.BAD_REQUEST);
    }
  }

  async getById(trackId: string) {
    this.validateId(trackId);

    const findTrack = await this.trackRepository.findOne({
      where: { id: trackId },
    });

    if (!findTrack) {
      throw new NotFoundException('Track not found.');
    }

    return findTrack;
  }

  async update(trackUniqueId: string, dto: UpdateTrackDto) {
    this.validateId(trackUniqueId);

    const updatedTrack = await this.getById(trackUniqueId);

    if (!dto.name || typeof dto.duration !== 'number') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'incorrect newPassword or oldPassword.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    Object.assign(updatedTrack, dto);

    return await this.trackRepository.save(updatedTrack);
  }

  async delete(trackId: string) {
    this.validateId(trackId);
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
    this.update(trackId, track);
  }

  async resetArtistId(trackId: string, artistId: string) {
    const track = await this.getById(trackId);

    if (track.artistId === artistId) {
      const updatedTrack = { ...track, artistId: null };

      this.update(trackId, updatedTrack);
    }
  }
}
