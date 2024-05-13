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
  usuarioRecuperado: Usuario | null = null;
  rol: string = '';
  verificado:boolean=false
  constructor(
    private router: Router,
    private loginService: UsuarioService
  ) {
    this.handleLoginSuccess();
    
  }
  ngAfterViewInit(): void{
    
  }
  handleLoginSuccess(): void {
    if (typeof localStorage !== 'undefined') {
      this.verificarRol();

    } else if (typeof sessionStorage !== 'undefined') {
      this.verificarRol();
    }
    else {
      console.log('Web Storage is not supported in this environment.');
    }
  }

  async verificarRol() {
    this.usuarioRecuperado = this.loginService.getUsuarioFromStorage();
    this.usuarioRecuperadoGoogle = this.loginService.getUsuarioGoogle();
    
    if (!this.usuarioRecuperado || !this.usuarioRecuperadoGoogle) {
    } else {
      if(await this.loginService.verificarToken()){
        this.rol='admin'
        this.cambioComponente('/mostrarreserva-administrador')
      }else{
        this.rol = 'docente';
        this.cambioComponente('/listar')
      }
      
    }
  }
  

  logOut(): void {
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
