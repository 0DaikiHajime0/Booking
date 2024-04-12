import { Component, OnInit } from '@angular/core';
import { CrearReservaServiceService } from '../../services/crear-reserva.service.service';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent implements OnInit {
  cursos: any[] = [];
  recursos: any[] = [];
  bloques: any[] = [];
  cantidadAlumnos: number = 0;
  horarioSeleccionado: string = '0:00:00 - 0:00:00';

  constructor(
    private crearReservaService: CrearReservaServiceService
    private disponibilidadService: DisponibilidadService
  ) { }

  ngOnInit(): void {
    this.listarCurso('6');
    this.listarBloques();
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
    } else {
      this.recursos = [];
    }
  }

}
