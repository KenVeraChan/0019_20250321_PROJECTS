import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { VariablesCompartidas, Conexion, BlogPost, BlogPostType } from '../../servicios/variablesCompartidas';

/**
 * Blog literario: lectura desde MySQL (GET /api/blog), publicación con correo
 * validado (POST /api/blog). Las entradas viven en memoria (entradasBlog), no en localStorage.
 */
@Component({
  selector: 'app-blogs',
  standalone: false,
  templateUrl: './blogs.html',
  styleUrl: './blogs.css',
})
export class Blogs implements OnInit {
  // Sesión (solo correo en localStorage) 
  private readonly storageKeyUserEmail = 'esf_blog_user_email_v1';
  // Integración con menú de cabecera (verso / prosa / reflexión)
  private readonly menuCompartido = new VariablesCompartidas();
  // Se consume una sola vez en applyFilters tras entrar en la página
  private filtroCabeceraPendiente = '';
  // Datos del blog (fuente: base de datos vía Conexion)
  private entradasBlog: BlogPost[] = [];

  public userEmail = '';
  public emailInput = '';

  public userNombre= '';
  public nombreInput = '';

  public userPrimerApellido= '';
  public primerApellidoInput= '';

  public userSegundoApellido= '';
  public segundoApellidoInput= '';

  public userPais= '';
  public paisInput= '';

  public view: 'list' | 'detail' | 'create' = 'list';
  public selectedPostId: string | null = null;

  // Subconjunto de entradasBlog tras filtros de cabecera, tipo y búsqueda
  public filteredPosts: BlogPost[] = [];

  public filterType: 'todos' | BlogPostType = 'todos';
  public search = '';

  public createTitle = '';
  public createType: BlogPostType = 'reflexion';
  public createContent = '';
  public createNombre = '';
  public createPrimerApellido = '';
  public createSegundoApellido = '';
  public createPais = '';

  public errorMsg = '';
  public publicando = false;

  constructor(private Conexion: Conexion) {}

  ngOnInit(): void {
    // Filtro elegido en la cabecera antes de abrir esta ruta (localStorage)
    const desdeMenu = this.menuCompartido.menuPrincipal.getSubApartadoBlog();
    this.filtroCabeceraPendiente =
      desdeMenu === 'todos' || desdeMenu === '' ? '' : desdeMenu;

    this.userEmail = this.safeGet(this.storageKeyUserEmail) ?? '';
    this.emailInput = this.userEmail;
    this.cargarBlogDesdeApi();
  }

  /** GET índice 3 → http://localhost:3000/api/blog (misma URL base que el POST al publicar) */
  private cargarBlogDesdeApi(): void {
    this.errorMsg = '';
    this.Conexion.getAutores(3).subscribe({
      next: data => {
        this.entradasBlog = (data ?? []).map(fila => this.mapFilaABlogPost(fila));
        this.applyFilters();
      },
      error: () => {
        this.entradasBlog = [];
        this.filteredPosts = [];
        this.errorMsg = 'No se pudieron cargar las entradas del blog.';
      },
    });
  }

