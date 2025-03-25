import { BaseResponse } from '../../common/models'

export const isAnErrorResponse = (object: any): object is BaseResponse<string[]> => {
  return (
    object &&
    typeof object === 'object' &&

    // Verificar que el statusCode esté en el rango de errores HTTP (400-599)
    typeof object.statusCode === 'number' &&
    object.statusCode >= 400 &&
    object.statusCode <= 599 &&

    // Verificar que message sea un array de strings (errores)
    Array.isArray(object.message) &&
    object.message.length > 0 &&
    object.message.every((msg: any) => typeof msg === 'string') &&

    // Verificar que el estado sea un string representando el tipo de error
    typeof object.status === 'string'
  );
};
