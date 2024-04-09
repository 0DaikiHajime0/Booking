import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './seccion/perfil/perfil.component';
import { CrearReservaComponent } from './seccion/crear-reserva/crear-reserva.component';
import { MostrarReservasComponent } from './seccion/mostrar-reservas/mostrar-reservas.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerfilComponent,
    CrearReservaComponent,
    MostrarReservasComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
