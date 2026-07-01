import { Injectable } from '@angular/core'; // Importa Injectable para que Angular pueda inyectar este servicio.
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para realizar solicitudes HTTP.
import { Observable } from 'rxjs'; // Importa Observable para tipar la respuesta asíncrona.
import { environment } from '../../environments/environments'; // Importa las variables de entorno del proyecto.

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación como singleton.
})
export class RutaPrincipal {

  private apiUrl = environment.apiUrl; // URL base de la API leída desde el entorno.
  constructor(private http: HttpClient) {} // Inyecta HttpClient para usarlo en los métodos del servicio.

  getSaludo(): Observable<{ mensaje: string }> {
    return this.http.get<{ mensaje: string }>(`${this.apiUrl}/saludo`); // Llama a la ruta /saludo de la API y devuelve un Observable con la respuesta.
  }
}
