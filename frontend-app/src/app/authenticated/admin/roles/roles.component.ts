import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../layouts/header/header.component';
import { SidebarComponent } from '../../../layouts/sidebar/sidebar.component';
import { UserService } from '../../../services/user.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgIf, NgFor],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
  users: any[] = [];
  errorMessage: string = ''; // Se recomienda iniciar con una cadena vacía para evitar posibles errores de tipo.

  constructor(private userService: UserService) {}


  ngOnInit(): void {
    this.loadAllRoles(); // Llamada correcta a loadAllUsers en el ciclo de vida ngOnInit
  }
  loadAllRoles(): void {
    this.userService.getAllRoles().subscribe({
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