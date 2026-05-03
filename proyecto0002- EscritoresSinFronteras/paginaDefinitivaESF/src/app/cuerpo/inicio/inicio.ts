import { Component } from '@angular/core';
import { Conexion } from '../../servicios/variablesCompartidas';
import { OnInit } from '@angular/core';
import { Noticias } from '../../servicios/variablesCompartidas';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit {
  //Se recuperara el dato de la BBDD proporcionado por el SERVICIO
noticiasInicio: any[] = [];

constructor(private Conexion: Conexion){}
  ngOnInit() {
      this.Conexion.getAutores(0).subscribe(data => {
      data.forEach(a=>{
        const noticia = new Noticias(
            a.titular,
            a.subTitular,
            a.fecha,
            a.imagen,
            a.audio,
            a.video,
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

