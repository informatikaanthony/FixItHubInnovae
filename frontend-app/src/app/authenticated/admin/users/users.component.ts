import { Component } from '@angular/core';
import { HeaderComponent } from '../../../layouts/header/header.component';
import { SidebarComponent } from '../../../layouts/sidebar/sidebar.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

}
