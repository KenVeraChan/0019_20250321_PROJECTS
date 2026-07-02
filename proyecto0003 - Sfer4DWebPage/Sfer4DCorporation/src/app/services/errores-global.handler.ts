import { ErrorHandler, Injectable } from '@angular/core'; // Importa ErrorHandler para implementar el manejador global de errores y Injectable para inyectarlo.
import { EstadoErroresService } from './estado-errores.service'; // Importa un servicio que gestiona el estado de errores en la aplicación.

@Injectable() // Marca esta clase como inyectable para que Angular pueda usarla como proveedor de ErrorHandler.
export class ErroresGlobalHandler implements ErrorHandler {
  constructor(private readonly estadoErrores: EstadoErroresService) {} // Inyecta el servicio de estado de errores.

  handleError(error: unknown): void {
    console.error('[ESF] Error no capturado:', error); // Registra en la consola el error no capturado con una etiqueta clara.
    this.estadoErrores.activarErrorInesperado(error); // Notifica al servicio de errores para activar una pantalla o estado de error.
  }
}
