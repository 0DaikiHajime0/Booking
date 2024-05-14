import { Component, Inject, ViewChild } from '@angular/core';
import { Asignatura } from '../../models/Asignatura';
import { RecursoService } from '../../services/recurso.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css']
})
export class AsignaturasComponent {
  asignaturasbyasignatura: MatTableDataSource<Asignatura> = new MatTableDataSource<Asignatura>(); 
  dsAsignatura: MatTableDataSource<Asignatura>; 
  columnaAsignatura: string[] = ['curso_id', 'curso_nombre', 'curso_estado', 'curso_descripcion', 'curso_plan'];
  columnaAsignaturas: string[] = ['curso_horario','curso_tipo','nrc','docente_curso_cantidad_alumnos','curso_modalidad','curso_campus'];

  @ViewChild('paginatorAsignatura') paginatorAsignatura!: MatPaginator;
  @ViewChild('paginatorAsignaturasbyAsignatura') paginatorAsignaturasbyAsignatura!: MatPaginator;
  asignaturaSelecciona!:Asignatura
  constructor(
    private serviceAsignatura: RecursoService,
    public dialog: MatDialog
  ){
    this.dsAsignatura = new MatTableDataSource<Asignatura>(); 
    this.serviceAsignatura.getAsignaturas().subscribe(
      result=>{
        this.dsAsignatura.data = result;
      }
    );
  }

  ngAfterViewInit(){
    this.dsAsignatura.paginator = this.paginatorAsignatura;
  }

  asignaturaSeleccionada(asignatura:Asignatura){
    this.asignaturaSelecciona = asignatura
    this.serviceAsignatura.getAsignaturasbyAsignaturas(asignatura).subscribe(
      result=>{
        this.asignaturasbyasignatura.data = result;
        if(this.asignaturasbyasignatura.data){
          this.asignaturasbyasignatura.paginator = this.paginatorAsignaturasbyAsignatura;
        }
      }
    );
  }
  buscarCurso(valor:string){
    valor = valor.trim().toLowerCase();
    this.dsAsignatura.filter=valor
  }
  buscarAsignatura(valor:string){
    valor = valor.trim().toLowerCase();
    this.asignaturasbyasignatura.filter=valor
  }
  nuevoCurso(){
    const dialogRef = this.dialog.open(NuevoCurso)
  }
}
@Component({
  selector: 'app-nuevo-curso',
  templateUrl: 'nuevo-curso.html',
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
export class NuevoCurso {
  asignaturas!:Asignatura[]
  advertencia:string=''
  constructor(
    public dialogRef: MatDialogRef<NuevoCurso>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private recursoService:RecursoService
  ) {
    recursoService.getAsignaturas().subscribe(
      result=>{
        this.asignaturas = result
      }
    )
  }
  buscarCurso(valor: string) {
    valor = valor.trim().toLowerCase();
    this.asignaturas = this.asignaturas.filter(asignatura => {
      return asignatura.curso_nombre.toLowerCase().includes(valor);
    });
    
  }
  verificarCurso(){
    if(this.asignaturas.length>=1){
      this.advertencia = `Una asignatura ya tiene ese nombre` + this.asignaturas
    }else{
      this.advertencia = ``
    }
  }
  
  cerrar(): void {
    this.dialogRef.close();
  }
}
