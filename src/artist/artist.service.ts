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
import { TrackService } from 'src/track/track.service';
import { DataObj } from 'src/data';

@Injectable()
export class ArtistService {
  constructor(private readonly trackService: TrackService) {}

  create(dto: CreateArtistDto) {
    const { name, grammy } = dto;

    if (!name) {
      throw new HttpException('Empty required fields', HttpStatus.BAD_REQUEST);
    }

    const id = uuidv4();
    const artist = new Artist(id, name, grammy);
    DataObj.artistsData.push(artist);

    return artist;
  }

  async findAll() {
    return DataObj.artistsData;
  }

  getById(artistId: string) {
    if (!validate(artistId)) {
      throw new HttpException('Not valid artist id', HttpStatus.BAD_REQUEST);
    }
    const artist = DataObj.artistsData.find((artist) => artist.id == artistId);

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

    const index = DataObj.artistsData.findIndex(
      (artist) => artist.id == artistUniqueId,
    );

    if (index === -1) {
      throw new NotFoundException('artist not found.');
    }

    const { id, name, grammy } = DataObj.artistsData[index];

    const updatedName =
      dto.hasOwnProperty('name') && dto?.name !== undefined ? dto.name : name;
    const updatedGrammy =
      dto.hasOwnProperty('grammy') && dto?.grammy !== undefined
        ? dto.grammy
        : grammy;

    DataObj.artistsData[index] = new Artist(id, updatedName, updatedGrammy);

    return DataObj.artistsData[index];
  }

  delete(artistId: string) {
    if (!validate(artistId)) {
      throw new HttpException('Not valid artist id', HttpStatus.BAD_REQUEST);
    }

    const tracks = this.trackService?.findAll();
    if (tracks?.length) {
      tracks.forEach((_track) => {
        if (_track?.artistId === artistId) {
          this.trackService?.resetArtistId(_track?.id, artistId);
        }
      });
    }

    const filteredArtists = DataObj.artistsData.filter(
      (artist) => artist.id != artistId,
    );

    if (DataObj.artistsData.length !== filteredArtists.length) {
      DataObj.artistsData = filteredArtists;
    } else {
      throw new NotFoundException('Artist not found.');
    }
  }
}
