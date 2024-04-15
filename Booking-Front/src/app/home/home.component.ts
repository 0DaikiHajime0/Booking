import { Component } from '@angular/core';
import { UsuarioGoogle } from '../models/UsuarioGoogle';
import { UsuarioService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  usuarioRecuperado: UsuarioGoogle | null = null;
  opcionSeleccionada:number = 5;
  constructor(){
    this.handleLoginSuccess();
  }
  handleLoginSuccess(): void {
    const usuarioString = localStorage.getItem('user');
    if (usuarioString) {
      this.usuarioRecuperado = JSON.parse(usuarioString);
      console.log(this.usuarioRecuperado);
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
}

