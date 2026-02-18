import { Component, AfterViewInit,ViewChild, ElementRef, HostListener } from '@angular/core';
import { VariablesCompartidas } from '../../../servicios/variablesCompartidas';

interface PaginaState {   //Interfaz para controlar el estado de cada página del libro de historia
  titulo: string;
  mostrarBoton: boolean;
  rotado: boolean;
  decolorado: boolean;
  invisible: boolean;
  zIndex: number;
}

@Component({
  selector: 'app-librointeractivo',
  standalone: false,
  templateUrl: './librointeractivo.html',
  styleUrl: './librointeractivo.css',
})
export class Librointeractivo implements AfterViewInit {

  @ViewChild('libroAbierto') libroAbierto!: ElementRef<HTMLElement>;

  public paginaMovimiento = 0;
  public guardaPagina = 0;
  public mostrarBotonAbrir = true;
  public isAnimating = false;
  public anchoPantalla: number = window.innerWidth; 
  public fechaSeleccionada= new VariablesCompartidas();    //Se necesita recoger el valor de la fecha seleccionada
  public mesSeleccionado:string='';
  public anioSeleccionado:string='';
  public puntero:number=0;

  public paginas: PaginaState[] = [
    { titulo: 'Vida de Rasselín Wissangel Rousher', mostrarBoton: true, rotado: false, decolorado: false, invisible: false, zIndex: 0 },
    { titulo: 'Vida de Vitrea Horíz', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: 0 },
    { titulo: 'Vida de Emiliam Bastreriz', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: 0 },
    { titulo: 'Vida de Verdulíz Sainz', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: 0 },
    { titulo: 'Vida de Veddina Henion', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: 0 },
    { titulo: 'Vida de Samira Sávadez', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: 0 },
    { titulo: 'Vida de Shail Matsiz', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: 0 },
    { titulo: 'Vida de Christal Gedishen', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: 0 },
    { titulo: 'Vida de Jill Anherson', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: 0 },
  ];

  @HostListener('window:resize', ['$event']) 
  onResize(event: Event) 
  { 
    this.anchoPantalla = window.innerWidth; 
  } 

  public ngAfterViewInit(): void 
  {
      // Llamar aquí cuando los elementos del DOM ya existen
      const total = this.paginas.length;
      this.paginas.forEach((p, index) => {
      p.zIndex = total - index;
      // Invoca al botón mes y anio seleccionado
      this.puntero = this.fechaSeleccionada.getPunteroSeleccionador();
      this.mesSeleccionado=this.fechaSeleccionada.historias[this.puntero].getMesTexto();
      this.anioSeleccionado=this.fechaSeleccionada.historias[this.puntero].getAnio();
    });
  }

  public onPaginaClick(index: number, event: MouseEvent): void 
  {
    const el = this.libroAbierto?.nativeElement;
    if (!el) return;

    if (this.isAnimating) return; // evita clicks durante la animación

    const rect = el.getBoundingClientRect();
    const posicionX = event.clientX;
    const limiteDerecho = rect.left + rect.width / 2;
    const limiteIzquierdo = rect.left;

    const p = this.paginas[index];
    // Click a la derecha: pasar a siguiente
    if (posicionX >= limiteDerecho && posicionX <= rect.right) {
      // Pasa a la página siguiente (clic en la derecha)
      if (p.rotado) return; // ya está girada
      this.isAnimating = true;
      p.rotado = true;
      p.decolorado = true;
      if (index === this.paginaMovimiento) {
        this.mostrarBotonAbrir = !this.mostrarBotonAbrir;
      }
      this.guardaPagina = this.paginaMovimiento;
      this.paginaMovimiento++;
      p.zIndex = this.paginas.length + this.paginaMovimiento;
      // ocultar el contenido al terminar la animación
      setTimeout(() => {
        p.invisible = false;   //mostrar contenido después de girar
        this.isAnimating = false; // permitir clicks después de la animación
      }, 750);
    } else if (posicionX < limiteDerecho && posicionX >= limiteIzquierdo) {
      // Pasa a la página anterior (clic en la izquierda)
      if (!p.rotado) return; // ya está plana
      this.isAnimating = true;
      p.invisible = false; // mostrar contenido antes de girar de vuelta
      // pequeña espera para asegurar repaint antes de animar
      setTimeout(() => {
        p.rotado = false;
        p.decolorado = false;
        this.paginaMovimiento--;
        if (this.guardaPagina === this.paginaMovimiento) {
          this.mostrarBotonAbrir = !this.mostrarBotonAbrir;
        }
        p.zIndex = this.paginas.length - this.paginaMovimiento;
        setTimeout(() => {
          this.isAnimating = false;
        }, 750);
      }, 20);
    }
  }
}
