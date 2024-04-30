import { Component, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AsignarDocenteService } from '../../services/asignardocente.Service';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../../models/Usuario';
import { Asignatura } from '../../models/Asignatura';
import { AsignaturanoAsignada } from '../../models/AsignaturaNoAsignadas'
import { MatSelectModule } from '@angular/material/select';
import { Asignar } from '../../models/Asignar'

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { response } from 'express';

@Component({
  selector: 'app-asignar-docente',
  templateUrl: './asignar-docente.component.html',
  styleUrls: ['./asignar-docente.component.css']
})
export class AsignarDocenteComponent implements AfterViewInit {
  docentes: Usuario[] = [];
  asignaturas: Asignatura[] = [];
  asignadutarasaasignar: AsignaturanoAsignada[] = [];
  displayedColumns1: string[] = ['id', 'Docente', 'Correo'];
  displayedColumns2: string[] = ['nrc', 'curso_nombre', 'docente_curso_cantidad_alumnos', 'curso_periodo', 'curso_campus', 'curso_modalidad', 'acciones'];
  docenteSeleccionado: number = 0;
  docenteSeleccionadoBool: boolean = false;


  docentedata: MatTableDataSource<Usuario>;
  cursodata: MatTableDataSource<Asignatura>;
  @ViewChild('docentePaginator') docentePaginator!: MatPaginator;
  @ViewChild('cursoPaginator') cursoPaginator!: MatPaginator;

  constructor(
    private asignardocenteService: AsignarDocenteService,
    public dialog: MatDialog
  ) {
    this.docentedata = new MatTableDataSource<Usuario>();
    this.cursodata = new MatTableDataSource<Asignatura>();
  }
  openDialog(): void {
    if (this.docenteSeleccionado !== 0) {
      this.asignardocenteService.listarCursonoAsignado().subscribe(
        (cursos: AsignaturanoAsignada[]) => {
          const dialogRef = this.dialog.open(AsignarDocenteCurso, {
            data: {
              cursos: cursos,
              id_docente: this.docenteSeleccionado,
              asignarCursoRef: this.asignarCurso.bind(this)
            }
          });
        }
      );
    } else {
      console.error("Error: No se ha seleccionado un docente.");
    }
  }


  ngOnInit(): void {
    this.listarDocentes();
  }

  ngAfterViewInit() {
    this.docentedata.paginator = this.docentePaginator;
    this.cursodata.paginator = this.cursoPaginator;
  }

  listarDocentes(): void {
    this.asignardocenteService.listardocentes().subscribe(
      (docentes: Usuario[]) => {
        this.docentes = docentes;
        this.docentedata.data = this.docentes;
        this.docentedata.paginator = this.docentePaginator;
      }
    );
  }


  listarCurso(id: number) {
    this.asignardocenteService.listarCurso(id).subscribe(
      (cursos: Asignatura[]) => {
        this.asignaturas = cursos;
        this.cursodata.data = this.asignaturas;
        this.cursodata.paginator = this.cursoPaginator;
      }
    );
  }

  listarcursosnoaignado(): void {
    this.asignardocenteService.listarCursonoAsignado().subscribe(
      (cursos: AsignaturanoAsignada[]) => {
        this.asignadutarasaasignar = cursos;
        const dialogRef = this.dialog.open(AsignarDocenteCurso, { data: { cursos: this.asignadutarasaasignar } });
      }
    );
  }
  seleccionarDocente(docente: Usuario) {
    this.docenteSeleccionado = docente.usuario_id;
    this.docenteSeleccionadoBool = true;
    this.listarCurso(this.docenteSeleccionado);
  }

  docenteFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.docentedata.filter = filterValue.trim().toLowerCase();
    if (this.docentedata.paginator) {
      this.docentedata.paginator.firstPage();
    }
  }

  cursoFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.cursodata.filter = filterValue.trim().toLowerCase();
    if (this.cursodata.paginator) {
      this.cursodata.paginator.firstPage();
    }

  }

  asignarCurso(asignarcurso: Asignar) {
    asignarcurso.id_docente = this.docenteSeleccionado; // Asignar el id_docente aquí
    this.asignardocenteService.asignarDocenteCurso([asignarcurso]).subscribe(
      (response:any)=>{
        console.log()
      }
    )
    //this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './asignar.html',
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
    MatSelectModule,
    ReactiveFormsModule,
  ]
})
export class AsignarDocenteCurso {
  asignarcurso: Asignar = new Asignar (0, 0, 0, '', '', '','', '', '');
  asignadutarasaasignar: AsignaturanoAsignada[] = [];
  asignar! :Asignar;
  id_docente: number;
  asignarCursoRef: Function;

  constructor(
    private asignardocenteService: AsignarDocenteService,
    public dialogRef: MatDialogRef<AsignarDocenteCurso>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.asignadutarasaasignar = data.cursos;
    this.id_docente = data.id_docente;
    this.asignarCursoRef = data.asignarCursoRef;
  }

  asignarCurso() {
    this.asignarCursoRef();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
