import { Exclude } from 'class-transformer';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @ManyToMany(() => Album, { eager: true })
  @JoinTable()
  albums: Array<Album>;

  @ManyToMany(() => Artist, { eager: true })
  @JoinTable()
  artists: Array<Artist>;

  @ManyToMany(() => Track, { eager: true })
  @JoinTable()
  tracks: Array<Track>;
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
