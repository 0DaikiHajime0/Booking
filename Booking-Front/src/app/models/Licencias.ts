export class Licencia{
    credenciales_id:number;
    credencial_usuario:string;
    credencial_contrasena:string;
    credenciales_estado:string;
    credencial_tipo:string;
    recurso_id:number;
    constructor(
      credenciales_id:number,
      credencial_usuario:string,
      credencial_contrasena:string,
      credenciales_estado:string,
      credencial_tipo:string,
      recurso_id:number
    ){
      this.credenciales_id = credenciales_id;
      this.credencial_usuario = credencial_usuario;
      this.credencial_contrasena = credencial_contrasena;
      this.credenciales_estado = credenciales_estado;
      this.credencial_tipo=credencial_tipo;
      this.recurso_id = recurso_id;
    }
  }
