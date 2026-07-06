import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environments';  //Importa las variables del entorno del proyecto

export interface CookieConsentPreferences {
  /** Cookies técnicas imprescindibles (siempre activas). */
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: number;
}

const STORAGE_KEY = 'esf_cookie_consent_v1';  //Clave usada en localStorage para guardar las preferencias del usuario
const CONSENT_VERSION = 1;  //Version actual de las preferencias de consentimiento, para invalidar las antiguas si se cambia la estructura de datos
const COOKIE_EXPIRY_DAYS = environment.cookieExpirtyDays || 365;  //Número de días que expira la cookie de sesión, para que no caduque al cerrar el navegador

@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private readonly mostrarBannerSubject = new BehaviorSubject<boolean>(false);
  private readonly preferenciasSubject = new BehaviorSubject<CookieConsentPreferences | null>(null);

  /** Si el banner debe mostrarse. */
  readonly mostrarBanner$ = this.mostrarBannerSubject.asObservable();

  /** Preferencias guardadas (null si el usuario aún no ha elegido). */
  readonly preferencias$ = this.preferenciasSubject.asObservable();

  /** Inicializa el estado leyendo localStorage (solo en navegador). */
  init(): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    const guardado = this.leerAlmacenado();  //Intenta leer las preferencias guardadas en localStorage
    if (guardado) {
      this.preferenciasSubject.next(guardado);  //Si hay datos guardados, actualiza el estado de preferencias
      this.mostrarBannerSubject.next(false);  //No mostrar el banner si ya hay preferencias guardadas
    } else {
      this.mostrarBannerSubject.next(true);  //Si no hay datos guardados, mostrar el banner para que el usuario elija sus preferencias
    }
  }

  obtenerPreferencias(): CookieConsentPreferences | null {
    return this.preferenciasSubject.value;
  }

  mostrarBanner(): boolean {
    return this.mostrarBannerSubject.value;
  }

  /** Vuelve a mostrar el panel (p. ej. enlace «Configurar cookies» en el pie). */
  abrirPanel(): void {
    const actuales = this.preferenciasSubject.value;
    if (actuales) {
      this.analyticsDraft = actuales.analytics;
      this.marketingDraft = actuales.marketing;
    }
    this.mostrarBannerSubject.next(true);
  }

  tieneConsentimientoAnaliticas(): boolean {
    return this.preferenciasSubject.value?.analytics === true;
  }

  tieneConsentimientoMarketing(): boolean {
    return this.preferenciasSubject.value?.marketing === true;
  }

  aceptarTodas(): void {
    this.guardar({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    });
  }

  rechazarNoEsenciales(): void {
    this.guardar({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    });
  }

  guardarPreferencias(analytics: boolean, marketing: boolean): void {
    this.guardar({
      necessary: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    });
  }

  private guardar(preferencias: CookieConsentPreferences): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferencias));
    }
    this.preferenciasSubject.next(preferencias);
    this.mostrarBannerSubject.next(false);
    this.dispatchConsentChanged(preferencias);
  }

  private leerAlmacenado(): CookieConsentPreferences | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw) as CookieConsentPreferences;
      if (parsed.version !== CONSENT_VERSION) {
        return null;
      }
      // Validar que la cookie no haya expirado (si se implementa expiración basada en timestamp)
      if (parsed.timestamp) {
        const timestamp = new Date(parsed.timestamp);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays >= COOKIE_EXPIRY_DAYS) {
          return null;
        }
      }
      return {
        necessary: true,
        analytics: !!parsed.analytics,
        marketing: !!parsed.marketing,
        timestamp: parsed.timestamp ?? new Date().toISOString(),
        version: CONSENT_VERSION,
      };
    } catch {
      return null;
    }
  }

  private dispatchConsentChanged(preferencias: CookieConsentPreferences): void {
    if (typeof window === 'undefined') {
      return;
    }
    window.dispatchEvent(
      new CustomEvent('esf:cookie-consent', { detail: preferencias }),
    );
  }

  /** Borradores usados por el banner al abrir preferencias. */
  analyticsDraft = false;
  marketingDraft = false;
}

// INFORMACION SOBRE LA COOKIE DE ESTE PROYECTO
// NOMBRE: esf_cookie_consent_v1
// CONTENIDO: JSON con las preferencias del usuario (analytics y marketing) y la fecha de aceptación
// EXPIRACION: 365 días (según environment.cookieExpirtyDays) para que no caduque al cerrar el navegador
// USO: Se usa para recordar las preferencias del usuario sobre cookies de analíticas y marketing, y para determinar si mostrar el banner de consentimiento
// UBICACIÓN: Se guarda en localStorage del navegador, no se envía al servidor. ZONA: inspeccionar → Application → Local Storage → http://localhost:4200
// EVENTO: Se lanza un evento 'esf:cookie-consent' en window cuando el usuario guarda sus preferencias, con detalle de las preferencias guardadas