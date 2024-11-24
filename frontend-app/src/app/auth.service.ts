import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// Define la URL de tu API
const API_URL = 'http://localhost:8000'; // Reemplázalo con tu URL real

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Método para hacer login
  login(email: string, password: string): Observable<any> {
    const url = `${API_URL}/login`;
    const body = {
      email: email, 
      password: password
    };

    return this.http.post(url, body)
      .pipe(
        tap((response:any)=>{
          if (response && response.access_token){
            this.saveToken(response.access_token);
          }
        }),
        catchError(this.handleError)
      );
  }

  private saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  // Método para manejar errores
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error del servidor: ${error.status} - ${error.message}`;
    }

    console.error(errorMessage); // Log del error (opcional)
    return throwError(() => new Error(errorMessage)); // Devuelve un Observable con el error
  }
}
