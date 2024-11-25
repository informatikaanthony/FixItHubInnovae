import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../auth/service/auth.service';
import { Route, Router } from '@angular/router';
import { ROUTE_NAMES } from '../routes-names';


@Component({
  selector: 'app-login',
  imports: [NgIf, ReactiveFormsModule], // Importa ReactiveFormsModule también
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Definición inicial del formulario
  errorMessage: string | null = null;  // Variable para el mensaje general de error
  formErrors: { [key: string]: string } = {};
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Método que se ejecuta cuando el formulario se envía
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);
        this.errorMessage = null;
        this.formErrors = {};  // Limpiar los errores específicos de campos
        // Redirigir al usuario a la página del dashboard
        const userRole = this.authService.getUserRole(); // Suponiendo que la respuesta tiene el rol del usuario
        if (userRole === 'Admin') {
          this.router.navigate([`/${ROUTE_NAMES.ADMIN.BASE}/${ROUTE_NAMES.ADMIN.DASHBOARD}`]); // Redirigir a dashboard admin
        } else {
          this.router.navigate([`/${ROUTE_NAMES.SUPPORT.BASE}/${ROUTE_NAMES.SUPPORT.DASHBOARD}`]); // Redirigir a dashboard soporte
        }

      },
      error: (error) => {
        if (error.errors) {
          this.formErrors = {};  // Limpiar errores anteriores

          // Asignamos los errores específicos de los campos
          if (error.errors['email']) {
            this.formErrors['email'] = error.errors['email'].join(', ');
          }
          if (error.errors['password']) {
            this.formErrors['password'] = error.errors['password'].join(', ');
          }
        }

        // Mensaje general de error
        this.errorMessage = error.message || 'Hubo un problema al procesar tu solicitud';
      }
    });
  }
}