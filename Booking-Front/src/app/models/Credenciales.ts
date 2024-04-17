export class Credencial{
  id_docente:number;
  id_asignatura:number;
  id_recurso:number;
  id_bloque:number;
  fecha:string;
  constructor(
    id_docente:number,
    id_asignatura:number,
    id_recurso:number,
    id_bloque:number,
    fecha:string
  ){
    this.id_docente = id_docente;
    this.id_asignatura = id_asignatura;
    this.id_recurso = id_recurso;
    this.id_bloque = id_bloque;
    this.fecha = fecha;
  }
}
