import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './constants';
import { Asignatura } from '../models/Asignatura';

@Injectable({
  providedIn: 'root'
})

export class AsignarDocenteService{
  private url = API_BASE_URL + 'reserva/';
  constructor(private http: HttpClient) { }

  listardocentes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}listardocente`);
  }
  listarCurso(id: number): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.url}listarcurso/${id}`);
  }

}
