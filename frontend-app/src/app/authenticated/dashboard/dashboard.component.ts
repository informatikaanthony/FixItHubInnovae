import { Component, OnInit } from '@angular/core';

import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../../layouts/header/header.component';
import { SidebarComponent } from '../../layouts/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { IncidenceService } from '../../services/incidence.service';
import { IncidenceStatusService } from '../../services/incidence-status.service';
import { UserService } from '../../services/user.service';
import { EditSupportIncidenceComponent } from './edit-support-incidence/edit-support-incidence.component';
import { AddSupportIncidenceComponent } from './add-support-incidence/add-support-incidence.component';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    NgFor,
    NgIf,
    FormsModule,
    EditSupportIncidenceComponent,
    AddSupportIncidenceComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  incidences: any[] = [];
  errorMessage: string = '';
  selectedIncidence: any = null;
  statuses: any[] = [];
  currentUser: any = [];
  users: any[] = [];
  isAddingIncidence: boolean = false;

  constructor(
    private incidenceService: IncidenceService,
    private incidenceStatusService: IncidenceStatusService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAllIncidences();
    this.loadIncidenceStatuses();
    this.loadAllUsers();
    this.currentUser = this.authService.getToken()?.user || [];
    console.log(this.currentUser);
  }

  loadAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        this.errorMessage = 'No se pudieron cargar la lista de usuarios.';
        console.error('Error cargando lista de usuarios', err);
      },
    });
  }

  loadIncidenceStatuses(): void {
    this.incidenceStatusService.getIncidenceStatuses().subscribe({
      next: (data) => {
        this.statuses = data;
      },
      error: (err) => {
        this.errorMessage =
          'No se pudieron cargar los estados. Intenta nuevamente.';
        console.error('Error cargando estados de incidencia', err);
      },
    });
  }

  loadAllIncidences(): void {
    this.incidenceService.getByRole(2).subscribe({
      next: (data) => {
        this.incidences = data;
      },
      error: (err) => {
        this.errorMessage =
          'No se pudieron cargar las incidencias. Intenta nuevamente.';
        console.error('Error cargando incidencias', err);
      },
    });
  }

  editIncidence(incidence: any): void {
    this.selectedIncidence = { ...incidence };
  }

  cancelEdit(): void {
    this.selectedIncidence = null;
  }

  updateIncidence(incidence: any): void {
    this.incidenceService.updateIncidence(incidence.id, incidence).subscribe({
      next: (data) => {
        this.loadAllIncidences();
        this.selectedIncidence = null;
      },
      error: (err) => {
        this.errorMessage =
          'No se pudo actualizar la incidencia. Intenta nuevamente.';
        console.error('Error actualizando incidencia', err);
      },
    });
  }

  deleteIncidence(id: number): void {
    this.incidenceService.deleteIncidence(id).subscribe({
      next: () => {
        this.loadAllIncidences();
      },
      error: (err) => {
        this.errorMessage =
          'No se pudo eliminar la incidencia. Intenta nuevamente.';
        console.error('Error eliminando incidencia', err);
      },
    });
  }

  toggleAddIncidence(): void {
    this.isAddingIncidence = !this.isAddingIncidence;
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

  cancelCreation(): void {
    this.isAddingIncidence = false;
  }
}
