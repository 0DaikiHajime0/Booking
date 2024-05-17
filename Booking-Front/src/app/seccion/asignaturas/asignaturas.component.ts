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
import { MatSelectModule } from '@angular/material/select';
import { Recurso } from '../../models/Recurso';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

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
  nuevoCurso() {
    const dialogRef = this.dialog.open(NuevoCurso);
    
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        console.log('Datos recibidos del diálogo:', result);
        (await this.serviceAsignatura.guardarCurso(result)).subscribe({
          next: (response) => {
            console.log('Curso guardado exitosamente:', response);
          },
          error: (error) => {
            console.error('Error al guardar el curso:', error);
          }
        });
      } else {
        console.log('El diálogo fue cerrado sin datos');
      }
    });
  }  
}
@Component({
  selector: 'app-nuevo-curso',
  templateUrl: 'nuevo-curso.html',
  styleUrls:['../usuarios/editar-usuario.css'],
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
    MatAutocompleteModule
  ],
})
export class NuevoCurso {
  asignaturas!: Asignatura[];
  advertencia: string = '';
  nuevoCurso: Asignatura = new Asignatura(0,0,'','Activo','',0,'','','','','','','',''); 
  recursos!:Recurso[]
  selectedRecurso:Recurso=new Recurso(0,'','','',0)
  constructor(
    public dialogRef: MatDialogRef<NuevoCurso>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private recursoService: RecursoService
  ) {
    this.nuevoCurso.curso_estado = 'Activo';
    this.recursoService.getAsignaturas().subscribe(
      result => {
        this.asignaturas = result;
      }
    );
    this.recursoService.getRecursos().then(recursos => {
      this.recursos = recursos;
    }); 
  }

  buscarCurso(valor: string) {
    this.verificarAsignatura(valor.trim().toLowerCase());
  }
  verificarAsignatura(nombreCurso: string) {
    if (nombreCurso) {
      const existeCurso = this.asignaturas.some(asignatura =>
        asignatura.curso_nombre.toLowerCase().trim() === nombreCurso
      );
      if (existeCurso) {
        this.advertencia = `Una asignatura ya tiene ese nombre`;
      } else {
        this.advertencia = '';
      }
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}