import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './constants';
import {ListarCredenciales} from './../models/ListarReservas';

@Injectable({
  providedIn: 'root'
})

export class ListarReservaService {
  private url = API_BASE_URL + 'reserva/';

  constructor(private http: HttpClient) { }

  listarReserva(listarreserva: ListarCredenciales): Observable<any[]> {
    return this.http.post<any[]>(`${this.url}listarreserva/`, listarreserva);
  }
}

