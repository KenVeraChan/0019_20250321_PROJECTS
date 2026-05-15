import { Component } from '@angular/core';
import { Conexion } from '../../servicios/variablesCompartidas';
import { OnInit } from '@angular/core';
import { Noticias, VariablesCompartidas } from '../../servicios/variablesCompartidas';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit {
  //Se recuperara el dato de la BBDD proporcionado por el SERVICIO
noticiasInicio: any[] = [];
private nexo= new VariablesCompartidas(); //Declaracion de VariablesCompartidas
private urlImagen:string= this.nexo.getImagenNoticia();  //Esta variable se usa para verificar que la imagen de la noticia exista y esté en su directorio correspondiente, si no es así, no se muestra la imagen, y se muestra un mensaje de error en su lugar.
private urlAudio:string= this.nexo.getAudioNoticia();  //Esta variable se usa para verificar que el audio de la noticia exista y esté en su directorio correspondiente, si no es así, no se muestra el audio, y se muestra un mensaje de error en su lugar.
private urlVideo:string= this.nexo.getVideoNoticia();  //Esta variable se usa para verificar que el video de la noticia exista y esté en su directorio correspondiente, si no es así, no se muestra el video, y se muestra un mensaje de error en su lugar.

constructor(private Conexion: Conexion){}
  ngOnInit() {
      this.Conexion.getAutores(0).subscribe(data => {
      data.forEach(a=>{
        const noticia = new Noticias(
            a.titular,
            a.subTitular,
            a.fecha ? new Date(a.fecha).toISOString().slice(0, 10)  : '', // Formateo la fecha a 'YYYY-MM-DD' comprueba que la fecha posea la caracteristica de DATE
            a.imagen? a.imagen:this.urlImagen.concat(a.imagen),
            a.audio? a.audio:this.urlAudio.concat(a.audio),
            a.video? a.video:this.urlVideo.concat(a.video),
            a.noticia);
    this.noticiasInicio.push(noticia);
      }
  );
      //Aqui se recibe el dato de la BBDD y se asigna a la variable noticiasInicio, 
      //que se utiliza en el HTML para mostrar las noticias, el indice 0 se corresponde 
      //con el indice del array de URLs, que a su vez se corresponde con el indice del array 
      //de apartados, por lo que es una forma de centralizar las URLs y evitar tener que 
      //escribirlas en cada componente, además de facilitar su mantenimiento y actualización.
      //La variable DATA es un ARRAY DE OBJETOS en donde está alojada la tabla de la consulta

    });
  }
  public expandedNews: Set<number> = new Set();
    toggleExpanded(index: number): void {
      if (this.expandedNews.has(index)) {
        this.expandedNews.delete(index);
      } else {
        this.expandedNews.add(index);
      }
    }

  isExpanded(index: number): boolean {
    return this.expandedNews.has(index);
  }
}

