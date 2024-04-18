import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../models/Usuario';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Recurso } from '../../models/Recurso';
import { RecursoService } from '../../services/recurso.service';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrl: './recursos.component.css'
})
export class RecursosComponent {
  recursos: Recurso[] = []; 
  columnas: string[] = ['ID', 'Nombre', 'Estado', 'Empresa', 'Cantidad Credenciales','Editar'];
  dataSource: MatTableDataSource<Recurso> = new MatTableDataSource<Recurso>(this.recursos);
  valor!: string
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private recursoservice: RecursoService,
    public dialog: MatDialog,

  ) {}

  ngOnInit() {
    this.getRecursos();
  }

  async getRecursos() {
    try {
      this.recursos = await this.recursoservice.getRecursos();
      this.dataSource = new MatTableDataSource<Recurso>(this.recursos);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  }
  aplicarFiltro(valor: string) {
    valor = valor.trim().toLowerCase();
    this.dataSource.filter = valor;
  }
  editarRecurso(id: number): void {
    const recurso = this.recursos.find(r => r.recurso_id === id);
    if (recurso) {
        const dialogRef = this.dialog.open(EditarRecurso, {
            data: { recurso }
        });
        /*dialogRef.afterClosed().subscribe(result => {
          this.usuarioService.editarUsuario(result.usuario_id,result);
            if (result) {
                const index = this.usuarios.findIndex(u => u.usuario_id === id);
                if (index !== -1) {
                    this.usuarios[index] = result;
                    this.dataSource.data = [...this.usuarios];
                }
            }
        });*/
    } else {
        console.error('Recurso no encontrado');
    }
}

habilitardeshabilitar(id:number){
  /*
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
          if(result.usuario_estado=='Desactivado'){
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
    )*/
  }
}
@Component({
  selector:'app-editar-recurso',
  templateUrl:'./editar-recurso.html',
  styleUrls:['./editar-recurso.css'],
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
export class EditarRecurso{
  nuveousuario!:Usuario
  constructor(
    public dialogRef: MatDialogRef<EditarRecurso>,
    private _snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any

  ){
    this.nuveousuario={...data.usuario}
  }
  cerrar():void{
    this.dialogRef.close();
  }
  
}