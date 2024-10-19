import { ApiProperty } from '@nestjs/swagger';

export class DataResponseFormat<T> {
  @ApiProperty()
  total!: number;
  @ApiProperty({ isArray: true })
  items!: T[];
}
