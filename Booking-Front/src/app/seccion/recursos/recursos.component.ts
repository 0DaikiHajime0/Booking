import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  asignaturasFiltradas:Asignatura[]=[]
  columnas: string[] = ['recurso_id', 'recurso_nombre', 'recurso_estado', 'recurso_empresa', 'recurso_cant_credenciales','Editar'];
  columnasAsignatura : string[] =['curso_id','curso_nombre','curso_estado','curso_descripcion','docente_curso_cantidad_alumnos','nrc']
  columnaAsignaturaFiltrada :string[] = ['ID','Nombre','Estado','Descripcion']
  dataSource: MatTableDataSource<Recurso> = new MatTableDataSource<Recurso>();
  dataSourceAsignaturaFiltrada : MatTableDataSource<Asignatura> = new MatTableDataSource<Asignatura>(this.asignaturasFiltradas)
  dataSourceAsignatura: MatTableDataSource<Asignatura> = new MatTableDataSource<Asignatura>(this.asignaturas)
  valor!: string
  cargando=false
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('sort1') sort1!: MatSort;
  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild('sort2') sort2!: MatSort;
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
      this.dataSource.paginator = this.paginator1;
      this.dataSource.sort = this.sort1;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  }
  async getAsignaturas(recurso_id: number) {
    try {
      this.cargando = true;
      this.asignaturas = await this.recursoservice.getAsignaturasByRecurso(recurso_id);
      this.realizarFiltro()
      this.dataSourceAsignatura = new MatTableDataSource<Asignatura>(this.asignaturas);
      this.dataSourceAsignatura.paginator = this.paginator2;
      this.dataSourceAsignatura.sort = this.sort2;
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
realizarFiltro(): void {
  let cursoIdsUnicos = new Set(this.asignaturas.map(asignatura => asignatura.curso_id));
  let asignaturasUnicas = Array.from(cursoIdsUnicos).map(cursoId => {
      return this.asignaturas.find(asignatura => asignatura.curso_id === cursoId);
  });
  this.asignaturasFiltradas = asignaturasUnicas.filter(asignatura => asignatura !== undefined) as Asignatura[];
  this.dataSourceAsignaturaFiltrada = new MatTableDataSource<Asignatura>(this.asignaturasFiltradas);
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
