import { Component, HostListener, OnInit } from '@angular/core';
import { VariablesCompartidas } from '../servicios/variablesCompartidas';

export type TipoDispositivo = 'mobile' | 'tablet' | 'desktop';

@Component({
  selector: 'app-cabecera',
  standalone: false,
  templateUrl: './cabecera.html',
  styleUrls: ['./cabecera.css'],
})
export class Cabecera implements OnInit {
    private readonly rutasSeccion = [
      '/inicio',
      '/nuestraHistoria',
      '/quienesSomos',
      '/blogLiterario',
      '/nuestrosServicios',
      '/publicaciones',
      '/contacto',
    ] as const;

    public matrizApartados= new VariablesCompartidas();
    public tamanioPantalla:number=0.0;
    public esDispositivoMovilReal: boolean = false;
    public tipoDispositivo: TipoDispositivo = 'desktop'; // 'mobile', 'tablet' o 'desktop'
    public puntero: number=0;
    public activeIndex: number = 0;
    public semaforo:boolean=false;
    
    ngOnInit()    //Al iniciarse el componente
    {
      if (typeof window !== 'undefined') 
        {
          this.tamanioPantalla = window.innerWidth;
          // Detectar si es un dispositivo móvil o tablet REAL usando múltiples heurísticas
          // Combina User-Agent + capacidades táctiles + media queries + ancho de pantalla
          // para evitar falsos positivos en desktops con touch o UA inusuales.
          this.esDispositivoMovilReal = this.detectarEsDispositivoMovilOTablet();
          // Recupera el puntero almacenado y lo sincroniza con la clase activa
          const stored = localStorage.getItem('punteroCabecera');
          this.puntero = stored ? Number(stored) : 0;
          this.activeIndex = this.puntero;
        }
    }

    /**
     * Reinicializa la detección tras cargar completamente la página
     * Importante para asegurar dimensiones exactas
     */
    private reinicializarDeteccion(): void {
      if (typeof window !== 'undefined') {
        this.tamanioPantalla = window.innerWidth;
        this.tipoDispositivo = this.detectarTipoDispositivo();
      }
    }

    /**
     * Detecta el tipo de dispositivo con máxima precisión combinando:
     * 1. User-Agent (más confiable, no cambia con zoom)
     * 2. Tamaño de pantalla física (devicePixelRatio)
     * 3. Capacidades táctiles
     * 4. Orientación del dispositivo
     * 5. Media Queries
     */
    public detectarTipoDispositivo(): TipoDispositivo {
      if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return 'desktop';
      }

      const userAgent = navigator.userAgent.toLowerCase();
      
      // PASO 1: Detectar por User-Agent (identificadores específicos)
      const esIPhone = /iphone/i.test(userAgent);
      const esAndroidMovil = /android.*mobile|mobile.*android/i.test(userAgent);
      const esIPad = /ipad/i.test(userAgent);
      const esAndroidTablet = /android/i.test(userAgent) && !/mobile/i.test(userAgent);
      const esTabletWindows = /windows phone|iemobile|blackberry/i.test(userAgent);
      
      // PASO 2: Detectar por tamaño de pantalla (ancho físico)
      const ancho = window.innerWidth;
      const alto = window.innerHeight;
      const devicePixelRatio = window.devicePixelRatio || 1;
      const anchoPadre = window.parent?.innerWidth || ancho;
      
      // PASO 3: Detectar capacidades táctiles
      const tieneTouch = this.detectarCapacidadesToactiles();
      
      // PASO 4: Usar Media Queries (CSS breakpoints)
      const esMobileMedia = window.matchMedia('(max-width: 767px)').matches;
      const esTabletMedia = window.matchMedia('(min-width: 768px) and (max-width: 1024px)').matches;
      
      // PASO 5: Orientación
      const esPortrait = alto > ancho;
      
      // LÓGICA DE DETECCIÓN COMBINADA (en orden de confiabilidad)
      
      // Si el User-Agent indica claramente móvil
      if (esIPhone || esAndroidMovil) {
        return 'mobile';
      }
      
      // Si el User-Agent indica claramente tablet
      if (esIPad || esAndroidTablet || esTabletWindows) {
        return 'tablet';
      }
      
      // Si no detectó nada en User-Agent, usar combinación de métodos
      // Tablet: entre 768px y 1024px, con touch, o User-Agent de tablet
      if ((ancho >= 768 && ancho <= 1024) || (esTabletMedia && tieneTouch)) {
        return 'tablet';
      }
      
      // Mobile: menos de 768px, con touch, o en portrait con ancho pequeño
      if (ancho < 768 || (tieneTouch && ancho <= 880 && esPortrait)) {
        return 'mobile';
      }
      
