import {Component} from '@angular/core';
import {Decovid19Service} from '../../service/decovid19.service';
import {PemCertServerRequest} from '../../server/pemCertServerRequest';
import {PEMCertServerResponse} from '../../server/pemCertServerResponse';
import {HcertServerResponse} from '../../server/hcertServerResponse';
import {HcertServerRequest} from '../../server/hcertServerRequest';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'app-hcert-json',
  templateUrl: './hcert-json.component.html',
  styleUrls: ['./hcert-json.component.css']
})
export class HcertJsonComponent {
  private static BAD_REQUEST = 'BAD REQUEST';

  pemCertServerResponse: PEMCertServerResponse;
  hcertServerResponse: HcertServerResponse;
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
      const hcertServerRequest: HcertServerRequest = {
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
      const pemCertServRequest: PemCertServerRequest = {
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
