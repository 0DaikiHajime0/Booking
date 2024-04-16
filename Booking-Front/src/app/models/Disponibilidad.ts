export class Disponibilidad{
    id_recurso:number;
    id_bloque:number;
    fecha:string;
    constructor(
        id_recurso:number,
        id_bloque:number,
        fecha:string,
    ){
        this.id_recurso=id_recurso;
        this.id_bloque=id_bloque;
        this.fecha=fecha;
    }
}
