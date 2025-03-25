import { ApiProperty } from "@nestjs/swagger";


export class MetaResponseDto {

  @ApiProperty({
    description: 'Número total de elementos disponibles.',
    example: 100,
  })
  total: number;
  
  @ApiProperty({
      description: 'Número de la página actual.',
      example: 1,
  })
  page: number;
  
  @ApiProperty({
      description: 'Última página disponible en la paginación.',
      example: 10,
  })
  lastPage: number;
  
}