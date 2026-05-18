import { Component, OnInit } from '@angular/core';
import { Conexion, publicaciones, PublicacionesPost, PublicacionesPostType } from '../../servicios/variablesCompartidas';

/**
 * Apartado Publicaciones: rejilla de obras y vista de detalle.
 * Los datos se obtienen de la tabla `publicaciones` vía GET /api/publicaciones.
 */
@Component({
  selector: 'app-publicaciones',
  standalone: false,
  templateUrl: './publicaciones.html',
  styleUrl: './publicaciones.css',
})
export class Publicaciones implements OnInit {
  /** Vista activa: listado de tarjetas o ficha de una publicación. */
  public view: 'list' | 'detail' = 'list';

  /** Publicación abierta en la vista detalle (evita buscar por id duplicado). */
  public selectedPost: PublicacionesPost | null = null;

  /** Todas las publicaciones cargadas desde la API. */
  public posts: PublicacionesPost[] = [];

  /** Publicaciones visibles tras aplicar filtro de género y búsqueda (enlaza con la plantilla). */
  public filteredPosts: PublicacionesPost[] = [];

  /** Acceso a la matriz de géneros definida en variablesCompartidas. */
  private readonly vectorGenerosNovela = new publicaciones();

  /** Lista de géneros para rellenar el desplegable del HTML. */
  public readonly generosNovela = this.vectorGenerosNovela.PublicacionesPostTypeArray;

  /** Género seleccionado en el select; 'todos' muestra cualquier tipo. */
  public filterType: PublicacionesPostType = 'todos';

  /** Texto introducido por el usuario en el campo de búsqueda. */
  public search = '';

  /** Mensaje de error mostrado en la plantilla si falla la carga. */
  public errorMsg = '';

  constructor(private conexion: Conexion) {}

  /** Al iniciar el componente, carga las publicaciones desde el backend. */
  ngOnInit(): void {
    this.cargarPublicacionesDesdeApi();
  }

  /**
   * Solicita las filas de la tabla publicaciones.
   * Conexion.getAutores(5) apunta a http://localhost:3000/api/publicaciones.
   */
  private cargarPublicacionesDesdeApi(): void {
    this.errorMsg = '';
    this.conexion.getAutores(5).subscribe({
      next: data => {
        this.posts = (data ?? []).map(fila => this.mapFilaAPublicaciones(fila));
        this.applyFilters();
      },
      error: () => {
        this.posts = [];
        this.filteredPosts = [];
        this.errorMsg = 'No se pudieron cargar las publicaciones.';
      },
    });
  }

  /**
   * Adapta una fila SQL al modelo PublicacionesPost usado en la plantilla.
   * @param fila Registro devuelto por la API (claves: idpubliGen, titulopubli, tipopubli, etc.).
   */
  private mapFilaAPublicaciones(fila: Record<string, unknown>): PublicacionesPost {
    const indiceGenero = Number(fila['tipopubli'] ?? 0);

    // --- Versión anterior (ternario ? :) — conservada para comparación ---
    // return {
    //   id: String(fila['idpubliGen'] ? fila['idpubliGen'] : this.makeId()),
    //   ...
    //   fotoLibro: String(fila['fotolibropubli'] ? fila['fotolibropubli'] : ''),
    // };

    return {
      id: this.resolverIdPublicacion(fila),
      title: String(fila['titulopubli'] ?? ''),
      type: this.resolverGenero(indiceGenero),
      content: String(fila['contenidopubli'] ?? ''),
      authorEmail: String(fila['autorcorreopubli'] ?? ''),
      createdAtIso: String(fila['fechapubli'] ?? new Date().toISOString()),
      fotoLibroTitulo: String(fila['titulofotolibropubli'] ?? ''),
      fotoLibro: this.rutaMedia('assets/images/publicaciones/', fila['fotolibropubli']),
      audioLibroTitulo: String(fila['tituloaudiolibropubli'] ?? ''),
      audio: this.rutaMedia('assets/audios/publicaciones/', fila['audiolibropubli']),
      videoCortoTitulo: String(fila['titulovideopubli'] ?? ''),
      videoCorto: this.rutaMedia('assets/videos/publicaciones/', fila['videolibropubli']),
    };
  }

