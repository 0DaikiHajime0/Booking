import { Component } from '@angular/core';
import { UsuarioGoogle } from '../models/UsuarioGoogle';
import { UsuarioService } from '../services/login.service';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  usuarioRecuperadoGoogle: UsuarioGoogle | null = null;
  usuarioRecuperado!: Usuario
  rol:string = ''
  opcionSeleccionada:number = 5;
  constructor(
    private router: Router,
    private loginService:UsuarioService
  ){
    this.handleLoginSuccess();
  }
  handleLoginSuccess(): void {
    if (typeof localStorage !== 'undefined') {
      this.usuarioRecuperado=this.loginService.getUsuarioFromStorage();
      this.usuarioRecuperadoGoogle = this.loginService.getUsuarioGoogle();
      if(this.usuarioRecuperadoGoogle && this.usuarioRecuperado){
        this.verificarRol();
      }
    }
  else {
      console.log('Web Storage is not supported in this environment.');
    }    
  }
  verificarRol(){
    if(this.usuarioRecuperado.usuario_rol='Docente'){
      this.rol = 'docente'
    }else if(this.usuarioRecuperado.usuario_rol='Administrador' ){
      this.rol = 'admin'
    }else{
      this.logOut()
    }
  }
  logOut():void{
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
      this.router.navigate(['/login']);
    } else {
      console.log('El localStorage no está disponible en este navegador.');
    }
  }
  cambioComponente(ruta: string) {
    this.router.navigate([ruta]);
  }
}

