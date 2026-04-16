import { Component } from '@angular/core';
import { VariablesCompartidas } from '../../servicios/variablesCompartidas';

@Component({
  selector: 'app-nosotros',
  standalone: false,
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css',
})
export class Nosotros {
  public equipo= new VariablesCompartidas();
  public nombreQuien = this.equipo.quienesSomos[0].getNombre();
  public apellidosQuien= this.equipo.quienesSomos[1].getApellidos();
  public nacionalidadQuien = this.equipo.quienesSomos[2].getNacionalidad();
  public rolQuien= this.equipo.quienesSomos[3].getProfesion();
  public bioQuien= this.equipo.quienesSomos[4].getBiografia();
  public fotoQuien= this.equipo.quienesSomos[0].getImagen();


}
