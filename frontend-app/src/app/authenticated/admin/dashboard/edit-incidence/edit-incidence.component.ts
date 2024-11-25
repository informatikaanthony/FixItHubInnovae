import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-incidence',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './edit-incidence.component.html',
  styleUrl: './edit-incidence.component.css',
})
export class EditIncidenceComponent {
  // Recibe los estados de incidencia desde el componente padre
  @Input() users: any[] = [];
  // Recibe los estados de incidencia desde el componente padre
  @Input() statuses: any[] = [];

  // Recibe la incidencia que se va a editar desde el componente padre
  @Input() incidence: any = null;

  // Emite el evento con la incidencia editada al componente padre
  @Output() save = new EventEmitter<any>();

  // Emite el evento para cancelar la edición al componente padre
  @Output() cancel = new EventEmitter<void>();

  constructor() {}

  // Método para guardar la incidencia editada
  onSave(): void {
    // Verificamos si el campo assigned_to tiene un valor
    if (this.incidence.assigned_to) {
      const user = this.users.find(
        (user) => user.id == this.incidence.assigned_to
      );
      if (user) {
        this.incidence.assigned_to_role = user.role_id;
      }
    }
    this.save.emit(this.incidence); // Emite la incidencia editada al componente padre
  }

  // Método para cancelar la edición
  onCancel(): void {
    console.log(this.users);
    this.cancel.emit(); // Emite la cancelación de la edición al componente padre
  }
}
