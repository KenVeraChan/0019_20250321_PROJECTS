import { Component, OnInit, AfterViewInit,ViewChild, ElementRef, HostListener } from '@angular/core';
import { Historias, VariablesCompartidas, Conexion } from '../../../servicios/variablesCompartidas';

interface PaginaState {   //Interfaz para controlar el estado de cada página del libro de historia
  titulo: string | (() => string);
  mes?: string | (()=> string | number);
  anio?: string | (()=> string | number);
  mostrarBoton: boolean;
  rotado: boolean;
  decolorado: boolean;
  invisible: boolean;
  zIndex: number;
  textoInvisible: boolean;
}

@Component({
  selector: 'app-librointeractivo',
  standalone: false,
  templateUrl: './librointeractivo.html',
  styleUrl: './librointeractivo.css',
})
export class Librointeractivo implements AfterViewInit, OnInit {

  @ViewChild('libroAbierto') libroAbierto!: ElementRef<HTMLElement>;

  public paginaMovimiento = 0;
  public guardaPagina = 0;
  public mostrarBotonAbrir = true;
  public isAnimating = false;
  public anchoPantalla: number = window.innerWidth; 
  public fechaSeleccionada= new VariablesCompartidas();    //Se necesita recoger el valor de la fecha seleccionada
  public eventoSeleccionado: any[]=[];
  public mesSeleccionado:string='';
  public anioSeleccionado:string='';
  public puntero:number=0;
  public paginas: PaginaState[]=[];

  constructor(private Conexion: Conexion){}

  ngOnInit(): void {
    this.Conexion.getAutores(1).subscribe(data => {
          data.forEach(a=>{
            const historia = new Historias(
                a.id,
                a.mes,
                a.anio,
                a.contenido);
        this.eventoSeleccionado.push(historia);    //Se rellena la matriz de historias
        }
      );
    //Aqui se recibe el dato de la BBDD y se asigna a la variable noticiasInicio, 
    //que se utiliza en el HTML para mostrar las noticias, el indice 0 se corresponde 
    //con el indice del array de URLs, que a su vez se corresponde con el indice del array 
    //de apartados, por lo que es una forma de centralizar las URLs y evitar tener que 
    //escribirlas en cada componente, además de facilitar su mantenimiento y actualización.
    //La variable DATA es un ARRAY DE OBJETOS en donde está alojada la tabla de la consulta
    
    //Ahora si que estan cargados los datos para presentar en el libro
    this.rellenadoDatos();
    });
  }

  //Comprobacion de si la recepción del titulo es un metodo o un string
  public getTitulo(pagina: PaginaState): string {
     const valor= typeof pagina.titulo === 'function'
      ? pagina.titulo()
      : pagina.titulo;
      return typeof valor.normalize('NFC'); // normaliza acentos correctamente
  }

  /*
  public paginas: PaginaState[] = [
    { titulo:  ()=>this.eventoSeleccionado[0].getContenido(), mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: 0, textoInvisible: false},
    { titulo: 'Vida de Vitrea Horíz', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: -1, textoInvisible: false},
    { titulo: 'Vida de Emiliam Bastreriz', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: -2, textoInvisible: false},
    { titulo: 'Vida de Verdulíz Sainz', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: -3, textoInvisible: false},
    { titulo: 'Vida de Veddina Henion', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: -4, textoInvisible: false},
    { titulo: 'Vida de Samira Sávadez', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: -5, textoInvisible: false},
    { titulo: 'Vida de Shail Matsiz', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: -6, textoInvisible: false},
    { titulo: 'Vida de Christal Gedishen', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: -7, textoInvisible: false},
    { titulo: 'Vida de Jill Anherson', mostrarBoton: false, rotado: false, decolorado: false, invisible: false, zIndex: -8, textoInvisible: false},
  ];
  */
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
      this.mesSeleccionado=this.eventoSeleccionado[this.puntero].getMesTexto();
      this.anioSeleccionado=this.eventoSeleccionado[this.puntero].getAnio();
    });
  }

  public rellenadoDatos():void
  {
    //Rellenar la matriz de datos
    for(let index=0; index<this.eventoSeleccionado.length;index++)
    {
      this.paginas.push({
        titulo: ()=>this.eventoSeleccionado[index].getContenido(),   //Recoge el contenido
        mes: ()=> this.eventoSeleccionado[index].getMes(),       //Recoge el mes
        anio: ()=> this.eventoSeleccionado[index].getAnio(),     //Recoge el anio
        mostrarBoton: false,        // ejemplo: solo la primera muestra botón
        rotado: false,
        decolorado: false,
        invisible: false,
        zIndex: 0-index,              // ejemplo: capas decrecientes
        textoInvisible: false
      });
    }
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
        p.textoInvisible=true;  //no mostrar el texto
        this.isAnimating = false; // permitir clicks después de la animación
      }, 500);
    } else if (posicionX < limiteDerecho && posicionX >= limiteIzquierdo) {
      // Pasa a la página anterior (clic en la izquierda)
      if (!p.rotado) return; // ya está plana
      this.isAnimating = true;
      p.invisible = false; // mostrar contenido antes de girar de vuelta
      p.textoInvisible=false;  //SI mostrar el texto
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
