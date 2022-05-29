import {Component} from '@angular/core';
import {Decovid19Service} from '../../service/decovid19.service';
import {PemCertServerRequest} from '../../model/pemCertServerRequest';

@Component({
  selector: 'app-hcert-json',
  templateUrl: './hcert-json.component.html',
  styleUrls: ['./hcert-json.component.css']
})
export class HcertJsonComponent {
  jsonHcert: any;
  jsonPem: any;

  constructor(private decovid19Service: Decovid19Service) {}

  getHealthCertificateContent(event): void {
    const file: File = event.target.files[0];
    if (file) {
      this.decovid19Service.getHealthCertificateContent(file).subscribe(res => {
        this.jsonHcert = res;
      });
    }
  }

  getX509Certificate(pemInput: string): void {
    if (pemInput) {
      const pemCertServRequest = new PemCertServerRequest();
      pemCertServRequest.pemCertificate = pemInput;
      this.decovid19Service.getX509Certificate(pemCertServRequest).subscribe(res => {
        this.jsonPem = res;
      });
    }
  }
}
