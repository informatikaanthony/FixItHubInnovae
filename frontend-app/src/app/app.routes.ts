import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'home',
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent), 
  },
  {
    path: 'login',
    title: 'login',
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
  },
  {
    path: 'admin-dashboard',
    title: 'admin dashboard',
    loadComponent: () =>import('./authenticated/admin/dashboard/dashboard.component').then(c=>c.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'admin-roles',
    title: 'admin roles',
    loadComponent: () =>import('./authenticated/admin/roles/roles.component').then(c=>c.RolesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'admin-users',
    title: 'admin users',
    loadComponent: () =>import('./authenticated/admin/users/users.component').then(c=>c.UsersComponent),
    canActivate: [authGuard]
  },
];
