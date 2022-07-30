import {Injectable} from '@angular/core';
import {HttpStatusCode} from '@angular/common/http';
import {ClientCommunication} from '../server/clientCommunication';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private static BAD_REQUEST = 'BAD REQUEST';

  error: string | undefined;
  errorMessage: string | undefined;
  validationErrorServerResponse: ClientCommunication.ValidationErrorServerResponse;

  setErrors(err: any): void {
    if (err.status === HttpStatusCode.InternalServerError) {
      this.error = err.error.error;
      this.errorMessage = err.error.message;
    }
    if (err.status === HttpStatusCode.BadRequest) {
      this.validationErrorServerResponse = err.error;
      this.errorMessage = ErrorHandlerService.BAD_REQUEST;
    }
  }

  cleanupErrors(): void {
    this.error = '';
    this.errorMessage = '';
    this.validationErrorServerResponse = null;
  }
}
