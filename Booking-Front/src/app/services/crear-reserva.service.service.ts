import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './constants';
import {Disponibilidad} from '../models/Disponibilidad'
import { Asignatura } from '../models/Asignatura';
import { Recurso } from '../models/Recurso';
import { Bloques } from '../models/Bloques';

@Injectable({
  providedIn: 'root'
})
export class CrearReservaServiceService {
  private url = API_BASE_URL + 'reserva/';

  constructor(private http: HttpClient) { }

  listarCurso(id: number): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.url}listarcurso/${id}`);
  }

  listarRecursos(id: number): Observable<Recurso[]> {
    return this.http.get<Recurso[]>(`${this.url}listarrecurso/${id}`);
  }

  listarBloques(): Observable<Bloques[]> {
    return this.http.get<Bloques[]>(`${this.url}listarbloque/`);
  }
  
  listaDisponibilidad(disponibilidad: Disponibilidad): Observable<any> {
    return this.http.post<any>(`${this.url}disponibilidad/`, disponibilidad);

  }

}
