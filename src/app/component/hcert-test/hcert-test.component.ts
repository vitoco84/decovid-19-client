import {Component} from '@angular/core';
import {HcertService} from '../../service/hcert.service';
import {ErrorHandlerService} from '../../service/error-handler.service';
import {ClientCommunication} from '../../server/clientCommunication';
import {NgForm} from '@angular/forms';
import {CountriesInterface} from '../../interface/countries.interface';
import {TestManfNameInterface} from '../../interface/testManfNameInterface';
import {countriesJson} from '../../../assets/countries';
import {testManfJson} from '../../../assets/test.manf';
import {testNameJson} from '../../../assets/test.name';

@Component({
  selector: 'app-hcert-test',
  templateUrl: './hcert-test.component.html'
})
export class HcertTestComponent {
  private static IMAGE_BASE_64_PNG = 'data:image/png;base64,';
  private static TARGET = 'COVID-19';

  countries: CountriesInterface[] = countriesJson;
  testManf: TestManfNameInterface[] = testManfJson;
  testName: TestManfNameInterface[] = testNameJson;

  hcertHolder: ClientCommunication.HcertHolder = {
    fn: '',
    fnt: '',
    gn: '',
    gnt: ''
  };

  hcertTest: ClientCommunication.HcertTest = {
    tg: HcertTestComponent.TARGET,
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

  createTestCovidQRCode() {
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
    this.hcertTest.tg = HcertTestComponent.TARGET;
    this.hcertTestServerResponse = '';
  }
}
