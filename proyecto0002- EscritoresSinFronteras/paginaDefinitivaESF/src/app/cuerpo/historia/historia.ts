import { Component,OnInit,ViewChild,Renderer2,ElementRef,ChangeDetectorRef,HostListener,} from '@angular/core';
import { Historias, VariablesCompartidas, Conexion } from '../../servicios/variablesCompartidas';

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
  public objetoHistorias: any[] = []; 
  public objetoHistoriasFiltrado= new VariablesCompartidas();    //Para los métodos que manejan el PUNTERO

  /** Columnas de la tabla según ancho (responsive). */
  public columnasActivas = 3;

  /** Activa la animación de entrada tipo “expansión” de los botones. */
  public animarPanel = false;

  constructor(
    private readonly renderer: Renderer2,
    private readonly deteccionCambio: ChangeDetectorRef,
    private Conexion: Conexion
  ) {}

  ngOnInit(): void {
    this.Conexion.getAutores(1).subscribe(data => {
          data.forEach(a=>{
            const historia = new Historias(
                a.id,
                a.mes,
                a.anio,
                a.contenido);
        this.objetoHistorias.push(historia);    //Se rellena la matriz de historias
        }
      );
    //Aqui se recibe el dato de la BBDD y se asigna a la variable noticiasInicio, 
    //que se utiliza en el HTML para mostrar las noticias, el indice 0 se corresponde 
    //con el indice del array de URLs, que a su vez se corresponde con el indice del array 
    //de apartados, por lo que es una forma de centralizar las URLs y evitar tener que 
    //escribirlas en cada componente, además de facilitar su mantenimiento y actualización.
    //La variable DATA es un ARRAY DE OBJETOS en donde está alojada la tabla de la consulta
    });

    //Luego lo que se hace es el tratamiento de la pantalla
    this.tamanioHorizontalPantalla = typeof window !== 'undefined' ? window.innerWidth : 1200;
    this.actualizarColumnas();
    this.objetoHistorias = this.objetoHistorias.filter(
      (historia, indice, self) => indice === self.findIndex((h) => h.getAnio() === historia.getAnio()),
    );
  }

  @HostListener('window:resize')
  onResize(): void {
    this.tamanioHorizontalPantalla = window.innerWidth;
    this.actualizarColumnas();
  }

  @ViewChild('fondoHistoria') fondoHistoria!: ElementRef<HTMLElement>;

  get conteoCeldasCompleta(): number {
    return this.objetoHistorias.length;
  }
  get conteoCeldasAnios(): number {
    return this.objetoHistorias.length;
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

  public filasHistoriaCompleta(): Historias[][] {
    return this.chunkHistorias(this.objetoHistorias, this.columnasActivas);
  }

  public filasHistoriaAnios(): Historias[][] {
    return this.chunkHistorias(this.objetoHistorias, this.columnasActivas);
  }

  /** Celdas con id estable para `track` (el compilador no permite usar `ri` en el @for interno). */
  public tablaHistoriaCompleta(): { tid: string; item: Historias }[][] {
    return this.filasHistoriaCompleta().map((fila, ri) =>
      fila.map((h, ci) => ({
        tid: `c-${ri}-${ci}-${h.getAnio()}-${h.getMes()}`,
        item: h,
      })),
    );
  }

  public tablaHistoriaAnios(): { tid: string; item: Historias }[][] {
    return this.filasHistoriaAnios().map((fila, ri) =>
      fila.map((h, ci) => ({
        tid: `a-${ri}-${ci}-${h.getAnio()}`,
        item: h,
      })),
    );
  }

  public indiceGlobal(fila: number, col: number): number {
    return fila * this.columnasActivas + col;
  }

  public indiceStagger(fila: number, col: number): number {
    return this.indiceGlobal(fila, col);
  }

  public indiceStaggerAnios(fila: number, col: number): number {
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
    this.objetoHistoriasFiltrado.setPunteroSeleccionador(puntero);
    this.objetoHistorias[puntero].setMesTexto(mes);
    this.objetoHistorias[puntero].setAnio(anio);
    this.deteccionCambio.detectChanges();
  }

  public accionarBotonPorAnio(anio: string): void {
    const idx = this.objetoHistorias.findIndex((h) => h.getAnio() === anio);
    if (idx < 0) {
      return;
    }
    const mes = this.objetoHistorias[idx].getMes();
    this.accionarBoton(idx, mes, anio);
  }
}
