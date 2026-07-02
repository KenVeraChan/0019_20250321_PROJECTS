import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importa HttpClient para solicitudes HTTP y HttpHeaders para añadir encabezados.
import { Injectable } from '@angular/core'; // Importa Injectable para que Angular pueda inyectar este servicio.
import { Observable, catchError } from 'rxjs'; // Importa Observable para tipos reativos y catchError para manejar errores.
import { HEADER_CARGA_SECCION } from './estado-errores.service'; // Importa una constante de encabezado personalizada de otro servicio.

/**
 * Datos públicos de contacto: editables sustituyendo `assets/data/contacto.json`
 * o sirviendo el mismo archivo vía `GET /api/contacto`.
 */
export type ContactoPublicoDto = {
  empresa: {
    nombreComercial: string; // Nombre comercial de la empresa.
    nombreLegal: string; // Nombre legal registrado.
    descripcion: string; // Descripción breve de la empresa.
    nif: string; // NIF / CIF de la empresa.
    registroMercantil: string; // Información del registro mercantil.
  };
  accionistas: { nombre: string; detalle: string }[]; // Lista de accionistas con nombre y detalle.
  telefonos: { etiqueta: string; numero: string; nota?: string }[]; // Lista de teléfonos con etiqueta, número y nota opcional.
  correos: { etiqueta: string; email: string }[]; // Lista de correos con etiqueta y dirección.
  direcciones: { etiqueta: string; lineas: string[] }[]; // Lista de direcciones formateadas en varias líneas.
  disponibilidad: {
    intro: string; // Texto introductorio de disponibilidad.
    horarios: { zona: string; texto: string }[]; // Horarios por zona y texto.
    respuesta: string; // Mensaje de respuesta o tiempo de respuesta.
    idiomas: string; // Idiomas disponibles.
  };
  imagen: {
    src: string; // Ruta de la imagen.
    alt: string; // Texto alternativo para accesibilidad.
    titulo: string; // Título de la imagen.
    pie: string; // Pie de foto o descripción secundaria.
  };
};

@Injectable({ providedIn: 'root' }) // Indica que este servicio se provee en la raíz de la aplicación.
export class ContactoPublicoService {
  constructor(private readonly http: HttpClient) {} // Inyecta HttpClient para hacer peticiones HTTP.

  /**
   * JSON en `assets` en desarrollo; en producción con SSR también puede usarse `GET /api/contacto`.
   */
  getContactoPublico(): Observable<ContactoPublicoDto> {
    const headersApi = new HttpHeaders().set(HEADER_CARGA_SECCION, '1'); // Crea encabezados personalizados para la segunda petición.
    return this.http.get<ContactoPublicoDto>('assets/data/contacto.json').pipe(
      catchError(() =>
        this.http.get<ContactoPublicoDto>('/api/contacto', { headers: headersApi }), // Si falla la primera petición, intenta la API o SSR.
      ),
    );
  }
}
