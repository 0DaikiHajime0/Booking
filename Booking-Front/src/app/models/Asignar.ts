export class Asignar{
  cantidad_alumnos:number;
  id_curso:number;
  id_docente: number;
  nrc_curso: string;
  modalida_curso: string;
  campus_curso: string;
  periodo_curso: string;
  horario_curso: string | null;
  tipo_curso: string;
  constructor(
      cantidad_alumnos:number,
      id_curso:number,
      id_docente: number,
      nrc_curso: string,
      modalida_curso: string,
      campus_curso: string,
      periodo_curso: string,
      horario_curso: string,
      tipo_curso: string,
  ){
      this.cantidad_alumnos = cantidad_alumnos;
      this.id_curso = id_curso;
      this.id_docente = id_docente;
      this.nrc_curso = nrc_curso;
      this.modalida_curso = modalida_curso;
      this.campus_curso = campus_curso;
      this.periodo_curso = periodo_curso;
      this.horario_curso = horario_curso;
      this.tipo_curso = tipo_curso;
  }
}
