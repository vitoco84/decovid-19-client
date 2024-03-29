import {Component} from '@angular/core';
import {HcertService} from '../../service/hcert.service';
import {ErrorHandlerService} from '../../service/error-handler.service';
import {ClientCommunication} from '../../server/clientCommunication';

@Component({
  selector: 'app-url-data',
  templateUrl: './url.component.html'
})
export class UrlComponent {
  private static IMAGE_BASE_64_PNG = 'data:image/png;base64,';

  urlQrCodeResponse: string | undefined;

  constructor(private hcertService: HcertService, public errorHandlerService: ErrorHandlerService) {}

  createURLQRCode(urlInput: string): void {
    if (urlInput) {
      const qrCodeServerRequest: ClientCommunication.QRCodeServerRequest = {
        url: urlInput
      };
      this.hcertService.createURLQRCode(qrCodeServerRequest).subscribe({
        error: err => {
          this.errorHandlerService.cleanupErrors();
          this.errorHandlerService.setErrors(err);
          this.urlQrCodeResponse = '';
        },
        next: res => {
          this.errorHandlerService.cleanupErrors();
          this.urlQrCodeResponse = UrlComponent.IMAGE_BASE_64_PNG + res;
        }
      });
    }
  }
}
