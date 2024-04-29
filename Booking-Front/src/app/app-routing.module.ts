import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MostrarReservasComponent } from './seccion/mostrar-reservas/mostrar-reservas.component'
import { HomeComponent } from './home/home.component';
import { CrearReservaComponent } from './seccion/crear-reserva/crear-reserva.component'
import { PerfilComponent } from './seccion/perfil/perfil.component';
import { UsuariosComponent } from './seccion/usuarios/usuarios.component';
import { RecursosComponent } from './seccion/recursos/recursos.component';
import { AsignaturasComponent } from './seccion/asignaturas/asignaturas.component';
import {CrearreservaAdministradorComponent} from './seccion/crearreserva-administrador/crearreserva-administrador.component'
import {MostrarreservaAdministradorComponent} from './seccion/mostrarreserva-administrador/mostrarreserva-administrador.component'
import {AsignarDocenteComponent} from './seccion/asignar-docente/asignar-docente.component'
import { CredencialesComponent } from './seccion/credenciales/credenciales.component';



const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'listar', component:MostrarReservasComponent},
  {path:'home', component:HomeComponent},
  {path:'crear', component:CrearReservaComponent},
  {path:'recursos', component:RecursosComponent},
  {path:'asignaturas',component:AsignaturasComponent},
  {path:'crearreserva-administrador',component:CrearreservaAdministradorComponent},
  {path:'mostrarreserva-administrador',component:MostrarreservaAdministradorComponent},
  {path:'asignar-docente',component:AsignarDocenteComponent},
  {path:'credenciales', component:CredencialesComponent},
  {
    path:'usuarios',component:UsuariosComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'perfil',component:PerfilComponent
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
