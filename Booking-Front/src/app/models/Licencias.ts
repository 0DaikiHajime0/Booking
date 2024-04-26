export class Licencia{
    credencial_id:number;
    credencial_usuario:string;
    credencial_contrasena:string;
    credencial_key:string;
    credencial_estado:string;
    constructor(
      credencial_id:number,
      credencial_usuario:string,
      credencial_contrasena:string,
      credencial_key:string,
      credencial_estado:string,
    ){
      this.credencial_id = credencial_id;
      this.credencial_usuario = credencial_usuario;
      this.credencial_contrasena = credencial_contrasena;
      this.credencial_key = credencial_key;
      this.credencial_estado = credencial_estado;
    }
  }
  