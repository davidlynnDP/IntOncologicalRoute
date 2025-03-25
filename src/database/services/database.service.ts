import { HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';

import { BaseResponse } from '../../common/models';
import { envs } from '../../config';
import { isAnErrorResponse } from '../../common/utils';
import { LogFormatterService } from '../../common/services/log-formatter.service';

import * as odbc from 'odbc';
// const odbc = require('odbc');

@Injectable()
export class DatabaseService implements OnModuleInit  {
  
  private logIdentifier: string = DatabaseService.name;

  constructor(
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

  async onModuleInit() {
    await this.testConnection();
  }

  async createConnection(): Promise<any | BaseResponse<string[]>> {

    const connectionString = envs.connectionString;

    try {

      const connection = await odbc.connect(connectionString);

      this.logFormatterService.logAction({
        logIdentifier: this.logIdentifier,
        action: 'createConnection',
        message: 'Conexión a Informix establecida correctamente.',
        statusCode: HttpStatus.OK,
      });

      return connection;

    } catch (error) {
      console.log(`error:`, error)
      this.logFormatterService.logError({
        logIdentifier: this.logIdentifier,
        action: 'createConnection',
        message: 'Error al conectar con Informix.',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        payload: { error: error } //! colocar en el common
      });

      const errorResponse: BaseResponse<string[]> = {
        message: ['No se pudo conectar a la base de datos.'],
        status: 'Internal Server Error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };

      return errorResponse;
    }
  }

  async getConnection(): Promise<any | BaseResponse<string[]>> {

    this.logFormatterService.logAction({
      logIdentifier: this.logIdentifier,
      action: 'getConnection',
      message: 'Intentando obtener una nueva conexión...',
      statusCode: HttpStatus.OK,
    });

    const newConnection = await this.createConnection();

    if (isAnErrorResponse(newConnection)) {
      this.logFormatterService.logError({
        logIdentifier: this.logIdentifier,
        action: 'getConnection',
        message: 'Error al obtener una nueva conexión a la base de datos.',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });

      return newConnection; 
    }

    return newConnection;
  }


  private async testConnection(): Promise<void> {
    const connection = await this.getConnection();

    if (isAnErrorResponse(connection)) {
      this.logFormatterService.logError({
        logIdentifier: this.logIdentifier,
        action: 'testConnection',
        message: 'Fallo la conexión inicial a la base de datos.',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    } else {
      this.logFormatterService.logAction({
        logIdentifier: this.logIdentifier,
        action: 'testConnection',
        message: 'Conexión inicial exitosa.',
        statusCode: HttpStatus.OK,
      });

      await connection.close();
    }
  }
  
}
