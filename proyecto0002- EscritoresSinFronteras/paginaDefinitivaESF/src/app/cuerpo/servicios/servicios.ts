import { Component, OnDestroy, OnInit } from '@angular/core';
import { VariablesCompartidas, Conexion, ServiciosOfrecidos, ServiciosTypeId, ServiciosTypeTitulo } from '../../servicios/variablesCompartidas';

/** Apartado agrupado: una tarjeta por tipo (Cursos, Entrevistas, etc.) con todos sus ítems. */
export interface ServicioApartadoGrupo {
  id: ServiciosTypeId;
  titulo: ServiciosTypeTitulo;
  descripcion: string;
  contenidos: ServiciosOfrecidos[];
}

@Component({
  selector: 'app-servicios',
  standalone: false,
  templateUrl: './servicios.html',
  styleUrl: './servicios.css',
})
export class Servicios implements OnInit, OnDestroy {
  private readonly onFiltroServiciosMenu = (): void => {
    this.filtroCabeceraPendiente =
      this.variablesCompartidas.menuPrincipal.getSubApartadosServicios();
    this.applyFilters();
  };
  public expandedId: ServiciosTypeId | null = null;

  /** Filas crudas desde la API. */
  public contenidosServicios: ServiciosOfrecidos[] = [];
  /** Una tarjeta por categoría con todos los servicios de ese tipo. */
  public apartadosAgrupados: ServicioApartadoGrupo[] = [];

  // Se consume una sola vez en applyFilters tras entrar en la página
  private filtroCabeceraPendiente = '';
  public errorMsg = '';

  public search = '';

  constructor(public variablesCompartidas: VariablesCompartidas, private Conexion: Conexion) {}

  ngOnInit(): void {  //Al iniciar el componente se debe guardar lo almacenado en el servicio
        // Filtro elegido en la cabecera antes de abrir esta ruta (localStorage)
    const desdeMenu = this.variablesCompartidas.menuPrincipal.getSubApartadosServicios();
    this.filtroCabeceraPendiente =
      desdeMenu === 'todos' || desdeMenu === '' ? '' : desdeMenu;
    this.cargarServiciosDesdeApi();

    if (typeof window !== 'undefined') {
      window.addEventListener('esf-servicios-filtro', this.onFiltroServiciosMenu);
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('esf-servicios-filtro', this.onFiltroServiciosMenu);
    }
  }

  /** GET índice 4 → http://localhost:3000/api/servicios */
  private cargarServiciosDesdeApi(): void {
    this.errorMsg = '';
    this.Conexion.getAutores(4).subscribe({
      next: data => {
        this.contenidosServicios = (data ?? []).map(fila => this.mapFilaAServicio(fila));
        this.applyFilters();
      },
      error: () => {
        this.contenidosServicios = [];
        this.apartadosAgrupados = [];
        this.errorMsg = 'No se pudieron cargar los servicios.';
      },
    });
  }

