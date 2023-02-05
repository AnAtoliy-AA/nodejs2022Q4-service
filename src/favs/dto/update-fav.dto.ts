import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFavDto } from './create-fav.dto';

export class UpdateFavDto extends PartialType(CreateFavDto) {
  @ApiProperty({ description: 'id', nullable: false })
  id: string;
}
