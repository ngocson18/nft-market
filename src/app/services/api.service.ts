import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected apiServer = environment.apiServer;

  constructor(
    private httpClient: HttpClient
  ) { }

  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('msal.idtoken')
  });

  get( path: string, options: {}, callback: any ): Observable<any> {
    return this.httpClient.get<APIResponseModel<[]>>(this._buildUrl(path), options)
       .pipe(callback || '');
  }

  post( path: string, options: {}, headers: {}, callback: any ): Observable<any> {
    return this.httpClient.post<APIResponseModel<[]>>(this._buildUrl(path), options, headers)
      .pipe(callback || '');
  }

  put( path: string, options: {}, headers: {}, callback: any ): Observable<any> {
    return this.httpClient.put<APIResponseModel<[]>>(this._buildUrl(path), options, headers)
      .pipe(callback || '');
  }

  delete( path: string, options: {}, callback: any ): Observable<any> {
    return this.httpClient.delete<APIResponseModel<[]>>(this._buildUrl(path), options)
      .pipe(callback || '');
  }

  private _buildUrl( path: string ): string {
    if (path.includes('https://') || path.includes('http://')) {
      return path;
    }
    let baseUrl = this.apiServer.ssl === true ? 'https://' : 'http://';
    baseUrl += this.apiServer.host;
    if (this.apiServer.port !== '') {
      baseUrl += ':' + this.apiServer.port;
    }
    if (this.apiServer.prefix !== '') {
      baseUrl += '/' + this.apiServer.prefix;
    }
    return baseUrl + '/' + path;
  }
}
