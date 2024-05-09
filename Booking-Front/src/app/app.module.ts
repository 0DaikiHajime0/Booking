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
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort,Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';

import {
  GoogleLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig
} from '@abacritt/angularx-social-login';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosComponent } from './seccion/usuarios/usuarios.component';
import { RecursosComponent } from './seccion/recursos/recursos.component';
import { CrearreservaAdministradorComponent } from './seccion/crearreserva-administrador/crearreserva-administrador.component';
import { MostrarreservaAdministradorComponent } from './seccion/mostrarreserva-administrador/mostrarreserva-administrador.component';
import { AsignarDocenteComponent } from './seccion/asignar-docente/asignar-docente.component';
import { CredencialesComponent } from './seccion/credenciales/credenciales.component';
import { BloquesComponent } from './seccion/bloques/bloques.component';
import { AsignaturasComponent } from './seccion/asignaturas/asignaturas.component';
import { NotfoundComponent } from './seccion/notfound/notfound.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerfilComponent,
    CrearReservaComponent,
    MostrarReservasComponent,
    HomeComponent,
    UsuariosComponent,
    RecursosComponent,
    CrearreservaAdministradorComponent,
    MostrarreservaAdministradorComponent,
    AsignarDocenteComponent,
    CredencialesComponent,
    BloquesComponent,
    AsignaturasComponent,
    NotfoundComponent,
  ],
  imports: [
    MatNativeDateModule,
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
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTabsModule,
    MatDatepickerModule
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
