import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    const tokenWithoutQuotes = token?.replace(/^"(.*)"$/, '$1'); 
    return new HttpHeaders().set('Authorization', `Bearer ${tokenWithoutQuotes}`);
  }
  listarCursoAdmin(id: number): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.url2}listarcurso/${id}`,{ headers: this.getHeaders() });
  }

  listarCurso(id: number): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.url}listarcurso/${id}`,{ headers: this.getHeaders() });
  }

  listarRecursos(id: number): Observable<Recurso[]> {
    return this.http.get<Recurso[]>(`${this.url}listarrecurso/${id}`,{ headers: this.getHeaders() });
  }

  listarBloques(): Observable<Bloques[]> {
    return this.http.get<Bloques[]>(`${this.url}listarbloque/`,{ headers: this.getHeaders() });
  }

  listaDisponibilidad(disponibilidad: Disponibilidad): Observable<any> {
    return this.http.post<any>(`${this.url}disponibilidad/`, disponibilidad,{ headers: this.getHeaders() });

  }
  crearReserva(reserva: Reserva): Observable<any> {
    return this.http.post<any>(`${this.url}crear/`, reserva,{ headers: this.getHeaders() });
  }

  enviarCredenciales(credencial: Credencial): Observable<any> {
    return this.http.post<any>(`${this.url}enviarcredenciales/`, credencial,{ headers: this.getHeaders() });
  }
  listardisponibilidadCalendar(id_recurso: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}listardisponibilidadcalendar/${id_recurso}`,{ headers: this.getHeaders() });
  }
  listardocetes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}listardocente`,{ headers: this.getHeaders() });

  }
  reservageneral(datos:any):Observable<any>{
    return this.http.post<any>(`${this.url}reservageneral/`,datos,{ headers: this.getHeaders() })
  }
}


