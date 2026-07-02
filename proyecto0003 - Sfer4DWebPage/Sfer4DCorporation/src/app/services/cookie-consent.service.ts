import { Injectable } from '@angular/core'; // Importa el decorador Injectable de Angular para marcar el servicio como inyectable.
import { BehaviorSubject } from 'rxjs'; // Importa BehaviorSubject de RxJS para manejar estados reactivos.
import { environment } from '../../environments/environments'; // Importa las variables de entorno del proyecto.

export interface CookieConsentPreferences {
  /** Cookies técnicas imprescindibles (siempre activas). */
  necessary: true; // Campo fijo que indica que las cookies necesarias siempre están habilitadas.
  analytics: boolean; // Indica si el usuario acepta cookies analíticas.
  marketing: boolean; // Indica si el usuario acepta cookies de marketing.
  timestamp: string; // Fecha y hora en que se guardaron las preferencias.
  version: number; // Versión del esquema de consentimiento guardado.
}

const STORAGE_KEY = 'esf_cookie_consent_v1'; // Clave usada en localStorage para guardar el consentimiento.
const COOKIE_EXPIRY_DAYS = environment.cookieExpirtyDays; // Número de días que se considera válido el consentimiento antes de requerir una nueva aceptación.
const CONSENT_VERSION = 1; // Versión actual del formato de consentimiento.

@Injectable({ providedIn: 'root' }) // Declara el servicio como singleton disponible en toda la aplicación.
export class CookieConsentService {
  private readonly mostrarBannerSubject = new BehaviorSubject<boolean>(false); // Subject que controla si se muestra el banner.
  private readonly preferenciasSubject = new BehaviorSubject<CookieConsentPreferences | null>(null); // Subject con las preferencias guardadas o null.

  /** Si el banner debe mostrarse. */
  readonly mostrarBanner$ = this.mostrarBannerSubject.asObservable(); // Observable público para que otros componentes sepan si mostrar el banner.

  /** Preferencias guardadas (null si el usuario aún no ha elegido). */
  readonly preferencias$ = this.preferenciasSubject.asObservable(); // Observable público con las preferencias de cookies.

  /** Inicializa el estado leyendo localStorage (solo en navegador). */
  init(): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return; // No hay localStorage disponible (por ejemplo en servidor), salir sin hacer nada.
    }

    const guardado = this.leerAlmacenado(); // Intentar leer preferencias previamente guardadas.
    if (guardado) {
      this.preferenciasSubject.next(guardado); // Si hay datos, actualizar el estado de preferencias.
      this.mostrarBannerSubject.next(false); // Ocultar el banner si ya se eligió.
    } else {
      this.mostrarBannerSubject.next(true); // Mostrar el banner si no hay preferencias guardadas.
    }
  }

  obtenerPreferencias(): CookieConsentPreferences | null {
    return this.preferenciasSubject.value; // Devuelve el valor actual de las preferencias.
  }

  mostrarBanner(): boolean {
    return this.mostrarBannerSubject.value; // Devuelve el valor actual de si el banner debe mostrarse.
  }

  /** Vuelve a mostrar el panel (p. ej. enlace «Configurar cookies» en el pie). */
  abrirPanel(): void {
    const actuales = this.preferenciasSubject.value; // Lee las preferencias actuales.
    if (actuales) {
      this.analyticsDraft = actuales.analytics; // Inicializa el borrador de analíticas con el valor actual.
      this.marketingDraft = actuales.marketing; // Inicializa el borrador de marketing con el valor actual.
    }
    this.mostrarBannerSubject.next(true); // Muestra el banner de configuración.
  }

  tieneConsentimientoAnaliticas(): boolean {
    return this.preferenciasSubject.value?.analytics === true; // Devuelve true solo si el usuario aceptó analíticas.
  }

  tieneConsentimientoMarketing(): boolean {
    return this.preferenciasSubject.value?.marketing === true; // Devuelve true solo si el usuario aceptó marketing.
  }

  aceptarTodas(): void {
    this.guardar({
      necessary: true, // Las cookies necesarias son siempre true.
      analytics: true, // Acepta cookies analíticas.
      marketing: true, // Acepta cookies de marketing.
      timestamp: new Date().toISOString(), // Guarda el momento en formato ISO.
      version: CONSENT_VERSION, // Usa la versión actual de consentimiento.
    });
  }

  rechazarNoEsenciales(): void {
    this.guardar({
      necessary: true, // Las cookies necesarias siguen habilitadas.
      analytics: false, // Rechaza las cookies analíticas.
      marketing: false, // Rechaza las cookies de marketing.
      timestamp: new Date().toISOString(), // Guarda el momento del rechazo.
      version: CONSENT_VERSION, // Usa la versión actual de consentimiento.
    });
  }

  guardarPreferencias(analytics: boolean, marketing: boolean): void {
    this.guardar({
      necessary: true, // Las cookies necesarias siguen habilitadas.
      analytics, // Usa el valor pasado para analíticas.
      marketing, // Usa el valor pasado para marketing.
      timestamp: new Date().toISOString(), // Guarda la marca de tiempo actual.
      version: CONSENT_VERSION, // Usa la versión actual de consentimiento.
    });
  }

  private guardar(preferencias: CookieConsentPreferences): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferencias)); // Guarda las preferencias en localStorage.
    }
    this.preferenciasSubject.next(preferencias); // Actualiza el estado reactivo de preferencias.
    this.mostrarBannerSubject.next(false); // Oculta el banner tras guardar.
    this.dispatchConsentChanged(preferencias); // Notifica al resto de la app que el consentimiento cambió.
  }

  private leerAlmacenado(): CookieConsentPreferences | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY); // Intenta leer el valor almacenado.
      if (!raw) {
        return null; // Si no existe nada, devuelve null.
      }
      const parsed = JSON.parse(raw) as CookieConsentPreferences; // Parsea el JSON almacenado.
      if (parsed.version !== CONSENT_VERSION) {
        return null; // Si la versión no coincide, descarta los datos antiguos.
      }
      // Validar que la cookie no haya expirado
      if (parsed.timestamp) {
        const ahora = Date.now();
        const fechaGuardada = new Date(parsed.timestamp).getTime();
        const diasTranscurridos = (ahora - fechaGuardada) / (1000 * 60 * 60 * 24);
        if (diasTranscurridos > COOKIE_EXPIRY_DAYS) {
          return null; // La cookie expiró, mostrar el banner de nuevo
        }
      }
      return {
        necessary: true, // Siempre fuerza necessary a true.
        analytics: !!parsed.analytics, // Normaliza analytics a booleano.
        marketing: !!parsed.marketing, // Normaliza marketing a booleano.
        timestamp: parsed.timestamp ?? new Date().toISOString(), // Usa el timestamp guardado o uno nuevo si falta.
        version: CONSENT_VERSION, // Devuelve la versión actual.
      };
    } catch {
      return null; // Si falla el parseo o el acceso, devuelve null.
    }
  }

  private dispatchConsentChanged(preferencias: CookieConsentPreferences): void {
    if (typeof window === 'undefined') {
      return; // Si no hay ventana (SSR o pruebas), no despacha el evento.
    }
    window.dispatchEvent(
      new CustomEvent('esf:cookie-consent', { detail: preferencias }), // Lanza un evento personalizado con las preferencias.
    );
  }

  /** Borradores usados por el banner al abrir preferencias. */
  analyticsDraft = false; // Valor temporal de la opción de cookies analíticas en el formulario.
  marketingDraft = false; // Valor temporal de la opción de cookies de marketing en el formulario.
}
