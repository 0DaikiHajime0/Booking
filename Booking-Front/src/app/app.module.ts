import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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

import {
  GoogleLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig
} from '@abacritt/angularx-social-login';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';


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
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatPaginatorModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    HttpClientModule,
    MatSidenavModule
    
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
export class AppModule { }
