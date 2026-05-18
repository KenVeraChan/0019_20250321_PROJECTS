import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { EstadoErroresService, HEADER_CARGA_SECCION } from './estado-errores.service';

/**
 * Solo activa la página de error global en peticiones marcadas con
 * X-ESF-Carga-Seccion (carga principal de sección). Los POST de formularios
 * y la carga de noticias del inicio no bloquean toda la sección.
 */
@Injectable()
export class ErroresHttpInterceptor implements HttpInterceptor {
  constructor(private readonly estadoErrores: EstadoErroresService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((err: unknown) => {
        if (req.headers.get(HEADER_CARGA_SECCION) === '1' && err instanceof HttpErrorResponse) {
          this.estadoErrores.registrarDesdeHttp(err, `${req.method} ${req.urlWithParams}`);
        }
        return throwError(() => err);
      }),
    );
  }
}
