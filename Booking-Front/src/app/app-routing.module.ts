import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MostrarReservasComponent } from './seccion/mostrar-reservas/mostrar-reservas.component'
import { HomeComponent } from './home/home.component';
import { CrearReservaComponent } from './seccion/crear-reserva/crear-reserva.component'

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'listar', component:MostrarReservasComponent},
  {path:'home', component:HomeComponent},
  {path:'crear', component:CrearReservaComponent},
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
