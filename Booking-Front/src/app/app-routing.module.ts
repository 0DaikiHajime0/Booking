import { AsignaturasComponent } from './seccion/asignaturas/asignaturas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MostrarReservasComponent } from './seccion/mostrar-reservas/mostrar-reservas.component'
import { HomeComponent } from './home/home.component';
import { CrearReservaComponent } from './seccion/crear-reserva/crear-reserva.component'
import { PerfilComponent } from './seccion/perfil/perfil.component';
import { UsuariosComponent } from './seccion/usuarios/usuarios.component';
import { RecursosComponent } from './seccion/recursos/recursos.component';
import {CrearreservaAdministradorComponent} from './seccion/crearreserva-administrador/crearreserva-administrador.component'
import {MostrarreservaAdministradorComponent} from './seccion/mostrarreserva-administrador/mostrarreserva-administrador.component'
import {AsignarDocenteComponent} from './seccion/asignar-docente/asignar-docente.component'
import { CredencialesComponent } from './seccion/credenciales/credenciales.component';
import { BloquesComponent } from './seccion/bloques/bloques.component';
import { Logged, LoggedAdmin } from './auth-guard.guard';
import { NotfoundComponent } from './seccion/notfound/notfound.component';


const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'listar', component:MostrarReservasComponent,canActivate:[Logged]},
  {path:'crear', component:CrearReservaComponent,canActivate:[Logged]},
  {path:'recursos', component:RecursosComponent,canActivate:[Logged]},
  {path:'crearreserva-administrador',component:CrearreservaAdministradorComponent,canActivate:[LoggedAdmin]},
  {path:'mostrarreserva-administrador',component:MostrarreservaAdministradorComponent,canActivate:[LoggedAdmin]},
  {path:'asignar-docente',component:AsignarDocenteComponent,canActivate:[LoggedAdmin]},
  {path:'credenciales', component:CredencialesComponent,canActivate:[LoggedAdmin]},
  {path:'bloques',component:BloquesComponent,canActivate:[LoggedAdmin]},
  {path:'asignaturas',component:AsignaturasComponent,canActivate:[LoggedAdmin]},
  {
    path:'usuarios',component:UsuariosComponent,canActivate:[LoggedAdmin]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'perfil',component:PerfilComponent,canActivate:[Logged]
  },
  {
    path:'404',component:NotfoundComponent
  },
  {
    path:'**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
