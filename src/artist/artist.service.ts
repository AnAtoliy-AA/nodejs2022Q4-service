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
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>
  ) {}

  async create(dto: CreateArtistDto) {
    const { name, grammy } = dto;

    if (!name) {
      throw new HttpException('Empty required fields', HttpStatus.BAD_REQUEST);
    }

    const id = uuidv4();
    // const artist = new Artist(id, name, grammy);
    // DataObj.artistsData.push(artist);

    // return artist;
    const createdArtist = this.artistRepository.create({
      id,
      name,
      grammy,
    });

    // const album = new Album(id, name, year, artistId);
    // DataObj.albumsData.push(album);
    return await this.artistRepository.save(createdArtist);
  }

  async findAll() {
    // return DataObj.artistsData;
    return await this.artistRepository.find();
  }

  private validateId(id: string) {
    if (!validate(id)) {
      throw new HttpException('Not valid artist id', HttpStatus.BAD_REQUEST);
    }
  }

  async getById(artistId: string) {
    this.validateId(artistId);
    // const artist = DataObj.artistsData.find((artist) => artist.id == artistId);

    // if (!artist) {
    //   throw new NotFoundException('Artist not found.');
    // }

    // return artist;
    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });

    if (!artist) {
      throw new NotFoundException('Artist not found.');
    }

    return artist;
  }

  async update(artistUniqueId: string, dto: UpdateArtistDto) {
    if (typeof dto.name !== 'string' || typeof dto.grammy !== 'boolean') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'incorrect newPassword or oldPassword.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedArtist = await this.getById(artistUniqueId);

    if (!updatedArtist) {
      throw new NotFoundException('artist not found.');
    }

    Object.assign(updatedArtist, dto);

    return await this.artistRepository.save(updatedArtist);

    // const index = DataObj.artistsData.findIndex(
    //   (artist) => artist.id == artistUniqueId,
    // );

    // if (index === -1) {
    //   throw new NotFoundException('artist not found.');
    // }

    // const { id, name, grammy } = DataObj.artistsData[index];

    // const updatedName =
    //   dto.hasOwnProperty('name') && dto?.name !== undefined ? dto.name : name;
    // const updatedGrammy =
    //   dto.hasOwnProperty('grammy') && dto?.grammy !== undefined
    //     ? dto.grammy
    //     : grammy;

    // DataObj.artistsData[index] = new Artist(id, updatedName, updatedGrammy);

    // return DataObj.artistsData[index];
  }

  async delete(artistId: string) {
    this.validateId(artistId);

    // const tracks = await this.trackService?.findAll();
    // if (tracks?.length) {
    //   tracks.forEach(async (_track) => {
    //     if (_track?.artistId === artistId) {
    //       await this.trackService?.resetArtistId(_track?.id, artistId);
    //     }
    //   });
    // }

    // const filteredArtists = DataObj.artistsData.filter(
    //   (artist) => artist.id != artistId,
    // );

    // if (DataObj.artistsData.length !== filteredArtists.length) {
    //   DataObj.artistsData = filteredArtists;
    // } else {
    //   throw new NotFoundException('Artist not found.');
    // }

    const result = await this.artistRepository.delete({ id: artistId });

    if (result.affected === 0) {
      throw new NotFoundException('Artist not found.');
    }
  }
}
