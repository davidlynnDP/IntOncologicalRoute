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

  ActivePatientByIdRequestDto,
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

  // POST http://localhost:3000/queries/ActiveById ✅
  @Post('ActiveById')
  @ApiOperation({ summary: 'Obtener paciente activo por tipo y número de identificación' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paciente activo recuperado correctamente por identificación.',
    examples: {
      OK: {
        summary: 'OK',
        value: { }, //? esto lo colocas tú manualmente
      },
      NotFound: {
        summary: 'NotFound',
        value: {
          message: ['No se encontró ningún paciente con la identificación proporcionada.'],
          status: 'Not Found',
          statusCode: 200,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'El cuerpo de la petición no es válido.',
    example: {
      message: [
        'typeOfIdentification debe ser una cadena de texto',
        'typeOfIdentification no debe estar vacío',
        'identificationNumber debe ser una cadena de texto',
        'identificationNumber no debe estar vacío',
      ],
      status: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'El token de autenticación es inválido o no fue proporcionado.',
    example: {
      message: ['Debe enviar un Token válido.'],
      status: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'El usuario no tiene permisos para acceder a este recurso.',
    example: {
      message: ['No tiene permisos para acceder a este recurso.'],
      status: 'Forbidden',
      statusCode: 403,
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno al intentar obtener el paciente activo por identificación.',
    example: {
      message: ['Hubo un error al intentar obtener el paciente activo por identificación.'],
      status: 'Internal Server Error',
      statusCode: 500,
    },
  })
  async getActivePatientById(
    @Body() dto: ActivePatientByIdRequestDto,
    @Res() res: Response
  ) {
    return await this.queriesService.getActivePatientById(dto, res);
  }

}
