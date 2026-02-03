import { Component, HostListener, OnInit, AfterViewInit, ViewChild, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-opciones',
  standalone: false,
  templateUrl: './opciones.html',
  styleUrl: './opciones.css',
})
export class Opciones implements OnInit, AfterViewInit {
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
    public tamanioHorizontalPantallaSegundo:number=0.0;
    public tamanioVerticalPantalla:number=0.0;
    public puntero: number=0;
    public activeIndex: number = 0;
    public semaforo:boolean=false;

    @Input() menuDesplegado: boolean = false;    //VARIABLE RECIBIDA DEL COMPONENTE PADRE
    @ViewChild('fondoMenus') fondoMenus!: ElementRef;   //ELEMENTO DEL DOM MODIFICADO PARA MOVERSE
    @ViewChild('tablero') tablero!: ElementRef;   //ELEMENTO DEL DOM DE LA BOTONERA
    @HostListener('window:resize', ['$event'])
      onResize(event:any):number {
      this.tamanioHorizontalPantallaSegundo = event.target.innerWidth; 
      this.tamanioVerticalPantalla = event.target.innerHeight;  
      if(this.tamanioHorizontalPantalla!=this.tamanioHorizontalPantallaSegundo)
      {
          this.volverPagina();   
          //Cierra el menú al cambiar el tamaño de la pantalla
          //Ha cambiado el tamanio de pantalla
          this.tamanioHorizontalPantalla=this.tamanioHorizontalPantallaSegundo;
      }
      return(this.tamanioHorizontalPantallaSegundo);
    }
    
    constructor(private renderer: Renderer2) {}
    ngAfterViewInit() {
      if (typeof window !== 'undefined') 
      {
       this.tamanioHorizontalPantalla = window.innerWidth;
      }
    }
    ngOnInit()    //Al iniciarse el componente
    {
      if (typeof window !== 'undefined') 
        {
          this.tamanioHorizontalPantalla = document.documentElement.scrollWidth;  //Ancho de la pantalla
          this.tamanioVerticalPantalla = document.documentElement.scrollHeight;
          //Para detectar el alto total de la pantalla tanto la visible como la que se vería con el scroll
          // Recupera el puntero almacenado y lo sincroniza con la clase activa
          const stored = localStorage.getItem('punteroCabecera');
          this.puntero = stored ? Number(stored) : 0;
          this.activeIndex = this.puntero;
        }
    }
    public abrirMenuOpciones():void
    {
      if (typeof window !== 'undefined') 
      {      
        // Tamaño visible del viewport
        this.tamanioHorizontalPantalla = window.innerWidth;
        this.tamanioVerticalPantalla = window.innerHeight;

        const elementoMenu = this.fondoMenus.nativeElement as HTMLElement;
        const elementoTablero= this.tablero.nativeElement as HTMLElement;

        // Bloquear scroll del documento para que el overlay oscurezca siempre lo visible
        this.renderer.setStyle(document.body, 'overflow', 'hidden');

        // Asegurar que no queden estilos inline antiguos que rompan la animación CSS
        this.renderer.removeStyle(elementoMenu, 'transform');
        this.renderer.removeStyle(elementoMenu, 'transition');
        this.renderer.removeStyle(elementoMenu, 'height');
        this.renderer.removeStyle(elementoMenu, 'maxHeight');
        this.renderer.removeStyle(elementoMenu, 'overflowY');

        // Abrir overlay + panel (la animación la hace el CSS)
        this.renderer.addClass(elementoTablero, 'is-open');

        // Calcular tamaños para que quepa TODO sin scroll:
        // - contamos items principales + items de submenú (peor caso: submenús abiertos)
        const mainItems = elementoMenu.querySelectorAll('.botonera').length || 6;
        const subItems = elementoMenu.querySelectorAll('.subMenu .subBotonera').length || 0;
        const totalRowsMax = mainItems + subItems;

        const headerEl = elementoMenu.querySelector('.fondoMenu') as HTMLElement | null;
        const headerHeight = headerEl?.offsetHeight ?? 100;
        const padding = 24;

        const available = Math.round(this.tamanioVerticalPantalla * 0.86) - headerHeight - padding;
        const rowH = Math.max(26, Math.min(44, Math.floor(available / Math.max(1, totalRowsMax))));
        const fontSize = Math.max(10, Math.min(18, Math.floor(rowH * 0.48)));
        const subFontSize = Math.max(10, Math.min(16, Math.floor(fontSize * 0.9)));

        elementoMenu.style.setProperty('--menu-item-h', `${rowH}px`);
        elementoMenu.style.setProperty('--menu-font-size', `${fontSize}px`);
        elementoMenu.style.setProperty('--menu-sub-font-size', `${subFontSize}px`);
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

        // Cerrar overlay + panel (la transición la hace el CSS)
        this.renderer.removeClass(elementoTablero, 'is-open');

        // Restaurar scroll del documento
        this.renderer.removeStyle(document.body, 'overflow');

        // Obliga a ejecutar el cambio justo antes del siguiente repintado.
        // De esta forma el navegador registrará primero la transición y
        // animará el cambio de margin-left.
        requestAnimationFrame(() => {
          // Limpiar variables CSS
          elementoMenu.style.removeProperty('--menu-item-h');
          elementoMenu.style.removeProperty('--menu-font-size');
          elementoMenu.style.removeProperty('--menu-sub-font-size');
      });
      }
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
