export class ListarCredenciales{
  id_docente:number;
  id_bloque:number;
  fechaReservaInicio:string;
  fechaReservaFin:string;
  fechaRegistroInicio:string;
  fechaRegistroFin:string;
  constructor(
    id_docente:number,
    id_bloque:number,
    fechaReservaInicio:string,
    fechaReservaFin:string,
    fechaRegistroInicio:string,
    fechaRegistroFin:string
  ){
    this.id_docente = id_docente;
    this.id_bloque = id_bloque;
    this.fechaReservaInicio = fechaReservaInicio;
    this.fechaReservaFin = fechaReservaFin;
    this.fechaRegistroInicio = fechaRegistroInicio;
    this.fechaRegistroFin = fechaRegistroFin;
  }
}
