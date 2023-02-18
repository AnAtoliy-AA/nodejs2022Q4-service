import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Favorites, FavoritesResponse, Resource } from './entities/fav.entity';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { validate } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(Favorites)
    private favoritesRepository: Repository<Favorites>,
    private trackService: TrackService,
    private artistService: ArtistService,
    private albumService: AlbumService,
  ) {}

  async findAll(): Promise<FavoritesResponse> {
    const favorites = await this.favoritesRepository.find({
      relations: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    return !favorites.length
      ? await this.favoritesRepository.save({
          albums: [],
          artists: [],
          tracks: [],
        })
      : favorites?.[0];
  }

  async addTrack(id: string) {
    if (!validate(id)) {
      throw new HttpException('Not valid track id', HttpStatus.BAD_REQUEST);
    }

    const track = (await this.trackService?.findAll())?.find(
      (_track) => _track?.id === id,
    );

    if (track) {
      const favorites = await this.findAll();

      favorites.tracks.push(track);

      return await this.favoritesRepository.save(favorites);
    } else {
      throw new HttpException(
        "Entity doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async removeTrack(trackId: string) {
    if (!validate(trackId)) {
      throw new HttpException('Not valid track id', HttpStatus.BAD_REQUEST);
    }
    const favorites = await this.findAll();

    favorites.tracks = favorites.tracks.filter(
      (_track) => _track.id !== trackId,
    );

    return await this.favoritesRepository.save(favorites);
  }

  async addArtist(artistId: string) {
    if (!validate(artistId)) {
      throw new HttpException('Not valid artist id', HttpStatus.BAD_REQUEST);
    }

    const artist = (await this.artistService?.findAll())?.find((_artist) => {
      return _artist?.id === artistId;
    });

    if (artist) {
      const favorites = await this.findAll();

      favorites.artists.push(artist);

      return await this.favoritesRepository.save(favorites);
    } else {
      throw new HttpException(
        "Entity doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async removeArtist(artistId: string) {
    if (!validate(artistId)) {
      throw new HttpException('Not valid artist id', HttpStatus.BAD_REQUEST);
    }
    const favorites = await this.findAll();

    favorites.artists = favorites.artists.filter(
      (_artist) => _artist.id !== artistId,
    );

    return await this.favoritesRepository.save(favorites);
  }

  async addAlbum(id: string) {
    if (!validate(id)) {
      throw new HttpException('Not valid album id', HttpStatus.BAD_REQUEST);
    }

    const album = (await this.albumService?.findAll())?.find(
      (_album) => _album?.id === id,
    );

    if (album) {
      const favorites = await this.findAll();

      favorites.albums.push(album);

      return await this.favoritesRepository.save(favorites);
    } else {
      throw new HttpException(
        "Entity doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async removeAlbum(albumId: string) {
    if (!validate(albumId)) {
      throw new HttpException('Not valid album id', HttpStatus.BAD_REQUEST);
    }
    const favorites = await this.findAll();

    favorites.albums = favorites.albums.filter(
      (_album) => _album.id !== albumId,
    );

    return await this.favoritesRepository.save(favorites);
  }
}
