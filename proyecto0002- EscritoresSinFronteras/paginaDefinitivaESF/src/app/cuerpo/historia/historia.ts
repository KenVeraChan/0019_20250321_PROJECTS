import {Component,OnInit,ViewChild,Renderer2,ElementRef,ChangeDetectorRef,HostListener,} from '@angular/core';
import { Historias, VariablesCompartidas } from '../../servicios/variablesCompartidas';

@Component({
  selector: 'app-historia',
  standalone: false,
  templateUrl: './historia.html',
  styleUrl: './historia.css',
})
export class Historia implements OnInit {
  public tamanioHorizontalPantalla = 0;
  public eleccion = 0;
  public semaforo = false;
  public objetoHistorias = new VariablesCompartidas();
  public objetoHistoriasFiltrado = new VariablesCompartidas();

  /** Columnas de la tabla según ancho (responsive). */
  public columnasActivas = 3;

  /** Activa la animación de entrada tipo “expansión” de los botones. */
  public animarPanel = false;

  constructor(
    private readonly renderer: Renderer2,
    private readonly deteccionCambio: ChangeDetectorRef,
  ) {}

  @ViewChild('fondoHistoria') fondoHistoria!: ElementRef<HTMLElement>;

  get conteoCeldasCompleta(): number {
    return this.objetoHistorias.historias.length;
  }

  get conteoCeldasAnios(): number {
    return this.objetoHistoriasFiltrado.historias.length;
  }

  ngOnInit(): void {
    this.tamanioHorizontalPantalla = typeof window !== 'undefined' ? window.innerWidth : 1200;
    this.actualizarColumnas();
    this.objetoHistoriasFiltrado.historias = this.objetoHistoriasFiltrado.historias.filter(
      (historia, indice, self) => indice === self.findIndex((h) => h.getAnio() === historia.getAnio()),
    );
  }

  @HostListener('window:resize')
  onResize(): void {
    this.tamanioHorizontalPantalla = window.innerWidth;
    this.actualizarColumnas();
  }

  //Aqui recopla los mensajes en función del tamaño de la pantalla, si es grande mete más cajas sino no
  private actualizarColumnas(): void {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    let next = 3;
    if (w < 576) {
      next = 1;
    } else if (w < 992) {
      next = 2;
    }
    if (next !== this.columnasActivas) {
      this.columnasActivas = next;
      this.deteccionCambio.markForCheck();
    }
  }

  
  private chunkHistorias(items: Historias[], size: number): Historias[][] {
    if (size < 1) {
      return [items];
    }
    const rows: Historias[][] = [];
    for (let i = 0; i < items.length; i += size) {
      rows.push(items.slice(i, i + size));
    }
    return rows;
  }

  filasHistoriaCompleta(): Historias[][] {
    return this.chunkHistorias(this.objetoHistorias.historias, this.columnasActivas);
  }

  filasHistoriaAnios(): Historias[][] {
    return this.chunkHistorias(this.objetoHistoriasFiltrado.historias, this.columnasActivas);
  }

  /** Celdas con id estable para `track` (el compilador no permite usar `ri` en el @for interno). */
  tablaHistoriaCompleta(): { tid: string; item: Historias }[][] {
    return this.filasHistoriaCompleta().map((fila, ri) =>
      fila.map((h, ci) => ({
        tid: `c-${ri}-${ci}-${h.getAnio()}-${h.getMes()}`,
        item: h,
      })),
    );
  }

  tablaHistoriaAnios(): { tid: string; item: Historias }[][] {
    return this.filasHistoriaAnios().map((fila, ri) =>
      fila.map((h, ci) => ({
        tid: `a-${ri}-${ci}-${h.getAnio()}`,
        item: h,
      })),
    );
  }

  indiceGlobal(fila: number, col: number): number {
    return fila * this.columnasActivas + col;
  }

  indiceStagger(fila: number, col: number): number {
    return this.indiceGlobal(fila, col);
  }

  indiceStaggerAnios(fila: number, col: number): number {
    return this.indiceGlobal(fila, col);
  }

  public cargarHistorial(opcion: number): void {
    if (typeof window === 'undefined') {
      return;
    }
    this.animarPanel = false;
    this.eleccion = opcion;
    this.deteccionCambio.detectChanges();

    requestAnimationFrame(() => {
      this.animarPanel = true;
      this.deteccionCambio.detectChanges();
    });

    const fondos = this.fondoHistoria.nativeElement;
    this.actualizarAlturaFondo(fondos);
  }

  private actualizarAlturaFondo(fondos: HTMLElement): void {
    if (this.semaforo) {
      this.renderer.setStyle(fondos, 'height', '600px');
      return;
    }
    if (this.eleccion === 0) {
      this.renderer.setStyle(fondos, 'height', '300px');
      return;
    }
    const filas =
      this.eleccion === 1
        ? this.filasHistoriaCompleta().length + 1
        : this.filasHistoriaAnios().length + 1;
    const altura = Math.max(320, 48 + filas * 92);
    this.renderer.setStyle(fondos, 'height', `${altura}px`);
  }

  public cerrarHistorial(): void {
    if (typeof window === 'undefined') {
      return;
    }
    this.animarPanel = false;
    this.semaforo = false;
    this.eleccion = 0;
    const fondos = this.fondoHistoria.nativeElement;
    this.renderer.setStyle(fondos, 'height', '300px');
    this.deteccionCambio.detectChanges();
  }

  public accionarBoton(puntero: number, mes: string, anio: string): void {
    if (typeof window === 'undefined') {
      return;
    }
    this.semaforo = true;
    this.animarPanel = false;
    const fondos = this.fondoHistoria.nativeElement;
    this.renderer.setStyle(fondos, 'height', '600px');
    this.objetoHistorias.setPunteroSeleccionador(puntero);
    this.objetoHistorias.historias[puntero].setMesTexto(mes);
    this.objetoHistorias.historias[puntero].setAnio(anio);
    this.deteccionCambio.detectChanges();
  }

  public accionarBotonPorAnio(anio: string): void {
    const idx = this.objetoHistorias.historias.findIndex((h) => h.getAnio() === anio);
    if (idx < 0) {
      return;
    }
    const mes = this.objetoHistorias.historias[idx].getMes();
    this.accionarBoton(idx, mes, anio);
  }
}
