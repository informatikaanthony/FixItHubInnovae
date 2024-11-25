import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';

// Definir la URL base de la API
const API_URL = 'http://localhost:8000/api/incidences';

@Injectable({
  providedIn: 'root'
})
export class IncidenceService {

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

  // Obtener incidencias por rol (ruta GET /role/{id})
  getAllIncidences(): Observable<any> {
    return this.http.get(`${API_URL}`, this.getHttpOptions());
  }
  // Obtener incidencias por rol (ruta GET /role/{id})
  getByRole(id: number): Observable<any> {
    return this.http.get(`${API_URL}/role/${id}`, this.getHttpOptions());
  }

  // Obtener una incidencia por su ID (ruta GET /{id})
  getIncidenceById(id: number): Observable<any> {
    return this.http.get(`${API_URL}/${id}`, this.getHttpOptions());
  }

  // Actualizar una incidencia por su ID (ruta PUT /{id})
  updateIncidence(id: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, data, this.getHttpOptions());
  }

  // Eliminar (cambiar estado a false) una incidencia por su ID (ruta DELETE /{id})
  deleteIncidence(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`, this.getHttpOptions());
  }

  createIncidence(data: any): Observable<any> {
    return this.http.put(`${API_URL}`, data ,this.getHttpOptions());
  }
}
