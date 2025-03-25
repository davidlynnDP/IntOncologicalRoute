import { 
  Controller, 
  Post, 
  Body, 
  Res, 
  HttpStatus 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { QueriesService } from '../services/queries.service';

import { 
  DateTimeRangeRequestDto,
} from '../dto';

//? http://localhost:3000/queries ✅
@ApiTags('Queries')
@Controller('queries')
export class QueriesController {

  constructor(
    private readonly queriesService: QueriesService
  ) { }

  //? Obtener citas canceladas ✅
  // POST http://localhost:3000/queries/patient-appointments/canceled ✅
  @Post('patient-appointments/canceled')
  @ApiOperation({ 
    summary: 'Obtener citas canceladas en un rango de fechas.' 
  })
  @ApiBody({ 
    description: 'Rango de fechas para filtrar las citas canceladas.', 
    type: DateTimeRangeRequestDto 
  })
  @ApiResponse({ 
    status: HttpStatus.OK,
    description: 'Listado de citas canceladas.',
    examples: {
      OK: {
        summary: 'OK',
        value: {
          "message": [
            {

            }
          ],
          "status": "OK",
          "statusCode": 200
        }
      },
      NotFound: {
        summary: 'NotFound',
        value: {
          "message": ["No se encontraron citas canceladas en el rango de fechas proporcionado."],
          "status": "Not Found",
          "statusCode": 200
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error inesperado al recuperar las citas canceladas.',
    example: {
      message: ['Error inesperado al recuperar las citas canceladas.'],
      status: 'Internal Server Error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    },
  })
  async getPatientAppointmentsWithCanceledStatus(
    @Body() dto: DateTimeRangeRequestDto,
    @Res() res: Response
  ) {
    return await this.queriesService.getPatientAppointmentsWithCanceledStatus(dto, res);
  }

  //? Obtener citas con estado diferente a cancelado ✅
  // POST http://localhost:3000/queries/patient-appointments/other-than-canceled ✅
  @Post('patient-appointments/other-than-canceled')
  @ApiOperation({ 
    summary: 'Obtener citas con estado diferente a cancelado en un rango de fechas.' 
  })
  @ApiBody({ 
    description: 'Rango de fechas para filtrar las citas.', 
    type: DateTimeRangeRequestDto 
  })
  @ApiResponse({ 
    status: HttpStatus.OK,
    description: 'Listado de citas con estado diferente a cancelado.',
    examples: {
      OK: {
        summary: 'OK',
        value: {
          "message": [
            {

            }
          ],
          "status": "OK",
          "statusCode": 200
        }
      },
      NotFound: {
        summary: 'NotFound',
        value: {
          "message": ["No se encontraron citas con estado diferente a cancelado en el rango de fechas proporcionado."],
          "status": "Not Found",
          "statusCode": 200
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error inesperado al recuperar las citas con estado diferente a cancelado.',
    example: {
      message: ['Error inesperado al recuperar las citas con estado diferente a cancelado.'],
      status: 'Internal Server Error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    },
  })
  async getPatientAppointmentsWithStatusOtherThanCanceled(
    @Body() dto: DateTimeRangeRequestDto,
    @Res() res: Response
  ) {
    return await this.queriesService.getPatientAppointmentsWithStatusOtherThanCanceled(dto, res);
  }

}
