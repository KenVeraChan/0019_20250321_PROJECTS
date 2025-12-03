import { Component, HostListener, OnInit, AfterViewInit, ViewChild, ElementRef, Input, Output, Renderer2 } from '@angular/core';
import { Window } from '@popperjs/core';

@Component({
  selector: 'app-opciones',
  standalone: false,
  templateUrl: './opciones.html',
  styleUrl: './opciones.css',
})
export class Opciones implements OnInit {
    public inicio: string="INICIO";
    public nuestraHistoria: string="NUESTRA HISTORIA";
    public anios: string[]=["2020","2021","2022","2023","2024","2025","2026"];
    public quienesSomos: string="QUIENES SOMOS";
    public blogLiterario: string="BLOG LITERARIO";
    public enlaces: string[]= ["PUBLICACIONES EN PROSA","PUBLICACIONES EN VERSO","REFLEXIONES DEL DÍA"];
    public nuestrosServicios: string="NUESTROS SERVICIOS";
    public servicios: string[]= ["CURSOS ONLINE","ENTREVISTAS ONLINE","EDICIÓN Y MAQUETACIÓN DE LIBROS","TERTULIAS","CONGRESOS INTERNACIONALES"];
    public contacto: string="CONTACTO";
    public tamanioHorizontalPantalla:number=0.0;
    public tamanioVerticalPantalla:number=0.0;
    public puntero: number=0;
    public activeIndex: number = 0;
    public semaforo:boolean=false;

    @Input() menuDesplegado: boolean = false;    //VARIABLE RECIBIDA DEL COMPONENTE PADRE
    @ViewChild('fondoMenus') fondoMenus!: ElementRef;   //ELEMENTO DEL DOM MODIFICADO PARA MOVERSE
    @ViewChild('tablero') tablero!: ElementRef;   //ELEMENTO DEL DOM DE LA BOTONERA
    constructor(private renderer: Renderer2) {}

