import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatExpansionModule } from '@angular/material/expansion';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './seccion/perfil/perfil.component';
import { CrearReservaComponent } from './seccion/crear-reserva/crear-reserva.component';
import { MostrarReservasComponent } from './seccion/mostrar-reservas/mostrar-reservas.component';
import { HomeComponent } from './home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { FullCalendarModule } from '@fullcalendar/angular';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';


import {
  GoogleLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig
} from '@abacritt/angularx-social-login';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosComponent } from './seccion/usuarios/usuarios.component';
import { AsignaturasComponent } from './seccion/asignaturas/asignaturas.component';
import { RecursosComponent } from './seccion/recursos/recursos.component';
import { CrearreservaAdministradorComponent } from './seccion/crearreserva-administrador/crearreserva-administrador.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerfilComponent,
    CrearReservaComponent,
    MostrarReservasComponent,
    HomeComponent,
    UsuariosComponent,
    AsignaturasComponent,
    RecursosComponent,
    CrearreservaAdministradorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatPaginatorModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    HttpClientModule,
    MatSidenavModule,
    MatExpansionModule,
    FullCalendarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatTableModule,
    MatTooltipModule,
    MatSlideToggleModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '876981543045-0ae1l8skl0nfd5mraj40haqhackbgng3.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
