import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './constants';
import { Asignatura } from '../models/Asignatura';
import {AsignaturanoAsignada} from "../models/AsignaturaNoAsignadas"
import {Asignar} from '../models/Asignar'
import {ListarAsignarturaAsignada} from '../models/ListarAsignaturaAsignada'
import {EditarAsignacion} from '../models/EditarAsignacion'

@Injectable({
  providedIn: 'root'
})

export class AsignarDocenteService{
  private url = API_BASE_URL + 'reserva/';
  private url2 = API_BASE_URL + 'asignar/';
  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    const tokenWithoutQuotes = token?.replace(/^"(.*)"$/, '$1'); 
    return new HttpHeaders().set('Authorization', `Bearer ${tokenWithoutQuotes}`);
  }
  listardocentes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}listardocente/`,{ headers: this.getHeaders() });
  }

  listarCurso(id: number): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.url2}listarcurso/${id}`,{ headers: this.getHeaders() });
  }

  listarCursonoAsignado(): Observable<AsignaturanoAsignada[]> {
    return this.http.get<AsignaturanoAsignada[]>(`${this.url2}listarcursosnoasignados/`,{ headers: this.getHeaders() });
  }

  asignarDocenteCurso(asignar:Asignar):Observable<Asignar>{
    return this.http.post<any>(`${this.url2}asignardocente`,asignar,{ headers: this.getHeaders() })
  }

  listartCursoDocenteasignado(id_cocente_curso:number):Observable<ListarAsignarturaAsignada[]>{
    return this.http.get<ListarAsignarturaAsignada[]>(`${this.url2}/listarcursodocente/${id_cocente_curso}`,{ headers: this.getHeaders() })
  }
  editarDocenteCurso(editar:EditarAsignacion):Observable<EditarAsignacion>{
    return this.http.post<any>(`${this.url2}editarasignacion`,editar,{ headers: this.getHeaders() })
  }

}


