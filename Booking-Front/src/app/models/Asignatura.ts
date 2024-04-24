export class Asignatura{
    curso_id:number;
    curso_nombre:string;
    curso_estado:string;
    curso_descripcion:string;
    docente_curso_cantidad_alumnos:number;
    curso_modalidad:string;
    curso_campus:string;
    curso_periodo:string;
    curso_horario:string;
    curso_tipo:string;
    curso_codigo:string;
    curso_plan:string;
    nrc:string;

    constructor(
        curso_id:number,
        curso_nombre:string,
        curso_estado:string,
        curso_descripcion:string,
        docente_curso_cantidad_alumnos:number,
        nrc:string,
        curso_modalidad:string,
        curso_campus:string,
        curso_periodo:string,
        curso_horario:string,
        curso_tipo:string,
        curso_codigo:string,
        curso_plan:string,
    ){
        this.curso_id = curso_id,
        this.curso_nombre = curso_nombre,
        this.curso_estado = curso_estado,
        this.curso_descripcion = curso_descripcion,
        this.docente_curso_cantidad_alumnos = docente_curso_cantidad_alumnos,
        this.nrc=nrc,
        this.curso_modalidad=curso_modalidad,
        this.curso_campus=curso_campus,
        this.curso_periodo=curso_periodo,
        this.curso_horario=curso_horario,
        this.curso_tipo=curso_tipo,
        this.curso_codigo=curso_codigo,
        this.curso_plan=curso_plan
    }
}
