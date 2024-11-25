import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';

const API_URL = 'http://localhost:8000/api/incidence-statuses';  // URL para obtener los estados

@Injectable({
  providedIn: 'root'
})
export class IncidenceStatusService {

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

  // Método para obtener los estados de incidencia
  getIncidenceStatuses(): Observable<any> {
    return this.http.get(`${API_URL}`, this.getHttpOptions());
  }
}
