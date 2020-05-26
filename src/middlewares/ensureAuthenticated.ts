import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AuthConfig from '../config/auth';

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticatedUser(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const [type, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, AuthConfig.jwt.secret);
    const { sub } = decoded as TokenPayLoad;

    request.user = { id: sub };

    return next();
  } catch (err) {
    throw new Error('Invalid JWT token');
  }
}
