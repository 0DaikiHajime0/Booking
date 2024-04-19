import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../models/Usuario';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Recurso } from '../../models/Recurso';
import { RecursoService } from '../../services/recurso.service';
import { Asignatura } from '../../models/Asignatura';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrl: './recursos.component.css'
})
export class RecursosComponent {
  recursos: Recurso[] = []; 
  asignaturas:Asignatura[] = [];
  columnas: string[] = ['recurso_id', 'recurso_nombre', 'recurso_estado', 'recurso_empresa', 'recurso_cant_credenciales','Editar'];
  columnasAsignatura : string[] =['ID','Nombre','Estado','Descripcion','Cantidad','NRC']
  dataSource: MatTableDataSource<Recurso> = new MatTableDataSource<Recurso>();
  dataSourceAsignatura: MatTableDataSource<Asignatura> = new MatTableDataSource<Asignatura>(this.asignaturas)
  valor!: string
  cargando=false
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  recursoSeleccionado : number = 0
  constructor(private recursoservice: RecursoService,
    public dialog: MatDialog,

  ) {}

  ngOnInit() {
    this.getRecursos();
   
  }
  seleccionarRecurso(recurso: any){
    this.recursoSeleccionado = recurso.recurso_id;
    this.getAsignaturas(this.recursoSeleccionado);
  }

  async getRecursos() {
    try {
      this.recursos = await this.recursoservice.getRecursos();
      this.dataSource = new MatTableDataSource<Recurso>(this.recursos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  }
  async getAsignaturas(recurso_id: number) {
    try {
      this.cargando = true;
      this.asignaturas = await this.recursoservice.getAsignaturasByRecurso(recurso_id);
      this.dataSourceAsignatura = new MatTableDataSource<Asignatura>(this.asignaturas);
    } catch (error) {
      console.error('Error al obtener asignaturas:', error);
    } finally {
      this.cargando = false;
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
        dialogRef.afterClosed().subscribe(result => {
          this.recursoservice.editarRecurso(result);
            if (result) {
                const index = this.recursos.findIndex(u => u.recurso_id === id);
                if (index !== -1) {
                    this.recursos[index] = result;
                    this.dataSource.data = [...this.recursos];
                }
            }
        });
    } else {
        console.error('Recurso no encontrado');
    }
}
crearRecurso(){
  const recursos = this.recursos
  const dialogRef = this.dialog.open(CrearRecurso,{
    data:{
      recursos
    }
  })
  dialogRef.afterClosed().subscribe(
    result=>{
      if(result){
        this.recursoservice.guardarRecurso(result);
        this.getRecursos()  
      }
    }
  )

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
  styleUrls:['../usuarios/editar-usuario.css'],
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
  editarRecurso!:Recurso
  constructor(
    public dialogRef: MatDialogRef<EditarRecurso>,
    private _snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any

  ){
    this.editarRecurso={...data.recurso}

  }
  cerrar():void{
    this.dialogRef.close();
  }
  
}
@Component({
  selector:'app-crear-recurso',
  templateUrl:'./crear-recurso.html',
  styleUrls:['../usuarios/editar-usuario.css'],
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
    MatSelectModule,
    ReactiveFormsModule,
  ]
})
export class CrearRecurso {
  recursosExistentes: Recurso[] = [];
  nuevoRecurso: Recurso = new Recurso(0,'','','',0);
  recursoIngresado!:string
  cantMayor0 =false;
  constructor(
    public dialogRef: MatDialogRef<CrearRecurso>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.recursosExistentes = data.recursos;
    this.recursosExistentes=this.recursosExistentes.map(r=>({
      ...r,
      recurso_nombre:r.recurso_nombre.toLowerCase()
    }))
    this.recursoIngresado=this.nuevoRecurso.recurso_nombre.toLowerCase()
  }
  nombreRepetido(): boolean {
    return this.recursosExistentes.some(r => r.recurso_nombre === this.nuevoRecurso.recurso_nombre.toLowerCase());
  }
  cerrar(): void {
    this.dialogRef.close();
  }
}