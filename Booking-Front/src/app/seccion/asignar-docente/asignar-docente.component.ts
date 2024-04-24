import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AsignarDocenteService } from '../../services/asignardocente.Service';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../../models/Usuario';
import { Asignatura } from '../../models/Asignatura';

@Component({
  selector: 'app-asignar-docente',
  templateUrl: './asignar-docente.component.html',
  styleUrls: ['./asignar-docente.component.css']
})
export class AsignarDocenteComponent implements AfterViewInit {

  docentes: Usuario[] = [];
  asignaturas: Asignatura[] = [];
  displayedColumns1: string[] = ['id', 'Docente', 'Correo'];
  displayedColumns2: string[] = ['nrc', 'curso_nombre', 'docente_curso_cantidad_alumnos', 'curso_periodo', 'curso_campus', 'curso_modalidad','acciones'];
  animal: string = '';
  name: string = '';
  docenteSeleccionado: number = 0;

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

  seleccionarDocente(docente: Usuario) {
    this.docenteSeleccionado = docente.usuario_id;
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
}
