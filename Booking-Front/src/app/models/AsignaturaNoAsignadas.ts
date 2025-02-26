export class AsignaturanoAsignada{
  curso_id:number;
  curso_nombre:string;
  curso_estado:string;
  curso_descripcion:string;
  curso_codigo:string;
  curso_plan:string;

  constructor(
      curso_id:number,
      curso_nombre:string,
      curso_estado:string,
      curso_descripcion:string,
      curso_codigo:string,
      curso_plan:string,
  ){
      this.curso_id = curso_id,
      this.curso_nombre = curso_nombre,
      this.curso_estado = curso_estado,
      this.curso_descripcion = curso_descripcion,
      this.curso_codigo=curso_codigo,
      this.curso_plan=curso_plan
  }
}
