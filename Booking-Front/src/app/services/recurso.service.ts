import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from './constants';
import { Recurso } from '../models/Recurso';
import { Asignatura } from '../models/Asignatura';

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
    async getAsignaturasByRecurso(recurso_id:number):Promise <Asignatura[]>{
        try {
            const response = await this.http.get<Asignatura[]>(`${this.url}mostrarasignaturasbyrecurso/${recurso_id}`).toPromise()
            if(response){
                return response
            }
            else{
                throw new Error('No se recibio respuesta del servidor')
            }
        } catch (error) {
            throw error
        }
    }
    async guardarRecurso(recurso:Recurso):Promise<Recurso>{
        try {
            const response = await this.http.post<Recurso>(`${this.url}guardarRecurso/`,recurso).toPromise()
            if(response){
                return response
            }
            else{
                throw new Error('No se recibio respuesta del servidor')
            }
        } catch (error) {
            throw error;
        }
    }
    async editarRecurso(recurso:Recurso):Promise<Recurso>{
        try {
            const response = await this.http.post<Recurso>(`${this.url}editarRecurso/`,recurso).toPromise()
            if(response){
                return response
            }
            else{
                throw new Error('No se recibio respuesta del servidor')
            }
        } catch (error) {
            throw error;
        }
    }
}