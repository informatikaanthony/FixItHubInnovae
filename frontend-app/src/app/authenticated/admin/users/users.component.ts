import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../layouts/header/header.component';
import { SidebarComponent } from '../../../layouts/sidebar/sidebar.component';
import { NgFor, NgIf } from '@angular/common';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgIf, NgFor],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'] // Corregido `styleUrl` a `styleUrls` (nombre correcto)
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  errorMessage: string = ''; // Se recomienda iniciar con una cadena vacía para evitar posibles errores de tipo.

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadAllUsers(); // Llamada correcta a loadAllUsers en el ciclo de vida ngOnInit
  }

  loadAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data; // Asignamos los usuarios obtenidos a la variable users
      },
      error: (err) => {
        this.errorMessage = 'No se pudieron cargar la lista de usuarios.'; // Mensaje de error si ocurre algún problema
        console.error('Error cargando lista de usuarios', err); // Consola de error para depuración
      }
    });
  }
}
