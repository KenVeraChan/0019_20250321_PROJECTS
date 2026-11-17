import { Component, OnInit } from '@angular/core';
import { ContactoPublicoDto, ContactoPublicoService } from '../../servicios/contacto-publico.service';

@Component({
  selector: 'app-contacto',
  standalone: false,
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto implements OnInit {
  public data: ContactoPublicoDto | null = null;
  public cargando = true;
  public errorCarga: string | null = null;

  constructor(private readonly contactoApi: ContactoPublicoService) {}

  ngOnInit(): void {
    this.contactoApi.getContactoPublico().subscribe({
      next: d => {
        this.data = d;
        this.cargando = false;
        this.errorCarga = null;
      },
      error: () => {
        this.cargando = false;
        this.errorCarga = 'No se pudo cargar la información de contacto.';
      },
    });
  }

  public telHref(numero: string): string {
    return 'tel:' + numero.replace(/\s/g, '');
  }
}
