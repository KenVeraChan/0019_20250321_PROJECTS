// Importación de decoradores y utilidades de Angular: Component (definir componente), OnInit/AfterViewInit (ciclos de vida),
// ViewChild (referencia a elemento del DOM), ElementRef (wrapper del elemento nativo), HostListener (escucha eventos globales),
// Input (recibir datos del componente padre)
import { Component, OnInit, AfterViewInit,ViewChild, ElementRef, HostListener, Input } from '@angular/core';
// Importación de modelos y servicios: Historias (modelo de datos), VariablesCompartidas (estado compartido), Conexion (HTTP)
import { Historias, VariablesCompartidas, Conexion } from '../../../servicios/variablesCompartidas';

// Interfaz TypeScript que define la estructura de estado de cada página del libro
interface PaginaState {
  // El título/contenido de la página: puede ser un string fijo o una función que devuelve string (lazy evaluation)
  titulo: string | (() => string);
  // El mes de la página: puede ser string, función que devuelve string o number (opcional)
  mes?: string | (()=> string | number);
  // El año de la página: puede ser string, función que devuelve string o number (opcional)
  anio?: string | (()=> string | number);
  // Indica si se muestra el botón de acción en esta página
  mostrarBoton: boolean;
  // Indica si la página está girada (rotación 180° en Y para efecto de pasar página)
  rotado: boolean;
  // Indica si la página tiene el color degradado (efecto visual del reverso)
  decolorado: boolean;
  // Indica si la página debe estar completamente invisible (sin sombra ni color)
  invisible: boolean;
  // Controla el orden de apilamiento de las páginas (qué página está encima de cuál)
  zIndex: number;
  // Indica si el texto de la página debe estar oculto (transparente) mientras está girada
  textoInvisible: boolean;
}

// Decorador que define los metadatos del componente Angular
@Component({
  selector: 'app-librointeractivo',   // Etiqueta HTML para usar este componente: <app-librointeractivo>
  standalone: false,                   // No es standalone, pertenece a un módulo
  templateUrl: './librointeractivo.html', // Plantilla HTML del componente
  styleUrl: './librointeractivo.css',     // Estilos CSS del componente
})
// Clase del componente que implementa los ciclos de vida AfterViewInit (DOM listo) y OnInit (inicialización)
export class Librointeractivo implements AfterViewInit, OnInit {

  // Input que recibe del padre (historia.ts) el mes seleccionado para filtrar registros
  // Si viene vacío, significa que se filtró solo por año (desde "HISTORIA POR AÑOS")
  @Input() mesFiltro: string = '';
  // Input que recibe del padre (historia.ts) el año seleccionado para filtrar registros
  @Input() anioFiltro: string = '';

  // Referencia al elemento del DOM marcado con #libroAbierto en el template HTML
  @ViewChild('libroAbierto') libroAbierto!: ElementRef<HTMLElement>;

  // Índice de la página actual visible (la que está en la "superficie" del libro sin girar)
  public paginaMovimiento = 0;
  // Guarda el índice de la página anterior para controlar la navegación hacia atrás
  public guardaPagina = 0;
  // Flag que controla la visibilidad del botón "Abrir" del libro
  public mostrarBotonAbrir = true;
  // Flag que bloquea los clics mientras una animación de giro está en progreso
  public isAnimating = false;
  // Almacena el ancho actual de la pantalla para el diseño responsive (pergamino vs libro)
  public anchoPantalla: number = window.innerWidth; 
  // Instancia de VariablesCompartidas para acceder al puntero seleccionado (legacy, ahora se usan @Input)
  public fechaSeleccionada= new VariablesCompartidas();
  // Array que almacena TODOS los registros de historias cargados desde la base de datos
  public eventoSeleccionado: any[]=[];
  // Array que almacena solo los registros filtrados por mes+año o solo por año
  public eventoFiltrado: any[]=[];
  // Almacena el nombre del mes actualmente seleccionado para mostrar en la UI
  public mesSeleccionado:string='';
  // Almacena el año actualmente seleccionado para mostrar en la UI
  public anioSeleccionado:string='';
  // Índice del puntero seleccionado (legacy, ahora se filtra directamente)
  public puntero:number=0;
  // Array de objetos PaginaState: cada elemento representa una página del libro con su estado
  public paginas: PaginaState[]=[];

  // Constructor: inyecta el servicio Conexion para realizar peticiones HTTP al backend
  constructor(private Conexion: Conexion){}

