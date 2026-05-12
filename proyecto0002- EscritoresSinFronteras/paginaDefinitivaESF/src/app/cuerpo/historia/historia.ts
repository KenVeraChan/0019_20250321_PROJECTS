// Importación de decoradores y utilidades de Angular necesarias para el componente
import { Component,OnInit,ViewChild,Renderer2,ElementRef,ChangeDetectorRef,HostListener,} from '@angular/core';
// Importación de los modelos y servicios propios: Historias (modelo de datos), VariablesCompartidas (estado compartido), Conexion (servicio HTTP)
import { Historias, VariablesCompartidas, Conexion } from '../../servicios/variablesCompartidas';

// Decorador que define los metadatos del componente Angular
@Component({
  selector: 'app-historia',       // Etiqueta HTML con la que se invoca este componente
  standalone: false,              // No es un componente standalone, depende de un módulo
  templateUrl: './historia.html', // Ruta al fichero de plantilla HTML
  styleUrl: './historia.css',     // Ruta al fichero de estilos CSS
})
// Clase principal del componente que implementa el ciclo de vida OnInit
export class Historia implements OnInit {
  // Almacena el ancho actual de la ventana del navegador en píxeles
  public tamanioHorizontalPantalla = 0;
  // Controla qué vista se muestra: 0=menú principal, 1=historia completa, 2=historia por años
  public eleccion = 0;
  // Bandera que indica si se está mostrando el libro interactivo (true) o la tabla de botones (false)
  public semaforo = false;
  // Mes y año seleccionados que se pasan al libro interactivo para filtrar los registros
  public mesLibro: string = '';
  public anioLibro: string = '';
  // Array que almacena TODAS las historias recibidas de la base de datos (mes+año+contenido)
  public objetoHistorias: any[] = [];
  // Array filtrado que contiene solo una entrada por cada año único (sin duplicados de año)
  public objetoHistoriasAnios: any[] = [];
  // Instancia de VariablesCompartidas usada para gestionar el puntero/índice seleccionado por el usuario
  public objetoHistoriasFiltrado= new VariablesCompartidas();

  // Número de columnas visibles en la tabla de botones, se ajusta según el ancho de pantalla
  public columnasActivas = 3;

  // Flag que activa/desactiva la animación CSS de entrada escalonada de los botones
  public animarPanel = false;

  // Constructor: inyecta Renderer2 (manipulación segura del DOM), ChangeDetectorRef (forzar detección de cambios) y Conexion (servicio HTTP)
  constructor(
    private readonly renderer: Renderer2,
    private readonly deteccionCambio: ChangeDetectorRef,
    private Conexion: Conexion
  ) {}

  // Método del ciclo de vida que se ejecuta una vez al inicializar el componente
  ngOnInit(): void {
    // Llama al servicio HTTP para obtener los datos de historias desde el backend (índice 1 = tabla de historias)
    this.Conexion.getAutores(1).subscribe(data => {
          // Itera cada registro recibido del servidor
          data.forEach(a=>{
            // Crea una instancia del modelo Historias con los campos: id, mes, año y contenido
            const historia = new Historias(
                a.id,
                a.mes,
                a.anio,
                a.contenido);
        // Añade la historia al array completo
        this.objetoHistorias.push(historia);
        }
      );
      // Una vez cargados todos los datos, filtra para obtener solo una entrada por cada año único
      // Compara cada elemento con el primero que tenga el mismo año; si coincide el índice, es único
      this.objetoHistoriasAnios = this.objetoHistorias.filter(
        (historia, indice, self) => indice === self.findIndex((h) => h.getAnio() === historia.getAnio()),
      );
    });

    // Obtiene el ancho inicial de la ventana (o 1200 por defecto si no hay objeto window, ej: SSR)
    this.tamanioHorizontalPantalla = typeof window !== 'undefined' ? window.innerWidth : 1200;
    // Calcula cuántas columnas mostrar según el ancho actual
    this.actualizarColumnas();
  }

  // Escucha el evento de redimensionado de ventana del navegador
  @HostListener('window:resize')
  onResize(): void {
    // Actualiza la variable con el nuevo ancho de la ventana
    this.tamanioHorizontalPantalla = window.innerWidth;
    // Recalcula el número de columnas para la nueva dimensión
    this.actualizarColumnas();
  }

  // Referencia al elemento HTML del contenedor principal marcado con #fondoHistoria en el template
  @ViewChild('fondoHistoria') fondoHistoria!: ElementRef<HTMLElement>;

