import { Component, OnInit } from '@angular/core';
import { VariablesCompartidas } from '../../servicios/variablesCompartidas';

type PublicacionesPostType = 'verso' | 'prosa' | 'reflexion';

type PublicacionesPost = {
  id: string;
  title: string;
  type: PublicacionesPostType;
  content: string;
  authorEmail: string;
  createdAtIso: string;
};

@Component({
  selector: 'app-publicaciones',
  standalone: false,
  templateUrl: './publicaciones.html',
  styleUrl: './publicaciones.css',
})
export class Publicaciones implements OnInit {
  public matrizApartados= new VariablesCompartidas();
  private readonly storageKeyPosts = 'esf_blog_posts_v1';  //Clave para almacenar los posts en el almacenamiento local del navegador
  private readonly storageKeyUserEmail = 'esf_blog_user_email_v1';  //Clave para almacenar el correo del usuario en el almacenamiento local del navegador

  public userEmail = '';
  public emailInput = '';

  public view: 'list' | 'detail' | 'create' = 'list';
  public selectedPostId: string | null = null;

  public posts: PublicacionesPost[] = [];
  public filteredPosts: PublicacionesPost[] = [];

  public filterType: 'todos' | PublicacionesPostType = 'todos';
  public search = '';
  public filtradoVarCompartida=this.matrizApartados.menuPrincipal.getSubApartadoBlog();  
  //Variable para almacenar la selección del tipo de post desde la cabecera y variables compartidas

  public createTitle = '';
  public createType: PublicacionesPostType = 'reflexion';
  public createContent = '';

  public errorMsg = '';

  ngOnInit(): void {
    this.userEmail = this.safeGet(this.storageKeyUserEmail) ?? '';
    this.emailInput = this.userEmail;

    const existing = this.loadPosts();
    if (existing.length === 0) {
      this.posts = this.seedPosts();
      this.savePosts(this.posts);
    } else {
      this.posts = existing;
    }

    this.applyFilters();
  }

  //METODO PARA ABRIR LA VISTA DE LISTA DE POSTS, LIMPIANDO CUALQUIER MENSAJE DE ERROR PREVIO, RESETEANDO EL POST SELECCIONADO Y APLICANDO LOS FILTROS ACTUALES
  public openList(): void {
    this.errorMsg = '';
    this.view = 'list';
    this.selectedPostId = null;
    this.applyFilters();
  }

  //METODO PARA ABRIR LA VISTA DE DETALLE DE UN POST SELECCIONADO, RECIBIENDO EL ID DEL POST Y ASIGNÁNDOLO A LA PROPIEDAD CORRESPONDIENTE, Y LIMPIANDO CUALQUIER MENSAJE DE ERROR PREVIO
  public openDetail(postId: string): void {
    this.errorMsg = '';
    this.view = 'detail';
    this.selectedPostId = postId;
  }

  //METODO PARA OBTENER EL POST SELECCIONADO EN LA VISTA DE DETALLE, DEVOLVIENDO NULL SI NO HAY NINGUNO SELECCIONADO O SI NO SE ENCUENTRA
  public selectedPost(): PublicacionesPost | null {
    if (!this.selectedPostId) return null;
    return this.posts.find(p => p.id === this.selectedPostId) ?? null;
  }

