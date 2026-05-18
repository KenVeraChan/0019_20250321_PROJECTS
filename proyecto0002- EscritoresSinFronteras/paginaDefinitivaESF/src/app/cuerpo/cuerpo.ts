import { Component, OnDestroy, OnInit, HostListener} from '@angular/core';
import { Subscription } from 'rxjs';
import { EstadoErroresService } from '../servicios/estado-errores.service';

/** Índice de sección para la página de error por URL (no aparece en el menú). */
const PUNTERO_ERROR = -1;

@Component({
  selector: 'app-cuerpo',
  standalone: false,
  templateUrl: './cuerpo.html',
  styleUrl: './cuerpo.css',
})
export class Cuerpo implements OnInit, OnDestroy {
    public mensajeVentana1: string = "“No olvides que eres el personaje principal de la novela de tu propia vida. La calidad y causalidad de los capítulos incluidos en ella, se basarán en la cualidad y casualidad de los estímulos vividos” William Wissangel, 1950";
    public mensajeVentana2: string = "“Entre la ficción y la realidad existe una frontera llamada vida, soñada por quienes nos la dan, tan vivida como escrita por nosotros mismos, y leída por aquellos en quienes dejaremos nuestra huella literaria, emocional e histórica” Sharyllín Rousher, 1960";
    public tamanioPantalla:number=0.0;
    public puntero: number=0;
    public semaforo:boolean=false;
    public errorGlobalActivo = false;

    private subError?: Subscription;

    private readonly mapaRutaPuntero: Record<string, number> = {
      '': 0,
      '/': 0,
      '/inicio': 0,
      '/nuestrahistoria': 1,
      '/quienessomos': 2,
      '/blogliterario': 3,
      '/nuestrosservicios': 4,
      '/publicaciones': 5,
      '/contacto': 6,
    };

    constructor(private readonly estadoErrores: EstadoErroresService) {}

    ngOnInit()
    {
      this.subError = this.estadoErrores.estado$.subscribe(e => {
        this.errorGlobalActivo = e.mostrarPagina;
      });

      if (typeof window !== 'undefined') 
        {
          this.tamanioPantalla = window.innerWidth;
          const pathNorm = this.normalizarRuta(window.location.pathname);

          if (this.mapaRutaPuntero[pathNorm] === undefined) {
            this.puntero = PUNTERO_ERROR;
            this.estadoErrores.activarRutaNoEncontrada(window.location.pathname || pathNorm);
            return;
          }

          this.estadoErrores.limpiar();

          const desdeRuta = this.mapaRutaPuntero[pathNorm];
          const paginaGuardada = localStorage.getItem('punteroCabecera');
          const guardado = paginaGuardada ? Number(paginaGuardada) : desdeRuta;

          if (pathNorm === '/' || pathNorm === '/inicio') {
            this.puntero = guardado >= 0 && guardado <= 6 ? guardado : desdeRuta;
          } else {
            this.puntero = desdeRuta;
            localStorage.setItem('punteroCabecera', String(this.puntero));
          }
        }
    }

    ngOnDestroy(): void {
      this.subError?.unsubscribe();
    }

    public mostrarPaginaError(): boolean {
      return this.puntero === PUNTERO_ERROR || this.errorGlobalActivo;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event:any):number {
      this.tamanioPantalla = event.target.innerWidth;
      return(this.tamanioPantalla);
    }

    private normalizarRuta(pathname: string): string {
      const sinBarrasFinal = pathname.replace(/\/+$/, '');
      return (sinBarrasFinal || '/').toLowerCase();
    }
}
