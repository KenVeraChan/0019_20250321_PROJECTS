import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HEADER_CARGA_SECCION } from './estado-errores.service';

@Injectable({
  providedIn: 'root'
})
export class Conexion{
  private apiUrlApi:string[] = [
  'http://localhost:3000/api/noticias',
  'http://localhost:3000/api/historia',
  'http://localhost:3000/api/equipo',
  'http://localhost:3000/api/blog',
  'http://localhost:3000/api/servicios',
  'http://localhost:3000/api/publicaciones',
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
export class VariablesCompartidas {

  //VARIABLES COMPARTIDAS ENTRE COMPONENTES PARA LA CARGA DEL MENU DE OPCIONES 
  public menuPrincipal: Apartados=new Apartados();

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///// VARIABLES URLS DEL 1 APARTADO: AREA DE INICIO //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private URLnoticiaImagen:string="assets/images/inicio/imagenesInicio/";  //Esta variable se usa para verificar que la imagen de la noticia exista y esté en su directorio correspondiente, si no es así, no se muestra la imagen, y se muestra un mensaje de error en su lugar.
    private URLnoticiaAudio:string="assets/audios/inicio/audiosInicio/";  //Esta variable se usa para verificar que el audio de la noticia exista y esté en su directorio correspondiente, si no es así, no se muestra el audio, y se muestra un mensaje de error en su lugar.
    private URLnoticiaVideo:string="assets/videos/inicio/videosInicio/";  //Esta variable se usa para verificar que el video de la noticia exista y esté en su directorio correspondiente, si no es así, no se muestra el video, y se muestra un mensaje de error en su lugar.
      public getImagenNoticia(): string
      {
        return this.URLnoticiaImagen;
      }
      public getAudioNoticia(): string
      {
        return this.URLnoticiaAudio;
      }
      public getVideoNoticia(): string
      {
        return this.URLnoticiaVideo;
      }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///// VARIABLES URLS DEL 2 APARTADO: AREA NUESTRA HISTORIA /////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public punteroSeleccionador:number=0;   //VARIABLE AUXILIAR PARA SELECCIONAR UNA FECHA Y MES DE LA CLASE HISTORIAS
    
    // VARIABLE Y METODO PARA EL APARTADO: NUESTRA HISTORIA
    public setPunteroSeleccionador(puntero:number):void
    {
      this.punteroSeleccionador=puntero;
    }
    // VARIABLE Y METODO PARA EL APARTADO: LIBRO INTERACTIVO DENTRO DEL APARTADO: NUESTRA HISTORIA
    public getPunteroSeleccionador():number
    {
      return this.punteroSeleccionador;
    }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///// VARIABLES URLS DEL 3 APARTADO: AREA QUIENES SOMOS ////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // NO SE HA UTILIZADO NADA AL RESPECTO//

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///// VARIABLES URLS DEL 4 APARTADO: AREA BLOG LITERARIO ///////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //AREA DE PUBLICACIONES PARA EL APARTADO DE PUBLICACIONES
    public publicacionesPosteadas: publicaciones=new publicaciones();

}
class Apartados{
    public valorSubapartado:number=0;  //Para identificar que subapartado del blog se accionó, se inicializa con 0 porque es el valor que corresponde a "todos" en el caso del blog, y a "cursos" en el caso de servicios, que son los valores predeterminados.
    public subApartadoBlog:string="";  //Para identificar que subapartado del blog se accionó
    public subPartadosServicios:string="";  //Para identificar que subapartado de servicios se accionó, se inicializa con 5 espacios vacíos porque hay 5 subapartados, luego se irán rellenando según la elección del usuario.
    public matrizApartados: string[]= ["INICIO","NUESTRA HISTORIA","QUIENES SOMOS","BLOG LITERARIO","NUESTROS SERVICIOS","PUBLICACIONES","CONTACTO"];
    public subApartadosBlog: string[]= ["PROSA","VERSO","REFLEXIONES"];
    public enlacesBlogLiterario: string[]= ["PUBLICACIONES EN PROSA","PUBLICACIONES EN VERSO","REFLEXIONES DEL DÍA"];
    public enlacesServicios: string[]= ["CURSOS ONLINE","ENTREVISTAS ONLINE","EDICIÓN Y MAQUETACIÓN DE LIBROS","TERTULIAS POR LA MARCA","CONGRESOS INTERNACIONALES PROGRAMADOS","FERIAS DEL LIBRO E.S.F."];
    public subApartadosServicios: string[]= ["CURSOS","ENTREVISTAS","EDICIONES","TERTULIAS","CONGRESOS","FERIAS"];
    
    //Hemos definido las variables que se usarán en el menú de opciones
    public constructor()
    {
      //El constructor no solicita nada porque simplemente es de lectura o escritura de las variables, no se necesita instanciar nada, se accede directamente a las variables públicas.
    }
    public getMatrizApartados():string[]
    {
      return this.matrizApartados;
    }
    public getEnlacesBlogLiterario():string[]
    {
      return this.enlacesBlogLiterario;
    }
    public getEnlacesServicios():string[]
    {
      return this.enlacesServicios;
    }
    public getSubApartadosBlog():string[]
    {
      return this.subApartadosBlog;
    }
    public setSubApartadosBlog(eleccion: number):void   //Identifica qué subapartado fue accionado
    {
      switch(eleccion)
      {
        case 1:
          {
            this.subApartadoBlog='prosa';
            break;
          }
        case 2:
          {
            this.subApartadoBlog='verso';
            break;
          }
        case 3:
          {
            this.subApartadoBlog='reflexion';
            break;
          }
        default:
          {
            this.subApartadoBlog='';
            break;
          }
      }
          if (typeof window !== 'undefined' && window.localStorage)
          {
            //En resumen: no es un fallo de TypeScript, es que localStorage solo está disponible en el navegador
            // y el método se está ejecutando en un entorno donde no lo está.
            localStorage.setItem('selectedPostEleccion', this.subApartadoBlog);
              this.valorSubapartado=3;  //Se asigna el valor 3 (Comenzando desde 0 para esta variable) a la variable auxiliar para indicar que se ha seleccionado un subapartado específico del blog, y no "todos", que es el valor predeterminado.
            localStorage.setItem('punteroCabecera', this.valorSubapartado.toString());  //Y también se usa para el cambio de pagina
            window.location.assign('/blogLiterario');
          }      //Se guarda la selección en localStorage para que
      //Se guarda la selección en localStorage para que
      // el componente Blogs pueda acceder a ella y filtrar los posts según la elección del usuario en la cabecera.
    }
    public getSubApartadoBlog():string
    {
        if (typeof window === 'undefined' || !window.localStorage)
        {
          //En resumen: no es un fallo de TypeScript, es que localStorage solo está disponible en el navegador
          // y el método se está ejecutando en un entorno donde no lo está.
            return 'todos'; // Valor predeterminado si no se puede acceder a localStorage
        }
      //Recupera el valor almacenado en localstorage
      const saveEleccion = localStorage.getItem('selectedPostEleccion');
      return saveEleccion ? saveEleccion : 'todos';
    }
    public setSubApartadosServicios(eleccion: number):void   //Identifica qué subapartado fue accionado
    {
      switch(eleccion)
      {
        case 1:
          {
            this.subPartadosServicios='cursos';
            break;
          }
        case 2:
          {
            this.subPartadosServicios='entrevistas';
            break;
          }
        case 3:
          {
            this.subPartadosServicios='ediciones';
            break;
          }
        case 4:
          {
            this.subPartadosServicios='tertulias';
            break;
          }
        case 5:
          {
            this.subPartadosServicios='congresos';
            break;
          }
        case 6:
          {
            this.subPartadosServicios='ferias';
            break;
          }
        default:
          {
            this.subPartadosServicios='';
            break;
          }
      }
        if (typeof window !== 'undefined' && window.localStorage)
          {
            //En resumen: no es un fallo de TypeScript, es que localStorage solo está disponible en el navegador
            // y el método se está ejecutando en un entorno donde no lo está.
          localStorage.setItem('selectedServicioEleccion', this.subPartadosServicios);
              this.valorSubapartado=4;  //Se asigna el valor 4 (Comenzando desde 0 para esta variable) a la variable auxiliar para indicar que se ha seleccionado un subapartado específico del servicios, y no "cursos", que es el valor predeterminado.
          localStorage.setItem('punteroCabecera', this.valorSubapartado.toString());  //Y también se usa para el cambio de pagina
          window.location.assign('/nuestrosServicios');
          }      //Se guarda la selección en localStorage para que
      // el componente Servicios pueda acceder a ella y filtrar los servicios según la elección del usuario en la cabecera.
      this.notificarCambioFiltroServicios();
    }
    /** Al pulsar el apartado principal «Nuestros servicios», se muestran todas las tarjetas. */
    public limpiarFiltroServicios(): void {
      this.subPartadosServicios = '';
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('selectedServicioEleccion', '');
      }
      this.notificarCambioFiltroServicios();
    }

    private notificarCambioFiltroServicios(): void {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('esf-servicios-filtro'));
      }
    }
    public getSubApartadosServiciosMenu(): string[]
    {
      return this.subApartadosServicios;
    }
    public getSubApartadosServicios():string
    {
        if (typeof window === 'undefined' || !window.localStorage)
        {
        return '';
        }
      //Recupera el valor almacenado en localstorage
      const saveEleccionServicios = localStorage.getItem('selectedServicioEleccion');
      return saveEleccionServicios ? saveEleccionServicios : '';
    }
}
export class Noticias
{
    private titular:string="";
    private subTitular:string="";
    private fecha: string="";
    private imagen:string="";
    private audio:string="";
    private video:string="";
    private noticia:string="";

