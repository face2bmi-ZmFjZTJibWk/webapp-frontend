import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BACKEND_URL = "/api/getbmi/"

  constructor(private http: HttpClient) { }

  async predictBMI(image: File) {
    const uploadData = new FormData();
    uploadData.append('file', image);
    return this.http.post(this.BACKEND_URL, uploadData).toPromise();
  }
}
