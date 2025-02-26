export class ListarReservasAdmin {
  id_docente?: number| null;
  id_recurso?: number | null;
  id_bloques?: number | null;
  fechaReservaInicio?: string | null;
  fechaReservaFin?: string | null;
  fechaRegistroInicio?: string | null;
  fechaRegistroFin?: string | null;
  estado_reserva?: string | null;

  constructor(
    id_docente: number,
    id_recurso:number,
    id_bloques: number | null,
    fechaReservaInicio: string | null,
    fechaReservaFin: string | null,
    fechaRegistroInicio: string | null,
    fechaRegistroFin: string | null,
    estado_reserva: string | null
  ) {
    this.id_docente = id_docente;
    this.id_recurso = id_recurso;
    this.id_bloques = id_bloques;
    this.fechaReservaInicio = fechaReservaInicio;
    this.fechaReservaFin = fechaReservaFin;
    this.fechaRegistroInicio = fechaRegistroInicio;
    this.fechaRegistroFin = fechaRegistroFin;
    this.estado_reserva = estado_reserva;
  }
}
