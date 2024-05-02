import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from '../../../services/login.service';
import { Usuario } from '../../../models/Usuario';
import { timeLog } from 'console';
import { C } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-root',
  templateUrl: 'habilitar.component.html',
  standalone:true,
  imports:[
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule
  ]
})
export class HabilitarComponent {
    info!:any;
    estado!:string
    tipo!:string
    activo:string='Activo';
    inactivo:string ='Inactivo'
    constructor(
        public dialogRef: MatDialogRef<HabilitarComponent>,
        private usuarioService:UsuarioService,
        private _snackBar:MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any
    ){
        this.info = {...data}
        this.estado=this.info.estado
        this.tipo = this.info.tipo
        if(this.info.estado==this.activo){
            this.estado='desactivar';
        }else{
            this.estado='activar';
        }
    }
   usuarioDeshabilitarHabilitar(){
    if(this.estado=='desactivar'){
        const usuarioestado = { ...this.info.usuario };
        usuarioestado.usuario_estado = 'Inactivo';
        return usuarioestado
    }else{
        const usuarioestado = { ...this.info.usuario };
        usuarioestado.usuario_estado = 'Activo';
        return usuarioestado
    }
   }
    mostrarSnackBar(message:string){
        this._snackBar.open(message,'Cerrar')
    }
    cerrar():void{
        this.dialogRef.close();
    }
}