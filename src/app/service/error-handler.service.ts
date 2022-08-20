import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpStatusCode} from '@angular/common/http';
import {ClientCommunication} from '../server/clientCommunication';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private static BAD_REQUEST = 'BAD REQUEST';
  private static OBJECT = 'object';

  httpErrorResponse: HttpErrorResponse;
  error: string | undefined;
  errorMessage: string | undefined;
  validationErrorServerResponse: ClientCommunication.ValidationErrorServerResponse;

  setErrors(err: any): void {
    if (err.status === HttpStatusCode.InternalServerError) {
      this.error = err.error.error;
      this.errorMessage = err.error.message;
      this.httpErrorResponse = JSON.parse(err.error);
    }
    if (err.status === HttpStatusCode.BadRequest) {
      if (typeof err.error === ErrorHandlerService.OBJECT) {
        this.validationErrorServerResponse = err.error;
      } else {
        this.validationErrorServerResponse = JSON.parse(err.error);
      }
      this.error = ErrorHandlerService.BAD_REQUEST;
    }
  }

  cleanupErrors(): void {
    this.error = '';
    this.errorMessage = '';
    this.validationErrorServerResponse = null;
    this.httpErrorResponse = null;
  }
}
