import {Component, OnInit} from '@angular/core';
import {ClientCommunication} from '../../server/clientCommunication';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-documentation-data',
  templateUrl: './documentation.component.html'
})
export class DocumentationComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  keyId = 'mmrfzpMU6xc=';
  algo = 'SHA256withRSA/PSS';
  issuer = 'CH BAG';
  expTime = '2022-05-29T07:55:08Z';
  issuedAt = '2021-05-29T07:55:08Z';

  hcertVacc: ClientCommunication.HcertVaccination = {
    tg: '840539006',
    co: 'CH',
    ci: 'urn:uvci:01:CH:2987CC9617DD5593806D4285',
    dn: 2,
    dt: '2021-04-30',
    is: 'Bundesamt für Gesundheit (BAG)',
    ma: 'ORG-100031184',
    mp: 'EU/1/20/1507',
    sd: 2,
    vp: '1119349007'
  };

  hcertHolder: ClientCommunication.HcertHolder = {
    fn: 'Müller',
    fnt: 'MUELLER',
    gn: 'Céline',
    gnt: 'CELINE'
  };

  hcertContent: ClientCommunication.HcertContentDTO = {
    nam: this.hcertHolder,
    dob: '1943-02-01',
    ver: '1.0.0',
    v: [this.hcertVacc]
  };
}
