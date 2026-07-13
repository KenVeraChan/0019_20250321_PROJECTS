import { Component } from '@angular/core';
import { Conexion, inicio, VariablesCompartidas } from '../../services/variablesCompartidas';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})

export class Inicio implements OnInit {
  noticiasInicio: inicio[] = [];
  valorNumerico:number=0;   //Puntero de recorrido del vector de objetos
  enlaces:string= new VariablesCompartidas().enlaceSlider();

  constructor(private Conexion: Conexion) {}

  ngOnInit(): void {
    this.Conexion.getInformacion(0).subscribe({
      next: (data: any[]) => {
        this.noticiasInicio = data.map((a: any) => new inicio(
          a.ID ?? a.id ?? 0,
          a.NOMBRE ?? a.nombre ?? '',
          a.TIPO ?? a.tipo ?? '',
          a.TAMANIO ?? a.tamanio ?? 0,
          a.DESTINO ?? a.destino ?? '',
          a.SECTOR ?? a.sector ?? '',
          a.STOCK ?? a.stock ?? '',
          a.COSTE ?? a.coste ?? 0,
          a.DETALLES ?? a.detalles ?? ''
        ));
      },
      error: (err) => {
        console.error('Error al cargar noticias de inicio', err);
      }
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

  public siguiente():void
  {
    this.valorNumerico = (this.valorNumerico + 1) % this.noticiasInicio.length;
  }
  public anterior():void
  {
    this.valorNumerico = this.valorNumerico === 0 ? this.noticiasInicio.length - 1 : this.valorNumerico - 1;
  }
  public falloCarga():string
  {
    return "NO EXISTE INFORMACIÓN ALGUNA CARGADA";
  }
  isExpanded(index: number): boolean {
    return this.expandedNews.has(index);
  }
}