import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class RutaPrincipal {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getSaludo(): Observable<{ mensaje: string }> {
    return this.http.get<{ mensaje: string }>(`${this.apiUrl}/saludo`);
  }
}
