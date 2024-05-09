import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './constants';
import {Disponibilidad} from '../models/Disponibilidad'
import { Asignatura } from '../models/Asignatura';
import { Recurso } from '../models/Recurso';
import { Bloques } from '../models/Bloques';
import { Reserva } from '../models/Reserva';
import {Credencial} from '../models/Credenciales';

@Injectable({
  providedIn: 'root'
})
export class CrearReservaServiceService {
  private url = API_BASE_URL + 'reserva/';
  private url2 = API_BASE_URL + 'asignar/';

  constructor(private http: HttpClient) { }

  listarCursoAdmin(id: number): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.url2}listarcurso/${id}`);
  }

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
  crearReserva(reserva: Reserva): Observable<any> {
    return this.http.post<any>(`${this.url}crear/`, reserva);
  }

  enviarCredenciales(credencial: Credencial): Observable<any> {
    return this.http.post<any>(`${this.url}enviarcredenciales/`, credencial);
  }
  listardisponibilidadCalendar(id_recurso: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}listardisponibilidadcalendar/${id_recurso}`);
  }
  listardocetes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}listardocente`);

  }
  reservageneral(datos:any):Observable<any>{
    return this.http.post<any>(`${this.url}reservageneral/`,datos)
  }
}


