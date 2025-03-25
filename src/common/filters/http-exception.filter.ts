import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message: string[] = [];
    let statusText = HttpStatus[status] || 'Unknown Error';

    if (typeof exceptionResponse === 'string') {
      message = [exceptionResponse];
    } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const responseObj = exceptionResponse as Record<string, any>;

      if (Array.isArray(responseObj.message)) {
        message = responseObj.message;
      } else if (typeof responseObj.message === 'string') {
        message = [responseObj.message];
      }

      if (typeof responseObj.error === 'string') {
        statusText = responseObj.error;
      }
    }

    const formattedStatus = statusText
      .toLowerCase()
      .replace(/_/g, ' ') 
      .replace(/\b\w/g, (char) => char.toUpperCase());

    response.status(status).json({
      message,
      status: formattedStatus,
      statusCode: status,
    });
  }
  
}
