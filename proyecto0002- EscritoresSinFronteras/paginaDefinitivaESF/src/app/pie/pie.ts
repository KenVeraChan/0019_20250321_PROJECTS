import { Component } from '@angular/core';

@Component({
  selector: 'app-pie',
  standalone: false,
  templateUrl: './pie.html',
  styleUrl: './pie.css',
})
export class Pie {

private enlaceGitHub: string = 'https://github.com/KenVeraChan';
private enlaceFacebook: string = 'https://www.facebook.com/share/g/1EsbdeaaVH/';
private enlaceYouTube: string = 'https://www.youtube.com/@EscritoresSinFronteras-Unviaje';
private enlaceLinkedIn: string = 'https://linkedin.com';
private enlaceWhatsApp: string = 'https://chat.whatsapp.com/I2ouTvxFg3OJUsbilRJ0gx';
private enlaceInstagram: string = 'https://www.instagram.com/escritoressinfronteras/';

  public abrirEnlace(entrada:number): void 
  {
    switch(entrada)
    {
      case 1:
        window.open(this.enlaceGitHub, '_blank');
        break;
      case 2:
        window.open(this.enlaceFacebook, '_blank');
        break;
      case 3:
        window.open(this.enlaceYouTube, '_blank');
        break;
      case 4:
        window.open(this.enlaceLinkedIn, '_blank');
        break;
      case 5:
        window.open(this.enlaceWhatsApp, '_blank');
        break;
      case 6:
        window.open(this.enlaceInstagram, '_blank');
        break;
      // Add more cases for other social media links
    }
  }

}
