import { Component } from '@angular/core';

@Component({
  selector: 'app-pie',
  standalone: false,
  templateUrl: './pie.html',
  styleUrl: './pie.css',
})
export class Pie {

private enlaceGitHub: string = 'https://github.com/KenVeraChan';
  public abrirGitHub(): void 
  {
    window.open(this.enlaceGitHub, '_blank');
  }

}
