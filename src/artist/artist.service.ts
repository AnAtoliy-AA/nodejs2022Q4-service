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
    private artistRepository: Repository<Artist>,
  ) {}

  async create(dto: CreateArtistDto) {
    const { name, grammy } = dto;

    if (typeof name !== 'string' || typeof grammy !== 'boolean') {
      throw new HttpException('Empty required fields', HttpStatus.BAD_REQUEST);
    }

    const id = uuidv4();

    const createdArtist = this.artistRepository.create({
      id,
      name,
      grammy,
    });

    return await this.artistRepository.save(createdArtist);
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  private validateId(id: string) {
    if (!validate(id)) {
      throw new HttpException('Not valid artist id', HttpStatus.BAD_REQUEST);
    }
  }

  async getById(artistId: string) {
    this.validateId(artistId);

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
  }

  async delete(artistId: string) {
    this.validateId(artistId);

    const result = await this.artistRepository.delete({ id: artistId });

    if (result.affected === 0) {
      throw new NotFoundException('Artist not found.');
    }
  }
}
