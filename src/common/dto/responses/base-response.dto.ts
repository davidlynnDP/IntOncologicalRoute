import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Validate } from 'class-validator';

import { IsValidStatusCode } from '../../../common/validators';


export class BaseResponseDto<T = string[]> {
  
  @ApiProperty({
    description: 'Datos de la respuesta o mensajes de error',
    type: 'array',
    isArray: true
  })
  message: T;

  @ApiProperty({
    description: 'Estado de la respuesta en formato texto',
    example: 'OK'
  })
  status: string;

  @IsInt()
  @Validate(IsValidStatusCode)
  @ApiProperty({
    description: 'Código de estado HTTP de la respuesta',
    example: 200
  })
  statusCode: number;
}
