import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './constants';

@Injectable({
  providedIn: 'root'
})
export class CrearReservaServiceService {
  private url = API_BASE_URL + 'reserva/';
  constructor(private http: HttpClient) { }

  listarCurso(id: string): Observable<any> {
    return this.http.get<any>(this.url + 'listarcurso/' + id);
  }
  listarRecursos(id: string): Observable<any> {
    return this.http.get<any>(this.url + 'listarrecurso/' + id);
  }
  listarBloques(): Observable<any> {
    return this.http.get<any>(this.url + 'listarbloque/');
  }
}
