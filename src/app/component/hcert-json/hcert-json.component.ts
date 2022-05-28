import {Component} from '@angular/core';
import {Decovid19Service} from '../../service/decovid19.service';

@Component({
  selector: 'app-hcert-json',
  templateUrl: './hcert-json.component.html',
  styleUrls: ['./hcert-json.component.css']
})
export class HcertJsonComponent {
  fileName: string;
  jsonHcert: any;

  constructor(private decovid19Service: Decovid19Service) {}

  getHealthCertificateContent(event): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
    this.decovid19Service.getHealthCertificateContent(file).subscribe(res => {
      this.jsonHcert = res;
    });
  }
}
