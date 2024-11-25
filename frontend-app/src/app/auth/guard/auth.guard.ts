import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService)

  if (authService.getToken()) {
    return true;  // Si está autenticado, deja pasar
  } else {
    // Si no está autenticado, redirige a la página de login
    router.navigate(['/login']); 
    return false;  // Bloquea el acceso a la ruta
  }
};
