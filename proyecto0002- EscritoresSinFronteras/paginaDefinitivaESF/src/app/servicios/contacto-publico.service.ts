import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

/** Datos públicos de contacto: editables sustituyendo `assets/data/contacto.json` o sirviendo el mismo archivo vía `GET /api/contacto`. */
export type ContactoPublicoDto = {
  empresa: {
    nombreComercial: string;
    nombreLegal: string;
    descripcion: string;
    nif: string;
    registroMercantil: string;
  };
  accionistas: { nombre: string; detalle: string }[];
  telefonos: { etiqueta: string; numero: string; nota?: string }[];
  correos: { etiqueta: string; email: string }[];
  direcciones: { etiqueta: string; lineas: string[] }[];
  disponibilidad: {
    intro: string;
    horarios: { zona: string; texto: string }[];
    respuesta: string;
    idiomas: string;
  };
  imagen: {
    src: string;
    alt: string;
    titulo: string;
    pie: string;
  };
};

@Injectable({ providedIn: 'root' })
export class ContactoPublicoService {
  constructor(private readonly http: HttpClient) {}

  /** JSON en `assets` en desarrollo; en producción con SSR también puede usarse `GET /api/contacto`. */
  getContactoPublico(): Observable<ContactoPublicoDto> {
    return this.http.get<ContactoPublicoDto>('assets/data/contacto.json').pipe(
      catchError(() => this.http.get<ContactoPublicoDto>('/api/contacto')),
    );
  }
}
