import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ROUTE_NAMES } from '../../routes-names';
import { NgIf } from '@angular/common';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  ROUTE_NAMES = ROUTE_NAMES; // Hacer disponible el objeto para el template
  userRole: string = '';

  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.userRole = this.authService.getUserRole() || '';
  }


}
