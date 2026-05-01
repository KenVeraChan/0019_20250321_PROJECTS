import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariablesCompartidas {

  public punteroSeleccionador:number=0;   //VARIABLE AUXILIAR PARA SELECCIONAR UNA FECHA Y MES DE LA CLASE HISTORIAS
  constructor()
  {
    //No precisa de instanciar nada
  }
  //VARIABLES PARA EL APARTADO DE HISTORIAS PUNTUALMENTE
  public setPunteroSeleccionador(puntero:number):void
  {
    this.punteroSeleccionador=puntero;
  }
  public getPunteroSeleccionador():number
  {
    return this.punteroSeleccionador;
  }

      //VARIABLES COMPARTIDAS ENTRE COMPONENTES
      public menuPrincipal: Apartados=new Apartados();
      //AREA NOTICIAS DEL APARTADO "INICIO"
      public noticia:Noticias[]=[
          new Noticias(
          "Titular de la noticia",
          "Subtítulo de la noticia",
          "Contenido detallado de la noticia que proporciona información relevante sobre el tema tratado."
          ),
          new Noticias(
                "Segundo titular de la noticia",
                "Segundo subtítulo de la noticia",
                "Contenido detallado del segundo noticia que proporciona información relevante sobre el tema tratado. Contenido detallado del segundo noticia que proporciona información relevante sobre el tema tratado. Contenido detallado del segundo noticia que proporciona información relevante sobre el tema tratado. Contenido detallado del segundo noticia que proporciona información relevante sobre el tema tratado.Contenido detallado del segundo noticia que proporciona información relevante sobre el tema tratado."
            ),
          new Noticias(
                "Tercer titular de la noticia",
                "Tercer subtítulo de la noticia",
                "Contenido detallado del tercer noticia que proporciona información relevante sobre el tema tratado."
            ),
          new Noticias(
                "Cuarto titular de la noticia",
                "Cuarto subtítulo de la noticia",
                "Contenido detallado del cuarto noticia que proporciona información relevante sobre el tema tratado."
            ),
          new Noticias(
                "Quinto titular de la noticia",
                "Quinto subtítulo de la noticia",
                "Contenido detallado del quinto noticia que proporciona información relevante sobre el tema tratado."
            ),
          new Noticias(
                "Sexto titular de la noticia",
                "Sexto subtítulo de la noticia",
                "Contenido detallado del sexto noticia que proporciona información relevante sobre el tema tratado."
            ),
          new Noticias(
                "Séptimo titular de la noticia",
                "Séptimo subtítulo de la noticia",
                "Contenido detallado del séptimo noticia que proporciona información relevante sobre el tema tratado."
            ),
          new Noticias(
                "Octavo titular de la noticia",
                "Octavo subtítulo de la noticia",
                "Contenido detallado del octavo noticia que proporciona información relevante sobre el tema tratado."
            ),
          new Noticias(
                "Noveno titular de la noticia",
                "Noveno subtítulo de la noticia",
                "Contenido detallado del noveno noticia que proporciona información relevante sobre el tema tratado."
            ),
          new Noticias(
                "Décimo titular de la noticia",
                "Décimo subtítulo de la noticia",
                "Contenido detallado del décimo noticia que proporciona información relevante sobre el tema tratado."
            ),
          new Noticias(
                "Décimo titular de la noticia",
                "Décimo subtítulo de la noticia",
                "Contenido detallado del décimo noticia que proporciona información relevante sobre el tema tratado."
            ),
          new Noticias(
                "Décimo titular de la noticia",
                "Décimo subtítulo de la noticia",
                "Contenido detallado del décimo noticia que proporciona información relevante sobre el tema tratado."
            ),
          new Noticias(
                "Décimo titular de la noticia",
                "Décimo subtítulo de la noticia",
                "Contenido detallado del décimo noticia que proporciona información relevante sobre el tema tratado."
            ),
          new Noticias(
                "Décimo titular de la noticia",
                "Décimo subtítulo de la noticia",
                "Contenido detallado del décimo noticia que proporciona información relevante sobre el tema tratado."
            ),
          new Noticias(
                "Décimo titular de la noticia",
                "Décimo subtítulo de la noticia",
                "Contenido detallado del décimo noticia que proporciona información relevante sobre el tema tratado."
            ),
          new Noticias(
                "Décimo titular de la noticia",
                "Décimo subtítulo de la noticia",
                "Contenido detallado del décimo noticia que proporciona información relevante sobre el tema tratado."
            )
      ];
      //AREA HISTORIAS DEL APARTADO "NUESTRA HISTORIA"
      public historias: Historias[]=[
        new Historias(0,9,"2005","Inicio en un grupo de escritura y lectura online"),
        new Historias(0,9,"2005","Inicio en un grupo de escritura y lectura online"),
        new Historias(0,9,"2005","Inicio en un grupo de escritura y lectura online"),
        new Historias(0,9,"2005","Inicio en un grupo de escritura y lectura online"),
        new Historias(0,9,"2009","Inicio en un grupo de escritura y lectura online"),
        new Historias(0,9,"2010","Inicio en un grupo de escritura y lectura online"),
        new Historias(0,9,"2011","Inicio en un grupo de escritura y lectura online"),
        new Historias(0,9,"2012","Inicio en un grupo de escritura y lectura online"),
        new Historias(0,9,"2013","Inicio en un grupo de escritura y lectura online"),
        new Historias(0,9,"2014","Inicio en un grupo de escritura y lectura online"),
        new Historias(0,9,"2015","Inicio en un grupo de escritura y lectura online"),
        new Historias(0,9,"2016","Inicio en un grupo de escritura y lectura online"),
        new Historias(0,9,"2017","Inicio en un grupo de escritura y lectura online"),
        new Historias(0,9,"2018","Inicio en un grupo de escritura y lectura online"),
        new Historias(0,9,"2019","Inicio en un grupo de escritura y lectura online"),
        new Historias(0,9,"2020","Inicio en un grupo de escritura y lectura online"),
        new Historias(0,9,"2021","Inicio en un grupo de escritura y lectura online"),
        new Historias(0,9,"2022","Inicio en un grupo de escritura y lectura online"),
        new Historias(0,9,"2023","Inicio en un grupo de escritura y lectura online"),
        new Historias(0,9,"2024","Inicio en un grupo de escritura y lectura online"),
        new Historias(1,12,"2024","Escritores Sin Fronteras, crea su primer logo corporativo"),
        new Historias(2,1,"2025","Escritores Sin Fronteras, crece en usuarios suscritos tanto de Facebook como de Instagram"),
        new Historias(3,5,"2025","Escritores Sin Fronteras, consigue su registro mercantil en Colombia como corporación online en existencia"),
        new Historias(4,8,"2025","Escritores Sin Fronteras, registra sus primeras ganancias")];

      //AREA DE QUIENES SOMOS PARA EL APARTADO DE "QUIENES SOMOS"
      public quienesSomos:QuienesSomos[]=[
        new QuienesSomos("Ken","Vera Chan","Español","Escritor y Fundador","Ken Vera Chan es un escritor apasionado por la literatura contemporánea y la narrativa innovadora. Con una carrera que abarca más de una década, Ken ha publicado varias novelas y colecciones de cuentos que han sido aclamadas por la crítica. Además de su trabajo literario, Ken es el fundador de 'Escritores Sin Fronteras', una plataforma dedicada a apoyar a escritores emergentes de todo el mundo.","assets/images/equipoESF/kenVeraChan.png"),
        new QuienesSomos("Diana","Emilce Zamora","Colombiana","Editora y Co-Fundadora","Diana Emilce Zamora es una editora experimentada con un profundo amor por la literatura hispanoamericana. Ha trabajado en diversas editoriales, ayudando a dar forma a las voces de nuevos escritores. Como co-fundadora de 'Escritores Sin Fronteras', Diana se dedica a crear oportunidades para que los escritores de diferentes culturas puedan compartir sus historias con una audiencia global.","assets/images/equipoESF/dianaEmilceZamora.png"),
        new QuienesSomos("Cassandra","Romanova","Italiana","Community Manager","Cassandra Romanova es una experta en gestión de comunidades en línea y redes sociales. Con una sólida experiencia en marketing digital, Cassandra ha ayudado a numerosas organizaciones a construir y mantener comunidades vibrantes. En 'Escritores Sin Fronteras', Cassandra se encarga de conectar a escritores y lectores, fomentando un espacio inclusivo para el intercambio de ideas y creatividad.","assets/images/equipoESF/cassandraRomanova.png"),
        new QuienesSomos("Sergio","Alvear","Peruano","Desarrollador Web","Sergio Alvear es un desarrollador web talentoso con una pasión por crear experiencias digitales intuitivas y atractivas. Con experiencia en diversas tecnologías web, Sergio ha contribuido al desarrollo de múltiples plataformas en línea. En 'Escritores Sin Fronteras', Sergio es responsable de mantener y mejorar la infraestructura técnica del sitio, asegurando que los usuarios tengan una experiencia fluida y agradable.","assets/images/equipoESF/sergioAlvear.png"),
        new QuienesSomos("Maria Isabel","Muñoz","Colombiana","Diseñadora Gráfica","Maria Isabel Muñoz es una diseñadora gráfica creativa con un ojo para el detalle y la estética visual. Ha trabajado en proyectos de diseño para editoriales, campañas publicitarias y plataformas digitales. En 'Escritores Sin Fronteras', Maria Isabel se encarga de la identidad visual de la plataforma, creando diseños que reflejan la misión y los valores de la comunidad de escritores.","assets/images/equipoESF/mariaIsabelMunioz.png"),
        new QuienesSomos("Daniela","Patrone","Argentina","Coordinadora de Eventos","Daniela Patrone es una profesional en gestión de eventos con una pasión por la literatura y la cultura. Ha organizado numerosos eventos literarios, talleres y conferencias que han reunido a escritores y lectores de diversas partes del mundo. En 'Escritores Sin Fronteras', Daniela coordina eventos que promueven la interacción y el crecimiento de la comunidad literaria.","assets/images/equipoESF/danielaPatrone.png"),
        new QuienesSomos("Mario Alberto","Gómez","Argentino","Diseño gráfico y multimedia","Mario Alberto Gómez es un diseñador gráfico y multimedia con una amplia experiencia en la creación de contenido visual para plataformas digitales. Ha trabajado en proyectos que van desde el diseño web hasta la producción de videos promocionales. En 'Escritores Sin Fronteras', Mario Alberto aporta su talento para desarrollar materiales visuales que enriquecen la experiencia de los usuarios y promueven la plataforma.","assets/images/equipoESF/marioAlberto.png")
      ];
      //AREA DE ESCENAS PARA EL APARTADO DE "SERVICIOS"
      public escenas:string[]=[
        "Noticia 1: Nuevo concurso literario abierto a todos los escritores emergentes.",
        "Noticia 2: Entrevista exclusiva con el autor best-seller del año.",
        "Noticia 3: Talleres de escritura creativa disponibles en línea.",
        "Noticia 4: Lanzamiento de la nueva plataforma para compartir relatos cortos.",
        "Noticia 5: Evento virtual con autores reconocidos a nivel internacional."
      ];
      //AREA DE PUBLICACIONES PARA EL APARTADO DE PUBLICACIONES
      public publicacionesPosteadas: publicaciones=new publicaciones();

      //AREA DE BLOG PARA EL APARTADO DE BLOG LITERARIO
      public blogsPosteados: blogs=new blogs();

    }