  // Adapta la fila SQL (tipo INT 0|1|2, columna email, fecha DATE)
  // al modelo BlogPost usado en la plantilla.
  private mapFilaABlogPost(fila: Record<string, unknown>): BlogPost {
    const fechaRaw = fila['fecha'] ?? fila['createdAtIso'];
    let createdAtIso = '';

    if (fechaRaw instanceof Date) {
      createdAtIso = fechaRaw.toISOString()
    } else if (typeof fechaRaw === 'string') {
      const soloFecha = fechaRaw.slice(0, 10);
      createdAtIso = /^\d{4}-\d{2}-\d{2}$/.test(soloFecha)
        ? new Date(`${soloFecha}T12:00:00`).toISOString()
        : fechaRaw;
    } else {
      createdAtIso = new Date().toISOString();
    }

    const email =
      (fila['email'] as string) ?? (fila['authorEmail'] as string) ?? '';
    const tipoRaw = fila['tipo'];
    let tipo: BlogPostType = 'reflexion';
    if (tipoRaw === 'verso' || tipoRaw === 'prosa' || tipoRaw === 'reflexion') {
      tipo = tipoRaw;
    } else {
      // 0 = verso, 1 = prosa, 2 = reflexión (init.sql)
      const n =
        typeof tipoRaw === 'string' ? parseInt(tipoRaw, 10) : Number(tipoRaw);
      const mapa: BlogPostType[] = ['verso', 'prosa', 'reflexion'];
      tipo = mapa[n] ?? 'reflexion';
    }

    return {
      id: String(fila['id'] ?? ''),
      titulo: String(fila['titulo'] ?? ''),
      tipo,
      contenido: String(fila['contenido'] ?? ''),
      // Autor: columnas añadidas a la tabla blog (init.sql); nombres en minúsculas como en MySQL
      nombre: String(fila['nombre'] ?? ''),
      primerapellido: String(fila['primerapellido'] ?? ''),
      segundoapellido: String(fila['segundoapellido'] ?? ''),
      pais: String(fila['pais'] ?? ''), // Puede contener espacios ("Costa Rica")
      authorEmail: email,
      createdAtIso,
    };
  }

  public isLoggedIn(): boolean {
    return this.esCorreoValido(this.userEmail);
  }

  public login(): void {
    this.errorMsg = '';
    //ALMACENAJE MOMENTANEO DEL: NOMBRE, PRIMER APELLIDO, SEGUNDO APELLIDO, PAIS Y CORREO
    const email = (this.emailInput ?? '').trim().toLowerCase();  //CORREO
    if (!this.esCorreoValido(email)) {
      this.errorMsg = 'Ingresa un correo válido para publicar.';
      return;
    }
    this.userEmail = email;
    this.safeSet(this.storageKeyUserEmail, email);  //Guarda el correo introducido en localStorage para mantener la sesión
    this.view = 'create';
  }

  public logout(): void {
    this.userEmail = '';
    this.emailInput = '';
    this.safeRemove(this.storageKeyUserEmail);
    if (this.view === 'create') this.view = 'list';
  }

  public openCreate(): void {
    this.errorMsg = '';
    if (!this.isLoggedIn()) {
      this.view = 'list';
      return;
    }
    this.view = 'create';
  }

  public openList(): void {
    this.errorMsg = '';
    this.view = 'list';
    this.selectedPostId = null;
    this.applyFilters();
  }

  public openDetail(postId: string): void {
    this.errorMsg = '';
    this.view = 'detail';
    this.selectedPostId = postId;
  }

  public selectedPost(): BlogPost | null {
    if (!this.selectedPostId) return null;
    return this.entradasBlog.find(p => p.id === this.selectedPostId) ?? null;
  }

  // Orden de filtros:
  // (1) submenú cabecera, una vez;
  // (2) selector de la vista;
  // (3) texto de búsqueda. Ordenación por fecha descendente.
  public applyFilters(): void {
    const elegido = this.filtroCabeceraPendiente;
    this.filtroCabeceraPendiente = '';

    const q = (this.search ?? '').trim().toLowerCase();
    const type = this.filterType;

    this.filteredPosts = this.entradasBlog
      .filter(p => (elegido === '' ? true : p.tipo === elegido))
      .filter(p => (type === 'todos' ? true : p.tipo === type))
      .filter(p => {
        if (!q) return true;
        return (
          p.titulo.toLowerCase().includes(q) ||
          p.contenido.toLowerCase().includes(q) ||
          p.authorEmail.toLowerCase().includes(q) ||
          p.nombre.toLocaleLowerCase().includes(q) ||
          p.primerapellido.toLocaleLowerCase().includes(q) ||
          p.segundoapellido.toLocaleLowerCase().includes(q) ||
          p.pais.toLocaleLowerCase().includes(q)
        );
      })
      .sort((a, b) => b.createdAtIso.localeCompare(a.createdAtIso));
  }

