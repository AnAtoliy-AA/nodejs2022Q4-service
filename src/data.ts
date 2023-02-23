import { Album } from './album/entities/album.entity';
import { Artist } from './artist/entities/artist.entity';
import { Favorites } from './favs/entities/fav.entity';
import { Track } from './track/entities/track.entity';
import { User } from './user/entities/user.entity';

const artistsData: Array<Artist> = [];
const tracksData: Array<Track> = [];
const albumsData: Array<Album> = [];
const usersData: Array<User> = [];
const favoritesData: Favorites = {
  artistsIds: [],
  albumsIds: [],
  tracksIds: [],
};

export const DataObj = {
  albumsData,
  artistsData,
  favoritesData,
  tracksData,
  usersData,
};