    constructor(titular:string, subTitular:string, fecha:string, imagen:string, audio:string, video:string, noticia:string){
        this.titular=titular;
        this.subTitular=subTitular;
        this.fecha=fecha;
        this.imagen=imagen;
        this.audio=audio;
        this.video=video;
        this.noticia=noticia;
    }
    public getTitular():string{
        return this.titular;
    }
    public getsubTitular():string{
        return this.subTitular;
    }
    public getNoticia():string{
        return this.noticia;
    }
    public getFecha():string{
        return this.fecha;
    }
    public getImagen():string{
        return this.imagen;
    }
    public getAudio():string{
        return this.audio;
    }
    public getVideo():string{
        return this.video;
    }
}
export class Historias
{
    private id:number=0.0;
    private mes: number=0; //Luego se convertirá en el nombre del mes según numero incluido
    private anio:string="";
    private contenido: string="";
    private mesTexto: string="";
    public aniosFiltrados:string[]=[];

    constructor(id:number,mes: number,anio: string,contenido:string)
    {
      this.id=id;
      this.mes=mes;
      this.anio=anio;
      this.contenido=contenido;
    }
    public setId(id:number):void
    {
      this.id=id;
    }
    public setMes(mes:number):void
    {
      this.mes=mes;
    }
    public setMesTexto(mes:string):void
    {
      this.mesTexto=mes;
    }
    public setAnio(anio:string):void
    {
      this.anio=anio;
    }
    public setContenido(contenido:string):void
    {
      this.contenido=contenido;
    }
    public getId():number{
        return this.id;
    }
    public getAnio():string
    {
      return this.anio;
    }
    public getMes():string
    {
      switch(this.mes)
      {
        case 1:
          {
            this.mesTexto="ENERO";
            break;
          }
        case 2:
          {
            this.mesTexto="FEBRERO";
            break;
          }
        case 3:
          {
            this.mesTexto="MARZO";
            break;
          }
        case 4:
          {
            this.mesTexto="ABRIL";
            break;
          }
        case 5:
          {
            this.mesTexto="MAYO";
            break;
          }
        case 6:
          {
            this.mesTexto="JUNIO";
            break;
          }
        case 7:
          {
            this.mesTexto="JULIO";
            break;
          }
        case 8:
          {
            this.mesTexto="AGOSTO";
            break;
          }
        case 9:
          {
            this.mesTexto="SEPTIEMBRE";
            break;
          }
        case 10:
          {
            this.mesTexto="OCTUBRE";
            break;
          }
        case 11:
          {
            this.mesTexto="NOVIEMBRE";
            break;
          }
        case 12:
          {
            this.mesTexto="DICIEMBRE";
            break;
          }
        default:
          {
            this.mesTexto="ERROR - REVISE EL MES";
            break;
          }
      }
    return this.mesTexto;
    }
    public getMesTexto():string
    {
      return this.mesTexto;
    }
    public getContenido():string
    {
      return this.contenido;
    }
}
export class QuienesSomos{
  /*RECOGIDO DE LA BBDD ESTRATEGICA*/
    private id:number=0;
    private nombre:string="";
    private apellidos:string="";
    private nacionalidad:string="";
    private profesion:string="";
    private biografia:string="";
    private imagen:string="";

