import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../layouts/header/header.component';
import { SidebarComponent } from '../../../layouts/sidebar/sidebar.component';
import { IncidenceService } from '../../../services/incidence.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para usar ngModel
import { EditIncidenceComponent } from './edit-incidence/edit-incidence.component';
import { IncidenceStatusService } from '../../../services/incidence-status.service';
import { UserService } from '../../../services/user.service';
import { AddIncidenceComponent } from './add-incidence/add-incidence.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    NgFor,
    NgIf,
    FormsModule,
    EditIncidenceComponent,
    AddIncidenceComponent,
  ], // Importar el componente hijo
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  incidences: any[] = []; // Array para almacenar las incidencias obtenidas
  errorMessage: string = '';
  selectedIncidence: any = null; // Variable para almacenar la incidencia seleccionada para editar
  statuses: any[] = []; // Array para almacenar los estados de la incidencia
  users: any[] = [];
  isAddingIncidence: boolean = false; // Bandera para el formulario de añadir incidencia
  AddingIncidence: any[] = []; 

  constructor(
    private incidenceService: IncidenceService,
    private incidenceStatusService: IncidenceStatusService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Llamada al servicio para obtener todas las incidencias
    this.loadAllIncidences();
    this.loadIncidenceStatuses();
    this.loadAllUsers();
  }

  loadAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data; // Asignamos los estados obtenidos a la variable statuses
      },
      error: (err) => {
        this.errorMessage = 'No se pudieron cargar la lista de usuarios.';
        console.error('Error cargando lista de usuarios', err);
      },
    });
  }

  // Cargar los estados de las incidencias
  loadIncidenceStatuses(): void {
    this.incidenceStatusService.getIncidenceStatuses().subscribe({
      next: (data) => {
        this.statuses = data; // Asignamos los estados obtenidos a la variable statuses
      },
      error: (err) => {
        this.errorMessage =
          'No se pudieron cargar los estados. Intenta nuevamente.';
        console.error('Error cargando estados de incidencia', err);
      },
    });
  }

  loadAllIncidences(): void {
    this.incidenceService.getAllIncidences().subscribe({
      next: (data) => {
        this.incidences = data; // Asignamos las incidencias obtenidas a la variable incidences
      },
      error: (err) => {
        this.errorMessage =
          'No se pudieron cargar las incidencias. Intenta nuevamente.';
        console.error('Error cargando incidencias', err);
      },
    });
  }

  // Selecciona la incidencia para editar y asigna el rol del usuario
  editIncidence(incidence: any): void {
    this.selectedIncidence = { ...incidence }; // Creamos una copia de la incidencia seleccionada
  }

  // Función para cancelar la edición
  cancelEdit(): void {
    this.selectedIncidence = null; // Reseteamos la incidencia seleccionada
  }

  // Función para actualizar la incidencia
  updateIncidence(incidence: any): void {
    this.incidenceService.updateIncidence(incidence.id, incidence).subscribe({
      next: (data) => {
        this.loadAllIncidences(); // Recargamos las incidencias después de la actualización
        this.selectedIncidence = null; // Limpiamos la incidencia seleccionada
      },
      error: (err) => {
        this.errorMessage =
          'No se pudo actualizar la incidencia. Intenta nuevamente.';
        console.error('Error actualizando incidencia', err);
      },
    });
  }

  // Eliminar incidencia (cambiar estado a false)
  deleteIncidence(id: number): void {
    this.incidenceService.deleteIncidence(id).subscribe({
      next: () => {
        this.loadAllIncidences(); // Recargamos las incidencias después de eliminar
      },
      error: (err) => {
        this.errorMessage =
          'No se pudo eliminar la incidencia. Intenta nuevamente.';
        console.error('Error eliminando incidencia', err);
      },
    });
  }

  toggleAddIncidence(): void {
    this.isAddingIncidence = !this.isAddingIncidence; // Alternar visibilidad del formulario
  }
  // Manejar la creación de la incidencia
  createIncidence(incidence: any): void {
    this.incidenceService.createIncidence(incidence).subscribe({
      next: (data) => {
        this.loadAllIncidences();
        this.isAddingIncidence = false; //Cerrar el modal
        incidence = []; // eliminamos todo lo que hemos generado
      },
      error: (err) => {
        console.error('Error creando incidencia', err);
      },
    });
  }

  // Método para cancelar la creación
  cancelCreation(): void {
    this.isAddingIncidence = false;
    this.AddingIncidence = []; // eliminamos todo lo que hemos generado
  }
}