  //METODO PARA APLICAR LOS FILTROS DE BÚSQUEDA Y TIPO DE POST, LIMPIANDO EL TEXTO DE BÚSQUEDA Y ORDENANDO LOS RESULTADOS POR FECHA DE CREACIÓN
  public applyFilters(): void {
    //Introducimos la selección del tipo de: 'verso', 'prosa', 'reflexion' viniendo desde la cabecera y variables compartidas
    const elegido= this.filtradoVarCompartida;
    const q = (this.search ?? '').trim().toLowerCase();
    const type = this.filterType;

    this.filteredPosts = this.posts
      .filter(p => (elegido==="" ? true : p.type===elegido))  //Primero se filtra por la selección del tipo de post hecha en la cabecera, si no hay ninguna selección se muestran todos los tipos
      .filter(p => (type === 'todos' ? true : p.type === type))  //Segundo se filtra por el selector de tipo de post en la propia vista, si se ha seleccionado un tipo específico se filtran solo los posts de ese tipo
      .filter(p => {
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.authorEmail.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => b.createdAtIso.localeCompare(a.createdAtIso));
    this.filtradoVarCompartida="";  //Se reinicia la variable para permitir una eleccion interna
  }
  //METODO PARA EL SELECTOR DE PROSA, VERSO O REFLEXIÓN
  public formatTypeLabel(t: PublicacionesPostType): string {
    if (t === 'verso') return 'Verso';
    if (t === 'prosa') return 'Prosa';
    return 'Reflexión';
  }

  //METODO PARA DEVOLVER LA FECHA EN FORMATO ISO Y EN ESPAÑOL
  public formatDate(iso: string): string {
    try {
      const d = new Date(iso);
      return new Intl.DateTimeFormat('es-ES', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(d);
    } catch {
      return iso;
    }
  }

  //METODO PARA LIMPIAR TEXTO CON ESPACIOS INLCUIDOS Y REDUCIR LA VISTA PREVIA A "... SI ES MUY LARGO
  public previewText(post: PublicacionesPost): string {
    const raw = post.content.replace(/\s+/g, ' ').trim();
    return raw.length > 170 ? raw.slice(0, 170) + '…' : raw;
  }

  //METODO PARA LIMPIAR LOS CAMPOS DE CREACIÓN DE POST
  private resetCreateForm(): void {
    this.createTitle = '';
    this.createType = 'reflexion';
    this.createContent = '';
  }

  //METODO PARA CARGAR LOS POSTS DESDE EL ALMACENAMIENTO LOCAL
  private loadPosts(): PublicacionesPost[] {
    const raw = this.safeGet(this.storageKeyPosts);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw) as PublicacionesPost[];
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        p =>
          p &&
          typeof p.id === 'string' &&
          typeof p.title === 'string' &&
          typeof p.content === 'string' &&
          typeof p.type === 'string' &&
          typeof p.authorEmail === 'string' &&
          typeof p.createdAtIso === 'string',
      );
    } catch {
      return [];
    }
  }

  //METODO PARA GUARDAR LOS POSTS EN EL ALMACENAMIENTO LOCAL CON TIPO DE DATO DEFINIDO Y CON MANEJO DE ERRORES
  private savePosts(posts: PublicacionesPost[]): void {
    this.safeSet(this.storageKeyPosts, JSON.stringify(posts));
  }

  //METODO PARA SEMBRAR LOS POSTS INICIALES CUANDO NO HAY NINGUNO GUARDADO, CON CONTENIDO DE EJEMPLO Y FECHAS RELATIVAS
  private seedPosts(): PublicacionesPost[] {
    const now = Date.now();
    return [
      {
        id: this.makeId(),
        title: 'Frontera de tinta',
        type: 'verso',
        content:
          'Cruzo la página,\\n' +
          'no por huir del mundo,\\n' +
          'sino por nombrarlo.\\n\\n' +
          'Y en cada palabra\\n' +
          'una casa posible\\n' +
          'para lo que duele.',
        authorEmail: 'equipo@esf.org',
        createdAtIso: new Date(now - 1000 * 60 * 60 * 28).toISOString(),
      },
      {
        id: this.makeId(),
        title: 'La prosa como refugio',
        type: 'prosa',
        content:
          'Escribir en prosa es permitir que la respiración encuentre su ritmo. ' +
          'No se trata de adornar, sino de sostener el sentido con claridad. ' +
          'Cuando la frase avanza, también avanza la posibilidad de comprender.\\n\\n' +
          'Publica aquí tus relatos, escenas, cartas o memorias: lo importante es la honestidad del tono.',
        authorEmail: 'equipo@esf.org',
        createdAtIso: new Date(now - 1000 * 60 * 60 * 10).toISOString(),
      },
      {
        id: this.makeId(),
        title: 'Una reflexión para hoy',
        type: 'reflexion',
        content:
          'A veces la frontera no está afuera, sino entre lo que pensamos y lo que nos animamos a decir. ' +
          'Escribir es tender un puente. Léenos, y si quieres, deja tu propia orilla.',
        authorEmail: 'equipo@esf.org',
        createdAtIso: new Date(now - 1000 * 60 * 50).toISOString(),
      },
    ];
  }

  //METODO PARA GENERAR UN ID ÚNICO PARA CADA POST, COMBINANDO UN PREFIJO, UNA PARTE ALEATORIA Y LA FECHA ACTUAL EN MILISEGUNDOS
  //LA RAZÓN DE CREAR UN ID ASÍ ES PARA ASEGURAR QUE CADA POST TENGA UN IDENTIFICADOR ÚNICO Y DIFERENTE, INCLUSO SI SE PUBLICAN VARIOS EN EL MISMO MOMENTO
  private makeId(): string {
    const palabra= 'p_' + Math.random().toString(16).slice(2) + '_' + Date.now().toString(16);
    return palabra;
  }

  //METODO PARA VALIDAR QUE EL CORREO INGRESADO TIENE UN FORMATO BÁSICO VÁLIDO, CON UNA EXPRESIÓN REGULAR SENCILLA
  private isValidEmail(email: string): boolean {
  return /^[A-Za-z0-9._-]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/.test(email);
  }

  //METODO PARA DEVOLVER EL VALOR DE UNA CLAVE EN EL ALMACENAMIENTO LOCAL, CON MANEJO DE ERRORES PARA EVITAR PROBLEMAS EN NAVEGADORES QUE NO LO SOPORTAN O EN MODO PRIVADO
  private safeGet(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  //METODO PARA GUARDAR UN VALOR EN EL ALMACENAMIENTO LOCAL, CON MANEJO DE ERRORES PARA EVITAR PROBLEMAS EN NAVEGADORES QUE NO LO SOPORTAN O EN MODO PRIVADO
  private safeSet(key: string, val: string): void {
    try {
      localStorage.setItem(key, val);
    } catch {
      // ignore
    }
  }

  //METODO PARA ELIMINAR UN VALOR DEL ALMACENAMIENTO LOCAL, CON MANEJO DE ERRORES PARA EVITAR PROBLEMAS EN NAVEGADORES QUE NO LO SOPORTAN O EN MODO PRIVADO
  private safeRemove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }
}
