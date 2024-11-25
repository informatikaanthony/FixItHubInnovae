import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importante para usar ngModel
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-add-incidence',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './add-incidence.component.html',
  styleUrls: ['./add-incidence.component.css']
})
export class AddIncidenceComponent {

  // Recibe los estados de incidencia desde el componente padre
  @Input() users: any[] = [];
  // Recibe los estados de incidencia desde el componente padre
  @Input() statuses: any[] = [];
  @Output() save = new EventEmitter<any>();  // Emite la incidencia al componente padre
  @Output() cancel = new EventEmitter<void>(); // Emite el evento de cancelación

  incidence: any = {
    title: '',
    description: '',
    assigned_to: null,
    incidence_status_id: null,
    assigned_to_role: null
  };

  constructor() {
    // En un escenario real, cargarías usuarios y estados desde un servicio
  }

  // Método para guardar la incidencia
  onSave(): void {
    if (this.incidence.assigned_to) {
      const user = this.users.find(
        (user) => user.id == this.incidence.assigned_to
      );
      if (user) {
        this.incidence.assigned_to_role = user.role_id;
      }
    }
    this.save.emit(this.incidence);  // Emite los datos de la incidencia al componente padre
  }

  // Método para cancelar
  onCancel(): void {
    this.cancel.emit();  // Notifica al componente padre que la acción fue cancelada
  }
}
