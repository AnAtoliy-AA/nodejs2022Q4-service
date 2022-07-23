import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuidv4, validate } from 'uuid';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  private _artists: Artist[] = [];

  create(dto: CreateArtistDto) {
    const { name, grammy } = dto;

    if (!name) {
      throw new HttpException('Empty required fields', HttpStatus.BAD_REQUEST);
    }

    const id = uuidv4();
    const createdAt: string = new Date(Date.now()).toDateString();
    const updatedAt: string = new Date(Date.now()).toDateString();
    const artist = new Artist(id, name, grammy);
    this._artists.push(artist);
    return artist;
  }

  findAll() {
    return this._artists;
  }

  getById(artistId: string) {
    if (!validate(artistId)) {
      throw new HttpException('Not valid artist id', HttpStatus.BAD_REQUEST);
    }
    const artist = this._artists.find((artist) => artist.id == artistId);

    if (!artist) {
      throw new NotFoundException('Artist not found.');
    }

    return artist;
  }

  update(artistUniqueId: string, dto: UpdateArtistDto) {
    if (!validate(artistUniqueId)) {
      throw new HttpException('Not valid artist id', HttpStatus.BAD_REQUEST);
    }

    if (typeof dto.name !== 'string' || typeof dto.grammy !== 'boolean') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'incorrect newPassword or oldPassword.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const index = this._artists.findIndex(
      (artist) => artist.id == artistUniqueId,
    );

    if (index === -1) {
      throw new NotFoundException('artist not found.');
    }

    const { id, name, grammy } = this._artists[index];

    this._artists[index] = new Artist(
      id,
      dto.name || name,
      dto.grammy || grammy,
    );
    return this._artists[index];
  }

  delete(artistId: string) {
    if (!validate(artistId)) {
      throw new HttpException('Not valid artist id', HttpStatus.BAD_REQUEST);
    }
    const filteredArtists = this._artists.filter(
      (artist) => artist.id != artistId,
    );

    if (this._artists.length !== filteredArtists.length) {
      this._artists = filteredArtists;
    } else {
      throw new NotFoundException('Artist not found.');
    }
  }
}
