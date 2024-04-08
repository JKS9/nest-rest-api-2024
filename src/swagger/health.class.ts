import { ApiProperty } from '@nestjs/swagger';

export class Health {
  @ApiProperty({ default: '2024-04-02T15:57:28.858Z' })
  started: Date;

  @ApiProperty({ default: '0d 0h 0m 21s' })
  upTime: string;

  @ApiProperty({ default: 200 })
  status: number;

  @ApiProperty({ default: '0.0.1' })
  version: string;
}
