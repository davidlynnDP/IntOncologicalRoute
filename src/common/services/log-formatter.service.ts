import { Injectable, Logger } from '@nestjs/common';

interface LogOptions {
  logIdentifier: string;
  action:        string;
  message:       string;

  statusCode?: number;
  payload?: any; //* campo opcional para capturar datos de entrada
}

@Injectable()
export class LogFormatterService  {

  private readonly originProject: string = 'OncologicalRoute (Stage)';
  private readonly logger = new Logger(LogFormatterService.name);

  /**
   * Logs a general action in the application, providing context, status code, and external identifiers.
   * @param logIdentifier - Identifier for log grouping (e.g., project or module name).
   * @param action - The name of the action being logged.
   * @param message - Additional information about the action.
   * @param statusCode - The HTTP status code associated with the action (default is 200).
   * @param serviceName - The name of the service or module logging the action.
   * @param payload - (Optional) Additional data related to the request, useful for debugging.
   */
  logAction(
    options: LogOptions
  ): void {
    const { logIdentifier, action, message, statusCode = 200, payload } = options;
    const payloadString = payload ? ` | Payload: ${JSON.stringify(payload)}` : ''; 

    this.logger.log(
      `[${this.originProject}] [${logIdentifier}]: ${action} - ${message} (StatusCode: ${statusCode})${payloadString}`
    );
  }

  /**
   * Logs an error with contextual information, including the action name, error message, status code,
   * and optional stack trace, while allowing for external identifiers.
   * @param logIdentifier - Identifier for log grouping (e.g., project or module name).
   * @param action - The action that triggered the error.
   * @param message - Describes the error or problem that occurred.
   * @param statusCode - The HTTP status code related to the error (default is 500).
   * @param stack - Optional stack trace for debugging purposes.
   * @param serviceName - The name of the service or module where the error occurred.
   * @param payload - (Optional) Additional data related to the request, useful for debugging.
   */
  logError(
    options: LogOptions
  ): void {
    const { logIdentifier, action, message, statusCode = 500, payload } = options;
    const payloadString = payload ? ` | Payload: ${JSON.stringify(payload)}` : '';

    this.logger.error(
      `[${this.originProject}] [${logIdentifier}]: ${action} - ${message} (StatusCode: ${statusCode})${payloadString}`
    );
  }
  
}
