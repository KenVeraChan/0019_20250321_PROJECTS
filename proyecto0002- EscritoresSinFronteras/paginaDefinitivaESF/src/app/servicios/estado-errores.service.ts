import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

/** Cabecera HTTP: petición de carga principal de una sección (bloquea la sección si falla). */
export const HEADER_CARGA_SECCION = 'X-ESF-Carga-Seccion';

export type ModoError =
  | 'ninguno'
  | 'ruta-no-encontrada'
  | 'sin-conexion'
  | 'servidor-no-disponible'
  | 'error-servidor'
  | 'error-cliente'
  | 'error-inesperado';

export interface EstadoErrorVista {
  modo: ModoError;
  mostrarPagina: boolean;
  tipoError: string;
  codigo: string;
  titulo: string;
  lead: string;
  consejos: string[];
  detalle?: string;
  operacion?: string;
  httpStatus?: number;
}

const ESTADO_INICIAL: EstadoErrorVista = {
  modo: 'ninguno',
  mostrarPagina: false,
  tipoError: '',
  codigo: '',
  titulo: '',
  lead: '',
  consejos: [],
};

@Injectable({ providedIn: 'root' })
export class EstadoErroresService {
  private readonly estadoSubject = new BehaviorSubject<EstadoErrorVista>(ESTADO_INICIAL);

  readonly estado$ = this.estadoSubject.asObservable();

  obtenerSnapshot(): EstadoErrorVista {
    return this.estadoSubject.value;
  }

  limpiar(): void {
    this.estadoSubject.next(ESTADO_INICIAL);
  }

  activarRutaNoEncontrada(ruta: string): void {
    this.publicar(this.vistaParaModo('ruta-no-encontrada', {
      detalle: ruta,
      operacion: 'Navegación a una URL no registrada en el sitio',
    }));
  }

  activarSinConexion(operacion?: string): void {
    this.publicar(
      this.vistaParaModo('sin-conexion', {
        operacion: operacion ?? 'Comunicación con el servidor',
      }),
    );
  }

  activarErrorInesperado(error: unknown): void {
    const detalle =
      error instanceof Error ? error.message : typeof error === 'string' ? error : 'Error desconocido';
    this.publicar(
      this.vistaParaModo('error-inesperado', {
        detalle,
        operacion: 'Ejecución de la aplicación en el navegador',
      }),
    );
  }

  registrarDesdeHttp(error: HttpErrorResponse, operacion: string): void {
    const modo = this.modoDesdeHttp(error);
    this.publicar(
      this.vistaParaModo(modo, {
        httpStatus: error.status || undefined,
        detalle: this.detalleHttp(error),
        operacion,
      }),
    );
  }

  private modoDesdeHttp(error: HttpErrorResponse): ModoError {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return 'sin-conexion';
    }
    if (error.status === 0) {
      return typeof navigator !== 'undefined' && !navigator.onLine
        ? 'sin-conexion'
        : 'servidor-no-disponible';
    }
    if (error.status === 502 || error.status === 503 || error.status === 504) {
      return 'servidor-no-disponible';
    }
    if (error.status >= 500) {
      return 'error-servidor';
    }
    if (error.status >= 400) {
      return 'error-cliente';
    }
    return 'servidor-no-disponible';
  }

  private detalleHttp(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'No hubo respuesta del servidor (red, CORS o servicio detenido).';
    }
    const cuerpo =
      typeof error.error === 'string'
        ? error.error
        : error.error?.message ?? error.message;
    return cuerpo ? String(cuerpo).slice(0, 280) : error.statusText || 'Error HTTP';
  }

  private vistaParaModo(
    modo: ModoError,
    extra: Partial<EstadoErrorVista>,
  ): EstadoErrorVista {
    const base = this.configuracionPorModo(modo);
    return {
      ...base,
      modo,
      mostrarPagina: modo !== 'ninguno',
      ...extra,
    };
  }

  private configuracionPorModo(modo: ModoError): EstadoErrorVista {
    switch (modo) {
      case 'ruta-no-encontrada':
        return {
          ...ESTADO_INICIAL,
          modo,
          mostrarPagina: true,
          tipoError: 'Ruta no encontrada',
          codigo: '404',
          titulo: 'Página no encontrada',
          lead:
            'La dirección que has abierto no existe en nuestro mapa de rutas. Revisa el enlace o vuelve al inicio.',
          consejos: [
            'Comprueba que la URL esté bien escrita.',
            'Usa el menú superior para ir a una sección conocida.',
            'Si llegaste desde un enlace externo, puede estar desactualizado.',
          ],
        };
      case 'sin-conexion':
        return {
          ...ESTADO_INICIAL,
          modo,
          mostrarPagina: true,
          tipoError: 'Sin conexión a internet',
          codigo: 'OFF',
          titulo: 'Sin conexión',
          lead:
            'El navegador no puede comunicarse con la red. Comprueba tu Wi‑Fi o datos móviles e inténtalo de nuevo.',
          consejos: [
            'Verifica que tengas internet en otros sitios.',
            'Desactiva el modo avión si está activo.',
            'Pulsa «Reintentar» cuando recuperes la conexión.',
          ],
        };
      case 'servidor-no-disponible':
        return {
          ...ESTADO_INICIAL,
          modo,
          mostrarPagina: true,
          tipoError: 'Servidor no disponible',
          codigo: '503',
          titulo: 'Servicio no disponible',
          lead:
            'No hemos podido contactar con el servidor de Escritores Sin Fronteras. Puede estar en mantenimiento o temporalmente fuera de línea.',
          consejos: [
            'Espera unos minutos y pulsa «Reintentar».',
            'Si el problema continúa, escríbenos desde contacto.',
          ],
        };
      case 'error-servidor':
        return {
          ...ESTADO_INICIAL,
          modo,
          mostrarPagina: true,
          tipoError: 'Error del servidor',
          codigo: '500',
          titulo: 'Error en el servidor',
          lead:
            'El servidor ha respondido con un fallo interno al procesar la operación solicitada.',
          consejos: [
            'Vuelve a intentarlo en unos instantes.',
            'Si publicabas o guardabas datos, comprueba si se aplicó antes de repetir.',
          ],
        };
      case 'error-cliente':
        return {
          ...ESTADO_INICIAL,
          modo,
          mostrarPagina: true,
          tipoError: 'Solicitud rechazada',
          codigo: '400',
          titulo: 'No se pudo completar la operación',
          lead:
            'El servidor no ha aceptado la petición (datos incorrectos, recurso no encontrado o permisos insuficientes).',
          consejos: [
            'Revisa los datos introducidos si estabas en un formulario.',
            'Vuelve al listado e inténtalo de nuevo.',
          ],
        };
      case 'error-inesperado':
        return {
          ...ESTADO_INICIAL,
          modo,
          mostrarPagina: true,
          tipoError: 'Error inesperado',
          codigo: 'APP',
          titulo: 'Algo ha fallado',
          lead:
            'Ha ocurrido un error inesperado en la aplicación. Puedes volver al inicio o recargar la página.',
          consejos: [
            'Recarga la página con «Reintentar».',
            'Si se repite, prueba otro navegador o dispositivo.',
          ],
        };
      default:
        return { ...ESTADO_INICIAL };
    }
  }

  private publicar(estado: EstadoErrorVista): void {
    this.estadoSubject.next(estado);
  }
}
