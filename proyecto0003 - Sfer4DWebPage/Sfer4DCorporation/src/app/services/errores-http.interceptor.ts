import { Injectable } from '@angular/core'; // Importa Injectable para que Angular pueda inyectar este interceptor.
import {
  HttpErrorResponse, // Tipo de error HTTP devuelto por HttpClient cuando la petición falla.
  HttpEvent, // Tipo general para eventos de HTTP en Angular.
  HttpHandler, // Maneja la siguiente etapa de la cadena de interceptores.
  HttpInterceptor, // Interfaz que debe implementar cualquier interceptor HTTP.
  HttpRequest, // Tipo que representa una solicitud HTTP.
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs'; // Observable para manejar flujos y operadores para captura de errores.
import { EstadoErroresService, HEADER_CARGA_SECCION } from './estado-errores.service'; // Importa servicio de gestión de errores y la cabecera usada para marcar secciones.

/**
 * Solo activa la página de error global en peticiones marcadas con
 * X-ESF-Carga-Seccion (carga principal de sección). Los POST de formularios
 * y la carga de noticias del inicio no bloquean toda la sección.
 */
@Injectable() // Marca esta clase como inyectable para que Angular la use como interceptor.
export class ErroresHttpInterceptor implements HttpInterceptor {
  constructor(private readonly estadoErrores: EstadoErroresService) {} // Inyecta el servicio que registra errores de la aplicación.

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((err: unknown) => {
        if (req.headers.get(HEADER_CARGA_SECCION) === '1' && err instanceof HttpErrorResponse) {
          // Solo registrar el error si la petición está marcada como carga de sección principal
          // y si el error es realmente un HttpErrorResponse.
          this.estadoErrores.registrarDesdeHttp(err, `${req.method} ${req.urlWithParams}`);
        }
        return throwError(() => err); // Re-lanza el error para que otros manejadores o componentes lo reciban.
      }),
    );
  }
}
