import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CookieConsentPreferences {
  /** Cookies técnicas imprescindibles (siempre activas). */
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: number;
}

const STORAGE_KEY = 'esf_cookie_consent_v1';
const CONSENT_VERSION = 1;

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

    const guardado = this.leerAlmacenado();
    if (guardado) {
      this.preferenciasSubject.next(guardado);
      this.mostrarBannerSubject.next(false);
    } else {
      this.mostrarBannerSubject.next(true);
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
