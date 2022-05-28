import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Decovid19Service {
  private static IMAGE_FILE_KEY = 'imageFile';
  private static QR_CODE_URL = 'decovid19/hcert/qrcode';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {}

  getHealthCertificateContent(qrCodeFile: File): Observable<any> {
    const formData = new FormData();
    formData.append(Decovid19Service.IMAGE_FILE_KEY, qrCodeFile);
    return this.http.post<File>(Decovid19Service.QR_CODE_URL, formData);
  }
}
