import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4, validate } from 'uuid';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async create(dto: CreateAlbumDto) {
    const { name, artistId, year } = dto;

    if (typeof name !== 'string' || typeof year !== 'number') {
      throw new HttpException('Empty required fields', HttpStatus.BAD_REQUEST);
    }

    const id = uuidv4();
    const createdAlbum = this.albumRepository.create({
      id,
      name,
      artistId,
      year,
    });

    return await this.albumRepository.save(createdAlbum);
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  private validateId(id: string) {
    if (!validate(id)) {
      throw new HttpException('Not valid album id', HttpStatus.BAD_REQUEST);
    }
  }

  async getById(albumId: string) {
    this.validateId(albumId);

    const findAlbum = await this.albumRepository.findOne({
      where: { id: albumId },
    });

    if (!findAlbum) {
      throw new NotFoundException('Album not found.');
    }

    return findAlbum;
  }

  async update(albumId: string, dto: UpdateAlbumDto) {
    this.validateId(albumId);

    if (!dto.name || typeof dto.year !== 'number') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'incorrect newPassword or oldPassword.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedAlbum = await this.getById(albumId);

    Object.assign(updatedAlbum, dto);

    return await this.albumRepository.save(updatedAlbum);
  }

  async delete(albumId: string) {
    this.validateId(albumId);

    const result = await this.albumRepository.delete({ id: albumId });

    if (result.affected === 0) {
      throw new NotFoundException('Album not found.');
    }
  }
}
