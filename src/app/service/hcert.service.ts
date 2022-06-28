import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ClientCommunication} from '../server/clientCommunication';

@Injectable({
  providedIn: 'root'
})
export class HcertService {
  private static IMAGE_FILE_KEY = 'imageFile';
  private static QR_CODE_URL = 'decovid19/hcert/qrcode';
  private static QR_CODE_PREFIX = 'decovid19/hcert/prefix';
  private static PEM_URL = 'decovid19/hcert/qrcode/pem';
  private static HCERT_VERIFY_URL = 'decovid19/hcert/verify';
  private static QR_CODE_URL_CLIENT = 'decovid19/hcert/qrcode/url/client';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {}

  decodeHealthCertificateContentFromFile(qrCodeFile: File): Observable<ClientCommunication.HcertServerResponse> {
    const formData = new FormData();
    formData.append(HcertService.IMAGE_FILE_KEY, qrCodeFile);
    return this.http.post<ClientCommunication.HcertServerResponse>(HcertService.QR_CODE_URL, formData);
  }

  decodeHealthCertificateContentFromPrefix(hcertServerRequest: ClientCommunication.HcertServerRequest): Observable<ClientCommunication.HcertServerResponse> {
    return this.http.post<ClientCommunication.HcertServerResponse>(HcertService.QR_CODE_PREFIX, hcertServerRequest, this.httpOptions);
  }

  decodeX509Certificate(pemCertServerRequest: ClientCommunication.PEMCertServerRequest): Observable<ClientCommunication.PEMCertServerResponse> {
    return this.http.post<ClientCommunication.PEMCertServerResponse>(HcertService.PEM_URL, pemCertServerRequest, this.httpOptions);
  }

  verifyHealthCertificate(hcertVerificationServerRequest: ClientCommunication.HcertVerificationServerRequest): Observable<ClientCommunication.HcertVerificationServerResponse> {
    return this.http.post<ClientCommunication.HcertVerificationServerResponse>(HcertService.HCERT_VERIFY_URL, hcertVerificationServerRequest, this.httpOptions);
  }

  createURLQRCode(qrCodeServerRequest: ClientCommunication.QRCodeServerRequest): Observable<string> {
    return this.http.post(HcertService.QR_CODE_URL_CLIENT, qrCodeServerRequest, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      responseType: 'text'
    });
  }
}
