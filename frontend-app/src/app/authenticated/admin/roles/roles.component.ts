import { Component } from '@angular/core';
import { HeaderComponent } from '../../../layouts/header/header.component';
import { SidebarComponent } from '../../../layouts/sidebar/sidebar.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {

}
