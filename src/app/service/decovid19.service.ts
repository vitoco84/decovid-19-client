import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PemCertServerRequest} from '../server/pemCertServerRequest';
import {PEMCertServerResponse} from '../server/pemCertServerResponse';
import {HcertServerResponse} from '../server/hcertServerResponse';
import {HcertServerRequest} from '../server/hcertServerRequest';

@Injectable({
  providedIn: 'root'
})
export class Decovid19Service {
  private static IMAGE_FILE_KEY = 'imageFile';
  private static QR_CODE_URL = 'decovid19/hcert/qrcode';
  private static QR_CODE_PREFIX = 'decovid19/hcert/prefix';
  private static PEM_URL = 'decovid19/hcert/qrcode/pem';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {}

  getHealthCertificateContentFromFile(qrCodeFile: File): Observable<HcertServerResponse> {
    const formData = new FormData();
    formData.append(Decovid19Service.IMAGE_FILE_KEY, qrCodeFile);
    return this.http.post<HcertServerResponse>(Decovid19Service.QR_CODE_URL, formData);
  }

  getHealthCertificateContentFromPrefix(hcertServerRequest: HcertServerRequest): Observable<HcertServerResponse> {
    return this.http.post<HcertServerResponse>(Decovid19Service.QR_CODE_PREFIX, hcertServerRequest, this.httpOptions);
  }

  getX509Certificate(pemCertificate: PemCertServerRequest): Observable<PEMCertServerResponse> {
    return this.http.post<PEMCertServerResponse>(Decovid19Service.PEM_URL, pemCertificate, this.httpOptions);
  }
}
