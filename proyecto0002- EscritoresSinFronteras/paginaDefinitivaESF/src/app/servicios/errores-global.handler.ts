import { ErrorHandler, Injectable } from '@angular/core';
import { EstadoErroresService } from './estado-errores.service';

@Injectable()
export class ErroresGlobalHandler implements ErrorHandler {
  constructor(private readonly estadoErrores: EstadoErroresService) {}

  handleError(error: unknown): void {
    console.error('[ESF] Error no capturado:', error);
    this.estadoErrores.activarErrorInesperado(error);
  }
}
