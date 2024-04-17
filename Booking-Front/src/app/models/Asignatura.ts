export class Asignatura{
    curso_id:number;
    curso_nombre:string;
    curso_estado:string;
    curso_descripcion:string;
    docente_curso_cantidad_alumnos:number;
    nrc:number;
    constructor(
        curso_id:number,
        curso_nombre:string,
        curso_estado:string,
        curso_descripcion:string,
        docente_curso_cantidad_alumnos:number,
        nrc:number
    ){
        this.curso_id = curso_id,
        this.curso_nombre = curso_nombre,
        this.curso_estado = curso_estado,
        this.curso_descripcion = curso_descripcion,
        this.docente_curso_cantidad_alumnos = docente_curso_cantidad_alumnos,
        this.nrc = nrc
    }
}
