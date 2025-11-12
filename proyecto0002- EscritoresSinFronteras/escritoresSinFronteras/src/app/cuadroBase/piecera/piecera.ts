import { Component } from '@angular/core';
import { OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-piecera',
  standalone: false,
  templateUrl: './piecera.html',
  styleUrl: './piecera.css',
})
export class Piecera implements OnInit {
  public frase: string = "El mundo necesita expresarse en palabras, inculcar sentimientos, ideas, pensamientos... pero sólo aquellos con formato afectivo sale del corazón a los escritores y llega al de los lectores...";
  public corolario: string="En Escritores Sin Fronteras, unimos a las personas mediante el conocimiento de cientos de obras escritas y experiencias vividas por todos ellos. Para llegar a todos los rincones de este preciado mundo en donde creemos estar solos pero tan cerca unos de otros por el lomo de un mismo libro en donde cada persona es un capítulo completo"
  public correo: string="escritoressinfronterasvp@gmail.com";
  public consideracion: string="Copyright C 2025";
  ngOnInit(): void {

  }

  public getMensaje(): string {
    return this.frase;
  }
}
