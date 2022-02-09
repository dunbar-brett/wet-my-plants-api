// import { Language } from 'typeorm/entities/users/types';

// import { JwtPayload } from '../JwtPayload';
export {};

declare global {
  namespace Express {
    // export interface Request {
    //   jwtPayload: JwtPayload;
    //   language: Language;
    // }
    export interface Response {
      customSuccess(httpStatusCode: number, message: string, data?: any): Response;
    }
  }
}