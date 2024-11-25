import { Routes } from '@angular/router';
import { authGuard } from './auth/guard/auth.guard';
import { adminAuthGuard } from './auth/guard/admin/admin-auth.guard';
import { ROUTE_NAMES } from './routes-names';

export const routes: Routes = [
  {
    path: ROUTE_NAMES.HOME,
    title: 'home',
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
  },
  {
    path: ROUTE_NAMES.LOGIN,
    title: 'login',
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
  },
  // Acceso de Administrador
  {
    path: ROUTE_NAMES.ADMIN.BASE,
    canActivate: [adminAuthGuard],
    children: [
      {
        path: ROUTE_NAMES.ADMIN.DASHBOARD,
        title: 'admin dashboard',
        loadComponent: () =>
          import('./authenticated/admin/dashboard/dashboard.component').then(c => c.DashboardComponent),
      },
      {
        path: ROUTE_NAMES.ADMIN.ROLES,
        title: 'admin roles',
        loadComponent: () =>
          import('./authenticated/admin/roles/roles.component').then(c => c.RolesComponent),
      },
      {
        path: ROUTE_NAMES.ADMIN.USERS,
        title: 'admin users',
        loadComponent: () =>
          import('./authenticated/admin/users/users.component').then(c => c.UsersComponent),
      },
    ],
  },
  // Acceso de Soporte
  {
    path: ROUTE_NAMES.SUPPORT.BASE,
    canActivate: [authGuard],
    children: [
      {
        path: ROUTE_NAMES.SUPPORT.DASHBOARD,
        title: 'support dashboard',
        loadComponent: () =>
          import('./authenticated/dashboard/dashboard.component').then(c => c.DashboardComponent),
      },
    ],
  },
];