  /**
   * Id único por fila: idpubliGen si viene informado; si no, el id numérico de la tabla.
   * En init.sql muchos idpubliGen están vacíos ("") y duplicaban el id.
   */
  private resolverIdPublicacion(fila: Record<string, unknown>): string {
    const generado = String(fila['idpubliGen'] ?? '').trim();
    if (generado) return generado;
    if (fila['id'] != null && String(fila['id']).trim() !== '') {
      return String(fila['id']);
    }
    return this.makeId();
  }

  /** Si en BD solo hay el nombre del archivo, antepone la carpeta bajo assets/. */
  private rutaMedia(carpeta: string, valor: unknown): string {
    const nombre = String(valor ?? '').trim();
    if (!nombre) return '';
    if (nombre.startsWith('assets/') || nombre.startsWith('http://') || nombre.startsWith('https://')) {
      return nombre;
    }
    return `${carpeta}${nombre}`;
  }

  public tieneFoto(post: PublicacionesPost): boolean {
    return !!post.fotoLibro?.trim();
  }

  public tieneAudio(post: PublicacionesPost): boolean {
    return !!post.audio?.trim();
  }

  public tieneVideo(post: PublicacionesPost): boolean {
    return !!post.videoCorto?.trim();
  }

  /**
   * Convierte el entero tipopubli de la BD en el literal de género (PublicacionesPostType).
   * @param indice Posición en PublicacionesPostTypeArray.
   */
  private resolverGenero(indice: number): PublicacionesPostType {
    const genero =
      this.vectorGenerosNovela.PublicacionesPostTypeArray[indice] ??
      this.vectorGenerosNovela.PublicacionesPostTypeArray[0];
    return genero as PublicacionesPostType;
  }

  /** Genera un id único cuando la fila de la BD no trae idpubliGen. */
  private makeId(): string {
    return `p_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
  }

  /** Vuelve al listado, limpia la selección y refresca los filtros. */
  public openList(): void {
    this.errorMsg = '';
    this.view = 'list';
    this.selectedPost = null;
    this.applyFilters();
  }

  /** Abre la ficha de la publicación pulsada en el listado. */
  public openDetail(post: PublicacionesPost): void {
    this.errorMsg = '';
    this.selectedPost = post;
    this.view = 'detail';
  }

  /**
   * Aplica filtro por género (filterType) y búsqueda por palabras clave (search).
   * El resultado se guarda en filteredPosts, ordenado por fecha descendente.
   */
  public applyFilters(): void {
    const q = (this.search ?? '').trim().toLowerCase();
    const type = this.filterType;

    this.filteredPosts = this.posts
      .filter(p => type === 'todos' || p.type === type)
      .filter(p => this.coincideBusqueda(p, q))
      .sort((a, b) => b.createdAtIso.localeCompare(a.createdAtIso));
  }

  /**
   * Comprueba si el texto de búsqueda aparece en los campos relevantes de la publicación.
   * @param p Publicación a evaluar.
   * @param q Texto de búsqueda ya en minúsculas.
   */
  private coincideBusqueda(p: PublicacionesPost, q: string): boolean {
    if (!q) return true;
    const texto = [
      p.title,
      p.content,
      p.authorEmail,
      p.type,
      p.fotoLibroTitulo,
      p.audioLibroTitulo,
      p.videoCortoTitulo,
    ]
      .join(' ')
      .toLowerCase();
    return texto.includes(q);
  }

  /** Etiqueta legible del género para badges y opciones del select. */
  public formatTypeLabel(t: PublicacionesPostType | string): string {
    if (t === 'todos') return 'Todos';
    const s = String(t);
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  }

  /** Formatea la fecha ISO de la publicación en locale español. */
  public formatDate(iso: string): string {
    try {
      return new Intl.DateTimeFormat('es-ES', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  }

  /** Texto resumido del contenido para la tarjeta del listado (máx. 170 caracteres). */
  public previewText(post: PublicacionesPost): string {
    const raw = post.content.replace(/\s+/g, ' ').trim();
    return raw.length > 170 ? `${raw.slice(0, 170)}…` : raw;
  }
}
