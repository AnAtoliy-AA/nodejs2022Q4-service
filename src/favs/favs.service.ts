import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
import { validate } from 'uuid';

@Injectable()
export class FavsService {
  private _tracks: string[] = [];
  private _albums: string[] = [];
  private _artists: string[] = [];

  createTrack(dto: CreateFavDto) {
    const { id } = dto;

    if (!id) {
      throw new HttpException('Empty required fields', HttpStatus.BAD_REQUEST);
    }

    this._tracks.push(id);
    return id;
  }

  get() {
    return this._tracks;
  }

  removeTrack(trackId: string) {
    if (!validate(trackId)) {
      throw new HttpException('Not valid track id', HttpStatus.BAD_REQUEST);
    }
    const filteredTracks = this._tracks.filter((track) => track !== trackId);

    if (this._tracks.length !== filteredTracks.length) {
      this._tracks = filteredTracks;
    } else {
      throw new NotFoundException('Track not found.');
    }
  }

  createAlbum(dto: CreateFavDto) {
    const { id } = dto;

    if (!id) {
      throw new HttpException('Empty required fields', HttpStatus.BAD_REQUEST);
    }

    this._albums.push(id);
    return id;
  }

  findAllAlbums() {
    return this._albums;
  }

  removeAlbum(albumId: string) {
    if (!validate(albumId)) {
      throw new HttpException('Not valid album id', HttpStatus.BAD_REQUEST);
    }
    const filteredAlbums = this._albums.filter((album) => album !== albumId);

    if (this._albums.length !== filteredAlbums.length) {
      this._albums = filteredAlbums;
    } else {
      throw new NotFoundException('Album not found.');
    }
  }

  createArtist(dto: CreateFavDto) {
    const { id } = dto;

    if (!id) {
      throw new HttpException('Empty required fields', HttpStatus.BAD_REQUEST);
    }

    this._artists.push(id);
    return id;
  }

  findAllArtists() {
    return this._artists;
  }

  removeArtist(artistId: string) {
    if (!validate(artistId)) {
      throw new HttpException('Not valid artist id', HttpStatus.BAD_REQUEST);
    }
    const filteredArtists = this._artists.filter(
      (artist) => artist !== artistId,
    );

    if (this._artists.length !== filteredArtists.length) {
      this._artists = filteredArtists;
    } else {
      throw new NotFoundException('Artist not found.');
    }
  }
}