  /**
   * Publicar entrada: flujo completo
   * 1) Comprobar sesión (correo en userEmail / localStorage)
   * 2) Leer y recortar campos del formulario (createNombre, createPais, etc.)
   * 3) Validar en cliente (longitud + validarDatosAutor → esNombreValido, esPaisValido…)
   * 4) POST Conexion.crearEntradaBlog → server.js POST /api/blog → MySQL
   * 5) subscribe next: añadir fila a entradasBlog y mostrar detalle
   * 6) subscribe error: mensajeErrorHttp (400 validación, 500 SQL, 0 sin conexión)
   */
  public submitPost(): void {
    this.errorMsg = '';
    if (!this.isLoggedIn()) {
      this.errorMsg = 'Debes iniciar sesión con correo para publicar.';
      return;
    }

    // Campos enlazados con [(ngModel)] en blogs.html (formulario "Nueva publicación")
    const titulo = (this.createTitle ?? '').trim();
    const contenido = (this.createContent ?? '').trim();
    const nombre = (this.createNombre ?? '').trim();
    const primerapellido = (this.createPrimerApellido ?? '').trim();
    const segundoapellido = (this.createSegundoApellido ?? '').trim();
    // Normaliza espacios múltiples: "Costa   Rica" → "Costa Rica" (coherente con regex del país)
    const pais = (this.createPais ?? '').trim().replace(/\s+/g, ' ');

    // Validación rápida de título y contenido (el servidor también valida con express-validator)
    if (titulo.length < 3) {
      this.errorMsg = 'El título debe tener al menos 3 caracteres.';
      return;
    }
    if (contenido.length < 10) {
      this.errorMsg = 'El contenido debe tener al menos 10 caracteres.';
      return;
    }

    // Validación de autor: nombre/apellidos solo letras; país admite espacios entre palabras
    const errorDatosAutor = this.validarDatosAutor(
      nombre,
      primerapellido,
      segundoapellido,
      pais,
    );
    if (errorDatosAutor) {
      this.errorMsg = errorDatosAutor;
      return; // No se llama al API si falla aquí
    }

    this.publicando = true; // Deshabilita botón "Publicar" en la plantilla
    // Claves JSON alineadas con columnas MySQL (primerapellido, segundoapellido en minúsculas)
    this.Conexion.crearEntradaBlog({
      titulo,
      tipo: this.createType, // 'verso' | 'prosa' | 'reflexion' → el backend lo pasa a 0|1|2
      contenido,
      nombre,
      primerapellido,
      segundoapellido,
      pais,
      email: this.userEmail, // Correo guardado al hacer login(), no el del campo create
    }).subscribe({
      // Éxito: el servidor devuelve 201 y la fila insertada (SELECT * WHERE id = insertId)
      next: fila => {
        const nuevo = this.mapFilaABlogPost(fila); // JSON MySQL → interfaz BlogPost
        this.entradasBlog = [nuevo, ...this.entradasBlog]; // Lista en memoria sin recargar todo el GET
        this.publicando = false;
        // Limpia el formulario para la siguiente publicación
        this.createTitle = '';
        this.createType = 'reflexion';
        this.createContent = '';
        this.createNombre = '';
        this.createPrimerApellido = '';
        this.createSegundoApellido = '';
        this.createPais = '';
        this.applyFilters();
        this.openDetail(nuevo.id);
      },
      // HttpClient entra aquí con status 0, 400, 500… (no solo si el servidor está apagado)
      error: err => {
        this.publicando = false;
        this.errorMsg = this.mensajeErrorHttp(err);
      },
    });
  }

  public formatTypeLabel(t: BlogPostType): string {
    if (t === 'verso') return 'Verso';
    if (t === 'prosa') return 'Prosa';
    return 'Reflexión';
  }

