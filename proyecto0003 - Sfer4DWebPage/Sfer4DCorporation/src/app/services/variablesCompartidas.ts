import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { HEADER_CARGA_SECCION } from './estado-errores.service';

@Injectable({
  providedIn: 'root'
})
export class Conexion{
  private apiUrlApi:string[] = [
  'http://localhost:3000/api/inicio',
  'http://localhost:3000/api/historia',
  'http://localhost:3000/api/productos',
  'http://localhost:3000/api/servicios',
  'http://localhost:3000/api/proyectos',
  'http://localhost:3000/api/cliente',
  'http://localhost:3000/api/contacto'];  //CAMBIAR URL en produccion

  constructor(private http: HttpClient){}
  public getAutores(eleccion:number): Observable<any[]> {
    let headers = new HttpHeaders();
    // Inicio (noticias): fallo parcial; el resto de secciones bloquean la vista si falla la carga.
    if (eleccion !== 0) {
      headers = headers.set(HEADER_CARGA_SECCION, '1');
    }
    return this.http.get<any[]>(this.apiUrlApi[eleccion], { headers });
    //Esto devuelve un Observable que se suscribe en el componente para obtener los datos de la BBDD, el eleccion se corresponde con el indice del array de URLs, que a su vez se corresponde con el indice del array de apartados, por lo que es una forma de centralizar las URLs y evitar tener que escribirlas en cada componente, además de facilitar su mantenimiento y actualización.
  }
  /**
   * Inserta una fila en la tabla blog (POST). Lo invoca blogs.ts → submitPost() tras validar en cliente.
   * Par de estudio: server.js app.post('/api/blog') y blogs.ts subscribe({ next, error }).
   */
  public crearEntradaBlog(entrada: {
    titulo: string; // → columna titulo
    tipo: BlogPostType; // → columna tipo (0|1|2 vía tipoBlogToInt en el servidor)
    contenido: string; // → columna contenido
    nombre: string; // → columna nombre (solo letras en validación Angular)
    primerapellido: string; // → columna primerapellido (minúsculas = nombre en JSON y BD)
    segundoapellido: string; // → columna segundoapellido
    pais: string; // → columna pais (letras y espacios, p. ej. "Costa Rica")
    email: string; // → columna email (isEmail en servidor)
    fecha?: string; // → columna fecha; opcional, el servidor pone hoy si falta
  }): Observable<Record<string, unknown>> {
    // HttpClient serializa "entrada" a JSON y envía Content-Type: application/json
    return this.http.post<Record<string, unknown>>(
      this.apiUrlApi[3], // 'http://localhost:3000/api/blog' — índice 3 = apartado blog en el menú
      entrada, // Cuerpo POST; debe coincidir con body('...') en server.js
    );
  }
  public getURLAPI(indice:number):string
  {
    return this.apiUrlApi[indice];
  }
}
@Injectable({ providedIn: 'root' })
export class VariablesCompartidas {

  //VARIABLES COMPARTIDAS ENTRE COMPONENTES PARA LA CARGA DEL MENU DE OPCIONES
  private eleccion$ = new BehaviorSubject<number>(0); // 0=Inicio ... 6=Contacto

  public setEleccion(valor: number): void {
    this.eleccion$.next(valor);
  }

  /** Devuelve el observable para suscribirse o usar `| async` en plantillas */
  public getEleccion$(): Observable<number> {
    return this.eleccion$.asObservable();
  }

  /** Acceso síncrono al valor actual si es necesario */
  public getEleccion(): number {
    return this.eleccion$.getValue();
  }
}

export type ServiciosTypeId = 'cursos' | 'entrevistas' | 'ediciones' | 'tertulias' | 'congresos' | 'ferias';
export type ServiciosTypeTitulo = 'Cursos' | 'Entrevistas' | 'Ediciones' | 'Tertulias' | 'Congresos' | 'Ferias';
export type BlogPostType = 'verso' | 'prosa' | 'reflexion';
export type PublicacionesPostType =
'todos' |
'novela histórica' |
'novela ciencia ficción' |
'novela fantasía' |
'novela negra y policíaca' |
'novela romántica' |
'novela de terror' |
'novela de humor' |
'novela de aventuras' |
'novela de misterio' |
'novela de realismo mágico' |
'novela realista' |
'novela experimental' |
'novela gráfica' |
'novela juvenil' |
'novela infantil' |
'novela distópica'|
'novela de época' |
'novela epistolar'|
'novela de formación' |
'novela de autoayuda';

export interface BlogPost {
  id: string;
  titulo: string;
  tipo: BlogPostType;
  contenido: string;
  nombre: string,
  primerapellido: string,
  segundoapellido: string,
  pais: string,
  authorEmail: string;
  createdAtIso: string;
};

export interface ServiciosOfrecidos {
  idservicio: ServiciosTypeId;
  tituloservicio: ServiciosTypeTitulo;
  descripcionservicio: string;
  subtitulo:string;
  subdescripcion:string;
  imagenservicio:string;
  audioservicio:string;
  videoservicio:string;
};

export type PublicacionesPost = {
  id: string;
  title: string;
  type: PublicacionesPostType;
  content: string;
  authorEmail: string;
  createdAtIso: string;
  fotoLibroTitulo: string;
  fotoLibro: string;
  audioLibroTitulo: string;
  audio: string;
  videoCortoTitulo: string;
  videoCorto: string
};