  // Adapta la fila SQL (tipo INT 0|1|2, columna email, fecha DATE)
  // al modelo BlogPost usado en la plantilla.
  private mapFilaAServicio(fila: Record<string, unknown>): ServiciosOfrecidos {

    //Control del tipo de ID SERVICIO
    const identificadorServicio = fila['idservicio'];
    let idservicio: ServiciosTypeId = 'cursos';     //Por defecto se asigna cursos luego se procede a la distincion
    if (identificadorServicio === 'cursos' ||
        identificadorServicio === 'entrevistas' ||
        identificadorServicio === 'ediciones' ||
        identificadorServicio === 'tertulias' ||
        identificadorServicio === 'congresos' ||
        identificadorServicio === 'ferias') {
            idservicio = identificadorServicio;
    } else {
      // 0 = verso, 1 = prosa, 2 = reflexión (init.sql)
      const n =
        typeof identificadorServicio === 'string' ? parseInt(identificadorServicio, 10) : Number(identificadorServicio);
      const mapa: ServiciosTypeId[] = ['cursos','entrevistas','ediciones','tertulias','congresos','ferias'];
      idservicio = mapa[n] ?? 'cursos';
    }

    //Control del tipo de TITULO SERVICIO 
    const titularServicio = fila['tituloservicio'];
    let tituloservicio: ServiciosTypeTitulo = 'Cursos';     //Por defecto se asigna cursos luego se procede a la distincion
    if (titularServicio === 'Cursos' ||
        titularServicio === 'Entrevistas' ||
        titularServicio === 'Ediciones' ||
        titularServicio === 'Tertulias' ||
        titularServicio === 'Congresos' ||
        titularServicio === 'Ferias') {
            tituloservicio = titularServicio;
    } else {
      // 0 = verso, 1 = prosa, 2 = reflexión (init.sql)
      const n =
        typeof titularServicio === 'string' ? parseInt(titularServicio, 10) : Number(titularServicio);
      const mapa: ServiciosTypeTitulo[] = ['Cursos','Entrevistas','Ediciones','Tertulias','Congresos','Ferias'];
      tituloservicio = mapa[n] ?? 'Cursos';
    }

    return {
      idservicio,
      tituloservicio,
      descripcionservicio: String(fila['descripcionservicio'] ?? ''),
      subtitulo: String(fila['subtitulo'] ?? ''),
      subdescripcion: String(fila['subdescripcion'] ?? ''),
      imagenservicio: String(fila['imagenservicio'] ?? ''),
      audioservicio: String(fila['audioservicio'] ?? ''),
      videoservicio: String(fila['videoservicio'] ?? ''),
    };
  }

  public applyFilters(): void {
    const categoriaDesplegar = this.filtroCabeceraPendiente;
    this.filtroCabeceraPendiente = '';

    const q = (this.search ?? '').trim().toLowerCase();

    const filas = this.contenidosServicios.filter(p => this.coincideBusqueda(p, q));

    this.apartadosAgrupados = this.agruparPorCategoria(filas);

    if (this.esCategoriaValida(categoriaDesplegar)) {
      this.expandedId = categoriaDesplegar;
    } else {
      this.expandedId = null;
    }
  }

  private esCategoriaValida(id: string): id is ServiciosTypeId {
    return (
      id === 'cursos' ||
      id === 'entrevistas' ||
      id === 'ediciones' ||
      id === 'tertulias' ||
      id === 'congresos'
    );
  }

  private coincideBusqueda(p: ServiciosOfrecidos, q: string): boolean {
    if (!q) return true;
    const texto = [
      p.idservicio,
      p.tituloservicio,
      p.descripcionservicio,
      p.subtitulo,
      p.subdescripcion,
      p.imagenservicio,
      p.audioservicio,
      p.videoservicio,
    ]
      .join(' ')
      .toLowerCase();
    return texto.includes(q);
  }

  /** Agrupa filas de la API: título y descripción de tarjeta desde tituloservicio/descripcionservicio (BD). */
  private agruparPorCategoria(filas: ServiciosOfrecidos[]): ServicioApartadoGrupo[] {
    const porTipo = new Map<ServiciosTypeId, ServiciosOfrecidos[]>();
    const ordenEnBd: ServiciosTypeId[] = [];

    for (const fila of filas) {
      if (!porTipo.has(fila.idservicio)) {
        ordenEnBd.push(fila.idservicio);
      }
      const lista = porTipo.get(fila.idservicio) ?? [];
      lista.push(fila);
      porTipo.set(fila.idservicio, lista);
    }

    return ordenEnBd.map(id => {
      const contenidos = porTipo.get(id)!;
      const cabecera = contenidos[0];
      return {
        id,
        titulo: cabecera.tituloservicio,
        descripcion: cabecera.descripcionservicio,
        contenidos,
      };
    });
  }

  public cantidadEnApartado(apartado: ServicioApartadoGrupo): number {
    return apartado.contenidos.length;
  }

  /** Id del apartado con contenido desplegado; null si ninguno. */
  public toggle(id: ServiciosTypeId): void {
    this.expandedId = this.expandedId === id ? null : id;
  }

  public isOpen(id: ServiciosTypeId): boolean {
    return this.expandedId === id;
  }
}
