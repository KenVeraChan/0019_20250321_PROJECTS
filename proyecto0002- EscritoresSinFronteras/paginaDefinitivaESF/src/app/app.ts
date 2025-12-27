import { Component, signal,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit{
  private tamanioPantallaHorizontal:number=0.0;
  protected readonly title = signal('paginaDefinitivaESF');
  ngOnInit(): void 
  {
    if (typeof window !== 'undefined') 
    {
      this.tamanioPantallaHorizontal = window.innerWidth;  //Ancho de la pantalla
    }
  }
}  
