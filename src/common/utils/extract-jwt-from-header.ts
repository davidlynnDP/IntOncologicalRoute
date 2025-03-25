import { Request } from 'express';

export const extractJwtFromHeader = (request: Request): string | undefined => {

  const [type, token] = request.headers['authorization']?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}