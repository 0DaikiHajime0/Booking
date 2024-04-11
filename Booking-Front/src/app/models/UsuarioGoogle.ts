export class UsuarioGoogle{
    email:string;
    firstName:string;
    id:string;
    lastName:string;
    name:string;
    photoUrl:string;
    provider:string;
    constructor(
        email:string,
        firstName:string,
        id:string,
        lastName:string,
        name:string,
        photoUrl:string,
        provider:string
    ){
        this.email=email;
        this.firstName=firstName;
        this.id=id;
        this.lastName=lastName;
        this.name=name;
        this.photoUrl=photoUrl;
        this.provider=provider
    }

}