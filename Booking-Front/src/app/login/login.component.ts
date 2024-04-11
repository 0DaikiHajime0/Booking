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
  socialUser!: SocialUser;
  isLoggedin?: boolean=false;
  usuario!:Usuario;
  correo!:string;
  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router,
    private usuarioService:UsuarioService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const isLoggedinStr = localStorage.getItem('isLoggedin');
      this.isLoggedin = isLoggedinStr ? JSON.parse(isLoggedinStr) : false;
    } else if (typeof sessionStorage !== 'undefined') {
      const isLoggedinStr = sessionStorage.getItem('isLoggedin');
      this.isLoggedin = isLoggedinStr ? JSON.parse(isLoggedinStr) : false;
    } else {
      console.log('Web Storage is not supported in this environment.');
    }
    if(this.isLoggedin){
      this.router.navigate(['/home']);
    }else{
      this.socialAuthService.authState.subscribe((user) => {
        this.socialUser = user;
        this.isLoggedin = user != null;
        if(this.socialUser.email){  
          this.correo=this.socialUser.email
          this.usuarioService.verificarCorreo(this.correo).subscribe((usuario)=>{
            this.usuario = usuario;
            if(usuario.usuario_correo==null){
              this._snackBar.open('No se encontró su correo registrado, comuniquese con el administrador', 'cerrar');
            }else{
              if (typeof localStorage !== 'undefined') {
                localStorage.setItem('isLoggedin', JSON.stringify(this.isLoggedin));
                localStorage.setItem('user',JSON.stringify(this.socialUser))
              } else if (typeof sessionStorage !== 'undefined') {
                sessionStorage.setItem('isLoggedin', JSON.stringify(this.isLoggedin));
                sessionStorage.setItem('user',JSON.stringify(this.socialUser))
              } else {
                console.log('Web Storage is not supported in this environment.');
              }
              this.router.navigate(['/home']);
              console.log(this.socialUser);
            }
          })
        }
      });
      }
    }
    

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    
  }
  logOut(): void {
    this.socialAuthService.signOut();
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('isLoggedin');
    } else if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('isLoggedin');
    } else {
      console.log('Web Storage is not supported in this environment.');
    }
  }

}