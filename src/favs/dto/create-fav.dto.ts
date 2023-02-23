import { ApiProperty } from '@nestjs/swagger';

export class CreateFavDto {
  @ApiProperty({ description: 'id', nullable: false })
  id: string;
}
