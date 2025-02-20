import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { Perfil } from '../models/Perfil';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioGoogle } from '../models/UsuarioGoogle';
import { API_BASE_URL } from './constants';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = API_BASE_URL+'usuario/';
  url2 = API_BASE_URL+'auth/'
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    const tokenWithoutQuotes = token?.replace(/^"(.*)"$/, '$1'); 
    return new HttpHeaders().set('Authorization', `Bearer ${tokenWithoutQuotes}`);
  }
  

  verificarCorreo(correo: string): Observable<any> {
    return this.http.get<any>(`${this.url2}verificar/${correo}`);
  }
  getUsuarioGoogle(): UsuarioGoogle {
    const usuarioGoogleString = localStorage.getItem('user') || sessionStorage.getItem('user');
    return usuarioGoogleString ? JSON.parse(usuarioGoogleString) as UsuarioGoogle : {} as UsuarioGoogle;
  }
  getUsuarioFromStorage(): Usuario {
    if (typeof localStorage !== 'undefined') {
      const userString = localStorage.getItem('usuario') || sessionStorage.getItem('usuario');
      return userString ? JSON.parse(userString) as Usuario : {} as Usuario;
    } else {
      console.error('El objeto localStorage no está disponible en este entorno.');
      return {} as Usuario;
    }
  }

  guardarInfoPerfil(perfil: Perfil): Observable<any> {
    return this.http.post<any>(`${this.url}actualizarusuario`, perfil,{ headers: this.getHeaders() });
  }
  async getUsuarioInfo(correo:string): Promise<Usuario> {
    try {
      const response = await this.http.get<Usuario>(`${this.url2}obtenerusuario/${correo}`).toPromise();
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
      const response = await this.http.get<Usuario[]>(`${this.url}mostrarusuarios`,{ headers: this.getHeaders() }).toPromise();
      return response || [];
    } catch (error) {
      throw error;
    }
  }
 async editarUsuario(id_usuario:number,usuario: Usuario): Promise<Usuario> {
    try {
      const response = await this.http.put<Usuario>(`${this.url}editarusuario/${id_usuario}`, usuario,{ headers: this.getHeaders() }).toPromise();
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
      const response  = await this.http.get(`${this.url}deshabilitarusuario/${usuario_id}`,{ headers: this.getHeaders() }).toPromise();
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
      const response  = await this.http.get(`${this.url}habilitarusuario/${usuario_id}`,{ headers: this.getHeaders() }).toPromise();
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
    const response = await this.http.post(`${this.url}/nuevousuario`, usuario,{ headers: this.getHeaders() }).toPromise();
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
          const response = await this.http.post(`${this.url2}verifytok`, { token }).toPromise();
          return response as boolean;
        } catch (error) {
          console.error('Error al verificar el token:', error);
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