      // Por defecto, desktop
      return 'desktop';
    }

    /**
     * Detecta si el dispositivo tiene capacidades táctiles
     */
    private detectarCapacidadesToactiles(): boolean {
      if (typeof window === 'undefined') return false;
      
      // Métodos modernos para detectar touch
      return (
        (('ontouchstart' in window) ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
        ((navigator as any).msMaxTouchPoints && (navigator as any).msMaxTouchPoints > 0)) ?? false
      );
    }

    /**
     * Detecta si el dispositivo es móvil o tablet usando el User-Agent.
     * Este método es confiable porque el User-Agent NO cambia con:
     * - El zoom del navegador
     * - El escalado de Windows (125%, 150%, etc.)
     * - El tamaño de la ventana
     */
    private detectarEsDispositivoMovilOTablet(): boolean {
      if (typeof navigator === 'undefined' || typeof window === 'undefined') return false;

      const ua = (navigator.userAgent || navigator.vendor || (window as any).opera || '').toLowerCase();

      // Detectores explícitos por User-Agent
      const isPhoneUA = /iphone|ipod|android.*mobile|windows phone|blackberry|bb10|mobile/i.test(ua);
      const isTabletUA = /ipad|tablet|(android(?!.*mobile))|silk|kindle/i.test(ua);

      // Capacidades de interacción
      const hasMaxTouchPoints = 'maxTouchPoints' in navigator && (navigator as any).maxTouchPoints > 0;
      const hasOntouch = 'ontouchstart' in window;
      const prefersCoarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
      const hasTouch = hasMaxTouchPoints || hasOntouch || prefersCoarsePointer;

      const width = window.innerWidth || (screen && (screen as any).width) || 0;

      // ===== DEBUG: Log detalles =====
      console.log('[Detección de Dispositivo]', {
        userAgent: ua.substring(0, 100),
        isPhoneUA,
        isTabletUA,
        hasMaxTouchPoints,
        maxTouchPointsCount: (navigator as any).maxTouchPoints || 0,
        hasOntouch,
        prefersCoarsePointer,
        hasTouch,
        width,
        timestamp: new Date().toISOString()
      });

      // Heurística combinada para minimizar falsos positivos en desktop:
      // - Si el UA indica teléfono, considerarlo móvil.
      // - Si el UA indica tablet, requerir además touch o un ancho razonable de tablet.
      // - Si NO hay UA claro, requerir touch + pointer coarse + ancho pequeño.
      if (isPhoneUA) {
        console.log('[RESULTADO] Detectado como TELÉFONO por UA');
        return true;
      }
      if (isTabletUA) {
        if (hasTouch || width <= 1024) {
          console.log('[RESULTADO] Detectado como TABLET (touch o ancho <= 1024)');
          return true;
        }
        console.log('[RESULTADO] Detectado TABLET en UA pero sin touch y ancho > 1024 → NO es móvil');
        return false;
      }

      if (hasTouch && prefersCoarsePointer && width <= 767) {
        console.log('[RESULTADO] Detectado como MÓVIL/TABLET por touch + pointer coarse + ancho <= 767');
        return true;
      }
      console.log('[RESULTADO] NO es móvil/tablet');
      return false;
    }

    /*PARA PANTALLAS DE MOVIL Y TABLET */
    @HostListener('window:resize', ['$event'])
    onResize(event:any):number {
      this.tamanioPantalla = event.target.innerWidth;
      // Actualizar tipo de dispositivo al cambiar el tamaño
      this.tipoDispositivo = this.detectarTipoDispositivo();
      return(this.tamanioPantalla);
    }

    /**
     * Obtiene el tipo de dispositivo actual como string para usar en templates
     */
    public obtenerTipoDispositivo(): string {
      return this.tipoDispositivo;
    }

    /**
     * Verifica si el dispositivo es móvil
     */
    public esMovil(): boolean {
      return this.tipoDispositivo === 'mobile';
    }

    /**
     * Verifica si el dispositivo es tablet
     */
    public esTablet(): boolean {
      return this.tipoDispositivo === 'tablet';
    }

    /**
     * Verifica si el dispositivo es desktop
     */
    public esDesktop(): boolean {
      return this.tipoDispositivo === 'desktop';
    }
    //Sector de botones y qué componente fue activado
    public accesoHabilitado(opcion:number):void
    {
      // Mapear la opción (1..7) a índices (0..6)
      const indexMap: Record<number, number> = {1:0, 2:1, 3:2, 4:3, 5:4, 6:5, 7:6};
      const idx = indexMap[opcion] ?? 0;  //Se asegura que idx siempre tenga un valor numérico
      this.activeIndex = idx;  //Se actualiza el índice activo
      this.puntero = idx;  //Se actualiza el puntero
      if (opcion === 5) {
        this.matrizApartados.menuPrincipal.limpiarFiltroServicios();
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('punteroCabecera', this.puntero.toString());
        window.location.assign(this.rutasSeccion[idx]);
      }
    }
  }
