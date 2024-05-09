export class Reserva{
  id_usuario:number;
  rol:string;
  id_docente:number;
  id_asignatura:number;
  id_recurso:number;
  fecha:string;
  id_bloque:number;
  reserva_cant:number;
  nrc:string;

  constructor(
    id_usuario:number,
    rol:string,
    id_docente:number,
    id_asignatura:number,
    id_recurso:number,
    fecha:string,
    id_bloque:number,
    reserva_cant:number,
    nrc:string
  ){
    this.id_usuario = id_usuario;
    this.rol = rol;
    this.id_docente = id_docente;
    this.id_asignatura = id_asignatura;
    this.id_recurso = id_recurso;
    this.fecha = fecha;
    this.id_bloque = id_bloque;
    this.reserva_cant = reserva_cant;
    this.nrc = nrc;
  }
}
