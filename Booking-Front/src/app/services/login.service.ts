import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { Perfil } from '../models/Perfil';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioGoogle } from '../models/UsuarioGoogle';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'http://localhost:3000/api/v1/usuario/';

  constructor(private http: HttpClient) {}

  verificarCorreo(correo: string): Observable<any> {
    return this.http.get<any>(`${this.url}verificar/${correo}`);
  }
  getUsuarioGoogle():UsuarioGoogle{
    const usuarioGoogleString = localStorage.getItem('user')||sessionStorage.getItem('user');
    return usuarioGoogleString ? JSON.parse(usuarioGoogleString) : null;
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
  
async nuevoUsuario(usuario: Usuario) {
  try {
    const response = await this.http.post(`${this.url}/nuevousuario`, usuario).toPromise();
    return response;
  } catch (error) {
    throw error; // Lanza el error para que sea manejado en el componente
  }
}
  async verificarAdmin(){
    let usuario:Usuario = new Usuario(0,'','','','','')
    usuario = this.getUsuarioFromStorage()
    const tokenAdmin = await this.verificarToken()
    if(usuario.usuario_rol==='Administrador'&& tokenAdmin){
      return true
    }
    else{
      return false
    }
  }
  async verificarToken() {
    if (typeof localStorage !== 'undefined') {
      const tokenStr = localStorage.getItem('token');
      if (tokenStr) {
        try {
          const token = JSON.parse(tokenStr);
          const response = await this.http.post(`${this.url}verifytok`, { token }).toPromise();
          return response;
        } catch (error) {
          return false;
        }
      } else {
        console.error('No se encontró ningún token en el almacenamiento local.');
        return false;
      }
    } else {
      console.error('El objeto localStorage no está disponible en este entorno.');
      return false;
    }
  }
  
  
  
  
  
}
