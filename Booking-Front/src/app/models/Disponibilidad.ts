export class Disponibilidad{
    id_recurso:number;
    id_bloque:number;
    fecha:string;
    cantidad_disponible:number;
    constructor(
        id_recurso:number,
        id_bloque:number,
        fecha:string,
        cantidad_disponible:number
    ){
        this.id_recurso=id_recurso;
        this.id_bloque=id_bloque;
        this.fecha=fecha;
        this.cantidad_disponible=cantidad_disponible;
    }
}
