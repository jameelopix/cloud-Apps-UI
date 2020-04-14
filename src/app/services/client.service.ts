import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl = environment.baseUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  post(url, request, successCallback, errorCallback?) {
    this.http.post(this.baseUrl + url, request, this.httpOptions).subscribe(
      (response: any) => {
        successCallback(response);
      },
      (response: any) => {
        if (errorCallback) {
          errorCallback(response['error']['errorDTOs']);
        }
      },
      () => {
        console.log('POST Completed!!!');
      }
    );
  }
}
