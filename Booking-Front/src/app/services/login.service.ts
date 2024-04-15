import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Usuario} from '../models/Usuario'
import{Perfil} from '../models/Perfil'
@Injectable({
    providedIn: 'root'
})
export class UsuarioService{
    url = 'http://localhost:3000/api/v1/usuario/'
    constructor(private http: HttpClient){}
    verificarCorreo(correo:string): Observable<Usuario>{
        return this.http.get<Usuario>(this.url+'verificar/'+correo)
    }
    getUsuarioFromStorage(): Usuario {
        const userString = localStorage.getItem('usuario') || sessionStorage.getItem('usuario');
        return userString ? JSON.parse(userString) : null;
    }
    guardarInfoPerfil(perfil: Perfil): Observable<any> {
        return this.http.post<any>(`${this.url}actualizarusuario`, perfil);
      }
}