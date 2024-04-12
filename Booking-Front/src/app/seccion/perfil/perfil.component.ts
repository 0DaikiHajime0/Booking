import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, FormsModule, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector:'app-guardar-cambios',
  templateUrl:'../dialog/guardar-cambios.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class GuardarCambios {
  constructor(
    public dialogRef: MatDialogRef<GuardarCambios>,
    private _snackBar: MatSnackBar,

  ) {}

  onNoClick(): void {
    this.dialogRef.close();
    
  }
  GuardarCambios():void{
    this.dialogRef.close();
    this._snackBar.open('Perfil de usuario guardado', 'Cerrar', {
      duration: 5000, 
    });
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
    public dialog: MatDialog

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
  openDialog(): void {
    const dialogRef = this.dialog.open(GuardarCambios, {
    });
  }
  guardar(){
    this.openDialog()
    
  }

}
