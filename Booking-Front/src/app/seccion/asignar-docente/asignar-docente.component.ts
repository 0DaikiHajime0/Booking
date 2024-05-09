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
import {ListarAsignarturaAsignada} from '../../models/ListarAsignaturaAsignada'
import {EditarAsignacion} from '../../models/EditarAsignacion'
import { MatSnackBar } from '@angular/material/snack-bar';


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

@Component({
  selector: 'app-asignar-docente',
  templateUrl: './asignar-docente.component.html',
  styleUrls: ['./asignar-docente.component.css']
})
export class AsignarDocenteComponent implements AfterViewInit {
  docentes: Usuario[] = [];
  asignaturas: Asignatura[] = [];
  asignadutarasaasignar: AsignaturanoAsignada[] = [];
  listarAsignacion :ListarAsignarturaAsignada[] = [];
  displayedColumns1: string[] = ['id', 'Docente', 'Correo'];
  displayedColumns2: string[] = ['nrc', 'curso_nombre', 'docente_curso_cantidad_alumnos', 'curso_periodo', 'curso_campus', 'curso_modalidad', 'acciones'];
  docenteSeleccionado: number = 0;
  CursoSeleccionado: number = 0;
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
      const id_docente =this.docenteSeleccionado
      this.asignardocenteService.listarCursonoAsignado().subscribe(
        (cursos: AsignaturanoAsignada[]) => {
          const dialogRef = this.dialog.open(AsignarDocenteCurso, {
            data: {
              cursos: cursos,
              id_docente: this.docenteSeleccionado
            }
        })
      });
    } else {
      console.error("Error: No se ha seleccionado un Curso");
    }
  }
  openDialog2(cursoId: number): void {
    this.CursoSeleccionado = cursoId;
    this.asignardocenteService.listartCursoDocenteasignado(this.CursoSeleccionado).subscribe(
      (asignacion: ListarAsignarturaAsignada[]) => {
        this.listarAsignacion = asignacion;
        const dialogRef = this.dialog.open(EditarDocenteCurso, {
          data: {
            asignacion: this.listarAsignacion
          }
        });
      }
    );
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
  asignarcurso: Asignar = new Asignar (0, 0, 0, '', '', '','', '', '','','');
  asignadutarasaasignar: AsignaturanoAsignada[] = [];
  asignar! :Asignar;
  id_docente: number;
  asignarCursoRef: Function;

  constructor(
    private snackBar: MatSnackBar,
    private asignardocenteService: AsignarDocenteService,
    public dialogRef: MatDialogRef<AsignarDocenteCurso>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.asignadutarasaasignar = data.cursos;
    this.id_docente = data.id_docente;
    this.asignarCursoRef = data.asignarCursoRef;
  }

  asignarCurso() {
    this.asignarcurso.id_docente = this.id_docente;
    this.asignarcurso.horario_curso = null;
    this.asignarcurso.cantidad_alumnos = Number(this.asignarcurso.cantidad_alumnos);
    console.log(this.asignarcurso);

    this.asignardocenteService.asignarDocenteCurso(this.asignarcurso).subscribe(
      (response: any) => {
          const responseData = response[0];
          if (responseData.Estatus == '201') {
              this.dialogRef.close();
              this.snackBar.open(responseData.Mensaje, 'Cerrar', {
                  duration: 5000
              });
          } else if (responseData.Estatus == '401') {
              this.snackBar.open(responseData.Mensaje, 'Cerrar', {
                  duration: 5000
              });
          } else {
              this.snackBar.open('neutro', 'Cerrar', {
                  duration: 5000
              });
          }
      },
      (error: any) => {
          this.snackBar.open('Error: No se pudo completar la solicitud', 'Cerrar', {
              duration: 3000
          });
      }
  );

}

    onNoClick(): void {
      this.dialogRef.close();
    }
  }


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './editar.html',
  styleUrls: ['./editar.css'],
  standalone: true,
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
export class EditarDocenteCurso {
   listarAsignacion: ListarAsignarturaAsignada[] = []
   asignarcurso: Asignar
   nrc_anterior = '';
   editar! : EditarAsignacion;
  constructor(
    private snackBar: MatSnackBar,
    private asignardocenteService: AsignarDocenteService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      const primerElemento: ListarAsignarturaAsignada = data.asignacion[0];
      this.nrc_anterior = primerElemento.nrc;
      this.asignarcurso = new Asignar(
        primerElemento.docente_curso_cantidad_alumnos,
        primerElemento.curso_id,
        primerElemento.docente_id,
        primerElemento.nrc,
        primerElemento.curso_modalidad,
        primerElemento.curso_campus,
        primerElemento.curso_periodo,
        primerElemento.curso_horario !== null ? primerElemento.curso_horario : '',
        primerElemento.curso_tipo,
        this.formatearFecha(primerElemento.curso_inicio),
        this.formatearFecha(primerElemento.curso_fin)
      );
  }
  editarAsignacion(){
    this.editar = {
        id_curso: this.asignarcurso.id_curso,
        id_docente: this.asignarcurso.id_docente,
        nrc_anterior: this.nrc_anterior,
        cantidad_alumnos: this.asignarcurso.cantidad_alumnos,
        nrc_curso: this.asignarcurso.nrc_curso,
        periodo_curso: this.asignarcurso.periodo_curso,
        campus_curso: this.asignarcurso.campus_curso,
        modalidad_curso: this.asignarcurso.modalida_curso,
        curso_inicio : this.formatearFecha(this.asignarcurso.curso_inicio),
        curso_fin: this.formatearFecha(this.asignarcurso.curso_fin)
    };

    this.asignardocenteService.editarDocenteCurso(this.editar).subscribe(
        (response: any) => {
            const responseData = response[0];
            if (responseData.estatus == '201') {
                this.dialogRef.close();
                this.snackBar.open(responseData.Mensaje, 'Cerrar', {
                    duration: 3000
                });
            } else if (responseData.estatus == '401') {
                this.snackBar.open(responseData.Mensaje, 'Cerrar', {
                    duration: 3000
                });
            } else {
                this.snackBar.open('neutro', 'Cerrar', {
                    duration: 3000
                });
            }
        },
        (error: any) => {
            this.snackBar.open('Error: No se pudo completar la solicitud', 'Cerrar', {
                duration: 3000
            });
        }
    );
}

  onNoClick(): void {
    this.dialogRef.close();
  }
  formatearFecha(fecha: string): string {
    const fechaDate: Date = new Date(fecha);
    const fechaFormateada = fechaDate.toISOString().split('T')[0];
    return fechaFormateada;
  }
}

