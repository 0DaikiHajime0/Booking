export class EditarAsignacion{
  id_curso : number;
  id_docente: number;
  nrc_anterior: string;
  cantidad_alumnos: number
  nrc_curso :string;
  periodo_curso: string;
  campus_curso: string;
  modalidad_curso: string;
  curso_inicio:string;
  curso_fin:string;
  constructor(
    id_curso : number,
    id_docente: number,
    nrc_anterior: string,
    cantidad_alumnos: number,
    nrc_curso :string,
    periodo_curso: string,
    campus_curso: string,
    modalidad_curso: string,
    curso_inicio:string,
      curso_fin:string,
  ){
    this.id_curso = id_curso;
    this.id_docente = id_docente;
    this.nrc_anterior = nrc_anterior;
    this.cantidad_alumnos = cantidad_alumnos;
    this.nrc_curso = nrc_curso;
    this.periodo_curso = periodo_curso;
    this.campus_curso = campus_curso;
    this.modalidad_curso = modalidad_curso;
    this.curso_inicio = curso_inicio;
      this.curso_fin = curso_fin;
  }
}
