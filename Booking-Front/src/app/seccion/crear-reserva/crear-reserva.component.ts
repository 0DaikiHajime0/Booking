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
  cantidadAlumnos: number = 0;

  constructor(private crearReservaService: CrearReservaServiceService) { }

  ngOnInit(): void {
    this.listarCurso('6');
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
    console.log('ID del curso seleccionado:', cursoId);
    if (cursoId) {
      this.listarRecursos(cursoId);
    } else {
      this.recursos = [];
    }
  }

}
