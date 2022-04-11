import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PaginationMetaDto } from './pagination-meta.dto';

export class ResponseOkListDto<T> {
  @IsArray()
  @ApiProperty()
  readonly data: T[];

  @ApiProperty({ type: () => PaginationMetaDto })
  readonly meta: PaginationMetaDto;

  constructor(data: T[], meta: PaginationMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
