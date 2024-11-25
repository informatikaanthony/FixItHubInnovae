import { NgFor, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-support-incidence',
  imports: [NgFor,NgIf,FormsModule],
  templateUrl: './edit-support-incidence.component.html',
  styleUrl: './edit-support-incidence.component.css'
})
export class EditSupportIncidenceComponent {

  @Input() incidence: any = null; // Recibe la incidencia seleccionada
  @Input() statuses: any[] = []; // Estados de las incidencias
  @Input() currentUser: any = []; // Usuario Actual

  @Output() save = new EventEmitter<any>(); // Emite el evento de guardar
  @Output() cancel = new EventEmitter<void>(); // Emite el evento de cancelar

  // Función para guardar los cambios realizados
  onSave(): void {
    this.save.emit(this.incidence); // Emite los cambios hacia el componente principal
  }

  // Función para cancelar la edición
  onCancel(): void {
    this.cancel.emit(); // Emite el evento de cancelar
  }
}
