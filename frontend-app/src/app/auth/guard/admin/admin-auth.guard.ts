import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ROUTE_NAMES } from '../../../routes-names';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  // Obtén las instancias de los servicios inyectados
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si el usuario está autenticado
  if (authService.getToken()) {
    // Si el usuario es Admin, permite el acceso
    if (authService.getUserRole() === 'Admin') {
      return true;  // Deja pasar a la ruta
    } else {
      // Si el usuario no es Admin, redirige al dashboard de soporte o alguna ruta alternativa
      router.navigate([`/${ROUTE_NAMES.SUPPORT.BASE}/${ROUTE_NAMES.SUPPORT.DASHBOARD}`]);
      return false;  // Bloquea el acceso
    }
  } else {
    // Si el usuario no está autenticado, redirige a la página de login
    router.navigate([`/${ROUTE_NAMES.LOGIN}`]);
    return false;  // Bloquea el acceso
  }
};
