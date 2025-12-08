import { Component, OnInit, AfterViewInit, QueryList, ViewChildren, Renderer2, ElementRef } from '@angular/core';
import { VariablesCompartidas } from '../../servicios/variablesCompartidas';

@Component({
  selector: 'app-historia',
  standalone: false,
  templateUrl: './historia.html',
  styleUrl: './historia.css',
})
export class Historia implements OnInit, AfterViewInit {
  public tamanioHorizontalPantalla:number=0.0;
  ngOnInit()
  {
    this.tamanioHorizontalPantalla = window.innerWidth;  //Ancho de la pantalla
  }    
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
      });
    }
  }
  public cerrarHistorial():void
  {
    if (typeof window !== 'undefined') 
    {     
      // Iterar sobre todos los botones (QueryList)
      this.botones.forEach((item: ElementRef, index: number) => {
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
      });
    }
  }
}
