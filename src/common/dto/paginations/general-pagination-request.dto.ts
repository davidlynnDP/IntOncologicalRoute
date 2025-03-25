import { IsInt, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GeneralPaginationDto {

  @IsPositive()
  @IsInt()
  @Min(1, { message: 'El número de página debe ser al menos 1.' })
  @Type(() => Number)
  page: number = 1;

  @IsPositive()
  @IsInt()
  @Min(1, { message: 'El límite debe ser al menos 1.' })
  @Type(() => Number)
  limit: number = 10;
  
}

