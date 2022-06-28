import {Component} from '@angular/core';
import {HcertService} from '../../service/hcert.service';
import {ErrorHandlerService} from '../../service/error-handler.service';
import {ClientCommunication} from '../../server/clientCommunication';

@Component({
  selector: 'app-url-data',
  templateUrl: './url-data.component.html'
})
export class UrlDataComponent {
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
          this.errorHandlerService.setErrors(err);
        },
        next: res => {
          this.errorHandlerService.cleanupErrors();
          this.urlQrCodeResponse = UrlDataComponent.IMAGE_BASE_64_PNG + res;
        }
      });
    }
  }
}
