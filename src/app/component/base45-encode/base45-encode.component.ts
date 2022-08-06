import {Component} from '@angular/core';
import {HcertService} from '../../service/hcert.service';
import {ErrorHandlerService} from '../../service/error-handler.service';
import {ClientCommunication} from '../../server/clientCommunication';

@Component({
  selector: 'app-base45-encode',
  templateUrl: './base45-encode.component.html'
})
export class Base45EncodeComponent {
  base45ServerResponse: string | undefined;

  constructor(private hcertService: HcertService, public errorHandlerService: ErrorHandlerService) {}

  encodeBase45(stringInput: string): void {
    if (stringInput) {
      const base45EncodeServerRequest: ClientCommunication.Base45EncodeServerRequest = {
        base45Encode: stringInput
      };
      this.hcertService.encodeBase45(base45EncodeServerRequest).subscribe({
        error: err => {
          this.errorHandlerService.cleanupErrors();
          this.errorHandlerService.setErrors(err);
          this.base45ServerResponse = '';
        },
        next: res => {
          this.errorHandlerService.cleanupErrors();
          this.base45ServerResponse = res;
        }
      });
    }
  }
}