  // Getter que devuelve el número total de historias (para la vista "historia completa")
  get conteoCeldasCompleta(): number {
    return this.objetoHistorias.length;
  }
  // Getter que devuelve el número de años únicos (para la vista "historia por años")
  get conteoCeldasAnios(): number {
    return this.objetoHistoriasAnios.length;
  }

  // Método privado que determina cuántas columnas usar según el ancho de pantalla
  private actualizarColumnas(): void {
    // Lee el ancho actual (o 1200 si no hay window)
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    // Por defecto 3 columnas (escritorio grande)
    let next = 3;
    if (w < 576) {
      // Pantalla móvil: 1 sola columna
      next = 1;
    } else if (w < 992) {
      // Pantalla tablet: 2 columnas
      next = 2;
    }
    // Solo actualiza si el valor cambió, para evitar renders innecesarios
    if (next !== this.columnasActivas) {
      this.columnasActivas = next;
      // Marca el componente para que Angular detecte el cambio y re-renderice
      this.deteccionCambio.markForCheck();
    }
  }

  // Método privado que divide un array de Historias en sub-arrays (filas) de tamaño "size"
  // Esto permite distribuir los botones en filas con el número correcto de columnas
  private chunkHistorias(items: Historias[], size: number): Historias[][] {
    // Si el tamaño es menor a 1, devuelve todo en una sola fila
    if (size < 1) {
      return [items];
    }
    const rows: Historias[][] = [];
    // Recorre el array saltando de "size" en "size" para crear cada fila
    for (let i = 0; i < items.length; i += size) {
      // Extrae un trozo del array desde i hasta i+size
      rows.push(items.slice(i, i + size));
    }
    return rows;
  }

  // Devuelve las filas para la vista "Historia Completa" (todos los meses y años)
  public filasHistoriaCompleta(): Historias[][] {
    return this.chunkHistorias(this.objetoHistorias, this.columnasActivas);
  }

  // Devuelve las filas para la vista "Historia por Años" (solo años únicos, sin duplicados)
  public filasHistoriaAnios(): Historias[][] {
    return this.chunkHistorias(this.objetoHistoriasAnios, this.columnasActivas);
  }

  // Genera la estructura de datos para el template de "Historia Completa"
  // Cada celda tiene un "tid" (id de tracking único para el @for de Angular) y el item de Historia
  public tablaHistoriaCompleta(): { tid: string; item: Historias }[][] {
    return this.filasHistoriaCompleta().map((fila, ri) =>
      fila.map((h, ci) => ({
        // El tid combina fila, columna, año y mes para garantizar unicidad
        tid: `c-${ri}-${ci}-${h.getAnio()}-${h.getMes()}`,
        item: h,
      })),
    );
  }

  // Genera la estructura de datos para el template de "Historia por Años"
  // Similar a tablaHistoriaCompleta pero solo con años únicos
  public tablaHistoriaAnios(): { tid: string; item: Historias }[][] {
    return this.filasHistoriaAnios().map((fila, ri) =>
      fila.map((h, ci) => ({
        // El tid combina fila, columna y año para garantizar unicidad
        tid: `a-${ri}-${ci}-${h.getAnio()}`,
        item: h,
      })),
    );
  }

  // Calcula el índice lineal (posición absoluta) a partir de fila y columna
  // Ejemplo: fila=1, col=2, columnasActivas=3 → índice = 1*3+2 = 5
  public indiceGlobal(fila: number, col: number): number {
    return fila * this.columnasActivas + col;
  }

  // Calcula el índice de retardo (stagger) para la animación escalonada en "Historia Completa"
  // Cada botón aparece con un delay proporcional a su posición
  public indiceStagger(fila: number, col: number): number {
    return this.indiceGlobal(fila, col);
  }

  // Calcula el índice de retardo (stagger) para la animación escalonada en "Historia por Años"
  public indiceStaggerAnios(fila: number, col: number): number {
    return this.indiceGlobal(fila, col);
  }

