import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';

import { BaseResponse } from '../../common/models';
import { DatabaseService } from '../../database/services/database.service';
import { isAnErrorResponse, isNonEmptyArray } from '../../common/utils';
import { LogFormatterService } from '../../common/services/log-formatter.service';

import { 
  IPatientAppointment,
} from '../models';

import { 
  sqlPatientAppointmentsWithCanceledStatus,
  sqlPatientAppointmentsWithStatusOtherThanCanceled,
} from "../sql"

import { 
  DateTimeRangeRequestDto,
} from '../dto';

type PatientAppointmentsResponse = Response<
  BaseResponse<string[]> | BaseResponse<IPatientAppointment[]>
>;

@Injectable()
export class QueriesService {

  private logIdentifier: string = QueriesService.name;

  constructor(
    private readonly databaseService: DatabaseService,

    private readonly logFormatterService: LogFormatterService
    //examples
    //info
    // this.logFormatterService.logAction({
    //   logIdentifier: this.logIdentifier,
    //   action: 'onModuleInit',
    //   message: 'Módulo UsersService inicializado y conectado a la base de datos', //? en español
    //   serviceName: this.serviceName,
    //   statusCode: HttpStatus.OK, //?siempre usar la enumeracion de HttpStatus
    // });

    // this.logFormatterService.logAction({
    //   logIdentifier: this.logIdentifier,
    //   action: 'getLocationsByService',
    //   message: 'Iniciando consulta de ubicaciones por servicio.', //? en español
    //   serviceName: this.serviceName,
    //   statusCode: HttpStatus.OK, //?siempre usar la enumeracion de HttpStatus
    //   payload: { dto: dto }, //?siempre ser lo mas explicito en los objetos del payload
    // });

    // this.logFormatterService.logAction({
    //   logIdentifier: this.logIdentifier,
    //   action: 'getLocationsByService',
    //   message: 'Ejecutando consulta de ubicaciones por servicio.', //? en español
    //   serviceName: this.serviceName,
    //   statusCode: HttpStatus.OK, //?siempre usar la enumeracion de HttpStatus
    //   payload: { query: SQL_LOCATIONS_BY_SERVICE, params: params }, //?siempre ser lo mas explicito en los objetos del payload
    // });

    //error
    //?si es necesario, las mismas consideraciones de info, se aplican a cualquier clase de error debido a que se maneja la misma estrcutra para ambos metodos
    // this.logFormatterService.logError({
    //   logIdentifier: this.logIdentifier,
    //   action: 'updatePatient',
    //   message: 'No se pudo actualizar el registro de la paciente', //? en español
    //   statusCode: HttpStatus.INTERNAL_SERVER_ERROR, //?siempre usar la enumeracion de HttpStatus
    //   stack: error.stack, //?solo poner cuando se esta en el bloque del catch
    //   serviceName: this.serviceName
    // });
  ) { }

