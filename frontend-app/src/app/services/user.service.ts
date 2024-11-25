import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';

// Definir la URL base de la API
const API_URL = 'http://localhost:8000/api/users'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Método para obtener los encabezados con el token de autenticación
  private getHttpOptions() {
    const token = this.authService.getToken()?.access_token;
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  // Obtener todos los usuarios
  getAllUsers(): Observable<any> {
    return this.http.get(`${API_URL}`, this.getHttpOptions());
  }

  //Obtener el rol de usuario
  getUser(id: number): Observable<any> {
    return this.http.get(`${API_URL}/${id}`, this.getHttpOptions());
  }

  // Obtener todos los usuarios
  getAllRoles(): Observable<any> {
    return this.http.get(`${API_URL}/roles`, this.getHttpOptions());
  }
}
