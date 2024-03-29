import {Component, ElementRef} from '@angular/core';
import {HcertService} from '../../service/hcert.service';
import {ClientCommunication} from '../../server/clientCommunication';
import {ErrorHandlerService} from '../../service/error-handler.service';

@Component({
  selector: 'app-hcert-json',
  templateUrl: './hcert.component.html',
  styleUrls: ['./hcert.component.css']
})
export class HcertComponent {
  VACCINATION = 'Vaccination';
  RECOVERY = 'Recovery';
  TESTING = 'Test';
  bearerToken: string;
  hcertPrefix: string;

  hcertServerResponse: ClientCommunication.HcertServerResponse;
  hcertServerResponseJson: string;
  hcertVerificationServerResponse: ClientCommunication.HcertVerificationServerResponse;
  hcertVerificationServerResponseJson: string;
  hcertServerResponseContent: ClientCommunication.HcertContentDTO;
  isSwitched = false;
  certificateType: string;
  imgSrc: string;

  constructor(private hcertService: HcertService, public errorHandlerService: ErrorHandlerService, public element: ElementRef) {}

  cleanupErrors() {
    this.errorHandlerService.cleanupErrors();
  }

  decodeHealthCertificateContentFromFile(event): void {
    const file: File = event.target.files[0];
    this.readURL(event);
    if (file) {
      this.hcertService.decodeHealthCertificateContentFromFile(file).subscribe(this.handleServerResponse(null));
    }
  }

  decodeHealthCertificateContentFromPrefix(hcertPrefixInput: string): void {
    if (hcertPrefixInput) {
      const hcertServerRequest: ClientCommunication.HcertServerRequest = {
        hcertPrefix: hcertPrefixInput
      };
      this.hcertService.decodeHealthCertificateContentFromPrefix(hcertServerRequest).subscribe(this.handleServerResponse(hcertPrefixInput));
    }
  }

  private handleServerResponse(hcertPrefixInput: string) {
    return {
      error: err => {
        this.errorHandlerService.cleanupErrors();
        this.errorHandlerService.setErrors(err);
        this.resetHcertServerResponse();
      },
      next: res => {
        this.setHcertServerResponse(res);
        this.hcertVerificationServerResponse = null;
        if (hcertPrefixInput) {
          this.imgSrc = '';
        }
        this.bearerToken = '';
      }
    };
  }

  private readURL(event) {
    if (event.target.files && event.target.files[0]) {
      this.hcertPrefix = '';
      const reader = new FileReader();
      reader.onload = e => {
        this.imgSrc = e.target.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  private resetHcertServerResponse(): void {
    this.hcertServerResponse = null;
    this.hcertVerificationServerResponse = null;
    this.hcertServerResponseJson = '';
  }

  private setHcertServerResponse(res: ClientCommunication.HcertServerResponse): void {
    this.errorHandlerService.cleanupErrors();
    this.hcertServerResponse = res;
    this.hcertServerResponseJson = JSON.stringify(this.hcertServerResponse, null, 2);
    this.setCertificateType();
    this.scrollToHcertServerResponse();
  }

  private scrollToHcertServerResponse(): void {
    const container = this.element.nativeElement.querySelector('#targetHcertServerResponse');
    const boundingClientRect = container.getBoundingClientRect();
    document.body.scrollTop = boundingClientRect.y;
    document.documentElement.scrollTop = boundingClientRect.y;
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
            this.resetHcerVerificationServerResponse(err);
          },
          next: res => {
            this.setHcertVerificationServerResponse(res);
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
          this.resetHcerVerificationServerResponse(err);
        },
        next: res => {
          this.setHcertVerificationServerResponse(res);
        }
      });
    }
  }

  private resetHcerVerificationServerResponse(err): void {
    this.errorHandlerService.cleanupErrors();
    this.errorHandlerService.setErrors(err);
    this.hcertVerificationServerResponse = null;
    this.hcertVerificationServerResponseJson = '';
  }

  private setHcertVerificationServerResponse(res: ClientCommunication.HcertVerificationServerResponse): void {
    this.errorHandlerService.cleanupErrors();
    this.hcertVerificationServerResponse = res;
    this.hcertVerificationServerResponseJson = JSON.stringify(this.hcertVerificationServerResponse, null, 2);
    this.scrollToHcertVerificationServerResponse();
  }

  private scrollToHcertVerificationServerResponse(): void {
    const container = this.element.nativeElement.querySelector('#targetHcertVerificationServerResponse');
    const boundingClientRect = container.getBoundingClientRect();
    document.body.scrollTop = boundingClientRect.y;
    document.documentElement.scrollTop = boundingClientRect.y;
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