  async getPatientAppointmentsWithStatusOtherThanCanceled(
    dto: DateTimeRangeRequestDto,
    res: Response
  ): Promise<PatientAppointmentsResponse> {
  
    let connection: any;
    let query: string;
    let params: string[];
  
    const { startTime, endTime } = dto;
  
    this.logFormatterService.logAction({
      logIdentifier: this.logIdentifier,
      action: 'getPatientAppointmentsWithStatusOtherThanCanceled',
      message: `Iniciando consulta de citas con estado distinto a cancelado entre ${startTime} y ${endTime}.`,
      statusCode: HttpStatus.OK,
      payload: { dto: dto },
    });
  
    try {

      query = sqlPatientAppointmentsWithStatusOtherThanCanceled({ startTime, endTime });
      params = [];
  
      this.logFormatterService.logAction({
        logIdentifier: this.logIdentifier,
        action: 'getPatientAppointmentsWithStatusOtherThanCanceled',
        message: 'Ejecutando consulta SQL para obtener citas con estado diferente a cancelado.',
        statusCode: HttpStatus.OK,
        payload: { query: query },
      });
  
      connection = await this.databaseService.getConnection();
  
      if (isAnErrorResponse(connection)) {
        this.logFormatterService.logError({
          logIdentifier: this.logIdentifier,
          action: 'getPatientAppointmentsWithStatusOtherThanCanceled',
          message: 'Error: No se pudo obtener una conexión válida a la base de datos.',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        });
  
        const connectionErrorResponse: BaseResponse<string[]> = {
          message: ['Error interno: No se pudo establecer la conexión con la base de datos.'],
          status: 'Internal Server Error',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        };
  
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(connectionErrorResponse);
      }
  
      const result: IPatientAppointment[] = await connection.query(query, params);
  
      if (!isNonEmptyArray(result)) {
        this.logFormatterService.logAction({
          logIdentifier: this.logIdentifier,
          action: 'getPatientAppointmentsWithStatusOtherThanCanceled',
          message: `No se encontraron citas con estado distinto a cancelado entre ${startTime} y ${endTime}.`,
          statusCode: HttpStatus.OK,
        });
  
        const noDataResponse: BaseResponse<string[]> = {
          message: [`No se encontraron citas con estado distinto a cancelado entre ${startTime} y ${endTime}.`],
          status: 'Not Found',
          statusCode: HttpStatus.OK,
        };
  
        return res.status(HttpStatus.OK).json(noDataResponse);
      }
  
      this.logFormatterService.logAction({
        logIdentifier: this.logIdentifier,
        action: 'getPatientAppointmentsWithStatusOtherThanCanceled',
        message: 'Citas con estado distinto a cancelado recuperadas correctamente.',
        statusCode: HttpStatus.OK,
        payload: { totalRecords: result.length, resultsList: result },
      });
  
      return res.status(HttpStatus.OK).json({
        message: result,
        status: 'OK',
        statusCode: HttpStatus.OK,
      });
  
    } catch (error) {
      console.log(`error:`, error)
      this.logFormatterService.logError({
        logIdentifier: this.logIdentifier,
        action: 'getPatientAppointmentsWithStatusOtherThanCanceled',
        message: `Error en consulta de citas: ${error.message}`,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        payload: { query: query!, connection: connection, error: error },
      });
  
      const unexpectedErrorResponse: BaseResponse<string[]> = {
        message: [`Error en consulta de citas: ${error.message}`],
        status: 'Internal Server Error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
  
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(unexpectedErrorResponse);
  
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  async getPatientAppointmentsWithCanceledStatus(
    dto: DateTimeRangeRequestDto,
    res: Response
  ): Promise<PatientAppointmentsResponse> {
  
    let connection: any;
    let query: string;
    let params: string[];
  
    const { startTime, endTime } = dto;
  
    this.logFormatterService.logAction({
      logIdentifier: this.logIdentifier,
      action: 'getPatientAppointmentsWithCanceledStatus',
      message: `Iniciando consulta de citas canceladas entre ${startTime} y ${endTime}.`,
      statusCode: HttpStatus.OK,
      payload: { dto: dto },
    });
  
    try {

      query = sqlPatientAppointmentsWithCanceledStatus({ startTime, endTime });
      params = [];
  
      this.logFormatterService.logAction({
        logIdentifier: this.logIdentifier,
        action: 'getPatientAppointmentsWithCanceledStatus',
        message: 'Ejecutando consulta SQL para obtener citas canceladas.',
        statusCode: HttpStatus.OK,
        payload: { query: query },
      });
  
      connection = await this.databaseService.getConnection();
  
      if (isAnErrorResponse(connection)) {
        this.logFormatterService.logError({
          logIdentifier: this.logIdentifier,
          action: 'getPatientAppointmentsWithCanceledStatus',
          message: 'Error: No se pudo obtener una conexión válida a la base de datos.',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        });
  
        const connectionErrorResponse: BaseResponse<string[]> = {
          message: ['Error interno: No se pudo establecer la conexión con la base de datos.'],
          status: 'Internal Server Error',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        };
  
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(connectionErrorResponse);
      }
  
      const result: IPatientAppointment[] = await connection.query(query, params);
  
      if (!isNonEmptyArray(result)) {
        this.logFormatterService.logAction({
          logIdentifier: this.logIdentifier,
          action: 'getPatientAppointmentsWithCanceledStatus',
          message: `No se encontraron citas canceladas entre ${startTime} y ${endTime}.`,
          statusCode: HttpStatus.OK,
        });
  
        const noDataResponse: BaseResponse<string[]> = {
          message: [`No se encontraron citas canceladas entre ${startTime} y ${endTime}.`],
          status: 'Not Found',
          statusCode: HttpStatus.OK,
        };
  
        return res.status(HttpStatus.OK).json(noDataResponse);
      }
  
      this.logFormatterService.logAction({
        logIdentifier: this.logIdentifier,
        action: 'getPatientAppointmentsWithCanceledStatus',
        message: 'Citas canceladas recuperadas correctamente.',
        statusCode: HttpStatus.OK,
        payload: { totalRecords: result.length, resultsList: result },
      });
  
      return res.status(HttpStatus.OK).json({
        message: result,
        status: 'OK',
        statusCode: HttpStatus.OK,
      });
  
    } catch (error) {
      console.log(`error:`, error)
      this.logFormatterService.logError({
        logIdentifier: this.logIdentifier,
        action: 'getPatientAppointmentsWithCanceledStatus',
        message: `Error en consulta de citas canceladas: ${error.message}`,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        payload: { query: query!, connection: connection, error: error },
      });
  
      const unexpectedErrorResponse: BaseResponse<string[]> = {
        message: [`Error en consulta de citas canceladas: ${error.message}`],
        status: 'Internal Server Error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
  
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(unexpectedErrorResponse);
  
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

}
