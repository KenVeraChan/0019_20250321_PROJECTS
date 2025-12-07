import { Component, OnInit, HostListener} from '@angular/core';

@Component({
  selector: 'app-cuerpo',
  standalone: false,
  templateUrl: './cuerpo.html',
  styleUrl: './cuerpo.css',
})
export class Cuerpo implements OnInit {
    public mensajeVentana1: string = "“No olvides que eres el personaje principal de la novela de tu propia vida. La calidad y causalidad de los capítulos incluidos en ella, se basarán en la cualidad y casualidad de los estímulos vividos” William Wissangel, 1950";
    public mensajeVentana2: string = "“Entre la ficción y la realidad existe una frontera llamada vida, soñada por quienes nos la dan, tan vivida como escrita por nosotros mismos, y leída por aquellos en quienes dejaremos nuestra huella literaria, emocional e histórica” Sharyllín Rousher, 1960";
    public tamanioPantalla:number=0.0;
    public puntero: number=0;  //Matriz de pagina guardada
    public semaforo:boolean=false;

    ngOnInit()    //Al iniciarse el componente
    {
      if (typeof window !== 'undefined') 
        {
          this.tamanioPantalla = window.innerWidth;  //Devuelve el tamanio de la pagina atual
          // Recupera el puntero almacenado y lo sincroniza con la clase activa
          const paginaGuardada = localStorage.getItem('punteroCabecera');
          this.puntero = paginaGuardada? Number(paginaGuardada) : 0;
        }
    }
        /*PARA PANTALLAS DE MOVIL Y TABLET */
    @HostListener('window:resize', ['$event'])
    onResize(event:any):number {
      this.tamanioPantalla = event.target.innerWidth;
      return(this.tamanioPantalla);
    }
}
