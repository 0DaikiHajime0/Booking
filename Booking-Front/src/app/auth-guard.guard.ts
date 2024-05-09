import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from './services/login.service';

export const Logged: CanActivateFn = async (route, state) => {
  const loginService = inject(UsuarioService);
  const router = inject(Router);
  const estaLogeado = loginService.getUsuarioFromStorage();
  if (estaLogeado) {
    return true
  } else {
    router.navigate(['/login']);
    return false;
  }
};

export const LoggedAdmin: CanActivateFn = async (route, state) => {
  const loginService = inject(UsuarioService);
  const router = inject(Router);
  const estaLogeado = loginService.getUsuarioFromStorage();
  if (estaLogeado) {
    const esAdmin = loginService.verificarAdmin();
    if (await esAdmin) {
      return true; 
    } else {
      router.navigate(['/404']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};