  public formatDate(iso: string): string {
    try {
      const d = new Date(iso);
      return new Intl.DateTimeFormat('es-ES', {
        dateStyle: 'medium',
        //timeStyle: 'short',   //Se la quita la hora de publicacion
      }).format(d);
    } catch {
      return iso;
    }
  }

  public previewText(post: BlogPost): string {
    const raw = post.contenido.replace(/\s+/g, ' ').trim();
    return raw.length > 170 ? raw.slice(0, 170) + '…' : raw;
  }

  /**
   * Traduce el error del subscribe al mensaje rojo de la plantilla.
   * status 0 = servidor apagado o CORS/URL incorrecta.
   * status 400 = express-validator (errors[]) o mensaje { error: '...' } del INSERT.
   * status 500 = fallo MySQL (columna inexistente, BD caída, etc.).
   */
  private mensajeErrorHttp(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        return 'No se pudo conectar con el servidor. Comprueba que el backend esté activo (http://localhost:3000).';
      }
      const body = err.error as { errors?: { msg?: string; path?: string }[]; error?: string };
      if (body?.errors?.length) {
        const detalle = body.errors
          .map(e => `${e.path ?? 'campo'}: ${e.msg ?? 'inválido'}`)
          .join('; ');
        return `Datos no válidos: ${detalle}`;
      }
      if (typeof body?.error === 'string') {
        return body.error;
      }
      return `Error del servidor (código ${err.status}). Mira la consola de Node.js.`;
    }
    return 'No se pudo guardar la entrada.';
  }

  /**
   * Valida nombre, apellidos y país antes del POST.
   * Devuelve el mensaje de error o null si todo es correcto.
   */
  private validarDatosAutor(nombre: string, primerapellido: string, segundoapellido: string, pais: string): string | null 
  {
    if (!this.esNombreValido(nombre)) {
      return 'El nombre debe tener al menos 3 letras (solo letras, incluida la ñ).';
    }
    if (!this.esApellidoPrimeroValido(primerapellido)) {
      return 'El primer apellido debe tener al menos 3 letras (solo letras, incluida la ñ).';
    }
    if (!this.esApellidoSegundoValido(segundoapellido)) {
      return 'El segundo apellido debe tener al menos 3 letras (solo letras, incluida la ñ).';
    }
    if (!this.esPaisValido(pais)) {
      return 'El país debe tener al menos 3 caracteres, solo letras y espacios (p. ej. Costa Rica).';
    }
    return null;
  }

  private esCorreoValido(email: string): boolean {
    return /^[A-Za-z0-9._-]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/.test(email);
  }

  private esNombreValido(nombre: string): boolean {
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(nombre);
    return !((nombre.length > 0 && nombre.length < 3) || !soloLetras);
  }

  private esApellidoPrimeroValido(primerApellido: string): boolean {
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(primerApellido);
    return !((primerApellido.length > 0 && primerApellido.length < 3) || !soloLetras);
  }

  private esApellidoSegundoValido(segundoApellido: string): boolean {
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(segundoApellido);
    return !((segundoApellido.length > 0 && segundoApellido.length < 3) || !soloLetras);
  }

  /**
   * País: letras con tildes/ñ; una o más palabras separadas por un solo espacio.
   * Ejemplos válidos: "España", "Costa Rica", "Estados Unidos".
   * Inválido: "ES", "Costa1", "Costa  Rica" (doble espacio; submitPost ya normaliza antes).
   * Misma idea que body('pais').matches(...) en server.js.
   */
  private esPaisValido(pais: string): boolean {
    const letrasConEspacios =
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/.test(pais);
    return pais.length >= 3 && letrasConEspacios;
  }

  // Acceso a localStorage tolerante a modo privado o SSR
  private safeGet(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private safeSet(key: string, val: string): void {
    try {
      localStorage.setItem(key, val);
    } catch {
      // ignore
    }
  }

  private safeRemove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }
}
