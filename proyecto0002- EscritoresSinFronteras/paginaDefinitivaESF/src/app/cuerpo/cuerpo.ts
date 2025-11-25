import { Component } from '@angular/core';

@Component({
  selector: 'app-cuerpo',
  standalone: false,
  templateUrl: './cuerpo.html',
  styleUrl: './cuerpo.css',
})
export class Cuerpo {
    public mensajeVentana1: string = "“No olvides que eres el personaje principal de la novela de tu propia vida. La calidad y causalidad de los capítulos incluidos en ella, se basarán en la cualidad y casualidad de los estímulos vividos” William Wissangel, 1950";
    public mensajeVentana2: string = "“Entre la ficción y la realidad existe una frontera llamada vida, soñada por quienes nos la dan, tan vivida como escrita por nosotros mismos, y leída por aquellos en quienes dejaremos nuestra huella literaria, emocional e histórica” Sharyllín Rousher, 1960";
}
