import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from './services/login.service';

export const authGuardGuard: CanActivateFn = async (route, state) => {
  const loginService = inject(UsuarioService);
  const router = inject(Router);
  const esAdmin = loginService.verificarAdmin();
  if( esAdmin){
    return true
  }
  else{
    router.navigate(['/404']);
    return false
  }
  
};
export const Logged: CanActivateFn = async (route, state) => {
  const loginService = inject(UsuarioService);
  const router = inject(Router);
  const esAdmin = loginService.verificarAdmin();
  const estaLogeado= loginService.getUsuarioFromStorage();
  if(estaLogeado){
    return true
  }else{
    router.navigate(['/login']);
    return false
  }
};