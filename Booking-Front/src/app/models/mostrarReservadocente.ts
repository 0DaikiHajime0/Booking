export class mostrarReserva {
  nrc: string;
  curso_nombre: string;
  tipo_autor: string;
  cantidad_reserva: number;
  bloque_nombre: string;
  bloque_rango: string;
  reserva_fecha: string;
  fecha_registro: string;

  constructor(
    nrc: string,
    curso_nombre: string,
    tipo_autor: string,
    cantidad_reserva: number,
    bloque_nombre: string,
    bloque_rango: string,
    reserva_fecha: string,
    fecha_registro: string
  ) {
    this.nrc = nrc;
    this.curso_nombre = curso_nombre;
    this.tipo_autor = tipo_autor;
    this.cantidad_reserva = cantidad_reserva;
    this.bloque_nombre = bloque_nombre;
    this.bloque_rango = bloque_rango;
    this.reserva_fecha = reserva_fecha;
    this.fecha_registro = fecha_registro;
  }
}