    ngOnInit()    //Al iniciarse el componente
    {
      if (typeof window !== 'undefined') 
        {
          this.tamanioHorizontalPantalla = window.innerWidth;  //Ancho de la pantalla
          this.tamanioVerticalPantalla = document.documentElement.scrollHeight;
          //Para detectar el alto total de la pantalla tanto la visible como la que se vería con el scroll
          // Recupera el puntero almacenado y lo sincroniza con la clase activa
          const stored = localStorage.getItem('punteroCabecera');
          this.puntero = stored ? Number(stored) : 0;
          this.activeIndex = this.puntero;
        }
    }
    ngAfterViewInit() {
      // Acceso seguro al elemento ya renderizado, solo se carga una vez al cargar el componente
    }
    public abrirMenuOpciones():void
    {
      if (typeof window !== 'undefined') 
      {      
      // Acceso seguro al elemento ya renderizado
        // Usar Renderer2 en lugar de manipular nativeElement.style directamente
        //Para tener en cuenta en los demás ficheros typescript con Renderer2
        const elementoMenu = this.fondoMenus.nativeElement as HTMLElement;
        const elementoTablero= this.tablero.nativeElement as HTMLElement;

        this.renderer.setStyle(elementoMenu, 'transform', 'translateX(400%)');
        this.renderer.setStyle(elementoMenu, 'transition', 'transform 1s ease');
        this.renderer.setStyle(elementoTablero, 'transition', '1.5s');
        this.renderer.setStyle(elementoTablero, 'height', this.tamanioVerticalPantalla + 'px');      

        this.renderer.setStyle(elementoMenu, 'z-index', '200');
        this.renderer.setStyle(elementoTablero, 'z-index', '199');

        this.renderer.setStyle(elementoMenu, 'display', 'block');     /*SE DEVUELVE LA VISIBILIDAD DEL BLOQUE*/
        this.renderer.setStyle(elementoTablero, 'display', 'block');
        
        this.renderer.setStyle(elementoMenu, 'position', 'absolute');
        this.renderer.setStyle(elementoTablero, 'position', 'absolute');

        // Obliga a ejecutar el cambio justo antes del siguiente repintado.
        // De esta forma el navegador registrará primero la transición y
        // animará el cambio de margin-left.
        requestAnimationFrame(() => {
            //SE DEFINE LA TRANSICION EN FUNCION DEL TAMANIO HORIZONTAL DE LA PANTALLA
                if(this.tamanioHorizontalPantalla>100 && this.tamanioHorizontalPantalla<=380)   //MOVIL PEQUEÑO
                {
                    this.renderer.setStyle(elementoMenu, 'transform', 'translateX(10%)');
                }
                if(this.tamanioHorizontalPantalla>381 && this.tamanioHorizontalPantalla<=576)   //MOVIL MEDIANO
                {
                    this.renderer.setStyle(elementoMenu, 'transform', 'translateX(16%)');
                }
                if(this.tamanioHorizontalPantalla>577 && this.tamanioHorizontalPantalla<=768)   //TABLET PEQUEÑO
                {
                    this.renderer.setStyle(elementoMenu, 'transform', 'translateX(80%)');
                }
                if(this.tamanioHorizontalPantalla>769 && this.tamanioHorizontalPantalla<=992)   //TABLET GRANDE
                {
                    this.renderer.setStyle(elementoMenu, 'transform', 'translateX(85%)');
                }
                if(this.tamanioHorizontalPantalla>993 && this.tamanioHorizontalPantalla<=1200)   //ESCRITORIO PEQUEÑO
                {
                    this.renderer.setStyle(elementoMenu, 'transform', 'translateX(150%)');
                } 
                if(this.tamanioHorizontalPantalla>1201)   //ESCRITORIO GRANDE
                {
                    
                }
          this.renderer.setStyle(elementoMenu, 'width', '300px');
          this.renderer.setStyle(elementoTablero, 'backgroundColor', 'rgba(0, 0, 0, 0.8)');
          this.renderer.setStyle(elementoMenu, 'box-shadow', '0 0 20px #fff');
          //this.renderer.setStyle(elementoMenu, 'transform', 'translateX(140%)');
        });
      }
    }
    public volverPagina():void
    {
      if (typeof window !== 'undefined') 
      {
        // Usar Renderer2 en lugar de manipular nativeElement.style directamente
        //Para tener en cuenta en los demás ficheros typescript con Renderer2
        const elementoMenu = this.fondoMenus.nativeElement as HTMLElement;
        const elementoTablero= this.tablero.nativeElement as HTMLElement;

        this.renderer.setStyle(elementoMenu, 'transform', 'translateX(140%)');
        this.renderer.setStyle(elementoMenu, 'transition', 'transform 1s ease');
        this.renderer.setStyle(elementoMenu, 'display', 'none');     /*SE DEVUELVE LA VISIBILIDAD DEL BLOQUE*/
        this.renderer.setStyle(elementoTablero, 'display', 'none');
        this.renderer.setStyle(elementoTablero, 'transition', '1.5s');

        // Obliga a ejecutar el cambio justo antes del siguiente repintado.
        // De esta forma el navegador registrará primero la transición y
        // animará el cambio de margin-left.
        requestAnimationFrame(() => {
          this.renderer.setStyle(elementoMenu, 'width', '300px');
          this.renderer.setStyle(elementoTablero, 'backgroundColor', 'transparent');  
      });
      }
    }
    @HostListener('window:resize', ['$event'])
    onResize(event:any):number {
      this.tamanioHorizontalPantalla = event.target.innerWidth;
      return(this.tamanioHorizontalPantalla);
    }
    //Sector de botones y qué componente fue activado
    public accesoHabilitado(opcion:number):void
    {
      // Mapear la opción (1..6) a índices (0..5)
      const indexMap: Record<number, number> = {1:0, 2:1, 3:2, 4:3, 5:4, 6:5};
      const idx = indexMap[opcion] ?? 0;  //Se asegura que idx siempre tenga un valor numérico
      this.activeIndex = idx;  //Se actualiza el índice activo
      this.puntero = idx;  //Se actualiza el puntero
      if (typeof window !== 'undefined') {
        localStorage.setItem('punteroCabecera', this.puntero.toString());
      }
    }
}
