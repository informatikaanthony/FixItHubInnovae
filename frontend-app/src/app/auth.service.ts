import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define la URL de tu API
const API_URL = 'https://localhost:8000'; // Reemplázalo con tu URL real

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    // Prepara el cuerpo de la solicitud
    const body = {
      username: username,
      password: password
    };

    // Realiza la solicitud POST a la API para hacer login
    return this.http.post(API_URL, body);
  }

  // Aquí puedes agregar otros métodos como logout, etc.
}
