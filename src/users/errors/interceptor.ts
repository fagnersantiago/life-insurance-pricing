import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserAlreadyExists } from './user-already-exists.error';
import { PasswordValidator } from './password-validator';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const response = context.switchToHttp().getResponse();

        switch (true) {
          case error instanceof UserAlreadyExists:
            response
              .status(HttpStatus.CONFLICT)
              .json(new UserAlreadyExists().getResponse());
            break;

          case error instanceof PasswordValidator:
            response
              .status(HttpStatus.NOT_FOUND)
              .json(new PasswordValidator().getResponse());
            break;

          default:
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              error: {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
              },
            });
            break;
        }

        return throwError(error);
      }),
    );
  }
}
