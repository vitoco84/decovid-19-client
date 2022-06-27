import {Component} from '@angular/core';
import {ClientCommunication} from '../../server/clientCommunication';
import {Decovid19Service} from '../../service/decovid19.service';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'app-pem-data',
  templateUrl: './pem-data.component.html'
})
export class PemDataComponent {
  private static BAD_REQUEST = 'BAD REQUEST';

  pemCertServerResponse: ClientCommunication.PEMCertServerResponse;
  error: string | undefined;
  errorMessage: string | undefined;
  validationErrorServerResponse: ClientCommunication.ValidationErrorServerResponse;

  constructor(private decovid19Service: Decovid19Service) {}

  decodeX509Certificate(pemInput: string): void {
    if (pemInput) {
      const pemCertServRequest: ClientCommunication.PEMCertServerRequest = {
        pemCertificate: pemInput
      };
      this.decovid19Service.decodeX509Certificate(pemCertServRequest).subscribe({
        error: err => {
          this.setErrors(err);
        },
        next: res => {
          this.cleanupErrors();
          this.pemCertServerResponse = res;
        }
      });
    }
  }

  private setErrors(err: any): void {
    if (err.status === HttpStatusCode.InternalServerError) {
      this.error = err.error.error;
      this.errorMessage = err.error.message;
    }
    if (err.status === HttpStatusCode.BadRequest) {
      this.validationErrorServerResponse = err.error;
      this.errorMessage = PemDataComponent.BAD_REQUEST;
    }
  }

  private cleanupErrors(): void {
    this.error = '';
    this.errorMessage = '';
    this.validationErrorServerResponse = null;
  }
}
