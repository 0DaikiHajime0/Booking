import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CrearReservaServiceService } from '../../services/crear-reserva.service.service';

import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';



@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css'],


})
export class CrearReservaComponent implements OnInit {
  cursos: any[] = [];
  recursos: any[] = [];
  bloques: any[] = [];
  cantidadAlumnos: number = 0;
  cantidadLicenciasDisponibles:number = 0;
  horarioSeleccionado: string = '0:00:00 - 0:00:00';
  selectedRecursoId: number | null = null;
  selectedBloqueId: number | null = null;
  selectedFecha: string= '';

  parametrosSolicitud: any = {
    id_recurso: null,
    id_bloque: null,
    fecha: ''
  };

  constructor(
    private crearReservaService: CrearReservaServiceService,
  ) { }

  ngOnInit(): void {
    this.listarCurso('6');
    this.listarBloques();
  }
  llamarListaDisponibilidad(): void {
    console.log('Llamando a listaDisponibilidad...');

    this.crearReservaService.listaDisponibilidad()
  }

  listarCurso(id: string): void {
    this.crearReservaService.listarCurso(id).subscribe((data: any) => {
      this.cursos = this.formatData(data);
    });
  }
  listarRecursos(cursoId: string): void {
    this.crearReservaService.listarRecursos(cursoId).subscribe((data: any) => {
      if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
        console.log('Datos recibidos en listarRecursos:', data[0]);
        this.recursos = data[0][0];
        this.selectedRecursoId = this.recursos[0].recurso_id;
        this.llamarListaDisponibilidad();
      } else {
        console.error('La respuesta del servidor no tiene el formato esperado:', data);
        this.recursos = [];
      }
    });
  }
  listarBloques(): void {
    this.crearReservaService.listarBloques().subscribe((data: any) => {

      this.bloques = this.formatDataBloques(data);
    });
  }
  formatDataBloques(data: any[]): any[] {
    if (data && data.length > 0 && Array.isArray(data[0])) {
      const bloquesData = data[0][0];
      this.selectedBloqueId = bloquesData[0].bloque_id;
      return bloquesData.map((bloque: any) => {
        return {
          id: bloque.bloque_id,
          nombre: bloque.bloque_nombre,
          horario: bloque.bloque_rango
        };
      });
    } else {
      return [];
    }
  }
  actualizarHorario(event: any): void {
    const bloqueId = Number(event.target.value);
    const bloqueSeleccionado = this.bloques.find((bloque: any) => bloque.id === bloqueId);
    if (bloqueSeleccionado) {
      this.horarioSeleccionado = bloqueSeleccionado.horario;
      this.llamarListaDisponibilidad();
    } else {
      this.horarioSeleccionado = '';
    }
  }
  formatData(data: any[]): any[] {
    if (data && data.length > 0 && Array.isArray(data[0])) {
      const cursosData = data[0][0];
      return cursosData.map((curso: any) => {
        return {
          id: curso.curso_id,
          nombre: curso.nrc + ' - ' + curso.curso_nombre,
          cantidadAlumnos: curso.docente_curso_cantidad_alumnos
        };
      });
    } else {
      return [];
    }
  }
  actualizarCantidadAlumnos(event: any): void {
    const cursoId = parseInt(event.target.value);
    const cursoSeleccionado = this.cursos.find(curso => curso.id === cursoId);
    if (cursoSeleccionado) {
      this.cantidadAlumnos = cursoSeleccionado.cantidadAlumnos;
    } else {
      this.cantidadAlumnos = 0;
    }
  }
  actualizarRecursos(event: any): void {
    const cursoId = event.target.value;
    if (cursoId) {
      this.listarRecursos(cursoId);
      this.llamarListaDisponibilidad();
    } else {
      this.recursos = [];
    }
  }

  obtenerFechaSeleccionada(event: any): void {
    this.selectedFecha = event.target.value;
    this.llamarListaDisponibilidad();
  }

  /*full calendar*/
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: [
      { title:'Quedan 1 licencia', start: '2024-04-05' },
      { title:'Quedan 1 licencia', start: '2024-04-05' },
      { title:'Quedan 1 licencia', start: '2024-04-05' },
      { title:'Quedan 1 licencia', start: '2024-04-05' },

      { title:'Quedan 2 licencias', start: '2024-04-06' },
      { title:'Quedan 30 licencias', start: '2024-04-07' },
      { title:'Quedan 40 licencias', start: '2024-04-08' },
      { title:'Quedan 50 licencias', start: '2024-04-09' },
      { title:'Quedan 50 licencias', start: '2024-04-10' },
      { title:'Quedan 50 licencias', start: '2024-04-11' },
    ]
  };
}
