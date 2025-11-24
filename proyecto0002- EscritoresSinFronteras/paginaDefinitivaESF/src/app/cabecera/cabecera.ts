import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  standalone: false,
  templateUrl: './cabecera.html',
  styleUrl: './cabecera.css',
})
export class Cabecera implements OnInit {
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

    ngOnInit(){
      this.tamanioPantalla=window.innerWidth;
    }
    /*PARA PANTALLAS DE MOVIL Y TABLET */
    public despliegaMenu():void
    {
     window.scroll(window.screen.width,0);  //Mueve la ventana hacia la izquierda una distancia del ancho pantalla
    }
    public volverPagina():void
    {
     window.scroll((-1)*window.screen.width,0);  //Mueve la ventana hacia la izquierda una distancia del ancho pantalla
    }
    @HostListener('window:resize', ['$event'])
    onResize(event:any):number {
      this.tamanioPantalla = event.target.innerWidth;
      return(this.tamanioPantalla);
    }
}
