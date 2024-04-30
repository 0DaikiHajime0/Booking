import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './constants';
import { Asignatura } from '../models/Asignatura';
import {AsignaturanoAsignada} from "../models/AsignaturaNoAsignadas"
import {Asignar} from '../models/Asignar'

@Injectable({
  providedIn: 'root'
})

export class AsignarDocenteService{
  private url = API_BASE_URL + 'reserva/';
  private url2 = API_BASE_URL + 'asignar/';
  constructor(private http: HttpClient) { }

  listardocentes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}listardocente/`);
  }

  listarCurso(id: number): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.url}listarcurso/${id}`);
  }

  listarCursonoAsignado(): Observable<AsignaturanoAsignada[]> {
    return this.http.get<AsignaturanoAsignada[]>(`${this.url2}listarcursosnoasignados/`);
  }

  asignarDocenteCurso(asignar:Asignar):Observable<Asignar>{
    return this.http.post<any>(`${this.url2}asignardocente`,asignar)
  }

}


