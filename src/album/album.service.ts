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

@Injectable()
export class AlbumService {
  private _albums: Album[] = [];

  create(dto: CreateAlbumDto) {
    const { name, artistId, year } = dto;

    if (!name) {
      throw new HttpException('Empty required fields', HttpStatus.BAD_REQUEST);
    }

    const id = uuidv4();
    const createdAt: string = new Date(Date.now()).toDateString();
    const updatedAt: string = new Date(Date.now()).toDateString();
    const album = new Album(id, name, year, artistId);
    this._albums.push(album);
    return album;
  }

  findAll() {
    return this._albums;
  }

  findOne(albumId: string) {
    if (!validate(albumId)) {
      throw new HttpException('Not valid album id', HttpStatus.BAD_REQUEST);
    }
    return this._albums.filter((album) => album.id == albumId);
  }

  update(albumUniqueId: string, dto: UpdateAlbumDto) {
    if (!validate(albumUniqueId)) {
      throw new HttpException('Not valid album id', HttpStatus.BAD_REQUEST);
    }

    const index = this._albums.findIndex((album) => album.id == albumUniqueId);

    if (index === -1) {
      throw new NotFoundException('album not found.');
    }

    const { id, name, artistId, year } = this._albums[index];

    this._albums[index] = new Album(id, name, year, artistId);
    return this._albums[index];
  }

  remove(albumId: string) {
    if (!validate(albumId)) {
      throw new HttpException('Not valid album id', HttpStatus.BAD_REQUEST);
    }
    const filteredAlbums = this._albums.filter((album) => album.id != albumId);

    if (this._albums.length !== filteredAlbums.length) {
      this._albums = filteredAlbums;
    } else {
      throw new NotFoundException('Album not found.');
    }
  }
}