  // Método del ciclo de vida que se ejecuta al inicializar el componente (antes de que el DOM esté listo)
  ngOnInit(): void {
    // Llama al servicio HTTP para obtener todos los registros de historias (índice 1 = tabla historias)
    this.Conexion.getAutores(1).subscribe(data => {
          // Recorre cada registro recibido del servidor
          data.forEach(a=>{
            // Crea una instancia del modelo Historias con los datos: id, mes (número), año, contenido
            const historia = new Historias(
                a.id,
                a.mes,
                a.anio,
                a.contenido);
        // Añade la historia al array completo de eventos
        this.eventoSeleccionado.push(historia);
        }
      );

    // Filtra los registros según la selección del usuario (recibida por @Input desde el padre)
    if (this.mesFiltro && this.anioFiltro) {
      // Si hay mes y año, filtra por ambos (viene de "HISTORIA COMPLETA": un mes+año específico)
      this.eventoFiltrado = this.eventoSeleccionado.filter(
        (h) => h.getMes() === this.mesFiltro && h.getAnio() === this.anioFiltro
      );
    } else if (this.anioFiltro) {
      // Si solo hay año (mes vacío), filtra por año solamente (viene de "HISTORIA POR AÑOS")
      // Esto muestra TODOS los registros de ese año sin importar el mes
      this.eventoFiltrado = this.eventoSeleccionado.filter(
        (h) => h.getAnio() === this.anioFiltro
      );
    } else {
      // Si no hay filtro alguno, muestra todos los registros (caso por defecto)
      this.eventoFiltrado = this.eventoSeleccionado;
    }

    // Una vez filtrados los datos, construye las páginas del libro
    this.rellenadoDatos();
    });
  }

  // Método auxiliar que obtiene el título de una página como string
  // Maneja el caso en que titulo sea una función (lazy) o un string directo
  public getTitulo(pagina: PaginaState): string {
     // Si titulo es una función, la ejecuta; si es string, lo usa directamente
     const valor= typeof pagina.titulo === 'function'
      ? pagina.titulo()
      : pagina.titulo;
      // Normaliza el texto Unicode (forma NFC) para manejar correctamente acentos y caracteres especiales
      return typeof valor.normalize('NFC');
  }

  /*
  // Código comentado: ejemplo estático de páginas con datos hardcodeados (ya no se usa)
  // Se mantiene como referencia de la estructura esperada por PaginaState
  public paginas: PaginaState[] = [
    { titulo:  ()=>this.eventoSeleccionado[0].getContenido(), mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: 0, textoInvisible: false},
    { titulo: 'Vida de Vitrea Horíz', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: -1, textoInvisible: false},
    { titulo: 'Vida de Emiliam Bastreriz', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: -2, textoInvisible: false},
    { titulo: 'Vida de Verdulíz Sainz', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: -3, textoInvisible: false},
    { titulo: 'Vida de Veddina Henion', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: -4, textoInvisible: false},
    { titulo: 'Vida de Samira Sávadez', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: -5, textoInvisible: false},
    { titulo: 'Vida de Shail Matsiz', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: -6, textoInvisible: false},
    { titulo: 'Vida de Christal Gedishen', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: -7, textoInvisible: false},
    { titulo: 'Vida de Jill Anherson', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: -8, textoInvisible: false},
  ];
  */

  // Escucha el evento de redimensionado de ventana para actualizar el ancho de pantalla
  // Esto permite cambiar entre vista de pergamino (móvil) y vista de libro (escritorio)
  @HostListener('window:resize', ['$event']) 
  onResize(event: Event) 
  { 
    // Actualiza la variable con el nuevo ancho de la ventana
    this.anchoPantalla = window.innerWidth; 
  } 

  // Método del ciclo de vida que se ejecuta cuando el DOM ya está completamente renderizado
  // Aquí se pueden manipular elementos del DOM de forma segura
  public ngAfterViewInit(): void 
  {
      // Obtiene el número total de páginas para calcular los z-index correctos
      const total = this.paginas.length;
      // Recorre todas las páginas y asigna z-index decreciente
      // La primera página tiene el z-index más alto (visible encima de todas)
      this.paginas.forEach((p, index) => {
      p.zIndex = total - index;
    });
      // Asigna el mes y año seleccionados desde los @Input del padre para uso interno
      this.mesSeleccionado = this.mesFiltro;
      this.anioSeleccionado = this.anioFiltro;
  }

