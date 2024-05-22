export class Licencia{
    credenciales_id:number;
    credencial_usuario:string;
    credencial_contrasena:string;
    credencial_key:string;
    credenciales_estado:string;
    credencial_tipo:string
    constructor(
      credenciales_id:number,
      credencial_usuario:string,
      credencial_contrasena:string,
      credencial_key:string,
      credenciales_estado:string,
      credencial_tipo:string
    ){
      this.credenciales_id = credenciales_id;
      this.credencial_usuario = credencial_usuario;
      this.credencial_contrasena = credencial_contrasena;
      this.credencial_key = credencial_key;
      this.credenciales_estado = credenciales_estado;
      this.credencial_tipo=credencial_tipo
    }
  }
