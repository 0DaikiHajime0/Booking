import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { Perfil } from '../models/Perfil';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'http://localhost:3000/api/v1/usuario/';

  constructor(private http: HttpClient) {}

  verificarCorreo(correo: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}verificar/${correo}`);
  }

  getUsuarioFromStorage(): Usuario {
    const userString = localStorage.getItem('usuario') || sessionStorage.getItem('usuario');
    return userString ? JSON.parse(userString) : null;
  }

  guardarInfoPerfil(perfil: Perfil): Observable<any> {
    return this.http.post<any>(`${this.url}actualizarusuario`, perfil);
  }
  async getUsuarioInfo(correo:string): Promise<Usuario> {
    try {
      const response = await this.http.get<Usuario>(`${this.url}obtenerusuario/${correo}`).toPromise();
      if (response) {
        return response;
      } else {
        throw new Error('No se recibió respuesta del servidor');
      }
    } catch (error) {
      throw error;
    }
  }
  
  async getUsuarios(): Promise<Usuario[]> {
    try {
      const response = await this.http.get<Usuario[]>(`${this.url}mostrarusuarios`).toPromise();
      return response || [];
    } catch (error) {
      throw error;
    }
  }
 async editarUsuario(id_usuario:number,usuario: Usuario): Promise<Usuario> {
    try {
      const response = await this.http.put<Usuario>(`${this.url}editarusuario/${id_usuario}`, usuario).toPromise();
      if (response) {
        return response;
      } else {
        throw new Error('No se recibió respuesta del servidor');
      }
    } catch (error) {
      throw error;
    }
  }
  async deshabilitarUsuario(usuario_id:number){
    try {
      const response  = await this.http.get(`${this.url}deshabilitarusuario/${usuario_id}`).toPromise();
      if(response){
        return response
      }
      else{
        throw new Error('No se recibió respuesta del servidor');

      }
    } catch (error) {
      throw error;

    }
  }
  async habilitarUsuario(usuario_id:number){
    try {
      const response  = await this.http.get(`${this.url}habilitarusuario/${usuario_id}`).toPromise();
      if(response){
        return response
      }
      else{
        throw new Error('No se recibió respuesta del servidor');

      }
    } catch (error) {
      throw error;

    }
  }
}