  // Método que construye el array de páginas a partir de los datos filtrados
  // Cada registro filtrado se convierte en una página del libro con su estado inicial
  public rellenadoDatos():void
  {
    // Reinicia el array de páginas para evitar duplicados si se llama más de una vez
    this.paginas = [];
    // Recorre cada registro del array filtrado (solo los que coinciden con mes+año o solo año)
    for(let index=0; index<this.eventoFiltrado.length;index++)
    {
      // Crea una nueva página con funciones lambda que leen dinámicamente los datos del registro
      this.paginas.push({
        // Función que devuelve el contenido/texto del registro de historia
        titulo: ()=>this.eventoFiltrado[index].getContenido(),
        // Función que devuelve el nombre del mes del registro (ej: "Enero", "Febrero"...)
        mes: ()=> this.eventoFiltrado[index].getMes(),
        // Función que devuelve el año del registro (ej: "2025")
        anio: ()=> this.eventoFiltrado[index].getAnio(),
        // No muestra botón de acción en ninguna página
        mostrarBoton: false,
        // La página inicia sin girar (cara frontal visible)
        rotado: false,
        // La página inicia sin el efecto de color degradado del reverso
        decolorado: false,
        // La página inicia visible (no oculta)
        invisible: false,
        // Z-index negativo decreciente: la primera página está encima, las demás debajo
        zIndex: 0-index,
        // El texto inicia visible (no transparente)
        textoInvisible: false
      });
    }
  }

  // Método principal que maneja la interacción del usuario al hacer clic en una página del libro
  // Determina si el clic fue en la mitad derecha (pasar página) o izquierda (volver página)
  public onPaginaClick(index: number, event: MouseEvent): void 
  {
    // Obtiene el elemento DOM nativo del contenedor del libro
    const el = this.libroAbierto?.nativeElement;
    // Si el elemento no existe (aún no renderizado), no hace nada
    if (!el) return;

    // Si hay una animación en curso, ignora el clic para evitar conflictos
    if (this.isAnimating) return;

    // Obtiene las dimensiones y posición del contenedor del libro en la pantalla
    const rect = el.getBoundingClientRect();
    // Posición X del clic del usuario (coordenada horizontal en la ventana)
    const posicionX = event.clientX;
    // Calcula el punto medio horizontal del libro (frontera entre "pasar" y "volver")
    const limiteDerecho = rect.left + rect.width / 2;
    // Borde izquierdo del libro
    const limiteIzquierdo = rect.left;

    // Obtiene el estado de la página que fue clickeada
    const p = this.paginas[index];

    // CASO 1: Clic en la mitad DERECHA del libro → pasar a la siguiente página
    if (posicionX >= limiteDerecho && posicionX <= rect.right) {
      // Si la página ya está girada, no hace nada (no se puede girar dos veces)
      if (p.rotado) return;
      // Bloquea nuevos clics hasta que termine la animación
      this.isAnimating = true;
      // Activa la rotación CSS de 180° en el eje Y (efecto de pasar página)
      p.rotado = true;
      // Aplica el color degradado del "reverso" de la página
      p.decolorado = true;
      // Si es la página actual visible, alterna la visibilidad del botón "Abrir"
      if (index === this.paginaMovimiento) {
        this.mostrarBotonAbrir = !this.mostrarBotonAbrir;
      }
      // Guarda el índice actual antes de avanzar (para poder volver)
      this.guardaPagina = this.paginaMovimiento;
      // Avanza el contador de página actual
      this.paginaMovimiento++;
      // Eleva el z-index de la página girada para que quede encima durante la animación
      p.zIndex = this.paginas.length + this.paginaMovimiento;
      // Espera 500ms (duración de la animación CSS) antes de ocultar el texto
      setTimeout(() => {
        // Mantiene la página visible (no la oculta completamente)
        p.invisible = false;
        // Oculta el texto (lo hace transparente) porque el reverso no debe mostrarlo
        p.textoInvisible=true;
        // Desbloquea los clics al terminar la animación
        this.isAnimating = false;
      }, 500);

    // CASO 2: Clic en la mitad IZQUIERDA del libro → volver a la página anterior
    } else if (posicionX < limiteDerecho && posicionX >= limiteIzquierdo) {
      // Si la página NO está girada, no se puede "desgirar" (ya está plana)
      if (!p.rotado) return;
      // Bloquea nuevos clics
      this.isAnimating = true;
      // Hace visible la página antes de girarla de vuelta
      p.invisible = false;
      // Hace visible el texto antes de que la cara frontal aparezca
      p.textoInvisible=false;
      // Pequeña espera de 20ms para asegurar que el navegador haga un repaint antes de animar
      setTimeout(() => {
        // Desactiva la rotación (la página vuelve a su posición plana original)
        p.rotado = false;
        // Quita el efecto de color degradado (vuelve al color frontal)
        p.decolorado = false;
        // Retrocede el contador de página actual
        this.paginaMovimiento--;
        // Si volvimos a la página guardada, alterna el botón "Abrir"
        if (this.guardaPagina === this.paginaMovimiento) {
          this.mostrarBotonAbrir = !this.mostrarBotonAbrir;
        }
        // Restaura el z-index para que el orden de apilamiento sea correcto
        p.zIndex = this.paginas.length - this.paginaMovimiento;
        // Espera 750ms (animación de vuelta más lenta) antes de desbloquear clics
        setTimeout(() => {
          this.isAnimating = false;
        }, 750);
      }, 20);
    }
  }
}
