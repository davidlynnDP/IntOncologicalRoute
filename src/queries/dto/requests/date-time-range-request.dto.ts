import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class DateTimeRangeRequestDto {
  @ApiProperty({
    description: 'Fecha y hora de inicio en formato YYYY-MM-DD HH:mm:ss',
    example: '2024-01-01 00:00:00',
  })
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, {
    message: 'startTime debe estar en formato YYYY-MM-DD HH:mm:ss',
  })
  startTime: string;

  @ApiProperty({
    description: 'Fecha y hora de fin en formato YYYY-MM-DD HH:mm:ss',
    example: '2024-01-01 23:59:59',
  })
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, {
    message: 'endTime debe estar en formato YYYY-MM-DD HH:mm:ss',
  })
  endTime: string;
}
