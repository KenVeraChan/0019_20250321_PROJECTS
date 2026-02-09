import { Component, OnInit, QueryList,ViewChild, ViewChildren, Renderer2, ElementRef, ChangeDetectorRef } from '@angular/core';
import { VariablesCompartidas } from '../../servicios/variablesCompartidas';

@Component({
  selector: 'app-historia',
  standalone: false,
  templateUrl: './historia.html',
  styleUrl: './historia.css',
})
export class Historia implements OnInit {
  public tamanioHorizontalPantalla:number=0.0;
  public punteroAvance:number=0.0;
  public eleccion:number=0;
  public semaforo:boolean=false;  //Para controlar la aparición del libro de la historia con mes y año
  public objetoHistorias= new VariablesCompartidas();
  public objetoHistoriasFiltrado= new VariablesCompartidas();

  constructor(private renderer: Renderer2,private deteccionCambio: ChangeDetectorRef) {}
    //Renderer2 permite modificar elementos DOM y ChangeDetectorRef pemirte detectar cambios en variables
  @ViewChild('fondoHistoria') fondoHistoria!:ElementRef;  
  @ViewChildren('botones') botones!: QueryList<ElementRef>;   //ELEMENTOS DEL DOM PARA MOVERSE (múltiples)
  @ViewChildren('botonesPrincipales') botonesPrincipales!:QueryList<ElementRef>;   //BOTONES PRINCIPALES DEL MENU

  ngOnInit()
  {
    this.tamanioHorizontalPantalla = window.innerWidth;  //Ancho de la pantalla
    //Para filtrar objetos buscados por años
    this.objetoHistoriasFiltrado.historias=this.objetoHistoriasFiltrado.historias.filter
    ((historia, indice, self) =>  indice === self.findIndex(h => h.getAnio() === historia.getAnio()));
  }

  public cargarHistorial(opcion:number):void
  {
    if (typeof window !== 'undefined') 
    {   
     this.eleccion=opcion; //Se elige la primera opción
     this.deteccionCambio.detectChanges();
      const fondos= this.fondoHistoria.nativeElement as HTMLElement;
      this.botones.forEach((item: ElementRef, index: number) => {
        const botonesAccionados = item.nativeElement as HTMLElement;
        this.renderer.setStyle(botonesAccionados, 'display','block');
        // Añadir delay progresivo: cada botón se mueve después del anterior (100ms * índice)
        const delay = index * 100; // 0ms, 100ms, 200ms, 300ms, etc.
        setTimeout(() => {
          requestAnimationFrame(() => {
            this.renderer.setStyle(botonesAccionados, 'transform', `translate(10px,${70 +index*70}px)`);
            this.renderer.setStyle(botonesAccionados, 'transition', 'transform 0.5s ease-in-out');
          });
        }, delay);
        this.punteroAvance=70+(index+1)*80;   //Contabilización de la longitud para estirarse y cubrir todas las fechas
        //this.renderer.setStyle(botonesPrincipales, 'display','none');   //Se hacen desaparecer

      });
      this.renderer.setStyle(fondos, 'height', this.punteroAvance+'px'); //Se estira la longitud hasta cubrir todas las fechas encontradas  
      
      //Botones principales del menu de opciones de la historia
      this.botonesPrincipales.forEach((item: ElementRef) => {
            const botonesPrincipales= item.nativeElement as HTMLElement;   //Para hacerlos desaparecer mientras aparecen los otros
            this.renderer.setStyle(botonesPrincipales,'display','none');
      });
    }
  }
  public cerrarHistorial():void
  {
    if (typeof window !== 'undefined') 
    {     
      this.botones.forEach((item: ElementRef, index: number) => {
            const fondos= this.fondoHistoria.nativeElement as HTMLElement;
            const botonesAccionados = item.nativeElement as HTMLElement;
            // Añadir delay progresivo: cada botón se mueve después del anterior (100ms * índice)
            const delay = index * 100; // 0ms, 100ms, 200ms, 300ms, etc.
            setTimeout(() => {
              requestAnimationFrame(() => {
                this.renderer.setStyle(botonesAccionados, 'transform', `translate(-10px,${-70}px)`);
                this.renderer.setStyle(botonesAccionados, 'transition', 'transform 0.5s ease-in-out');
              });
            }, delay);
          this.renderer.setStyle(botonesAccionados, 'display','none');
          this.renderer.setStyle(fondos, 'height', '300px');  //Se devuelve a la longitud inicial del FONDO HISTORIA
      });
      //Botones principales del menu de opciones de la historia
      this.botonesPrincipales.forEach((item: ElementRef) => {
            const botonesPrincipales= item.nativeElement as HTMLElement;   //Para hacerlos desaparecer mientras aparecen los otros
            this.renderer.setStyle(botonesPrincipales,'display','block');
      });
      this.semaforo=false;  //Se desactiva el semáforo para ocultar el libro de la historia con mes y año
    }
  }
  public accionarBoton(puntero:number,mes:string,anio:string):void
  {
    if (typeof window !== 'undefined') 
    {  
    //Lógica para accionar el botón
    this.cerrarHistorial(); //cierra primero el menú de meses - años ante de proseguir
    this.semaforo=true;  //Se activa el semáforo para mostrar el libro de la historia con mes y año
      const fondos= this.fondoHistoria.nativeElement as HTMLElement;
    this.renderer.setStyle(fondos, 'height', '600px'); //Se estira la longitud hasta cubrir todas las fechas encontradas  
    }
  }
}
