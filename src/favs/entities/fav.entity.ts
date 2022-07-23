import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export interface Favorites {
  artistsIds: Array<string>;
  albumsIds: Array<string>;
  tracksIds: Array<string>;
}

export interface FavoritesResponse {
  artists: Array<Artist>;
  albums: Array<Album>;
  tracks: Array<Track>;
}

export interface Resource {
  data: Array<Artist | Album | Track>;
  type: string;
}
