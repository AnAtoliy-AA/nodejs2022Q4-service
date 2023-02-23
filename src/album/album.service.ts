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
  create(dto: CreateAlbumDto) {
    const { name, artistId, year } = dto;

    if (!name) {
      throw new HttpException('Empty required fields', HttpStatus.BAD_REQUEST);
    }

    const id = uuidv4();
    const album = new Album(id, name, year, artistId);
    DataObj.albumsData.push(album);
    return album;
  }

  findAll() {
    return DataObj.albumsData;
  }

  getById(albumId: string) {
    if (!validate(albumId)) {
      throw new HttpException('Not valid album id', HttpStatus.BAD_REQUEST);
    }
    const findAlbum = DataObj.albumsData.find((user) => user.id === albumId);

    if (!findAlbum) {
      throw new NotFoundException('Album not found.');
    }

    return findAlbum;
  }

  update(albumUniqueId: string, dto: UpdateAlbumDto) {
    if (!validate(albumUniqueId)) {
      throw new HttpException('Not valid album id', HttpStatus.BAD_REQUEST);
    }

    const index = DataObj.albumsData.findIndex(
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

    const { id, name, artistId, year } = DataObj.albumsData[index];

    DataObj.albumsData[index] = new Album(
      id,
      dto.name || name,
      dto.year || year,
      dto.artistId || artistId || null,
    );
    return DataObj.albumsData[index];
  }

  delete(albumId: string) {
    if (!validate(albumId)) {
      throw new HttpException('Not valid album id', HttpStatus.BAD_REQUEST);
    }
    const filteredAlbums = DataObj.albumsData.filter(
      (album) => album.id != albumId,
    );

    if (DataObj.albumsData.length !== filteredAlbums.length) {
      DataObj.albumsData = filteredAlbums;
    } else {
      throw new NotFoundException('Album not found.');
    }
  }
}
