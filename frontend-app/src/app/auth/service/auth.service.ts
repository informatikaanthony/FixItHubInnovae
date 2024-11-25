import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthToken } from '../../models/AuthToken.model';

// Define la URL de tu API
const API_URL = 'http://localhost:8000/api'; // Asegúrate de usar la URL correcta de tu servidor backend

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // Método para hacer login
  login(email: string, password: string): Observable<any> {
    const url = `${API_URL}/login`; // La URL de la API
    const body = {
      email: email,
      password: password,
    };

    return this.http.post(url, body).pipe(
      tap((response: any) => {
        // Si la respuesta es válida y contiene un token, guardamos el token
        if (response && response.auth && response.auth.status) {
          this.saveToken(response.auth);
        }
      }),
      catchError(this.handleError) // Manejo de errores si la petición falla
    );
  }
// Guardar el token en el localStorage
private saveToken(token: AuthToken): void {
  localStorage.setItem('access_token', JSON.stringify(token)); // Guarda el token de acceso
}

// Obtener el token desde el localStorage
getToken(): AuthToken | null {
  const storedToken = localStorage.getItem('access_token');
  if (storedToken) {
    return JSON.parse(storedToken) as AuthToken;  // Parsear y devolver el objeto AuthToken
  }
  return null;
}

getUserRole(): string | null {
  const authData = this.getToken(); // Recuperamos el objeto completo desde el localStorage
  return authData ? authData.user.role : null; // Accedemos al rol del usuario
}


// Eliminar el token (logout)
// Método de logout
logout(): Observable<any> {
  const token = this.getToken();

  if (!token) {
    console.error('No token found');
    return new Observable(observer => {
      observer.error('No token found');
    });
  }

  const url = `${API_URL}/logout`; // Ajusta esta URL según tu endpoint
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token.access_token}`, // Incluye el token en el encabezado
  });

  return this.http.post(url, {}, { headers }).pipe(
    tap(() => {
      // Eliminamos el token local al recibir una respuesta exitosa
      localStorage.removeItem('access_token');
      console.log('Logout exitoso');
    }),
    catchError(error => {
      console.error('Error durante el logout', error);
      throw error;
    })
  );
}

  // Método para manejar errores de la API
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido.';  // Mensaje genérico de error

    // Si el error es del lado del cliente (ej. problemas de conexión)
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del servidor (ej. errores 422, 500)
      if (error.status === 422 && error.error.errors) {
        // Si el backend devuelve errores específicos, los propagamos
        return throwError(() => ({
          status: false,
          message: error.error.message || 'Hubo un error al procesar tu solicitud',
          errors: error.error.errors
        }));
      } else {
        errorMessage = `Error del servidor: ${error.status} - ${error.message}`;
      }
    }

    console.error(errorMessage);  // Log para depuración

    // Propagamos el error al componente para su manejo
    return throwError(() => new Error(errorMessage));
  }
}
