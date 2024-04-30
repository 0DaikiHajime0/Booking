export class ListarAsignarturaAsignada{
  docente_curso_id: number;
  docente_curso_cantidad_alumnos: number;
  curso_id: number;
  docente_id: number;
  nrc:string;
  curso_modalidad: string;
  curso_campus:string;
  curso_periodo:string;
  curso_horario:string | null;
  curso_tipo: string;
  curso_docente_estado: string;
  constructor(
    docente_curso_id: number,
    docente_curso_cantidad_alumnos: number,
    curso_id: number,
    docente_id: number,
    nrc:string,
    curso_modalidad: string,
    curso_campus:string,
    curso_periodo:string,
    curso_horario:string,
    curso_tipo: string,
    curso_docente_estado: string,
  ){
    this.docente_curso_id = docente_curso_id;
    this.docente_curso_cantidad_alumnos = docente_curso_cantidad_alumnos;
    this.curso_id =curso_id;
    this.docente_id = docente_id;
    this.nrc = nrc;
    this.curso_modalidad = curso_modalidad;
    this.curso_campus = curso_campus;
    this.curso_periodo = curso_periodo;
    this.curso_horario = curso_horario;
    this.curso_tipo = curso_tipo;
    this.curso_docente_estado = curso_docente_estado
  }
}
