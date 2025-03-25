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
      // this.commonService.logAction({
      //   logIdentifier: this.logIdentifier,
      //   action: 'onModuleInit',
      //   message: 'UsersService module initialized and connected to database',
      //   serviceName: this.serviceName,
      //   statusCode: 200,
      // });

      //catch
      // commonService.logError({
      //   logIdentifier: this.logIdentifier,
      //   action: 'updatePatient',
      //   message: 'Failed to update patient record',
      //   statusCode: 500,
      //   stack: error.stack,
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
      this.logFormatterService.logError({
        logIdentifier: this.logIdentifier,
        action: 'createConnection',
        message: 'Error al conectar con Informix.',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
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
