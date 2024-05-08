import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/login.service';
import { Usuario } from '../models/Usuario';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  socialUser: SocialUser | null = null;
  isLoggedin: boolean = false;
  usuario: Usuario | null = null;
  correo: string = '';

  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router,
    private usuarioService: UsuarioService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      if (this.socialUser && this.socialUser.email) {
        this.correo = this.socialUser.email;
        this.usuarioService.verificarCorreo(this.correo).subscribe(
          (usuario) => {
            this.usuario = usuario;
            if (usuario && usuario.usuario_correo !== null) {
              if(usuario.usuario_rol=='Administrador'){
                console.log('Es un administrador')
              }
              else{
                console.log('Es un docente')
              }
              this.handleLoginSuccess();
            }
          },
          (error) => {
            this.showSnackBar('No se encontró su correo registrado, comuníquese con el administrador');
          }
        );
      }
    });
    if (this.isLoggedin) {
      
      this.router.navigate(['/home']);
    }
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
    this.clearLocalStorage();
  }

  private handleLoginSuccess(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('isLoggedin', JSON.stringify(true));
      localStorage.setItem('user', JSON.stringify(this.socialUser));
      localStorage.setItem('usuario', JSON.stringify(this.usuario));
    } else if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('isLoggedin', JSON.stringify(true));
      sessionStorage.setItem('user', JSON.stringify(this.socialUser));
      sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
    } else {
      console.log('Web Storage is not supported in this environment.');
    }    this.router.navigate(['/listar']);
  }

  private showSnackBar(message: string): void {
    this._snackBar.open(message, 'Cerrar', {
      duration: 5000, 
    });
  }

  private clearLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('isLoggedin');
    } else if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('isLoggedin');
    } else {
      console.log('Web Storage is not supported in this environment.');
    }
  }
}
