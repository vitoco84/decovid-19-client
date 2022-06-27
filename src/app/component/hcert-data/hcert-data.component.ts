import {Component} from '@angular/core';
import {Decovid19Service} from '../../service/decovid19.service';
import {HttpStatusCode} from '@angular/common/http';
import {ClientCommunication} from '../../server/clientCommunication';

@Component({
  selector: 'app-hcert-json',
  templateUrl: './hcert-data.component.html'
})
export class HcertDataComponent {
  private static BAD_REQUEST = 'BAD REQUEST';

  hcertServerResponse: ClientCommunication.HcertServerResponse;
  hcertVerificationServerResponse: ClientCommunication.HcertVerificationServerResponse;
  error: string | undefined;
  errorMessage: string | undefined;
  validationErrorServerResponse: ClientCommunication.ValidationErrorServerResponse;

  constructor(private decovid19Service: Decovid19Service) {}

  decodeHealthCertificateContentFromFile(event): void {
    const file: File = event.target.files[0];
    if (file) {
      this.decovid19Service.decodeHealthCertificateContentFromFile(file).subscribe({
        error: err => {
          this.setErrors(err);
        },
        next: res => {
          this.cleanupErrors();
          this.hcertServerResponse = res;
        }
      });
    }
  }

  decodeHealthCertificateContentFromPrefix(hcertPrefixInput: string): void {
    if (hcertPrefixInput) {
      const hcertServerRequest: ClientCommunication.HcertServerRequest = {
        hcertPrefix: hcertPrefixInput
      };
      this.decovid19Service.decodeHealthCertificateContentFromPrefix(hcertServerRequest).subscribe({
        error: err => {
          this.setErrors(err);
        },
        next: res => {
          this.cleanupErrors();
          this.hcertServerResponse = res;
        }
      });
    }
  }

  verifyHealthCertificate(): void {
    if (this.hcertServerResponse) {
      const hcertVerificationServerRequest: ClientCommunication.HcertVerificationServerRequest = {
        bearerToken: '',
        keyId: this.hcertServerResponse.hcertKID,
        hcertPrefix: this.hcertServerResponse.hcertPrefix
      };
      this.decovid19Service.verifyHealthCertificate(hcertVerificationServerRequest).subscribe({
        error: err => {
          this.setErrors(err);
        },
        next: res => {
          this.cleanupErrors();
          this.hcertVerificationServerResponse = res;
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
      this.errorMessage = HcertDataComponent.BAD_REQUEST;
    }
  }

  private cleanupErrors(): void {
    this.error = '';
    this.errorMessage = '';
    this.validationErrorServerResponse = null;
  }
}
