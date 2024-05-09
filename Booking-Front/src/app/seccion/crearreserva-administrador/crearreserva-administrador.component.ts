import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CrearReservaServiceService } from '../../services/crear-reserva.service.service';
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Disponibilidad } from '../../models/Disponibilidad';
import { Reserva } from '../../models/Reserva';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/login.service';
import { Asignatura } from '../../models/Asignatura';
import { Recurso } from '../../models/Recurso';
import { Bloques } from '../../models/Bloques';
import { MatSnackBar } from '@angular/material/snack-bar';
import esLocale from '@fullcalendar/core/locales/es';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-crearreserva-administrador',
  templateUrl: './crearreserva-administrador.component.html',
  styleUrl: './crearreserva-administrador.component.css'
})
export class CrearreservaAdministradorComponent implements OnInit {
  administrador!: Usuario;
  docentes: Usuario[] = [];
  cursos: Asignatura[] = [];
  recursos: Recurso[] = [];
  bloques: Bloques[] = [];
  cantidadAlumnos: number = 0;
  horarioSeleccionado: string = '';
  selectedRecursoId: number = 0;
  selectedDocented: number = 0;
  selectedEmailDocenteId: string = '';
  selectedBloqueId: number = 0;
  selectedFecha: string = '';
  selectedAsignaturaId: number = 0;
  selectedNrc : string = ''
  selectCantidadreservas: number = 0;
  disponibilidad!: Disponibilidad;
  reserva!: Reserva;
  cantidadLicenciasDisponibles!: number;
  showErrorMessage: boolean = false;
  mensaje: string = '';
  estatus: string = '';
  constructor
    (
      public dialog: MatDialog,
      private router: Router,
      private crearReservaService: CrearReservaServiceService,
      private usuarioservice: UsuarioService,
      private _snackBar: MatSnackBar
    ) { }
  ngOnInit(): void {
    this.listarBloques();
    this.listarDocentes();
    this.obtenerAdminstrador();
  }
  listarDocentes(): void {
    this.crearReservaService.listardocetes().subscribe(
      (docentes: Usuario[]) => {
        this.docentes = docentes;
      }
    );
  }

  obtenerAdminstrador(): void {
    this.administrador = this.usuarioservice.getUsuarioFromStorage()
    this.listarCurso(this.selectedDocented)
  }

  listarCurso(event: any) {
    const docente_id = event?.target?.value;
    if (docente_id) {
      this.selectedDocented = docente_id;
      this.crearReservaService.listarCursoAdmin(docente_id).subscribe(
        (cursos: Asignatura[]) => {
          this.cursos = cursos;
          this.selectedAsignaturaId = Number(cursos[0]?.curso_id);
          this.selectedNrc = cursos[0].nrc;
          this.selectedEmailDocenteId = docente_id;
          this.selectedEmailDocenteId = this.docentes.find(docente => docente.usuario_id == docente_id)?.usuario_correo || '';
        }
      );
    }

  }
  listarRecurso(event: any) {
    const cursoId = event.target.value;
    this.crearReservaService.listarRecursos(cursoId).subscribe(
      (recursos: Recurso[]) => {
        this.recursos = recursos
        const curso_seleccionado = this.cursos.find(curso => curso.curso_id == cursoId)
        if (curso_seleccionado) {
          this.cantidadAlumnos = curso_seleccionado.docente_curso_cantidad_alumnos
          this.obtenerDisponibilidad();
        }
      }
    )
  }
  listarBloques() {
    this.crearReservaService.listarBloques().subscribe(
      (bloques: Bloques[]) => {
        this.bloques = bloques
      })
  }
  obtenerRecurso(event: any) {
    const recursoId = event.target.value;
    this.selectedRecursoId = recursoId;
    this.obtenerDisponibilidad();
    this.listarHorarioCalendar(this.selectedRecursoId);
  }

