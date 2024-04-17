import { Component, OnInit } from '@angular/core';
import { CrearReservaServiceService } from '../../services/crear-reserva.service.service';
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin  from '@fullcalendar/timegrid';
import { Disponibilidad } from '../../models/Disponibilidad';
import { Reserva } from '../../models/Reserva';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/login.service';
import { Asignatura } from '../../models/Asignatura';
import { Recurso } from '../../models/Recurso';
import { Bloques } from '../../models/Bloques';
import {MatSnackBar} from '@angular/material/snack-bar';
import esLocale from '@fullcalendar/core/locales/es';

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
  reserva!:Reserva;
  cantidadLicenciasDisponibles!: number;
  showErrorMessage: boolean = false;
  mensaje: string = '';
  estatus: string = '';
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
    this.listarHorarioCalendar(this.selectedRecursoId);
  }
  listarHorarioCalendar(id_Recurso:number){
    this.crearReservaService.listardisponibilidadCalendar(id_Recurso).subscribe(
      (response: any[]) => {
        const eventos = response.map(evento => ({
          title: evento.title.toString(),
          start: evento.start,
          end: evento.end
        }));
        console.log(eventos);
        this.calendarOptions.events = eventos;
      }
    );
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
          this.cantidadLicenciasDisponibles = cantLicencias.cantidad_disponible;
        }
      )
    }
  }
  reservar() {
    this.listarHorarioCalendar(this.selectedRecursoId);
    if(this.selectedRecursoId && this.selectedBloqueId && this.selectedBloqueId){
      this.reserva = {
        id_usuario: this.docente.usuario_id,
        rol: 'Docente',
        id_docente: 6,
        id_asignatura: this.selectedAsignaturaId,
        id_recurso: Number(this.selectedRecursoId),
        fecha: this.selectedFecha,
        id_bloque: this.selectedBloqueId,
        reserva_cant: this.selectCantidadreservas
      }
      this.crearReservaService.crearReserva(this.reserva).subscribe(
        (response: any) => {
          const mensajeError = response?.Mensaje;
          if (mensajeError) {
            this.openSnackBar(mensajeError, 'Cerrar');
          } else {
            console.log('Reserva exitosa');
          }
        },
        error => {
          console.error('Error al crear reserva:', error);
          this.openSnackBar('Error al crear reserva', 'Cerrar');
        }
      );

      console.log(this.reserva);
    }
  }
  validarcantidad(): void {
    const inputElement = document.getElementById('Licencias') as HTMLInputElement;
    if (inputElement) {
      const inputValor = inputElement.valueAsNumber;
      this.selectCantidadreservas = inputValor;
      const cantidadLicencias = this.cantidadLicenciasDisponibles || 0;
      this.showErrorMessage = inputValor > cantidadLicencias;
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }



  /* Full calendar */
  calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin],
    initialView: 'timeGridWeek',
    weekends: true,
    locale: esLocale,
    events: [
    ]
  };
}
