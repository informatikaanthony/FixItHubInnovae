import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-support-incidence',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './add-support-incidence.component.html',
  styleUrl: './add-support-incidence.component.css'
})
export class AddSupportIncidenceComponent {
  @Input() statuses: any[] = []; // Estados disponibles para la incidencia

  @Input() currentUser: any = []; // Usuarios disponibles para asignar

  @Output() save = new EventEmitter<any>(); // Evento de guardar
  @Output() cancel = new EventEmitter<void>(); // Evento de cancelar

  incidence: any = {
    title: '',
    description: '',
    assigned_to: null,
    incidence_status_id: null,
    assigned_to_role: 2
  };

  // Función para guardar la nueva incidencia
  onSave(): void {
    this.incidence.assigned_to = this.currentUser.id;
    console.log(this.incidence);
    this.save.emit(this.incidence); // Emitir la nueva incidencia
  }

  // Función para cancelar la creación
  onCancel(): void {
    this.incidence.assigned_user = this.currentUser.id;
    this.cancel.emit(); // Emitir el evento de cancelación
  }
}
