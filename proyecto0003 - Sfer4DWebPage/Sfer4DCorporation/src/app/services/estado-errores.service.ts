import { Injectable } from '@angular/core'; // Importa Injectable para poder inyectar este servicio en la aplicación.
import { HttpErrorResponse } from '@angular/common/http'; // Importa el tipo de respuesta de error HTTP.
import { BehaviorSubject } from 'rxjs'; // Importa BehaviorSubject para mantener y emitir el estado de error.

/** Cabecera HTTP: petición de carga principal de una sección (bloquea la sección si falla). */
export const HEADER_CARGA_SECCION = 'X-ESF-Carga-Seccion'; // Cabecera custom usada por el interceptor para marcar ciertas peticiones.

export type ModoError =
  | 'ninguno' // No hay error.
  | 'ruta-no-encontrada' // Error 404 de ruta no encontrada.
  | 'sin-conexion' // Error por falta de conexión a internet.
  | 'servidor-no-disponible' // Error de servidor no disponible o timeout.
  | 'error-servidor' // Error HTTP del lado del servidor (5xx).
  | 'error-cliente' // Error HTTP del lado del cliente (4xx).
  | 'error-inesperado'; // Error inesperado genérico.

export interface EstadoErrorVista {
  modo: ModoError; // Tipo de error.
  mostrarPagina: boolean; // Determina si se debe mostrar la página de error.
  tipoError: string; // Etiqueta legible del tipo de error.
  codigo: string; // Código de error mostrado al usuario.
  titulo: string; // Título principal de la pantalla de error.
  lead: string; // Texto explicativo breve.
  consejos: string[]; // Lista de sugerencias para el usuario.
  detalle?: string; // Detalle técnico opcional del error.
  operacion?: string; // Operación que provocó el error.
  httpStatus?: number; // Código HTTP opcional.
}

const ESTADO_INICIAL: EstadoErrorVista = {
  modo: 'ninguno', // Valor inicial sin error.
  mostrarPagina: false, // No mostrar la página de error por defecto.
  tipoError: '', // Campos vacíos iniciales.
  codigo: '',
  titulo: '',
  lead: '',
  consejos: [],
};

@Injectable({ providedIn: 'root' }) // Marca el servicio como singleton disponible en toda la app.
export class EstadoErroresService {
  private readonly estadoSubject = new BehaviorSubject<EstadoErrorVista>(ESTADO_INICIAL); // Almacena el estado actual de error.

  readonly estado$ = this.estadoSubject.asObservable(); // Observable para que otros componentes se suscriban.

  obtenerSnapshot(): EstadoErrorVista {
    return this.estadoSubject.value; // Devuelve el estado actual sin suscribirse.
  }

  limpiar(): void {
    this.estadoSubject.next(ESTADO_INICIAL); // Restablece el estado de error al valor inicial.
  }

  activarRutaNoEncontrada(ruta: string): void {
    this.publicar(this.vistaParaModo('ruta-no-encontrada', {
      detalle: ruta, // Detalle con la ruta que no se encontró.
      operacion: 'Navegación a una URL no registrada en el sitio', // Operación relacionada con el error.
    }));
  }

  activarSinConexion(operacion?: string): void {
    this.publicar(
      this.vistaParaModo('sin-conexion', {
        operacion: operacion ?? 'Comunicación con el servidor', // Operación predeterminada si no se pasó ninguna.
      }),
    );
  }

  activarErrorInesperado(error: unknown): void {
    const detalle =
      error instanceof Error ? error.message : typeof error === 'string' ? error : 'Error desconocido'; // Extrae un texto de detalle según el tipo de error.
    this.publicar(
      this.vistaParaModo('error-inesperado', {
        detalle,
        operacion: 'Ejecución de la aplicación en el navegador', // Describe el contexto del error.
      }),
    );
  }

  registrarDesdeHttp(error: HttpErrorResponse, operacion: string): void {
    const modo = this.modoDesdeHttp(error); // Determina el modo de error en función del código HTTP y conexión.
    this.publicar(
      this.vistaParaModo(modo, {
        httpStatus: error.status || undefined, // Guarda el estado HTTP si está disponible.
        detalle: this.detalleHttp(error), // Extrae un mensaje de detalle legible.
        operacion,
      }),
    );
  }

  private modoDesdeHttp(error: HttpErrorResponse): ModoError {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return 'sin-conexion'; // Detecta si el navegador está offline.
    }
    if (error.status === 0) {
      return typeof navigator !== 'undefined' && !navigator.onLine
        ? 'sin-conexion'
        : 'servidor-no-disponible'; // Estado 0 significa que no hubo respuesta del servidor.
    }
    if (error.status === 502 || error.status === 503 || error.status === 504) {
      return 'servidor-no-disponible'; // Errores de gateway o servicio no disponible.
    }
    if (error.status >= 500) {
      return 'error-servidor'; // Cualquier 5xx es error servidor.
    }
    if (error.status >= 400) {
      return 'error-cliente'; // Cualquier 4xx es error del cliente.
    }
    return 'servidor-no-disponible'; // Valor por defecto para respuestas inesperadas.
  }

  private detalleHttp(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'No hubo respuesta del servidor (red, CORS o servicio detenido).'; // Mensaje claro para error de respuesta nula.
    }
    const cuerpo =
      typeof error.error === 'string'
        ? error.error
        : error.error?.message ?? error.message; // Extrae mensaje del cuerpo de error si existe.
    return cuerpo ? String(cuerpo).slice(0, 280) : error.statusText || 'Error HTTP'; // Limita el texto a 280 caracteres.
  }

  private vistaParaModo(
    modo: ModoError,
    extra: Partial<EstadoErrorVista>,
  ): EstadoErrorVista {
    const base = this.configuracionPorModo(modo); // Obtiene la configuración base predefinida para el modo.
    return {
      ...base,
      modo,
      mostrarPagina: modo !== 'ninguno', // Solo mostrar la página cuando haya un error real.
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
        return { ...ESTADO_INICIAL }; // Valor por defecto si el modo no coincide con ninguno conocido.
    }
  }

  private publicar(estado: EstadoErrorVista): void {
    this.estadoSubject.next(estado); // Publica el nuevo estado de error a todos los suscriptores.
  }
}
