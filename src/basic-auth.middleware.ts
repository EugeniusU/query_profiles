import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { timingSafeEqual } from 'node:crypto';

@Injectable()
export class BasicAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const AUTH_PREFIX = 'Basic';

    if (!authHeader?.startsWith(AUTH_PREFIX)) {
      sendRejectAuth(res, 'Authentication required');
    }

    const authStr = authHeader!.replace(AUTH_PREFIX, '');
    let decodedAuthStr = '';

    try {
      decodedAuthStr = Buffer.from(authStr, 'base64').toString('utf-8');
    } catch (e) {
      console.error(e);

      sendRejectAuth(res, 'Authentication required');
    }

    const authPair = decodedAuthStr.split(':');
    const [user, pass] = authPair;

    const requiredUser = process.env.AUTH_USERNAME;
    const requiredPass = process.env.AUTH_PASSWORD;

    if (!requiredUser || !requiredPass) {
      console.error('Set auth pair to .env');

      sendRejectAuth(res, 'Authentication required');
    }

    if (
      !user ||
      !pass ||
      !isEqualAuth(user, requiredUser!) ||
      !isEqualAuth(pass, requiredPass!)
    ) {
      sendRejectAuth(res, 'Wrong auth data');
    }

    next();
  }
}

function isEqualAuth(s1: string, s2: string) {
  const b1 = Buffer.from(s1, 'utf-8');
  const b2 = Buffer.from(s2, 'utf-8');

  if (b1.length !== b2.length) {
    return false;
  }

  return timingSafeEqual(b1, b2);
}

function sendRejectAuth(res: Response, errorMessage: string) {
  res.setHeader('WWW-Authenticate', "Basic realm='Auth'");
  throw new UnauthorizedException(errorMessage);
}
