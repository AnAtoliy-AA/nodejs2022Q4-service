import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Track identifier uuid v4', nullable: false })
  id: string;

  @Column()
  @ApiProperty({ description: 'Track name', nullable: false })
  name: string;

  @Column({ nullable: true })
  @ManyToOne(() => Artist, (album) => album.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({
    name: 'artistId',
    referencedColumnName: 'id',
  })
  @ApiProperty({
    description: 'Track artistId refers to Artist',
    nullable: true,
  })
  artistId: string | null;

  @Column({ nullable: true })
  @ManyToOne(() => Album, (album) => album.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({
    name: 'albumId',
    referencedColumnName: 'id',
  })
  @ApiProperty({
    description: 'Track albumId refers to Album',
    nullable: true,
  })
  albumId: string | null;

  @Column()
  @ApiProperty({
    description: 'Track duration integer number, increments on update',
    nullable: false,
  })
  duration: number;

  constructor(
    id: string,
    name: string,
    artistId: string | null,
    albumId: string | null,
    duration: number,
  ) {
    this.id = id;
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }
}
