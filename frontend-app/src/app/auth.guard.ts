import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localData = localStorage.getItem("loginpassed");  // Verifica si el usuario está logueado

  if (localData != null) {
    return true;  // Si está autenticado, deja pasar
  } else {
    // Si no está autenticado, redirige a la página de login
    router.navigate(['/login']); 
    return false;  // Bloquea el acceso a la ruta
  }
};
