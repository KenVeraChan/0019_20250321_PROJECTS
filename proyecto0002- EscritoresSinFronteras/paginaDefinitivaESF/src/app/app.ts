import { Component,OnInit, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { RutaPrincipal } from '../app/servicios/rutaPrincipal';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit{
  private tamanioHorizontalPantalla:number=0.0;  
    @ViewChild('cabecera') cabecera!: ElementRef;   //ELEMENTO DEL DOM MODIFICADO PARA MOVERSE
    @ViewChild('cuerpo') cuerpo!: ElementRef;   //ELEMENTO DEL DOM DE LA BOTONERA
    @ViewChild('pie') pie!: ElementRef;   //ELEMENTO DEL DOM DE LA BOTONERA
    @HostListener('window:resize', ['$event'])
      onResize(event:any):number {
      this.tamanioHorizontalPantalla = event.target.innerWidth;   
      return(this.tamanioHorizontalPantalla);
    }
  
  //Variable para probar la conexión con el backend
  saludo: string | null = null;
  constructor(private renderer: Renderer2, private rutaPrincipal: RutaPrincipal) {}
  ngOnInit(): void 
  {
    if (typeof window !== 'undefined') 
    {
      this.tamanioHorizontalPantalla = window.innerWidth;  //Ancho de la pantalla
        
        //Zona de pruebas para la conexión con el backend
        this.rutaPrincipal.getSaludo().subscribe({
        next: (res) => this.saludo = res.mensaje,
        error: (err) => console.error('Error al obtener saludo', err)
    });
    }
  }
  ngAfterViewInit() 
  {

  }
  public cargandoPagina():void
  {
    const elementoCabecera = this.cabecera.nativeElement.parentElement;
    const elementoCuerpo = this.cuerpo.nativeElement.parentElement;
    const elementoPie = this.pie.nativeElement.parentElement;
    this.renderer.setStyle(elementoCabecera, 'width', this.tamanioHorizontalPantalla + 'px'); 
    this.renderer.setStyle(elementoCuerpo, 'width', this.tamanioHorizontalPantalla + 'px'); 
    this.renderer.setStyle(elementoPie, 'width', this.tamanioHorizontalPantalla + 'px'); 
  }  
}