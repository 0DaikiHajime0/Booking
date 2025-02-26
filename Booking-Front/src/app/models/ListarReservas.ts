export class ListarReservas {
  id_docente: number;
  id_bloques?: number | null;
  fechaReservaInicio?: string | null;
  fechaReservaFin?: string | null;
  fechaRegistroInicio?: string | null;
  fechaRegistroFin?: string | null;

  constructor(
    id_docente: number,
    id_bloques: number | null,
    fechaReservaInicio: string | null,
    fechaReservaFin: string | null,
    fechaRegistroInicio: string | null,
    fechaRegistroFin: string | null
  ) {
    this.id_docente = id_docente;
    this.id_bloques = id_bloques;
    this.fechaReservaInicio = fechaReservaInicio;
    this.fechaReservaFin = fechaReservaFin;
    this.fechaRegistroInicio = fechaRegistroInicio;
    this.fechaRegistroFin = fechaRegistroFin;
  }
}
