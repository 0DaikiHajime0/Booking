import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MostrarReservasComponent } from './seccion/mostrar-reservas/mostrar-reservas.component'

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'listar', component:MostrarReservasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
