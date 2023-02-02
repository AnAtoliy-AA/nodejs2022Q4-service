import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Track } from 'src/track/entities/track.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';
import { Favorites, FavoritesResponse, Resource } from './entities/fav.entity';
import { DataObj } from 'src/data';

@Injectable()
export class FavsService {
  favoritesData: Favorites = DataObj.favoritesData;

  findAll(
    tracks: Track[],
    artists: Artist[],
    albums: Album[],
  ): FavoritesResponse {
    return {
      artists: artists.filter((artist) =>
        this.favoritesData.artistsIds.includes(artist.id),
      ),
      albums: albums.filter((album) =>
        this.favoritesData.albumsIds.includes(album.id),
      ),
      tracks: tracks.filter((track) =>
        this.favoritesData.tracksIds.includes(track.id),
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

  addTrack(id: string, tracks: Track[]) {
    const track = this.validateResourceAndGetById(id, {
      data: tracks,
      type: 'track',
    }) as Track;

    this.favoritesData.tracksIds.push(id);

    return track;
  }

  removeTrack(id: string, tracks: Track[]) {
    this.validateResourceAndDeleteById(id, {
      data: tracks,
      type: 'track',
    });

    this.favoritesData.tracksIds = this.favoritesData.tracksIds.filter(
      (trackId) => trackId !== id,
    );
  }

  // artist
  addArtist(id: string, artists: Artist[]) {
    const artist = this.validateResourceAndGetById(id, {
      data: artists,
      type: 'artist',
    }) as Artist;

    this.favoritesData.artistsIds.push(id);

    return artist;
  }

  removeArtist(id: string, artists: Artist[]) {
    this.validateResourceAndDeleteById(id, {
      data: artists,
      type: 'artist',
    });

    this.favoritesData.artistsIds = this.favoritesData.artistsIds.filter(
      (artistId) => artistId !== id,
    );
  }

  // album
  addAlbum(id: string, albums: Album[]) {
    const album = this.validateResourceAndGetById(id, {
      data: albums,
      type: 'album',
    }) as Album;

    this.favoritesData.albumsIds.push(id);

    return album;
  }

  removeAlbum(id: string, albums: Album[]) {
    this.validateResourceAndDeleteById(id, {
      data: albums,
      type: 'album',
    });

    this.favoritesData.albumsIds = this.favoritesData.albumsIds.filter(
      (albumId) => albumId !== id,
    );
  }
}
