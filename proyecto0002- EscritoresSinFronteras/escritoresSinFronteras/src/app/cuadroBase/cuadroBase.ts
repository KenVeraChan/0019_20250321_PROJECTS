import { Component } from '@angular/core';

@Component({
  selector: 'app-cuadroBase',
  standalone: false,
  templateUrl: './cuadroBase.html',
  styleUrl: './cuadroBase.css',
})
export class CuadroBase {


  public subirArriba():void
  {
    window.scrollTo(0,0);  //Scroll hacia arriba de la página
  }
}
