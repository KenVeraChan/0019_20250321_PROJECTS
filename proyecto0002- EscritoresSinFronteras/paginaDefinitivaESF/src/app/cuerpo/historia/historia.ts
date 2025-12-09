import { Component, OnInit, AfterViewInit, QueryList,ViewChild, ViewChildren, Renderer2, ElementRef } from '@angular/core';
import { VariablesCompartidas } from '../../servicios/variablesCompartidas';

@Component({
  selector: 'app-historia',
  standalone: false,
  templateUrl: './historia.html',
  styleUrl: './historia.css',
})
export class Historia implements OnInit, AfterViewInit {
  public tamanioHorizontalPantalla:number=0.0;
  public punteroAvance:number=0.0;
  ngOnInit()
  {
    this.tamanioHorizontalPantalla = window.innerWidth;  //Ancho de la pantalla
  }
  @ViewChild('fondoHistoria') fondoHistoria!:ElementRef;  
  @ViewChildren('botones') botones!: QueryList<ElementRef>;   //ELEMENTOS DEL DOM PARA MOVERSE (múltiples)
  constructor(private renderer: Renderer2) {}
  public objetoHistorias= new VariablesCompartidas();

  ngAfterViewInit(): void {
    // Llamar aquí cuando los elementos del DOM ya existen
  }

  public cargarHistorial():void
  {
    if (typeof window !== 'undefined') 
    {     
      // Iterar sobre todos los botones (QueryList)
      const fondos= this.fondoHistoria.nativeElement as HTMLElement;
      this.botones.forEach((item: ElementRef, index: number) => {
        const botonesAccionados = item.nativeElement as HTMLElement;
        this.renderer.setStyle(botonesAccionados, 'display', 'block');
        // Añadir delay progresivo: cada botón se mueve después del anterior (100ms * índice)
        const delay = index * 100; // 0ms, 100ms, 200ms, 300ms, etc.
        
        setTimeout(() => {
          requestAnimationFrame(() => {
            this.renderer.setStyle(botonesAccionados, 'transform', `translate(10px,${70 +index*70}px)`);
            this.renderer.setStyle(botonesAccionados, 'transition', 'transform 0.5s ease-in-out');
          });
        }, delay);
        this.punteroAvance=70+(index+1)*80;   //Contabilización de la longitud para estirarse y cubrir todas las fechas
      });
      this.renderer.setStyle(fondos, 'height', this.punteroAvance+'px'); //Se estira la longitud hasta cubrir todas las fechas encontradas
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
          this.renderer.setStyle(botonesAccionados, 'display', 'none');
          this.renderer.setStyle(fondos, 'height', '300px');  //Se devuelve a la longitud inicial del FONDO HISTORIA
      });
    }
  }
}
