import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { UsuarioService } from '../../services/login.service';
import { Usuario } from '../../models/Usuario';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { GuardarCambiosDialog } from '../perfil/perfil.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import { HabilitarComponent } from '../dialog/habilitar/habilitar.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = []; 
  columnas: string[] = ['ID', 'Nombres', 'Apellidos', 'Correo', 'Rol', 'Estado','Editar'];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>(this.usuarios);
  valor!: string
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usuarioService: UsuarioService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar

  ) {}

  ngOnInit() {
    this.getUsuarios();
  }

  async getUsuarios() {
    try {
      this.usuarios = await this.usuarioService.getUsuarios();
      this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  }
  aplicarFiltro(valor: string) {
    valor = valor.trim().toLowerCase();
    this.dataSource.filter = valor;
  }
  editarUsuario(id: number): void {
    const usuario = this.usuarios.find(u => u.usuario_id === id);
    if (usuario) {
        const dialogRef = this.dialog.open(EditarUsuario, {
            data: { usuario }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.usuarioService.editarUsuario(result.usuario_id,result);
            if (result) {
                const index = this.usuarios.findIndex(u => u.usuario_id === id);
                if (index !== -1) {
                    this.usuarios[index] = result;
                    this.dataSource.data = [...this.usuarios];
                }
            }
        });
    } else {
        console.error('Usuario no encontrado');
    }
}
nuevoUsuario(): void {
  const dialogRef = this.dialog.open(NuevoUsuario);
  dialogRef.afterClosed().subscribe(
    async result => {
      if (result) {
        try {
          const response = await this.usuarioService.nuevoUsuario(result);
          if (response instanceof HttpErrorResponse && response.error instanceof Error) {
            this.mostrarSnackbar('Error: ' + response.error.message, 'error');
          } else {
            this.mostrarSnackbar('Usuario creado exitosamente', 'success');
            this.getUsuarios();
          }
        } catch (error) {
          this.mostrarSnackbar('Error: ' + (error instanceof Error ? error.message : 'Error desconocido'), 'error');
        }
      }
    }
  );
  this.getUsuarios()
}



habilitardeshabilitar(id:number){
    const usuario = this.usuarios.find(u => u.usuario_id === id);
    let estado = usuario?.usuario_estado
    const dialogRef = this.dialog.open(HabilitarComponent,
      {
        data : {
          usuario,
          tipo:'Usuario',
          estado:estado
        }
      }
    )
    dialogRef.afterClosed().subscribe(
      result=>{
        if (result) {
          if(result.usuario_estado=='Inactivo'){
            this.usuarioService.deshabilitarUsuario(result.usuario_id)
          }else{
            this.usuarioService.habilitarUsuario(result.usuario_id)

          }
          const index = this.usuarios.findIndex(u => u.usuario_id === id);
          if (index !== -1) {
              this.usuarios[index] = result;
              this.dataSource.data = [...this.usuarios];
          }
      }
      }
    )
  }
  mostrarSnackbar(message: string, tipo: string): void {
    this._snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: [tipo == 'error' ? 'snackbar-error' : 'snackbar-success']
    });
  }
}
@Component({
  selector:'app-editar-usuario',
  templateUrl:'./editar-usuario.html',
  styleUrls:['./editar-usuario.css'],
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
export class EditarUsuario{
  nuveousuario!:Usuario
  usuario_nombre:string='existe'
  constructor(
    public dialogRef: MatDialogRef<EditarUsuario>,
    private _snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any

  ){
    this.nuveousuario={...data.usuario}
  }
  cerrar():void{
    this.dialogRef.close();
  }
  
}
@Component({
  selector:'app-nuevo-usuario',
  templateUrl:'./editar-usuario.html',
  styleUrls:['./editar-usuario.css'],
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
export class NuevoUsuario{
  nuveousuario:Usuario={
    usuario_nombres:'',
    usuario_apellidos:'',
    usuario_estado:'',
    usuario_id:0,
    usuario_correo:'',
    usuario_rol:''
  }
  usuario_nombre:string=''
  constructor(
    public dialogRef: MatDialogRef<NuevoUsuario>,
    private _snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any

  ){
    
  }
  cerrar():void{
    this.dialogRef.close();
  }
  
}