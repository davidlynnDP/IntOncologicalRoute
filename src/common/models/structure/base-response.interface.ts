/**
 * Interfaz estándar para estructurar las respuestas de la API,
 * utilizando `message` para devolver tanto datos como errores.
 */
export interface BaseResponse<T = string[]> {
  /**
   * Contiene los datos de la respuesta o los mensajes de error.
   * - En una respuesta exitosa (statusCode 200), incluye los datos esperados como un array de objetos.
   * - En caso de error, contiene un array de mensajes descriptivos del problema.
   */
  message: T;

  /**
   * Estado de la respuesta en formato texto.
   * - Ejemplos:
   *   - `"OK"` para respuestas exitosas.
   *   - `"Not Found"`, `"Bad Request"`, `"Internal Server Error"` para errores.
   */
  status: string;

  /**
   * Código de estado HTTP que refleja el resultado de la operación.
   * - Ejemplos:
   *   - `200`: OK
   *   - `404`: Not Found
   *   - `400`: Bad Request
   *   - `500`: Internal Server Error
   */
  statusCode: number;
}
