import {Component} from '@angular/core';
import {HcertService} from '../../service/hcert.service';
import {ErrorHandlerService} from '../../service/error-handler.service';
import {ClientCommunication} from '../../server/clientCommunication';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-hcert-test',
  templateUrl: './hcert-test.component.html'
})
export class HcertTestComponent {
  private static IMAGE_BASE_64_PNG = 'data:image/png;base64,';

  hcertHolder: ClientCommunication.HcertHolder = {
    fn: '',
    fnt: '',
    gn: '',
    gnt: ''
  };

  hcertTest: ClientCommunication.HcertTest = {
    tg: '',
    co: '',
    tt: '',
    nm: '',
    ma: '',
    sc: '',
    tr: '',
    tc: '',
    is: ''
  };

  hcertContentDTO: ClientCommunication.HcertContentDTO = {
    nam: this.hcertHolder,
    dob: '',
    ver: '',
    t: [this.hcertTest]
  };

  hcertTestServerResponse: string | undefined;

  constructor(private hcertService: HcertService, public errorHandlerService: ErrorHandlerService) {}

  createTestCovidQRCode(form: NgForm) {
    if (this.hcertContentDTO) {
      this.setStandardizedForAndSurname();
      this.hcertService.createTestCovidQRCode(this.hcertContentDTO).subscribe({
        error: err => {
          this.errorHandlerService.cleanupErrors();
          this.errorHandlerService.setErrors(err);
          this.hcertTestServerResponse = '';
        },
        next: res => {
          this.errorHandlerService.cleanupErrors();
          this.hcertTestServerResponse = HcertTestComponent.IMAGE_BASE_64_PNG + res;
          form.resetForm();
        }
      });
    }
  }

  private setStandardizedForAndSurname() {
    if (this.hcertContentDTO.nam.fn && this.hcertContentDTO.nam.gn) {
      this.hcertContentDTO.nam.fnt = this.hcertContentDTO.nam.fn.toUpperCase();
      this.hcertContentDTO.nam.gnt = this.hcertContentDTO.nam.gn.toUpperCase();
    }
  }

  resetForm(form: NgForm) {
    form.resetForm();
  }
}
