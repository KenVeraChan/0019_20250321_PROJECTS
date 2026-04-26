import { Component } from '@angular/core';
import { VariablesCompartidas } from '../../servicios/variablesCompartidas';
import { NgOptimizedImage } from '@angular/common';

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
  public cerrado: boolean[] = [];
  public items = ['Uno', 'Dos', 'Tres','Cuatro','Cinco','Seis','Siete']; //Esto es solo un ejemplo para inicializar el array cerrado con la misma cantidad de elementos que el array quienesSomos
  ngOnInit() {
    this.cerrado = this.items.map(() => true);
  }
constructor()
  {

  }
public mostrarInformacion(index: number): void {
  /*alert(`Nombre: ${this.equipo.quienesSomos[index].getNombre()} ${this.equipo.quienesSomos[index].getApellidos()}\n` +
        `Nacionalidad: ${this.equipo.quienesSomos[index].getNacionalidad()}\n` +
        `Rol: ${this.equipo.quienesSomos[index].getProfesion()}\n` +
        `Biografía: ${this.equipo.quienesSomos[index].getBiografia()}`); */
    this.cerrado[index] = !this.cerrado[index];
  }

}
