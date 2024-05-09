import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from './constants';
import { Recurso } from '../models/Recurso';
import { Asignatura } from '../models/Asignatura';
import { Licencia } from '../models/Licencias';
import { Bloques } from '../models/Bloques';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {
    private url = API_BASE_URL + 'recurso/'
    private urlbloque =API_BASE_URL+ 'bloque/'
    constructor(private http: HttpClient) {}
    private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
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
    getAsignaturas():Observable<Asignatura[]>{
        return this.http.get<Asignatura[]>(`${this.url}obtenerasignaturas`)
    }
    getAsignaturasbyAsignaturas(asignatura:Asignatura):Observable<Asignatura[]>{
        return this.http.post<Asignatura[]>(`${this.url}obtenerasignaturasbyasignatura`,asignatura)
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
    async getLicencias(recurso_id:number):Promise<Licencia[]>{
        try {
            const response = await this.http.get<Licencia[]>(`${this.url}obtenerLicencias/${recurso_id}`).toPromise()
            if(response){
                return response
            }else{
                throw new Error('No se recibio respuesta del servidor')
            }
        } catch (error) {
            throw error
        }
    }
    async guardarLicencia(licencia:Licencia,recurso_id:number):Promise<Licencia>{
        try {
            const response = await this.http.post<Licencia>(`${this.url}nuevaLicencia/${recurso_id}`,licencia).toPromise()
            if(response){
                return response
            }else{
                throw new Error('No se recibio respuesta del servidor')
            }
        } catch (error) {
            throw Error
        }

    }
    editarBloque(bloque: Bloques): Observable<Bloques> {
        return this.http.post<Bloques>(`${this.urlbloque}editarBloque`, bloque);
    }
    nuevoBloque(bloque:Bloques):Observable<Bloques>{
        return this.http.post<Bloques>(`${this.urlbloque}nuevoBloque`,bloque);
    }
    editarLicencia(licencia:Licencia):Observable<Licencia>{
        return this.http.post<Licencia>(`${this.url}editarLicencia`,licencia)
    }
}