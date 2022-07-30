import {Component} from '@angular/core';
import {HcertService} from '../../service/hcert.service';
import {ClientCommunication} from '../../server/clientCommunication';
import {ErrorHandlerService} from '../../service/error-handler.service';

@Component({
  selector: 'app-hcert-json',
  templateUrl: './hcert.component.html'
})
export class HcertComponent {
  hcertServerResponse: ClientCommunication.HcertServerResponse;
  hcertServerResponseJson: string;
  hcertVerificationServerResponse: ClientCommunication.HcertVerificationServerResponse;

  constructor(private hcertService: HcertService, public errorHandlerService: ErrorHandlerService) {}

  decodeHealthCertificateContentFromFile(event): void {
    const file: File = event.target.files[0];
    if (file) {
      this.hcertService.decodeHealthCertificateContentFromFile(file).subscribe({
        error: err => {
          this.errorHandlerService.setErrors(err);
        },
        next: res => {
          this.setHcertServerResponse(res);
        }
      });
    }
  }

  decodeHealthCertificateContentFromPrefix(hcertPrefixInput: string): void {
    if (hcertPrefixInput) {
      const hcertServerRequest: ClientCommunication.HcertServerRequest = {
        hcertPrefix: hcertPrefixInput
      };
      this.hcertService.decodeHealthCertificateContentFromPrefix(hcertServerRequest).subscribe({
        error: err => {
          this.errorHandlerService.setErrors(err);
        },
        next: res => {
          this.setHcertServerResponse(res);
        }
      });
    }
  }

  private setHcertServerResponse(res: ClientCommunication.HcertServerResponse): void {
    this.errorHandlerService.cleanupErrors();
    this.hcertServerResponse = res;
    this.hcertServerResponseJson = JSON.stringify(this.hcertServerResponse, null, 2);
  }

  verifyHealthCertificate(): void {
    if (this.hcertServerResponse) {
      const hcertVerificationServerRequest: ClientCommunication.HcertVerificationServerRequest = {
        bearerToken: '',
        keyId: this.hcertServerResponse.hcertKID,
        hcertPrefix: this.hcertServerResponse.hcertPrefix
      };
      this.hcertService.verifyHealthCertificate(hcertVerificationServerRequest).subscribe({
        error: err => {
          this.errorHandlerService.setErrors(err);
        },
        next: res => {
          this.errorHandlerService.cleanupErrors();
          this.hcertVerificationServerResponse = res;
        }
      });
    }
  }
}