  listarHorarioCalendar(id_Recurso: number) {
    this.crearReservaService.listardisponibilidadCalendar(id_Recurso).subscribe(
      (response: any[]) => {
        const eventos = response.map(evento => {
          const cupones = parseInt(evento.title);
          const textoCupones = cupones === 1 ? '1 cupón' : `${cupones} cupones`;
          const textoQueda = cupones === 1 ? 'Queda' : 'Quedan';
          return {
            title: `\n${textoQueda} ${textoCupones}`,
            start: evento.start,
            end: evento.end
          };
        });
        this.calendarOptions.events = eventos;
      }
    );
  }
  horarioBloques(event: any) {
    const bloqueId = event.target.value;
    const bloque_seleccionado = this.bloques.find(bloque => bloque.bloque_id == bloqueId)
    if (bloque_seleccionado) {
      this.horarioSeleccionado = bloque_seleccionado.bloque_rango
      this.selectedBloqueId = bloque_seleccionado.bloque_id
    }
    this.obtenerDisponibilidad();
  }
  obtenerFechaSeleccionada(event: any): void {
    this.selectedFecha = event.target.value;
    this.obtenerDisponibilidad();
  }
  obtenerDisponibilidad() {
    if (this.selectedRecursoId && this.selectedBloqueId && this.selectedBloqueId) {
      this.disponibilidad = {
        id_recurso: this.selectedRecursoId,
        id_bloque: this.selectedBloqueId,
        fecha: this.selectedFecha
      }
      this.crearReservaService.listaDisponibilidad(this.disponibilidad).subscribe(
        (cantLicencias: any) => {
          this.cantidadLicenciasDisponibles = cantLicencias.cantidad_disponible;
        }
      )
    }
  }
  reservar() {
    if (this.selectedRecursoId && this.selectedBloqueId && this.selectedBloqueId) {
      this.reserva = {
        id_usuario: this.administrador.usuario_id,
        rol: 'Administrador',
        id_docente: this.selectedDocented,
        id_asignatura: this.selectedAsignaturaId,
        id_recurso: Number(this.selectedRecursoId),
        fecha: this.selectedFecha,
        id_bloque: this.selectedBloqueId,
        reserva_cant: this.selectCantidadreservas,
        nrc: this.selectedNrc
      };
      this.crearReservaService.crearReserva(this.reserva).subscribe(
        (response: any) => {
          const mensaje = response?.Mensaje;
          const estatus = response?.estatus;

          if (estatus === '201') {
            this.openSnackBar(mensaje, 'Cerrar');
            this.enviarCredenciales();
            setTimeout(() => {
              this.router.navigate(['/mostrarreserva-administrador']);
            }, 3000);
          } else {
            this.openSnackBar(mensaje, 'Cerrar');
          }
        },
        error => {
          this.openSnackBar('Error al crear reserva', 'Cerrar');
        }
      );
    }
  }
  enviarCredenciales(): void {
    const data = {
      id_docente: this.selectedDocented,
      id_asignatura: this.selectedAsignaturaId,
      id_recurso: Number(this.selectedRecursoId),
      id_bloque: this.selectedBloqueId,
      fecha: this.selectedFecha,
      docente_correo: this.selectedEmailDocenteId,
      nrc:this.selectedNrc
    };
    this.crearReservaService.enviarCredenciales(data).subscribe(
      response => {
      },
      error => {
        console.error('Error al enviar las credenciales:', error);
      }
    );
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
    this.listarHorarioCalendar(this.selectedRecursoId);
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin],
    initialView: 'timeGridWeek',
    weekends: true,
    locale: esLocale,
    eventBackgroundColor: '#8e6dcf',
    eventBorderColor: '#8e6dcf',
    events: [
    ]
  };
  toggleChanged(event: MatSlideToggleChange) {
    if (event.checked) {
      this.openDialog(0, 0).then((result: boolean) => {
          event.source.checked = false;
      });
    }
  }

  openDialog(enterAnimationDuration: number, exitAnimationDuration: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const dialogRef: MatDialogRef<DialogAnimationsExampleDialog> = this.dialog.open(DialogAnimationsExampleDialog, {
        data:{
          id_usuario: this.administrador.usuario_id,
          id_recurso: this.selectedRecursoId,
          fecha: this.selectedFecha
        },
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
      dialogRef.afterClosed().subscribe(result => {
        resolve(result);
      });
    });
  }
}
@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'reservageneral.html',
  styleUrl: './reservageneral.css',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,MatIconModule],
})
export class DialogAnimationsExampleDialog {
  id_usuario = 0;
  id_recurso = 0;
  fecha = '';
  @Output() aceptarClicked: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private crearReservaService: CrearReservaServiceService,
    public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
  @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id_usuario = data.id_usuario;
    this.id_recurso = data.id_recurso;
    this.fecha = data.fecha;

  }

  reservaGeneral() {
    const data = {
      id_usuario: this.id_usuario,
      id_recurso: Number(this.id_recurso),
      fecha: this.fecha,
    };
    console.log(data)
    this.crearReservaService.reservageneral(data).subscribe(
      response => {
      },
      error => {
        console.error('Error al reservar:', error);
      }
    );
  }
  onAceptarClick(): void {
    this.reservaGeneral();
    window.location.reload();
    this.aceptarClicked.emit();
    this.dialogRef.close();
  }
}
