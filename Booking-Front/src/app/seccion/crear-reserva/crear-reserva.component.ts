import { Component, OnInit } from '@angular/core';
import { CrearReservaServiceService } from '../../services/crear-reserva.service.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Disponibilidad } from '../../models/Disponibilidad';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/login.service';
import { Asignatura } from '../../models/Asignatura';
import { Recurso } from '../../models/Recurso';
import { Bloques } from '../../models/Bloques';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css'],
})
export class CrearReservaComponent implements OnInit {
  docente!:Usuario
  cursos: Asignatura[] = [];
  recursos: Recurso[] = [];
  bloques: Bloques[] = [];
  cantidadAlumnos: number = 0;
  horarioSeleccionado: string = '';
  selectedRecursoId: number = 0;
  selectedBloqueId: number = 0;
  selectedFecha: string = '';
  selectedAsignaturaId: number = 0;
  selectCantidadreservas: number = 0;
  disponibilidad!:Disponibilidad;
  cantidadLicenciasDisponibles!: number;
  showErrorMessage: boolean = false;
  constructor
  (
    private crearReservaService: CrearReservaServiceService,
    private usuarioservice : UsuarioService,
    private _snackBar: MatSnackBar

  ) {}

  ngOnInit(): void {
    this.obtenerDocente();
    this.listarBloques();
  }
  obtenerDocente():void{
    this.docente = this.usuarioservice.getUsuarioFromStorage()
    this.listarCurso(6)
  }
  listarCurso(id: number) {
    this.crearReservaService.listarCurso(id).subscribe(
       (cursos:Asignatura[]) =>{
        this.cursos = cursos;
        this.selectedAsignaturaId = cursos[0].curso_id;
       }
    )
  }
  listarRecurso(event: any){
    const cursoId = event.target.value;
    this.crearReservaService.listarRecursos(cursoId).subscribe(
      (recursos:Recurso[]) =>{
        this.recursos = recursos
        const curso_seleccionado = this.cursos.find(curso => curso.curso_id==cursoId)
        if(curso_seleccionado){
          this.cantidadAlumnos=curso_seleccionado.docente_curso_cantidad_alumnos
          this.obtenerDisponibilidad();
        }
      }
    )
  }

  listarBloques(){
    this.crearReservaService.listarBloques().subscribe(
      (bloques:Bloques[])=>{
        this.bloques = bloques
      })
  }
  obtenerRecurso(event:any){
    const recursoId = event.target.value;
    this.selectedRecursoId = recursoId;
    this.obtenerDisponibilidad();
  }
  horarioBloques(event:any){
    const bloqueId = event.target.value;
    const bloque_seleccionado = this.bloques.find(bloque => bloque.bloque_id==bloqueId)
    if(bloque_seleccionado){
      this.horarioSeleccionado = bloque_seleccionado.bloque_rango
      this.selectedBloqueId = bloque_seleccionado.bloque_id
    }
    this.obtenerDisponibilidad();
  }
  obtenerFechaSeleccionada(event: any): void {
    this.selectedFecha = event.target.value;
    this.obtenerDisponibilidad();
  }
  obtenerDisponibilidad(){
    if(this.selectedRecursoId && this.selectedBloqueId && this.selectedBloqueId){
      this.disponibilidad = {
        id_recurso : this.selectedRecursoId,
        id_bloque : this.selectedBloqueId,
        fecha : this.selectedFecha
      }
      this.crearReservaService.listaDisponibilidad(this.disponibilidad).subscribe(
        (cantLicencias:any)=>{
          this.cantidadLicenciasDisponibles = cantLicencias.cantidad_disponible
        }
      )
    }
  }
  validarcantidad(): void {
    const inputElement = document.getElementById('Licencias') as HTMLInputElement;
    if (inputElement) {
      const inputValor = inputElement.valueAsNumber;
      const cantidadLicencias = this.cantidadLicenciasDisponibles || 0;
      this.showErrorMessage = inputValor > cantidadLicencias;
    }
  }
  reservar() {
    if(this.selectedRecursoId && this.selectedBloqueId && this.selectedBloqueId){

    }
    console.log("¡Botón 'Reservar' clicado!");
  }
  openSnackBar(message: string, action: string) {
    let snackBarRef = this._snackBar.open(message, action, {
      duration: 5000,
    });
    setTimeout(() => {
      snackBarRef.dismiss();
    }, 5000);
  }

  /* Full calendar */
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: [
      { title: 'Quedan 1 licencia', start: '2024-04-05' },
      { title: 'Quedan 1 licencia', start: '2024-04-05' },
      { title: 'Quedan 1 licencia', start: '2024-04-05' },
      { title: 'Quedan 1 licencia', start: '2024-04-05' },
      { title: 'Quedan 2 licencias', start: '2024-04-06' },
      { title: 'Quedan 30 licencias', start: '2024-04-07' },
      { title: 'Quedan 40 licencias', start: '2024-04-08' },
      { title: 'Quedan 50 licencias', start: '2024-04-09' },
      { title: 'Quedan 50 licencias', start: '2024-04-10' },
      { title: 'Quedan 50 licencias', start: '2024-04-11' },
    ]
  };
}
