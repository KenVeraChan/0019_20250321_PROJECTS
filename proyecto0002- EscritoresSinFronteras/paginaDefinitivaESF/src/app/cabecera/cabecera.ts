import { Component, HostListener, OnInit } from '@angular/core';
import { VariablesCompartidas } from '../servicios/variablesCompartidas';

@Component({
  selector: 'app-cabecera',
  standalone: false,
  templateUrl: './cabecera.html',
  styleUrls: ['./cabecera.css'],
})
export class Cabecera implements OnInit {
    public matrizApartados= new VariablesCompartidas();
    public tamanioPantalla:number=0.0;
    public esDispositivoMovilReal: boolean = false; // Detecta móviles/tablets por User-Agent (no cambia con zoom)
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
      return(this.tamanioPantalla);
    }
    //Sector de botones y qué componente fue activado
    public accesoHabilitado(opcion:number):void
    {
      // Mapear la opción (1..6) a índices (0..5)
      const indexMap: Record<number, number> = {1:0, 2:1, 3:2, 4:3, 5:4, 6:5};
      const idx = indexMap[opcion] ?? 0;  //Se asegura que idx siempre tenga un valor numérico
      this.activeIndex = idx;  //Se actualiza el índice activo
      this.puntero = idx;  //Se actualiza el puntero
      if (typeof window !== 'undefined') {
        localStorage.setItem('punteroCabecera', this.puntero.toString());  //Y también se usa para el cambio de pagina   
      }
    }
  }