class Apartados{
    public valorSubapartado:number=0;  //Para identificar que subapartado del blog se accionó, se inicializa con 0 porque es el valor que corresponde a "todos" en el caso del blog, y a "cursos" en el caso de servicios, que son los valores predeterminados.
    public subApartadoBlog:string="";  //Para identificar que subapartado del blog se accionó
    public subPartadosServicios:string="";  //Para identificar que subapartado de servicios se accionó, se inicializa con 5 espacios vacíos porque hay 5 subapartados, luego se irán rellenando según la elección del usuario.
    public matrizApartados: string[]= ["INICIO","NUESTRA HISTORIA","QUIENES SOMOS","BLOG LITERARIO","NUESTROS SERVICIOS","PUBLICACIONES","CONTACTO"];
    public subApartadosBlog: string[]= ["PROSA","VERSO","REFLEXIONES"];
    public enlacesBlogLiterario: string[]= ["PUBLICACIONES EN PROSA","PUBLICACIONES EN VERSO","REFLEXIONES DEL DÍA"];
    public enlacesServicios: string[]= ["CURSOS ONLINE","ENTREVISTAS ONLINE","EDICIÓN Y MAQUETACIÓN DE LIBROS","TERTULIAS POR LA MARCA","CONGRESOS INTERNACIONALES PROGRAMADOS"];
    public subApartadosServicios: string[]= ["CURSOS","ENTREVISTAS","EDICIONES","TERTULIAS","CONGRESOS"];
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
          }      //Se guarda la selección en localStorage para que
      // el componente Servicios pueda acceder a ella y filtrar los servicios según la elección del usuario en la cabecera.
    }
    public getSubApartadosServiciosMenu(): string[]
    {
      return this.subApartadosServicios;
    }
    public getSubApartadosServicios():string
    {
        if (typeof window === 'undefined' || !window.localStorage)
        {
        return 'cursos'; // Valor predeterminado si no se puede acceder a localStorage
        }
      //Recupera el valor almacenado en localstorage
      const saveEleccionServicios = localStorage.getItem('selectedServicioEleccion');
      return saveEleccionServicios ? saveEleccionServicios : '';
    }
}
class Noticias
{
    private titular:string="";
    private subTitular:string="";
    private noticia:string="";

