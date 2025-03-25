import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

interface Ranges {
  min: number;
  max: number;
}

@ValidatorConstraint({ async: false })
export class IsValidStatusCode implements ValidatorConstraintInterface {

  validate(value: number, validationArguments?: ValidationArguments): boolean {
    // Rango de códigos de estado válidos según las clases de respuesta HTTP
    const validRanges: Ranges[] = [
      { min: 100, max: 199 },  // Informativos
      { min: 200, max: 299 },  // Satisfactorios
      { min: 300, max: 399 },  // Redirecciones
      { min: 400, max: 499 },  // Errores del cliente
      { min: 500, max: 599 },  // Errores del servidor
    ];

    // Verificar si el código de estado está dentro de los rangos válidos
    return validRanges.some(range => value >= range.min && value <= range.max);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'The statusCode must be within the valid HTTP ranges (100-599)';
  }
}
