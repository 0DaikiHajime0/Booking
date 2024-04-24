import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './constants';
import {ListarReservas} from './../models/ListarReservas';
import {ListarReservasAdmin} from './../models/ListarReservasAdministrador';
import { mostrarReserva } from '../models/mostrarReservadocente';
import { mostrarReservaAdmin } from '../models/mostrarReservaAdministrador';
import { Recurso} from '../models/Recurso'
import { Bloques } from '../models/Bloques';

@Injectable({
  providedIn: 'root'
})

export class ListarReservaService {
  private url = API_BASE_URL + 'listar/';
  constructor(private http: HttpClient) { }

  listarreservas(listar:ListarReservas): Observable<mostrarReserva[]> {
    return this.http.post<mostrarReserva[]>(`${this.url}reservadocente/`,listar);
  }
  listarReservaAdmin(listar: ListarReservasAdmin): Observable<mostrarReservaAdmin[]> {
    return this.http.post<mostrarReservaAdmin[]>(`${this.url}reservaadministrador/`, listar);
  }
  listarRecursosAdmin(): Observable<Recurso[]>{
    return this.http.get<Recurso[]>(`${API_BASE_URL}recurso/mostrarrecursos`);
  }
  listarBloques(): Observable<Bloques[]> {
    return this.http.get<Bloques[]>(`${API_BASE_URL}reserva/listarbloque/`);
  }

}


