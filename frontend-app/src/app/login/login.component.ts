import { NgIf, } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule], // Importa ReactiveFormsModule también
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Definición inicial del formulario

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Inicialización del formulario reactivo
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Formulario válido:', this.loginForm.value);
      // Aquí se incluiría la lógica para interactuar con un backend
    } else {
      console.log('Formulario inválido');
      this.loginForm.markAllAsTouched(); // Marca los campos para mostrar errores
    }
  }
}