  // Método público que se ejecuta al pulsar "HISTORIA COMPLETA" o "HISTORIA POR AÑOS"
  // Recibe la opción elegida (1=completa, 2=por años) y prepara la vista correspondiente
  public cargarHistorial(opcion: number): void {
    // Protección contra ejecución en servidor (SSR) donde no existe window
    if (typeof window === 'undefined') {
      return;
    }
    // Desactiva la animación antes de cambiar la vista para permitir reinicio
    this.animarPanel = false;
    // Establece la elección del usuario (determina qué tabla se muestra en el template)
    this.eleccion = opcion;
    // Fuerza la detección de cambios para que Angular actualice el DOM inmediatamente
    this.deteccionCambio.detectChanges();

    // Usa requestAnimationFrame para activar la animación en el siguiente frame de renderizado
    // Esto garantiza que el navegador ya pintó el estado sin animación antes de activarla
    requestAnimationFrame(() => {
      this.animarPanel = true;
      this.deteccionCambio.detectChanges();
    });

    // Obtiene la referencia al elemento DOM del contenedor principal
    const fondos = this.fondoHistoria.nativeElement;
    // Ajusta la altura del contenedor según la cantidad de filas a mostrar
    this.actualizarAlturaFondo(fondos);
  }

  // Método privado que calcula y aplica dinámicamente la altura del contenedor .fondo
  private actualizarAlturaFondo(fondos: HTMLElement): void {
    // Si el semáforo está activo (libro abierto), altura fija de 600px para el libro
    if (this.semaforo) {
      this.renderer.setStyle(fondos, 'height', '600px');
      return;
    }
    // Si estamos en el menú principal (eleccion=0), altura mínima de 300px
    if (this.eleccion === 0) {
      this.renderer.setStyle(fondos, 'height', '300px');
      return;
    }
    // Calcula el número de filas según la vista activa (+1 para la fila del botón "CERRAR")
    const filas =
      this.eleccion === 1
        ? this.filasHistoriaCompleta().length + 1   // Vista "Historia Completa"
        : this.filasHistoriaAnios().length + 1;     // Vista "Historia por Años"
    // Calcula la altura: mínimo 320px, o 48px de margen + 92px por cada fila de botones
    const altura = Math.max(320, 48 + filas * 92);
    // Aplica la altura calculada al elemento DOM mediante Renderer2
    this.renderer.setStyle(fondos, 'height', `${altura}px`);
  }

  // Método público que cierra cualquier panel abierto y vuelve al menú principal
  public cerrarHistorial(): void {
    // Protección contra ejecución en servidor (SSR)
    if (typeof window === 'undefined') {
      return;
    }
    // Desactiva la animación de entrada
    this.animarPanel = false;
    // Desactiva el modo libro
    this.semaforo = false;
    // Vuelve al menú principal
    this.eleccion = 0;
    // Restaura la altura del contenedor al tamaño del menú principal
    const fondos = this.fondoHistoria.nativeElement;
    this.renderer.setStyle(fondos, 'height', '300px');
    // Fuerza la detección de cambios para actualizar la vista
    this.deteccionCambio.detectChanges();
  }

  // Método público que se ejecuta al pulsar un botón de mes+año en "Historia Completa"
  // Recibe el índice del botón pulsado, el mes y el año seleccionados
  public accionarBoton(puntero: number, mes: string, anio: string): void {
    // Protección contra ejecución en servidor (SSR)
    if (typeof window === 'undefined') {
      return;
    }
    // Guarda el mes y año seleccionados para pasarlos como @Input al libro interactivo
    this.mesLibro = mes;
    this.anioLibro = anio;
    // Activa el modo libro interactivo
    this.semaforo = true;
    // Desactiva la animación de la tabla (ya no se muestra)
    this.animarPanel = false;
    // Establece la altura para el libro interactivo
    const fondos = this.fondoHistoria.nativeElement;
    this.renderer.setStyle(fondos, 'height', '600px');
    // Guarda el índice seleccionado en el servicio compartido para que el libro lo lea
    this.objetoHistoriasFiltrado.setPunteroSeleccionador(puntero);
    // Actualiza el mes y año en el objeto de historia seleccionado
    this.objetoHistorias[puntero].setMesTexto(mes);
    this.objetoHistorias[puntero].setAnio(anio);
    // Fuerza la detección de cambios para renderizar el libro
    this.deteccionCambio.detectChanges();
  }

  // Método público que se ejecuta al pulsar un botón en "Historia por Años"
  // Pasa el año seleccionado con mes vacío para que el libro muestre TODOS los registros de ese año
  public accionarBotonPorAnio(anio: string): void {
    if (typeof window === 'undefined') {
      return;
    }
    // Mes vacío indica al libro que filtre solo por año (todos los meses de ese año)
    this.mesLibro = '';
    this.anioLibro = anio;
    this.semaforo = true;
    this.animarPanel = false;
    const fondos = this.fondoHistoria.nativeElement;
    this.renderer.setStyle(fondos, 'height', '600px');
    this.deteccionCambio.detectChanges();
  }
}
