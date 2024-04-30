import { Component } from '@angular/core';
import { UsuarioGoogle } from '../models/UsuarioGoogle';
import { UsuarioService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  usuarioRecuperado: UsuarioGoogle | null = null;
  opcionSeleccionada:number = 5;
  constructor(
    private router: Router
  ){
    this.handleLoginSuccess();
  }
  handleLoginSuccess(): void {
    const usuarioString = localStorage.getItem('user');
    if (usuarioString) {
      this.usuarioRecuperado = JSON.parse(usuarioString);
      //TO DO:BOTARLO SI NO EXISTE
    }
  }
  logOut():void{
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    } else {
      console.log('El localStorage no está disponible en este navegador.');
    }
  }
  cambioComponente(ruta: string) {
    this.router.navigate([ruta]);
  }
}

