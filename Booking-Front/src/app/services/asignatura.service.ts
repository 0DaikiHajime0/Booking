import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { Perfil } from '../models/Perfil';
import { API_BASE_URL } from './constants';
import { throws } from 'assert';
import { er } from '@fullcalendar/core/internal-common';
import { Asignatura } from '../models/Asignatura';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
    private url = API_BASE_URL + 'asignatura/'
    constructor(private http: HttpClient) {}
    async getAsignaturas():Promise <Asignatura[]>{
        try{
            const response = await this.http.get<Asignatura[]>(`${this.url}mostrarasignaturas`).toPromise();
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