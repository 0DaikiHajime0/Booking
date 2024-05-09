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
  token:string='';
  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router,
    private usuarioService: UsuarioService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if(typeof localStorage !== 'undefined'){
        if(!localStorage.getItem('usuario')){
          this.logOut();  
        }
          this.socialAuthService.authState.subscribe((user) => {
            this.socialUser = user;
            this.isLoggedin = user != null;
            if (this.socialUser && this.socialUser.email) {
              this.correo = this.socialUser.email;
              this.usuarioService.verificarCorreo(this.correo).subscribe(
                (result) => {
                  if(result){
                    this.usuario = result.usuario;
                    this.token = result.token
                    this.handleLoginSuccess();
                  }
                },
                (error) => {
                  this.showSnackBar('No se encontró su correo registrado, comuníquese con el administrador');
                }
              );
            }
          });
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
      localStorage.setItem('usuario',JSON.stringify(this.usuario))
      localStorage.setItem('token',JSON.stringify(this.token))
      this.router.navigate(['/listar']);
    } else if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('isLoggedin', JSON.stringify(true));
      sessionStorage.setItem('user', JSON.stringify(this.socialUser));
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
      localStorage.removeItem('usuario')
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    } else if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('isLoggedin');
      sessionStorage.removeItem('usuario')
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')
    } else {
      console.log('Web Storage is not supported in this environment.');
    }
  }
}
