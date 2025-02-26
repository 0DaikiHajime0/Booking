export class mostrarReservaAdmin {
  reserva_id:number;
  nrc: string;
  curso_nombre: string;
  recurso_nombre: string;
  docente_nombre:string;
  tipo_autor: string;
  cantidad_reserva: number;
  bloque_nombre: string;
  bloque_rango: string;
  reserva_fecha: string;
  fecha_registro: string;
  reserva_estado:string;

  constructor(
    reserva_id:number,
    nrc: string,
    curso_nombre: string,
    recurso_nombre: string,
    docente_nombre:string,
    tipo_autor: string,
    cantidad_reserva: number,
    bloque_nombre: string,
    bloque_rango: string,
    reserva_fecha: string,
    fecha_registro: string,
    reserva_estado:string,
  ) {
    this.reserva_id=reserva_id;
    this.nrc = nrc;
    this.curso_nombre = curso_nombre;
    this.recurso_nombre=recurso_nombre;
    this.docente_nombre=docente_nombre;
    this.tipo_autor = tipo_autor;
    this.cantidad_reserva = cantidad_reserva;
    this.bloque_nombre = bloque_nombre;
    this.bloque_rango = bloque_rango;
    this.reserva_fecha = reserva_fecha;
    this.fecha_registro = fecha_registro;
    this.reserva_estado = reserva_estado;
  }
}
