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
    private urlcredenciales = API_BASE_URL +'credenciales/'
    constructor(private http: HttpClient) {}
    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        const tokenWithoutQuotes = token?.replace(/^"(.*)"$/, '$1'); 
        return new HttpHeaders().set('Authorization', `Bearer ${tokenWithoutQuotes}`);
      }
    async getRecursos():Promise <Recurso[]>{
        try{
            const response = await this.http.get<Recurso[]>(`${this.url}mostrarrecursos`,{ headers: this.getHeaders() }).toPromise();
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
        return this.http.get<Asignatura[]>(`${this.url}obtenerasignaturas`,{ headers: this.getHeaders() })
    }
    getAsignaturasbyAsignaturas(asignatura:Asignatura):Observable<Asignatura[]>{
        return this.http.post<Asignatura[]>(`${this.url}obtenerasignaturasbyasignatura`,asignatura,{ headers: this.getHeaders() })
    }
    async getAsignaturasByRecurso(recurso_id:number):Promise <Asignatura[]>{
        try {
            const response = await this.http.get<Asignatura[]>(`${this.url}mostrarasignaturasbyrecurso/${recurso_id}`,{ headers: this.getHeaders() }).toPromise()
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
            const response = await this.http.post<Recurso>(`${this.url}guardarRecurso/`,recurso,{ headers: this.getHeaders() }).toPromise()
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
            const response = await this.http.post<Recurso>(`${this.url}editarRecurso/`,recurso,{ headers: this.getHeaders() }).toPromise()
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
            const response = await this.http.get<Licencia[]>(`${this.url}obtenerLicencias/${recurso_id}`,{ headers: this.getHeaders() }).toPromise()
            if(response){
                return response
            }else{
                throw new Error('No se recibio respuesta del servidor')
            }
        } catch (error) {
            throw error
        }
    }
    async guardarLicencia(licencia:Licencia):Promise<Licencia>{
        try {
            const response = await this.http.post<Licencia>(`${this.url}nuevaLicencia/`,licencia,{ headers: this.getHeaders() }).toPromise()
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
        return this.http.post<Bloques>(`${this.urlbloque}editarBloque`, bloque,{ headers: this.getHeaders() });
    }
    nuevoBloque(bloque:Bloques):Observable<Bloques>{
        return this.http.post<Bloques>(`${this.urlbloque}nuevoBloque`,bloque,{ headers: this.getHeaders() });
    }
    editarLicencia(licencia: Licencia): Observable<any> {
        return this.http.post(`${this.url}/editarLicencia`, licencia, { headers: this.getHeaders() });
      }
      
    enviarcsvCredenciales(file: any, recurso_id:number): Observable<any> {
        return this.http.post(`${this.url}subircsvcredenciales/${recurso_id}`, file, { headers: this.getHeaders() });
      }
      descargarCsv() {
        return this.http.get(`${this.urlcredenciales}/credcaseone`, { responseType: 'blob', headers: this.getHeaders() });
      }
      async guardarCurso(any:any){
        return this.http.post(`${this.url}/nuevocurso/`,any,{ headers: this.getHeaders() })
      }
      asignarCredenciales(data: any): Observable<any> {
        return this.http.post(`${this.url}/asignarlicencias/`, data, { headers: this.getHeaders() });
      }
      
      
}