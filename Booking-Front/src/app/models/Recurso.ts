export class Recurso{
    recurso_id : number;
    recurso_nombre:string;
    recurso_estado: string;
    recurso_empresa:string;
    recurso_cant_credenciales:number;
    constructor(
        recurso_id:number,
        recurso_nombre:string,
        recurso_estado:string,
        recurso_empresa:string,
        recurso_cant_credenciales:number,
    ){
        this.recurso_id = recurso_id,
        this.recurso_nombre = recurso_nombre,
        this.recurso_estado = recurso_estado,
        this.recurso_empresa = recurso_empresa,
        this.recurso_cant_credenciales = recurso_cant_credenciales
    }
}
