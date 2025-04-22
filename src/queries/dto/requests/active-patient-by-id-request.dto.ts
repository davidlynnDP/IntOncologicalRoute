import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ActivePatientByIdRequestDto {
  @ApiProperty({
    description: 'Tipo de identificación del paciente (Ej: CC, TI, etc.)',
    example: 'CC',
  })
  @IsNotEmpty({ message: 'El tipo de identificación es obligatorio' })
  @IsString({ message: 'El tipo de identificación debe ser una cadena de texto' })
  typeOfIdentification: string;

  @ApiProperty({
    description: 'Número de identificación del paciente',
    example: '4274261',
  })
  @IsNotEmpty({ message: 'El número de identificación es obligatorio' })
  @IsString({ message: 'El número de identificación debe ser una cadena de texto' })
  identificationNumber: string;
}
