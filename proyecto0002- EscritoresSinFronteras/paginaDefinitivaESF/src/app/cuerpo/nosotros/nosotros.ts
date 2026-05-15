import { Component } from '@angular/core';
import { QuienesSomos, VariablesCompartidas, Conexion, ImagenesExtra } from '../../servicios/variablesCompartidas';

@Component({
  selector: 'app-nosotros',
  standalone: false,
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css',
})
export class Nosotros {
  public equipo= new VariablesCompartidas();
  public imagenesExtra= new ImagenesExtra();
  // Array que almacena TODAS las IDENTIDADES DE EQUIPO en Escritores Sin Fronteras
  public objetoEquipo: any[] = [];
  /** true = panel cerrado (clase informacionPersonal); false = abierto (informacionPersonalCarga) */
  public cerrado: boolean[] = [];
  // Almacena el ancho actual de la ventana del navegador en píxeles
  public tamanioHorizontalPantalla = 0;

  ngOnInit(): void {
    // Llama al servicio HTTP para obtener los datos de historias desde el backend (índice 1 = tabla de historias)
    this.Conexion.getAutores(2).subscribe(data => {
          this.objetoEquipo = [];
          data.forEach(a => {
            const historia = new QuienesSomos(
                a.id,
                a.titulo,
                a.tipo,
                a.nacionalidad,
                a.profesion,
                a.biografia,
                a.fotografia);
        this.objetoEquipo.push(historia);
        }
      );
      // Todos cerrados al terminar de cargar el equipo (coincide con longitud real del array)
      this.cerrado = this.objetoEquipo.map(() => true);
    });
    // Obtiene el ancho inicial de la ventana (o 1200 por defecto si no hay objeto window, ej: SSR)
    this.tamanioHorizontalPantalla = typeof window !== 'undefined' ? window.innerWidth : 1200;
  }
constructor(private Conexion: Conexion){}
public mostrarInformacion(index: number): void {
  /*alert(`Nombre: ${this.equipo.quienesSomos[index].getNombre()} ${this.equipo.quienesSomos[index].getApellidos()}\n` +
        `Nacionalidad: ${this.equipo.quienesSomos[index].getNacionalidad()}\n` +
        `Rol: ${this.equipo.quienesSomos[index].getProfesion()}\n` +
        `Biografía: ${this.equipo.quienesSomos[index].getBiografia()}`); */
    const estabaAbierto = this.cerrado[index] === false;
    this.cerrado = this.objetoEquipo.map(() => true);
    if (!estabaAbierto) {
      this.cerrado[index] = false;
    }
  }

}
