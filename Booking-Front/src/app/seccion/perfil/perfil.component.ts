import { Component, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, FormsModule, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Perfil } from '../../models/Perfil';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  usuario!: Usuario;
  perfil!:Perfil;
  correoFormControl = new FormControl('', [Validators.required, Validators.email]);
  nombresFormControl = new FormControl('', [Validators.required]);
  apellidosFormControl = new FormControl('', [Validators.required]);
  rolFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  constructor(
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.obtenerUsuario();
  }
  async obtenerUsuario(): Promise<void> {
    try {
      if (this.usuarioService.getUsuarioFromStorage()) {
        this.usuario = this.usuarioService.getUsuarioFromStorage();
        this.correoFormControl.setValue(this.usuario.usuario_correo);
      }
      this.usuario = await this.usuarioService.getUsuarioInfo(this.usuario.usuario_correo);
      this.nombresFormControl.setValue(this.usuario.usuario_nombres);
      this.apellidosFormControl.setValue(this.usuario.usuario_apellidos)
      this.rolFormControl.setValue(this.usuario.usuario_rol)
    } catch (error) {
      console.error('Error al obtener usuario:', error);
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(GuardarCambiosDialog, {
      data: { 
        perfil: { 
          usuario_correo: this.correoFormControl.value,
          usuario_nombres: this.nombresFormControl.value,
          usuario_apellidos: this.apellidosFormControl.value
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'guardar') {
        // Aquí puedes realizar alguna acción adicional si lo necesitas
      }
    });
  }
  
}

@Component({
  selector: 'app-guardar-cambios-dialog',
  templateUrl: '../dialog/guardar-cambios.html',
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
export class GuardarCambiosDialog {
  constructor(
    public dialogRef: MatDialogRef<GuardarCambiosDialog>, 
    private usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {}

  cancelar(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    const perfilActualizado: Perfil = this.data.perfil;
    this.usuarioService.guardarInfoPerfil(perfilActualizado).subscribe(
      () => {
        this.dialogRef.close('guardar');
        this._snackBar.open('Perfil de usuario guardado', 'Cerrar', { duration: 5000 });
      },
      error => {
        console.error('Error al guardar el perfil:', error);
      }
    );
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
