import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { HEADER_CARGA_SECCION } from './estado-errores.service';
import { environment } from '../../environments/environments';  //Importa las variables de entorno desde el archivo environment.ts

@Injectable({
  providedIn: 'root'
})
export class Conexion{
  private apiUrlApi:string[] = [
  `${environment.apiUrl}/inicio`,
  `${environment.apiUrl}/historia`,
  `${environment.apiUrl}/productos`,
  `${environment.apiUrl}/servicios`,
  `${environment.apiUrl}/proyectos`,
  `${environment.apiUrl}/cliente`,
  `${environment.apiUrl}/contacto`];  //CAMBIAR URL en produccion

  constructor(private http: HttpClient){}
  public getInformacion(eleccion:number): Observable<any[]> {
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
  public enlaceSlider():string
  {
    return "assets/001_paginaPrincipal/sliderImages/";
  }
}
// CREAR CLASES PARA CADA UNO DE LAS CONSULTAS A LA BBDD, PARA QUE PUEDAN SER UTILIZADAS EN CUALQUIER COMPONENTE DE LA APLICACION, EVITANDO ASI TENER QUE DECLARARLAS EN CADA COMPONENTE, Y FACILITANDO SU MANTENIMIENTO Y ACTUALIZACION.
//  inicio
//  historia                                                                                                                                    /* CONSULTA: select * from historias; */
//  productos 
//  servicios
//  proyectos
//  loginclientes 
//  loginjefes
//  loginrrhh 
//  gestionpeticiones
//  gestiongannt 
//  empleados 
//  candidaturas 
//  carritocompra
//  pedidoscompra 
//  datosbancarios 
//  imagenesfondos


//Aqui se exportarán todas las variables compartidas entre componentes, para que puedan ser utilizadas en cualquier componente de la aplicación, evitando así tener que declararlas en cada componente, y facilitando su mantenimiento y actualización.
// 1) CONSULTA SOBRE LA BBDD: bbdd001_jefes_rrhh
export class inicio {
    private id:number=0;
    private nombre:string="";
    private tipo:string="";
    private tamanio:number=0;
    private destino:string="";
    private sector:string="";
    private stock:string="";
    private coste:number=3.5;
    private detalles:string="";

  constructor(id:number,nombre:string,tipo:string,tamanio:number,destino:string,sector:string,stock:string,coste:number,detalles:string){
    this.id=id;
    this.nombre=nombre;
    this.tipo=tipo;
    this.tamanio=tamanio; 
    this.coste=coste;
    this.destino=destino;
    this.sector=sector;
    this.stock=stock;
    this.detalles=detalles;
  }

  public setId(id:number):void{
    this.id=id;
  }
  public getId():number{
    return this.id;
  }
  public setNombre(nombre:string):void{
    this.nombre=nombre;
  } 
  public getNombre():string{
    return this.nombre;
  } 
  public setTipo(tipo:string):void{
    this.tipo=tipo;
  } 
  public getTipo():string{
    return this.tipo;
  } 
  public setTamanio(tamanio:number):void{
    this.tamanio=tamanio;
  } 
  public getTamanio():number{
    return this.tamanio;
  } 
  public setDestino(destino:string):void{
    this.destino=destino;
  } 
  public getDestino():string{ 
    return this.destino;
  }
  public setSector(sector:string):void{
    this.sector=sector;
  }
  public getSector():string{
    return this.sector;
  } 
  public setStock(stock:string):void{
    this.stock=stock;
  } 
  public getStock():string{
    return this.stock;
  } 
  public setCoste(coste:number):void{
    this.coste=coste;
  }
  public getCoste():number{
    return this.coste;
  }   
  public setDetalles(detalles:string):void{
    this.detalles=detalles;
  }
  public getDetalles():string{
    return this.detalles; 
  }
}
// 2) CONSULTA SOBRE LA BBDD: bbdd002_empleados 
export class historia {

}
// 3) CONSULTA SOBRE LA BBDD: bbdd003_clientes
export class clientes {

}
// 4) CONSULTA SOBRE LA BBDD: bbdd004_paginas
export class paginas {

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



