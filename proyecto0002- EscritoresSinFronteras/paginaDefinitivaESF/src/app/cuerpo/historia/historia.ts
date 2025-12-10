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
  public eleccion:number=0.0;
  public aniosNumero:number[]=[];     //Para el vector de años para exponer
  public mesesTexto:string[]=[];      //Para el vector de meses para exponer
  public objetoHistorias= new VariablesCompartidas();
  constructor(private renderer: Renderer2) {}

  @ViewChild('fondoHistoria') fondoHistoria!:ElementRef;  
  @ViewChildren('botones') botones!: QueryList<ElementRef>;   //ELEMENTOS DEL DOM PARA MOVERSE (múltiples)

  ngOnInit()
  {
    this.tamanioHorizontalPantalla = window.innerWidth;  //Ancho de la pantalla
    this.eleccion=1;   //Se inicia con la primera opción
  }
  ngAfterViewInit(): void {
    // Llamar aquí cuando los elementos del DOM ya existen
  }

public cargarHistorial(opcion:number):void
{
    switch(opcion)
    {
      case 1:
        {
          //MUESTRA TODO SIN RESTRICCION ALGUNA
            if (typeof window !== 'undefined') 
            {   
            this.eleccion=1; //Se elige la primera opción
            }
          break;
        }
      case 2:
        {
          //SE CARGARÁN TODOS LOS AÑOS Y SE MOSTRARÁ AL USUARIO
          //AL HACER CLIC SOBRE UN AÑO SE MOSTRARÁN TODOS LOS MESES DE ESE AÑO
          if (typeof window !== 'undefined') 
            {   
                this.eleccion=2; //Se elige la segunda opción
              if (typeof window !== 'undefined') 
              {
                for(let i=0;i<this.objetoHistorias.historias.length;i++)
                {
                  this.aniosNumero[i]=Number(this.objetoHistorias.historias[i].getAnio());
                }
              }
            }
          break;
        }
      case 3:
        {
          //SE CARGARÁN TODOS LOS MESES DEL AÑO Y SE MOSTRARÁ AL USUARIO
          //AL HACER CLIC SOBRE UN MES CONCRETO, SE MOSTRARÁN TODOS LOS MESES SEÑALADOS DE TODOS LOS AÑOS
          if (typeof window !== 'undefined') 
            {   
              this.eleccion=3; //Se elige la tercera opción
              if (typeof window !== 'undefined') 
              {
                for(let i=0;i<this.objetoHistorias.historias.length;i++)
                {
                  this.mesesTexto[i]=this.objetoHistorias.historias[i].getMes();
                }
              }
            }
          break;
        }
      default:
        {
          //No hace nada
          if (typeof window !== 'undefined'){}
          break;
        }
    }
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