    constructor(id:number, nombre:string, apellidos:string, nacionalidad:string, profesion:string, biografia:string, imagen:string){
        this.id=id;
        this.nombre=nombre;
        this.apellidos=apellidos;
        this.nacionalidad=nacionalidad;
        this.profesion=profesion;
        this.biografia=biografia;
        this.imagen=imagen;
    }
    public getId():number
    {
      return this.id;
    }
    public getNombre():string
    {
      return this.nombre;
    }
    public getApellidos():string
    {
      return this.apellidos;
    }
    public getNacionalidad():string
    {
      return this.nacionalidad;
    }
    public getProfesion():string
    {
      return this.profesion;
    }
    public getBiografia():string
    {
      return this.biografia;
    }
    public getImagen():string
    {
      return this.imagen;
    }
    public setId(id:number):void
    {
      this.id=id;
    }
    public setNombre(nombre:string):void
    {
      this.nombre=nombre;
    }
    public setApellidos(apellidos:string):void
    {
      this.apellidos=apellidos;
    }
    public setNacionalidad(nacionalidad:string):void
    {
      this.nacionalidad=nacionalidad;
    }
    public setProfesion(profesion:string):void
    {
      this.profesion=profesion;
    }
    public setBiografia(biografia:string):void
    {
      this.biografia=biografia;
    }
    public setImagen(imagen:string):void
    {
      this.imagen=imagen;
    }
}
export class ImagenesExtra
{
  private quienesSomosImagen:string="";
  constructor()
  {
    //No se instancia nada, solo se lee de una variable
  }
  public getImagenEquipo(): string
  {
    return this.quienesSomosImagen="assets/images/equipoESF/imagenEquipo.png";
  }
  public getImagenLibro():string
  {
    return this.quienesSomosImagen="assets/images/equipoESF/libro.png";
  }
}
//Tanto el BLOG como las PUBLICACIONES NO comparten el mismo modelo de datos

