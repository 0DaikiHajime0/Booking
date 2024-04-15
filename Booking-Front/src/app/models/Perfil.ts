export class Perfil{
  usuario_nombres:string;
  usuario_apellidos:string;
  usuario_correo:string;
  constructor(
      usuario_correo:string,
      usuario_nombres:string,
      usuario_apellidos:string,
  ){
      this.usuario_nombres=usuario_nombres;
      this.usuario_apellidos=usuario_apellidos;
      this.usuario_correo=usuario_correo;
  }
}
