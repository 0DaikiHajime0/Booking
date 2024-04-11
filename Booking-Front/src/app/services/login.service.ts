import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Usuario} from '../models/Usuario'
@Injectable({
    providedIn: 'root'
})
export class UsuarioService{
    url = 'http://localhost:3000/api/v1/usuario/'
    constructor(private http: HttpClient){}
    verificarCorreo(correo:string): Observable<Usuario>{
        return this.http.get<Usuario>(this.url+'verificar/'+correo)
    }
}