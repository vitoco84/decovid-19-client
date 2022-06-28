import {Component} from '@angular/core';
import {ClientCommunication} from '../../server/clientCommunication';
import {HcertService} from '../../service/hcert.service';
import {ErrorHandlerService} from '../../service/error-handler.service';

@Component({
  selector: 'app-pem-data',
  templateUrl: './pem-data.component.html'
})
export class PemDataComponent {
  pemCertServerResponse: ClientCommunication.PEMCertServerResponse;

  constructor(private hcertService: HcertService, public errorHandlerService: ErrorHandlerService) {}

  decodeX509Certificate(pemInput: string): void {
    if (pemInput) {
      const pemCertServRequest: ClientCommunication.PEMCertServerRequest = {
        pemCertificate: pemInput
      };
      this.hcertService.decodeX509Certificate(pemCertServRequest).subscribe({
        error: err => {
          this.errorHandlerService.setErrors(err);
        },
        next: res => {
          this.errorHandlerService.cleanupErrors();
          this.pemCertServerResponse = res;
        }
      });
    }
  }
}