//el de BLOG se llama BlogPost, aunque ambos tienen la misma estructura, 
//se han diferenciado para tener una mayor claridad en el código, y para poder 
//hacer modificaciones futuras en cada uno de ellos sin afectar al otro, aunque 
//por ahora son SIMILARES.
export type BlogPostType = 'verso' | 'prosa' | 'reflexion';

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

//el de SERVICIOS se llama BlogPost, aunque ambos tienen la misma estructura, 
//se han diferenciado para tener una mayor claridad en el código, y para poder 
//hacer modificaciones futuras en cada uno de ellos sin afectar al otro, aunque 
//por ahora son SIMILARES.
export type ServiciosTypeId = 'cursos' | 'entrevistas' | 'ediciones' | 'tertulias' | 'congresos' | 'ferias';
export type ServiciosTypeTitulo = 'Cursos' | 'Entrevistas' | 'Ediciones' | 'Tertulias' | 'Congresos' | 'Ferias';

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

//el de PUBLICACIONES se llama PublicacionesPost 
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
//De la base de datos futura, pero se incluye aquí para tener un modelo de 
//datos claro y poder trabajar con él en el componente de publicaciones.
export class publicaciones implements PublicacionesPost {
  public id: string="";
  public title: string="";
  public type: PublicacionesPostType="novela ciencia ficción";
  public content: string="";
  public authorEmail: string="";
  public createdAtIso: string="";
  public fotoLibroTitulo: string="";
  public audioLibroTitulo: string="";
  public videoCortoTitulo: string="";
  public fotoLibro: string=""; //Se incluye un campo de foto de libro para las publicaciones, aunque no todas las publicaciones lo tendrán, se deja la posibilidad abierta para futuras modificaciones en el tipo de publicaciones.
  public audio: string=""; //Se incluye un campo de audio para las reflexiones, aunque no todas las publicaciones lo tendrán, se deja la posibilidad abierta para futuras modificaciones en el tipo de publicaciones. 
  public videoCorto:string=""; //Se incluye un campo de video corto para las publicaciones, aunque no todas las publicaciones lo tendrán, serán BOOKTRAILERS de los libros, se deja la posibilidad abierta para futuras modificaciones en el tipo de publicaciones.

  public PublicacionesPostTypeArray: string[]=[
    'novela histórica',
    'novela ciencia ficción',
    'novela fantasía',
    'novela negra y policíaca',
    'novela romántica',
    'novela de terror',
    'novela de humor',
    'novela de aventuras',
    'novela de misterio',
    'novela de realismo mágico',
    'novela realista',
    'novela experimental',
    'novela gráfica',
    'novela juvenil',
    'novela infantil',
    'novela distópica',
    'novela de época',
    'novela epistolar',
    'novela de formación',
    'novela de autoayuda'
    ];

  constructor()
  {
    //No precisa de instanciar nada
  }

  public generoPublicacion(eleccion:number):string 
  {
    //Rellena el array de tipos de publicaciones, aunque en este caso se 
    //podría hacer directamente con un array de strings, pero se ha hecho así 
    //para tener una mayor claridad en el código y para poder hacer modificaciones 
    //futuras en el tipo de publicaciones sin afectar al resto del código.
    return this.PublicacionesPostTypeArray[eleccion];
  }
}
