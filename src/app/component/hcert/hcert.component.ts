import {Component} from '@angular/core';
import {HcertService} from '../../service/hcert.service';
import {ClientCommunication} from '../../server/clientCommunication';
import {ErrorHandlerService} from '../../service/error-handler.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-hcert-json',
  templateUrl: './hcert.component.html'
})
export class HcertComponent {
  VACCINATION = 'Vaccination';
  RECOVERY = 'Recovery';
  TESTING = 'Test';

  hcertServerResponse: ClientCommunication.HcertServerResponse;
  hcertServerResponseJson: string;
  hcertVerificationServerResponse: ClientCommunication.HcertVerificationServerResponse;
  hcertServerResponseContent: ClientCommunication.HcertContentDTO;
  isSwitched = false;
  certificateType: string;
  imgSrc: string;

  constructor(private hcertService: HcertService, public errorHandlerService: ErrorHandlerService, private sanitizer: DomSanitizer) {}

  decodeHealthCertificateContentFromFile(event): void {
    const file: File = event.target.files[0];
    this.readURL(event);
    if (file) {
      this.hcertService.decodeHealthCertificateContentFromFile(file).subscribe(this.handleServerResponse());
    }
  }

  decodeHealthCertificateContentFromPrefix(hcertPrefixInput: string): void {
    if (hcertPrefixInput) {
      const hcertServerRequest: ClientCommunication.HcertServerRequest = {
        hcertPrefix: hcertPrefixInput
      };
      this.hcertService.decodeHealthCertificateContentFromPrefix(hcertServerRequest).subscribe(this.handleServerResponse());
    }
  }

  private handleServerResponse() {
    return {
      error: err => {
        this.errorHandlerService.cleanupErrors();
        this.errorHandlerService.setErrors(err);
        this.resetHcertServerResponse();
      },
      next: res => {
        this.setHcertServerResponse(res);
        this.hcertVerificationServerResponse = null;
      }
    };
  }

  private readURL(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        this.imgSrc = e.target.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  private resetHcertServerResponse(): void {
    this.hcertServerResponse = null;
    this.hcertServerResponseJson = '';
  }

  private setHcertServerResponse(res: ClientCommunication.HcertServerResponse): void {
    this.errorHandlerService.cleanupErrors();
    this.hcertServerResponse = res;
    this.hcertServerResponseJson = JSON.stringify(this.hcertServerResponse, null, 2);
    this.setCertificateType();
  }

  verifySwissHealthCertificate(bearerTokenInput: string): void {
    if (bearerTokenInput) {
      if (this.hcertServerResponse) {
        const hcertVerificationServerRequest: ClientCommunication.HcertVerificationServerRequest = {
          bearerToken: bearerTokenInput,
          keyId: this.hcertServerResponse.hcertKID,
          hcertPrefix: this.hcertServerResponse.hcertPrefix
        };
        this.hcertService.verifyHealthCertificate(hcertVerificationServerRequest).subscribe({
          error: err => {
            this.errorHandlerService.cleanupErrors();
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

  verifyHealthCertificate(): void {
    if (this.hcertServerResponse) {
      const hcertVerificationServerRequest: ClientCommunication.HcertVerificationServerRequest = {
        bearerToken: '',
        keyId: this.hcertServerResponse.hcertKID,
        hcertPrefix: this.hcertServerResponse.hcertPrefix
      };
      this.hcertService.verifyHealthCertificate(hcertVerificationServerRequest).subscribe({
        error: err => {
          this.errorHandlerService.cleanupErrors();
          this.errorHandlerService.setErrors(err);
        },
        next: res => {
          this.errorHandlerService.cleanupErrors();
          this.hcertVerificationServerResponse = res;
        }
      });
    }
  }

  private setCertificateType(): void {
    if (this.hcertServerResponse) {
      this.hcertServerResponseContent = this.hcertServerResponse.hcertContent as ClientCommunication.HcertContentDTO;
      if (this.hcertServerResponseContent.v) {
        this.certificateType = this.VACCINATION;
      }
      if (this.hcertServerResponseContent.r) {
        this.certificateType = this.RECOVERY;
      }
      if (this.hcertServerResponseContent.t) {
        this.certificateType = this.TESTING;
      }
    }
  }

  switchView(): void {
    this.isSwitched = !this.isSwitched;
  }
}
