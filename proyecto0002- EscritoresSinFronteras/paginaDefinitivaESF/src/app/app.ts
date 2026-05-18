import { Component,OnInit, ViewChild, ElementRef, HostListener, Renderer2, OnDestroy } from '@angular/core';
import { RutaPrincipal } from '../app/servicios/rutaPrincipal';
import { EstadoErroresService } from './servicios/estado-errores.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  private readonly onOffline = (): void => {
    this.estadoErrores.activarSinConexion('Pérdida de conexión a internet');
  };

  private readonly onOnline = (): void => {
    const snap = this.estadoErrores.obtenerSnapshot();
    if (snap.modo === 'sin-conexion') {
      this.estadoErrores.limpiar();
    }
  };
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
  constructor(
    private renderer: Renderer2,
    private rutaPrincipal: RutaPrincipal,
    private readonly estadoErrores: EstadoErroresService,
  ) {}

  ngOnInit(): void 
  {
    if (typeof window !== 'undefined') 
    {
      this.tamanioHorizontalPantalla = window.innerWidth;
      window.addEventListener('offline', this.onOffline);
      window.addEventListener('online', this.onOnline);
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('offline', this.onOffline);
      window.removeEventListener('online', this.onOnline);
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