    constructor(titular:string, subTitular:string, noticia:string){
        this.titular=titular;
        this.subTitular=subTitular;
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
class QuienesSomos{
  /*RECOGIDO DE LA BBDD ESTRATEGICA*/
    private nombre:string="";
    private apellidos:string="";
    private nacionalidad:string="";
    private profesion:string="";
    private biografia:string="";
    private imagen:string="";
    constructor(nombre:string, apellidos:string, nacionalidad:string, profesion:string, biografia:string, imagen:string){
        this.nombre=nombre;
        this.apellidos=apellidos;
        this.nacionalidad=nacionalidad;
        this.profesion=profesion;
        this.biografia=biografia;
        this.imagen=imagen;
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
    public getImagenEquipo(): string
    {
      const quienesSomosImagen: string="assets/images/equipoESF/imagenEquipo.png";
      return quienesSomosImagen;
    }
    public getImagenLibro():string
    {
      const quienesSomosImagen: string="assets/images/equipoESF/libro.png";
      return quienesSomosImagen;
    }
}

//Tanto el BLOG como las PUBLICACIONES NO comparten el mismo modelo de datos

//el de PUBLICACIONES se llama PublicacionesPost 
export type PublicacionesPostType = 
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

//el de BLOG se llama BlogPost, aunque ambos tienen la misma estructura, 
//se han diferenciado para tener una mayor claridad en el código, y para poder 
//hacer modificaciones futuras en cada uno de ellos sin afectar al otro, aunque 
//por ahora son SIMILARES.
export type BlogPostType = 'verso' | 'prosa' | 'reflexion';

export type BlogPost = {
  id: string;
  title: string;
  type: BlogPostType;
  content: string;
  authorEmail: string;
  createdAtIso: string;
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

  public PublicacionesPostType: string[]=[
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
    return this.PublicacionesPostType[eleccion];
  }
  public envioPosteados(): PublicacionesPost[] {
    const now = Date.now();
    return [
      {
        id: this.makeId(),
        title: 'Frontera de tinta',
        type: this.generoPublicacion(0).toString() as PublicacionesPostType,
        content: 'Cruzo la página,\\n' +
          'no por huir del mundo,\\n' +
          'sino por nombrarlo.\\n\\n' +
          'Y en cada palabra\\n' +
          'una casa posible\\n' +
          'para lo que duele.',
        authorEmail: 'equipo@esf.org',
        createdAtIso: new Date(now - 1000 * 60 * 60 * 28).toISOString(),
        fotoLibroTitulo: "Novela de ciencia ficción - 'El fin de la eternidad' de Isaac Asimov",
        fotoLibro: '../../../assets/images/publicaciones/novelaCienciaFiccion.jpg',
        audioLibroTitulo: "Audiolibro de ciencia ficción - 'Dune' de Frank Herbert",
        audio: "",
        videoCortoTitulo: "Booktrailer de ciencia ficción - 'Neuromante' de William Gibson",
        videoCorto: ""
      },
      {
        id: this.makeId(),
        title: 'La prosa como refugio',
        type: this.generoPublicacion(1).toString() as PublicacionesPostType,
        content:
          'Escribir en prosa es permitir que la respiración encuentre su ritmo. ' +
          'No se trata de adornar, sino de sostener el sentido con claridad. ' +
          'Cuando la frase avanza, también avanza la posibilidad de comprender.\\n\\n' +
          'Publica aquí tus relatos, escenas, cartas o memorias: lo importante es la honestidad del tono.',
        authorEmail: 'equipo@esf.org',
        createdAtIso: new Date(now - 1000 * 60 * 60 * 10).toISOString(),
        fotoLibroTitulo: '',
        fotoLibro: '',
        audioLibroTitulo: '',
        audio:"",
        videoCortoTitulo: '',
        videoCorto: ''
      },
      {
        id: this.makeId(),
        title: 'Una reflexión para MAÑANA',
        type: this.generoPublicacion(2).toString() as PublicacionesPostType,
        content:
          'A veces la frontera no está afuera, sino entre lo que pensamos y lo que nos animamos a decir. ' +
          'Escribir es tender un puente. Léenos, y si quieres, deja tu propia orilla.',
        authorEmail: 'equipo@esf.org',
        createdAtIso: new Date(now - 1000 * 60 * 50).toISOString(),
        fotoLibroTitulo: 'Presentación del libro Vitrea Horíz',
        fotoLibro: '../../../assets/fotoLibros/Ken Vera Chan fin.png',
        audioLibroTitulo: 'Piano y danzas de Vitrea Horiz en las orillas del mar',
        audio: '../../../assets/audios/Tony Anderson - Bloom.mp3',
        videoCortoTitulo: 'Video Vitrea en el tren a Chalikets',
        videoCorto: '../../../assets/videos/libreria.mp4'
      },
            {
        id: this.makeId(),
        title: 'Una reflexión de AYER',
        type: this.generoPublicacion(2).toString() as PublicacionesPostType,
        content:
          'A veces me acuerdo de ti porque siempre has vivido en mi ' +
          'Escribir es tender un puente. Léenos, y si quieres, deja tu propia orilla.',
        authorEmail: 'esfer4d_corporation@outlook.com',
        createdAtIso: new Date(now - 1000 * 60 * 50).toISOString(),
        fotoLibroTitulo: '',
        fotoLibro: '',
        audioLibroTitulo: '',
        audio: '',
        videoCortoTitulo: '',
        videoCorto: ''
      },
    ];
  }
  public makeId(): string {
  const palabra= 'p_' + Math.random().toString(16).slice(2) + '_' + Date.now().toString(16);
  return palabra;
  }
}

export class blogs implements BlogPost
  {
  public id: string="";
  public title: string="";
  public type: BlogPostType="verso";
  public content: string="";
  public authorEmail: string="";
  public createdAtIso: string="";
  
  constructor()
  {
    //No precisa de instanciar nada
  }
  public generoBlog(eleccion:number):string 
  {
    const PublicacionesPostType: string[]=["verso","prosa","reflexion"];
    if(eleccion==0) return PublicacionesPostType[0];
    if(eleccion==1) return PublicacionesPostType[1];
    if(eleccion==2) return PublicacionesPostType[2];
    return PublicacionesPostType[0];
  }
  public envioPosteadoBlog(): BlogPost[] {
    const now = Date.now();
    return [
      {
        id: this.makeIdBlog(),
        title: 'Frontera de tinta',
        type: this.generoBlog(0).toString() as BlogPostType,
        content: 'Cruzo la página,\\n' +
          'no por huir del mundo,\\n' +
          'sino por nombrarlo.\\n\\n' +
          'Y en cada palabra\\n' +
          'una casa posible\\n' +
          'para lo que duele.',
        authorEmail: 'equipo@esf.org',
        createdAtIso: new Date(now - 1000 * 60 * 60 * 28).toISOString(),
      },
      {
        id: this.makeIdBlog(),
        title: 'La prosa como refugio',
        type: this.generoBlog(1).toString() as BlogPostType,
        content:
          'Escribir en prosa es permitir que la respiración encuentre su ritmo. ' +
          'No se trata de adornar, sino de sostener el sentido con claridad. ' +
          'Cuando la frase avanza, también avanza la posibilidad de comprender.\\n\\n' +
          'Publica aquí tus relatos, escenas, cartas o memorias: lo importante es la honestidad del tono.',
        authorEmail: 'equipo@esf.org',
        createdAtIso: new Date(now - 1000 * 60 * 60 * 10).toISOString(),
      },
      {
        id: this.makeIdBlog(),
        title: 'Una reflexión para hoy',
        type: this.generoBlog(2).toString() as BlogPostType,
        content:
          'A veces la frontera no está afuera, sino entre lo que pensamos y lo que nos animamos a decir. ' +
          'Escribir es tender un puente. Léenos, y si quieres, deja tu propia orilla.',
        authorEmail: 'equipo@esf.org',
        createdAtIso: new Date(now - 1000 * 60 * 50).toISOString(),
      },
            {
        id: this.makeIdBlog(),
        title: 'Una reflexión de AYER',
        type: this.generoBlog(2).toString() as BlogPostType,
        content:
          'A veces me acuerdo de ti porque siempre has vivido en mi ' +
          'Escribir es tender un puente. Léenos, y si quieres, deja tu propia orilla.',
        authorEmail: 'esfer4d_corporation@outlook.com',
        createdAtIso: new Date(now - 1000 * 60 * 50).toISOString(),
      },
    ];
  }
  public makeIdBlog(): string {
  const palabra= 'p_' + Math.random().toString(16).slice(2) + '_' + Date.now().toString(16);
  return palabra;
  }
  }