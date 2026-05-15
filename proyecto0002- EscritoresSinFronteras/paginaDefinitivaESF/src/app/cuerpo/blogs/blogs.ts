import { Component, OnInit } from '@angular/core';
import { blogs, VariablesCompartidas, Conexion, ImagenesExtra } from '../../servicios/variablesCompartidas';
import { BlogPost, BlogPostType } from '../../servicios/variablesCompartidas';

@Component({
  selector: 'app-blogs',
  standalone: false,
  templateUrl: './blogs.html',
  styleUrl: './blogs.css',
})
export class Blogs implements OnInit {
  public matrizApartados= new VariablesCompartidas();
  private readonly storageKeyPosts = 'esf_blog_posts_v1';
  private readonly storageKeyUserEmail = 'esf_blog_user_email_v1';
  public datosJsonBlog: any;

  public userEmail = '';
  public emailInput = '';

  public view: 'list' | 'detail' | 'create' = 'list';
  public selectedPostId: string | null = null;

  public posts: BlogPost[] = [];
  public filteredPosts: BlogPost[] = [];
  public blogRecibido: any[]=[];

  public filterType: 'todos' | BlogPostType = 'todos';
  public search = '';
  public filtradoVarCompartida=this.matrizApartados.menuPrincipal.getSubApartadoBlog();  
  //Variable para almacenar la selección del tipo de post desde la cabecera y variables compartidas

  public createTitle = '';
  public createType: BlogPostType = 'reflexion';
  public createContent = '';

  public errorMsg = '';
  // Almacena el ancho actual de la ventana del navegador en píxeles
  public tamanioHorizontalPantalla = 0;

  constructor(private Conexion: Conexion){}

  ngOnInit(): void {

    // Llama al servicio HTTP para obtener los datos de historias desde el backend (índice 1 = tabla de historias)
    this.Conexion.getAutores(3).subscribe(data => {
          this.blogRecibido = [];
          data.forEach(a => {
            const historia = new blogs(
                a.id,
                a.titulo,
                a.tipo,
                a.contenido,
                a.authorEmal,
                a.createdAtIso);
        this.blogRecibido.push(historia);
        }
      );
    });

    //IMPORTANTE: Variable para acceder a los datos JSON de publicaciones desde las variables compartidas
    this.datosJsonBlog= this.blogRecibido;

    // Obtiene el ancho inicial de la ventana (o 1200 por defecto si no hay objeto window, ej: SSR)
    this.tamanioHorizontalPantalla = typeof window !== 'undefined' ? window.innerWidth : 1200;

    //ALMACENAMIENTO DE DATOS EN EL ALMACENAMIENTO LOCAL

    this.userEmail = this.safeGet(this.storageKeyUserEmail) ?? '';
    this.emailInput = this.userEmail;

    const existing = this.loadPosts();
    if (existing.length === 0) {
      this.posts = this.datosJsonBlog;
      this.savePosts(this.posts);
    } else {
      this.posts = existing;
    }

    this.applyFilters();
  }

  //METODO PARA VERIFICAR SI EL USUARIO ESTÁ LOGUEADO, COMPROBANDO QUE EL CORREO GUARDADO EN LA PROPIEDAD userEmail ES VÁLIDO CON EL MÉTODO isValidEmail
  public isLoggedIn(): boolean {
    return this.isValidEmail(this.userEmail);
  }

  //MTODO PARA INICIAR SESIÓN, VERIFICANDO QUE EL CORREO INGRESADO ES VÁLIDO Y GUARDÁNDOLO EN EL ALMACENAMIENTO LOCAL, O MOSTRANDO UN MENSAJE DE ERROR SI NO LO ES
  public login(): void {
    this.errorMsg = '';
    const email = (this.emailInput ?? '').trim().toLowerCase();
    if (!this.isValidEmail(email)) {
      this.errorMsg = 'Ingresa un correo válido para publicar.';
      return;
    }
    this.userEmail = email;
    this.safeSet(this.storageKeyUserEmail, email);
    this.view = 'create';
  }

  //METODO PARA CERRAR SESIÓN, LIMPIANDO EL CORREO GUARDADO Y CAMBIANDO A LA VISTA DE LISTA SI ESTÁ EN LA VISTA DE CREACIÓN
  public logout(): void {
    this.userEmail = '';
    this.emailInput = '';
    this.safeRemove(this.storageKeyUserEmail);
    if (this.view === 'create') this.view = 'list';
  }

  //METODO PARA ABRIR LA VISTA DE CREACIÓN DE POST, VERIFICANDO PRIMERO SI EL USUARIO ESTÁ LOGUEADO Y MOSTRANDO UN MENSAJE DE ERROR SI NO LO ESTÁ, O CAMBIANDO A LA VISTA DE LISTA SI INTENTA ACCEDER SIN INICIAR SESIÓN
  public openCreate(): void {
    this.errorMsg = '';
    if (!this.isLoggedIn()) {
      this.view = 'list';
      return;
    }
    this.view = 'create';
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
  public selectedPost(): BlogPost | null {
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

  //METODO PARA VERIFICAR Y PERMITIR PUBLICAR CUANDO SE HA COMPROBADO QUE SI HAY CORREO CORRECTO VERIFICADO
  public submitPost(): void {
    this.errorMsg = '';
    if (!this.isLoggedIn()) {
      this.errorMsg = 'Debes iniciar sesión con correo para publicar.';
      return;
    }

    const title = (this.createTitle ?? '').trim();
    const content = (this.createContent ?? '').trim();

    if (title.length < 3) {
      this.errorMsg = 'El título debe tener al menos 3 caracteres.';
      return;
    }
    if (content.length < 10) {
      this.errorMsg = 'El contenido debe tener al menos 10 caracteres.';
      return;
    }

    const nowIso = new Date().toISOString();
    const post: BlogPost = {
      id: this.makeId(),
      title,
      type: this.createType,
      content,
      authorEmail: this.userEmail,
      createdAtIso: nowIso,
    };

    this.posts = [post, ...this.posts];
    this.savePosts(this.posts);
    this.resetCreateForm();
    this.applyFilters();
    this.openDetail(post.id);
  }

  //METODO PARA EL SELECTOR DE PROSA, VERSO O REFLEXIÓN
  public formatTypeLabel(t: BlogPostType): string {
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
  public previewText(post: BlogPost): string {
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
  private loadPosts(): BlogPost[] {
    try {
      const parsed = this.datosJsonBlog as BlogPost[];
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
  private savePosts(posts: BlogPost[]): void {
    this.safeSet(this.storageKeyPosts, JSON.stringify(posts));
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
