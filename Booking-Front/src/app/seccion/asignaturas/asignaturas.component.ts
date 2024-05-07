import { Component, ViewChild } from '@angular/core';
import { Asignatura } from '../../models/Asignatura';
import { RecursoService } from '../../services/recurso.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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
    private serviceAsignatura: RecursoService 
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
}

