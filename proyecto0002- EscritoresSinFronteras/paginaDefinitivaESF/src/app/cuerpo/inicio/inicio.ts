import { Component } from '@angular/core';
import { VariablesCompartidas } from '../../servicios/variablesCompartidas';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  //Se recuperara el dato de la BBDD proporcionado por el SERVICIO
      public objetoNoticias= new VariablesCompartidas();
}

