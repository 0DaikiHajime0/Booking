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

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = []; 
  columnas: string[] = ['ID', 'Nombres', 'Apellidos', 'Correo', 'Rol', 'Estado','Editar','Deshabilitar'];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>(this.usuarios);
  valor!: string
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usuarioService: UsuarioService,
    public dialog: MatDialog,

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
    } else {
        console.error('Usuario no encontrado');
    }
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
  usuario!:Usuario
  rolPredeterminado!:string
  constructor(
    public dialogRef: MatDialogRef<EditarUsuario>,
    private usuarioService : UsuarioService,
    private _snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any

  ){
    this.usuario = data.usuario;
    this.rolPredeterminado = this.usuario.usuario_rol;
    console.log(this.rolPredeterminado)
  }
  guardarEditarUsuario():void{
    this.usuarioService.editarUsuario(this.usuario)
  }
  
}