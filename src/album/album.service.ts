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
import { DataObj } from 'src/data';
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

    if (!name) {
      throw new HttpException('Empty required fields', HttpStatus.BAD_REQUEST);
    }

    const id = uuidv4();
    const createdAlbum = await this.albumRepository.create({
      id,
      name,
      artistId,
      year,
    });

    // const album = new Album(id, name, year, artistId);
    // DataObj.albumsData.push(album);
    return await this.albumRepository.save(createdAlbum);
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async getById(albumId: string) {
    if (!validate(albumId)) {
      throw new HttpException('Not valid album id', HttpStatus.BAD_REQUEST);
    }
    // const findAlbum = DataObj.albumsData.find((user) => user.id === albumId);

    const findAlbum = await this.albumRepository.findOne({
      where: { id: albumId },
    });

    if (!findAlbum) {
      throw new NotFoundException('Album not found.');
    }

    return findAlbum;
  }

  async update(albumUniqueId: string, dto: UpdateAlbumDto) {
    if (!validate(albumUniqueId)) {
      throw new HttpException('Not valid album id', HttpStatus.BAD_REQUEST);
    }

    // const index = DataObj.albumsData.findIndex(
    //   (album) => album.id == albumUniqueId,
    // );

    // if (index === -1) {
    //   throw new NotFoundException('album not found.');
    // }

    if (!dto.name || typeof dto.year !== 'number') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'incorrect newPassword or oldPassword.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedAlbum = await this.albumRepository.findOne({
      where: { id: albumUniqueId },
    });

    if (!updatedAlbum) {
      throw new NotFoundException('album not found.');
    }

    Object.assign(updatedAlbum, dto);

    return await this.albumRepository.save(updatedAlbum);
    // const { id, name, artistId, year } = DataObj.albumsData[index];

    // DataObj.albumsData[index] = new Album(
    //   id,
    //   dto.name || name,
    //   dto.year || year,
    //   dto.artistId || artistId || null,
    // );
    // return DataObj.albumsData[index];
  }

  async delete(albumId: string) {
    if (!validate(albumId)) {
      throw new HttpException('Not valid album id', HttpStatus.BAD_REQUEST);
    }
    // const filteredAlbums = DataObj.albumsData.filter(
    //   (album) => album.id != albumId,
    // );

    // if (DataObj.albumsData.length !== filteredAlbums.length) {
    //   DataObj.albumsData = filteredAlbums;
    // } else {
    //   throw new NotFoundException('Album not found.');
    // }

    const result = await this.albumRepository.delete({ id: albumId });

    if (result.affected === 0) {
      throw new NotFoundException('User not found.');
    }
  }
}
