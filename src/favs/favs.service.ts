import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Track } from 'src/track/entities/track.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';
import { Favorites, FavoritesResponse, Resource } from './entities/fav.entity';

@Injectable()
export class FavsService {
  private favs: Favorites = {
    artistsIds: [],
    albumsIds: [],
    tracksIds: [],
  };

  findAll(
    tracks: Track[],
    artists: Artist[],
    albums: Album[],
  ): FavoritesResponse {
    return {
      artists: artists.filter((artist) =>
        this.favs.artistsIds.includes(artist.id),
      ),
      albums: albums.filter((album) => this.favs.albumsIds.includes(album.id)),
      tracks: tracks.filter((track) => this.favs.tracksIds.includes(track.id)),
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

    this.favs.tracksIds.push(id);

    return track;
  }

  removeTrack(id: string, tracks: Track[]) {
    this.validateResourceAndDeleteById(id, {
      data: tracks,
      type: 'track',
    });

    this.favs.tracksIds = this.favs.tracksIds.filter(
      (trackId) => trackId !== id,
    );
  }

  // artist
  addArtist(id: string, artists: Artist[]) {
    const artist = this.validateResourceAndGetById(id, {
      data: artists,
      type: 'artist',
    }) as Artist;

    this.favs.artistsIds.push(id);

    return artist;
  }

  removeArtist(id: string, artists: Artist[]) {
    this.validateResourceAndDeleteById(id, {
      data: artists,
      type: 'artist',
    });

    this.favs.artistsIds = this.favs.artistsIds.filter(
      (artistId) => artistId !== id,
    );
  }

  // album
  addAlbum(id: string, albums: Album[]) {
    const album = this.validateResourceAndGetById(id, {
      data: albums,
      type: 'album',
    }) as Album;

    this.favs.albumsIds.push(id);

    return album;
  }

  removeAlbum(id: string, albums: Album[]) {
    this.validateResourceAndDeleteById(id, {
      data: albums,
      type: 'album',
    });

    this.favs.albumsIds = this.favs.albumsIds.filter(
      (albumId) => albumId !== id,
    );
  }
}
