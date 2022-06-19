import {Component} from '@angular/core';
import {Decovid19Service} from '../../service/decovid19.service';
import {HttpStatusCode} from '@angular/common/http';
import {ClientCommunication} from '../../server/clientCommunication';

@Component({
  selector: 'app-hcert-json',
  templateUrl: './hcert-json.component.html'
})
export class HcertJsonComponent {
  private static BAD_REQUEST = 'BAD REQUEST';

  pemCertServerResponse: ClientCommunication.PEMCertServerResponse;
  hcertServerResponse: ClientCommunication.HcertServerResponse;
  hcertVerificationServerResponse: ClientCommunication.HcertVerificationServerResponse;
  error: string | undefined;
  errorMessage: string | undefined;

  constructor(private decovid19Service: Decovid19Service) {}

  getHealthCertificateContentFromFile(event): void {
    const file: File = event.target.files[0];
    if (file) {
      this.decovid19Service.getHealthCertificateContentFromFile(file).subscribe({
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

  getHealthCertificateContentFromPrefix(hcertPrefixInput: string): void {
    if (hcertPrefixInput) {
      const hcertServerRequest: ClientCommunication.HcertServerRequest = {
        hcertPrefix: hcertPrefixInput
      };
      this.decovid19Service.getHealthCertificateContentFromPrefix(hcertServerRequest).subscribe({
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

  getX509Certificate(pemInput: string): void {
    if (pemInput) {
      const pemCertServRequest: ClientCommunication.PEMCertServerRequest = {
        pemCertificate: pemInput
      };
      this.decovid19Service.getX509Certificate(pemCertServRequest).subscribe({
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

  getVerification(): void {
    if (this.hcertServerResponse) {
      const hcertVerificationServerRequest: ClientCommunication.HcertVerificationServerRequest = {
        bearerToken: '',
        keyId: this.hcertServerResponse.hcertKID,
        hcertPrefix: this.hcertServerResponse.hcertPrefix
      };
      this.decovid19Service.getVerification(hcertVerificationServerRequest).subscribe({
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
      this.errorMessage = HcertJsonComponent.BAD_REQUEST;
    }
  }

  private cleanupErrors(): void {
    this.error = '';
    this.errorMessage = '';
  }
}
