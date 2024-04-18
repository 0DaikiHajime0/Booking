import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from '../models/Perfil';
import { API_BASE_URL } from './constants';
import { throws } from 'assert';
import { er } from '@fullcalendar/core/internal-common';
import { Recurso } from '../models/Recurso';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {
    private url = API_BASE_URL + 'recurso/'
    constructor(private http: HttpClient) {}
    async getRecursos():Promise <Recurso[]>{
        try{
            const response = await this.http.get<Recurso[]>(`${this.url}mostrarrecursos`).toPromise();
            if(response){
                return response;
            }else{
                throw new Error('No se recibio respuesta del servidor')
            }
        }catch(error){
            throw error
        }
    }
}