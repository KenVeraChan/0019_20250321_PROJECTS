import { Component, HostListener, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  standalone: false,
  templateUrl: './cabecera.html',
  styleUrl: './cabecera.css',
})
export class Cabecera implements OnInit, AfterViewInit {
    public inicio: string="INICIO";
    public nuestraHistoria: string="NUESTRA HISTORIA";
    public anios: string[]=["2020","2021","2022","2023","2024","2025","2026"];
    public quienesSomos: string="QUIENES SOMOS";
    public blogLiterario: string="BLOG LITERARIO";
    public enlaces: string[]= ["PUBLICACIONES EN PROSA","PUBLICACIONES EN VERSO","REFLEXIONES DEL DÍA"];
    public nuestrosServicios: string="NUESTROS SERVICIOS";
    public servicios: string[]= ["CURSOS ONLINE","ENTREVISTAS ONLINE","EDICIÓN Y MAQUETACIÓN DE LIBROS","TERTULIAS","CONGRESOS INTERNACIONALES"];
    public contacto: string="CONTACTO";
    public tamanioPantalla:number=0.0;
    public puntero: number=0;
    public activeIndex: number = 0;
    
    ngOnInit()    //Al iniciarse el componente
    {
      if (typeof window !== 'undefined') 
        {
          this.tamanioPantalla = window.innerWidth;
          // Recupera el puntero almacenado y lo sincroniza con la clase activa
          const stored = localStorage.getItem('punteroCabecera');
          this.puntero = stored ? Number(stored) : 0;
          this.activeIndex = this.puntero;
        }
    }
    @ViewChild('fondoMenus') fondoMenus!: ElementRef;

    ngAfterViewInit() {
    // Acceso seguro al elemento ya renderizado
    if (window.screen.width < 1200 && this.fondoMenus) {
      this.fondoMenus.nativeElement.style.overflow = 'scroll';
    }
  }
    /*PARA PANTALLAS DE MOVIL Y TABLET */
    public despliegaMenu():void
    {
      if (typeof window !== 'undefined') 
      {
        window.scroll(window.screen.width, 0);
        if(window.screen.width < 1200)
        {
          document.body.style.overflow = 'scroll'; //Inhabilita el SCROLL vertical
          this.fondoMenus.nativeElement.style.color = 'white';
        }
        else
        {
          document.body.style.overflow = 'scroll'; //Inhabilita el SCROLL vertical    
        }
      }
    }
    public volverPagina():void
    {
      if (typeof window !== 'undefined') 
      {
        window.scroll((-1) * window.screen.width, 0);
        document.body.style.overflow = 'visible'; //Habilita el SCROLL vertical
      }
    }
    @HostListener('window:resize', ['$event'])
    onResize(event:any):number {
      this.tamanioPantalla = event.target.innerWidth;
      return(this.tamanioPantalla);
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
