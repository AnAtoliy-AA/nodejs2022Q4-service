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

@Injectable()
export class AlbumService {
  albumsData: Album[] = DataObj.albumsData;

  create(dto: CreateAlbumDto) {
    const { name, artistId, year } = dto;

    if (!name) {
      throw new HttpException('Empty required fields', HttpStatus.BAD_REQUEST);
    }

    const id = uuidv4();
    const createdAt: string = new Date(Date.now()).toDateString();
    const updatedAt: string = new Date(Date.now()).toDateString();
    const album = new Album(id, name, year, artistId);
    this.albumsData.push(album);
    return album;
  }

  findAll() {
    return this.albumsData;
  }

  getById(albumId: string) {
    if (!validate(albumId)) {
      throw new HttpException('Not valid album id', HttpStatus.BAD_REQUEST);
    }
    const findAlbum = this.albumsData.find((user) => user.id === albumId);

    if (!findAlbum) {
      throw new NotFoundException('Album not found.');
    }

    return findAlbum;
  }

  update(albumUniqueId: string, dto: UpdateAlbumDto) {
    if (!validate(albumUniqueId)) {
      throw new HttpException('Not valid album id', HttpStatus.BAD_REQUEST);
    }

    const index = this.albumsData.findIndex(
      (album) => album.id == albumUniqueId,
    );

    if (index === -1) {
      throw new NotFoundException('album not found.');
    }

    if (!dto.name || typeof dto.year !== 'number') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'incorrect newPassword or oldPassword.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const { id, name, artistId, year } = this.albumsData[index];

    this.albumsData[index] = new Album(
      id,
      dto.name || name,
      dto.year || year,
      dto.artistId || artistId || null,
    );
    return this.albumsData[index];
  }

  delete(albumId: string) {
    if (!validate(albumId)) {
      throw new HttpException('Not valid album id', HttpStatus.BAD_REQUEST);
    }
    const filteredAlbums = this.albumsData.filter(
      (album) => album.id != albumId,
    );

    if (this.albumsData.length !== filteredAlbums.length) {
      this.albumsData = filteredAlbums;
    } else {
      throw new NotFoundException('Album not found.');
    }
  }
}
