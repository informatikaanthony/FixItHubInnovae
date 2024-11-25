import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { ROUTE_NAMES } from '../../routes-names';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  // Corregido de styleUrl a styleUrls
})
export class HeaderComponent {

  ROUTE_NAMES = ROUTE_NAMES;

  constructor(private authService: AuthService, private router: Router) {}

  logout(event: Event): void {
    event.preventDefault(); // Prevenir la acción predeterminada del enlace o botón
    this.authService.logout().subscribe({
      next: () => {
        console.log('Sesión cerrada correctamente');
        this.router.navigate([`/${ROUTE_NAMES.LOGIN}`]);  // Redirige a la página de login
      },
      error: (err) => {
        console.error('Error al cerrar sesión', err);
      }
    });
  }
}
