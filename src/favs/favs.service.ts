import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FavoritesResponse, Resource } from './entities/fav.entity';
import { DataObj } from 'src/data';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { validate } from 'uuid';

@Injectable()
export class FavsService {
  constructor(
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}

  async findAll(): Promise<FavoritesResponse> {
    const artists = await this.artistService.findAll();
    const albums = await this.albumService.findAll();
    const tracks = this.trackService.findAll();

    return {
      artists: artists.filter((artist) =>
        DataObj.favoritesData.artistsIds.includes(artist.id),
      ),
      albums: albums.filter((album) =>
        DataObj.favoritesData.albumsIds.includes(album.id),
      ),
      tracks: tracks.filter((track) =>
        DataObj.favoritesData.tracksIds.includes(track.id),
      ),
    };
  }

  private validateResourceAndGetById(id: string, resource: Resource) {
    const oneResource = resource.data.find((r) => r.id === id);

    if (oneResource == null) {
      throw new HttpException(
        `${resource.type} with id === ${id} don't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return oneResource;
  }

  private validateResourceAndDeleteById(id: string, resource: Resource) {
    const oneResource = resource.data.find((r) => r.id === id);

    if (oneResource == null) {
      throw new HttpException(
        `${resource.type} with id === ${id} not a favorite`,
        HttpStatus.NOT_FOUND,
      );
    }

    return true;
  }

  addTrack(id: string) {
    if (!validate(id)) {
      throw new HttpException('Not valid track id', HttpStatus.BAD_REQUEST);
    }

    const track = this.trackService
      ?.findAll()
      ?.find((_track) => _track?.id === id);

    if (track) {
      DataObj.favoritesData.tracksIds.push(id);
    } else {
      throw new HttpException(
        "Entity doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  removeTrack(id: string) {
    if (!validate(id)) {
      throw new HttpException('Not valid track id', HttpStatus.BAD_REQUEST);
    }
    DataObj.favoritesData.tracksIds = DataObj.favoritesData.tracksIds.filter(
      (trackId) => trackId !== id,
    );
  }

  // artist
  async addArtist(id: string) {
    if (!validate(id)) {
      throw new HttpException('Not valid track id', HttpStatus.BAD_REQUEST);
    }

    const artist = (await this.artistService?.findAll())?.find(
      (_artist) => _artist?.id === id,
    );

    if (artist) {
      DataObj.favoritesData.artistsIds.push(id);
    } else {
      throw new HttpException(
        "Entity doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  removeArtist(id: string) {
    if (!validate(id)) {
      throw new HttpException('Not valid track id', HttpStatus.BAD_REQUEST);
    }
    DataObj.favoritesData.artistsIds = DataObj.favoritesData.artistsIds.filter(
      (artistId) => artistId !== id,
    );
  }

  // album
  async addAlbum(id: string) {
    if (!validate(id)) {
      throw new HttpException('Not valid track id', HttpStatus.BAD_REQUEST);
    }

    const album = (await this.albumService?.findAll())?.find(
      (_album) => _album?.id === id,
    );
    if (album) {
      DataObj.favoritesData.albumsIds.push(id);
    } else {
      throw new HttpException(
        "Entity doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  removeAlbum(id: string) {
    if (!validate(id)) {
      throw new HttpException('Not valid track id', HttpStatus.BAD_REQUEST);
    }
    DataObj.favoritesData.albumsIds = DataObj.favoritesData.albumsIds.filter(
      (albumId) => albumId !== id,
    );
  }
}
