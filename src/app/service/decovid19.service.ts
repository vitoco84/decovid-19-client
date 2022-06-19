import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ClientCommunication} from '../server/clientCommunication';

@Injectable({
  providedIn: 'root'
})
export class Decovid19Service {
  private static IMAGE_FILE_KEY = 'imageFile';
  private static QR_CODE_URL = 'decovid19/hcert/qrcode';
  private static QR_CODE_PREFIX = 'decovid19/hcert/prefix';
  private static PEM_URL = 'decovid19/hcert/qrcode/pem';
  private static HCERT_VERIFY_URL = 'decovid19/hcert/verify';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {}

  getHealthCertificateContentFromFile(qrCodeFile: File): Observable<ClientCommunication.HcertServerResponse> {
    const formData = new FormData();
    formData.append(Decovid19Service.IMAGE_FILE_KEY, qrCodeFile);
    return this.http.post<ClientCommunication.HcertServerResponse>(Decovid19Service.QR_CODE_URL, formData);
  }

  getHealthCertificateContentFromPrefix(hcertServerRequest: ClientCommunication.HcertServerRequest): Observable<ClientCommunication.HcertServerResponse> {
    return this.http.post<ClientCommunication.HcertServerResponse>(Decovid19Service.QR_CODE_PREFIX, hcertServerRequest, this.httpOptions);
  }

  getX509Certificate(pemCertServerRequest: ClientCommunication.PEMCertServerRequest): Observable<ClientCommunication.PEMCertServerResponse> {
    return this.http.post<ClientCommunication.PEMCertServerResponse>(Decovid19Service.PEM_URL, pemCertServerRequest, this.httpOptions);
  }

  getVerification(hcertVerificationServerRequest: ClientCommunication.HcertVerificationServerRequest): Observable<ClientCommunication.HcertVerificationServerResponse> {
    return this.http.post<ClientCommunication.HcertVerificationServerResponse>(Decovid19Service.HCERT_VERIFY_URL, hcertVerificationServerRequest, this.httpOptions);
  }
}
