export class Bloques{
    bloque_id:number;
    bloque_nombre:string;
    bloque_rango:string;
    bloque_orden:number;
    constructor(
        bloque_id:number,
        bloque_nombre:string,
        bloque_rango:string,
        bloque_orden:number,
    ){
        this.bloque_id = bloque_id,
        this.bloque_nombre = bloque_nombre,
        this.bloque_rango = bloque_rango,
        this.bloque_orden = bloque_orden
    }
}
