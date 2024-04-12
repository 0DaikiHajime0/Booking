import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  usuario!:Usuario;
  correoFormControl = new FormControl('', [Validators.required, Validators.email]);
  nombresFormControl = new FormControl('',[Validators.required]);
  apellidosFormControl = new FormControl('',[Validators.required]);
  rolFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  constructor(
    private usuarioService:UsuarioService,
    private _snackBar: MatSnackBar

  ){
    this.obtenerUsuario();
  }
  obtenerUsuario(): void {
    if(this.usuarioService.getUsuarioFromStorage()){
      this.usuario=this.usuarioService.getUsuarioFromStorage();
      this.nombresFormControl.setValue(this.usuario.usuario_nombres)
      this.apellidosFormControl.setValue(this.usuario.usuario_apellidos)
      this.rolFormControl.setValue(this.usuario.usuario_rol)
      this.correoFormControl.setValue(this.usuario.usuario_correo)
    }
  }
  guardar(){
    this._snackBar.open('Perfil de usuario guardado', 'Cerrar', {
      duration: 5000, 
    });
  }

}
