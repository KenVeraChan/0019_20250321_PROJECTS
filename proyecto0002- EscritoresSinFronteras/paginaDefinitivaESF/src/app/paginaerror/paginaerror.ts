import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EstadoErroresService, EstadoErrorVista } from '../servicios/estado-errores.service';

@Component({
  selector: 'app-paginaerror',
  standalone: false,
  templateUrl: './paginaerror.html',
  styleUrl: './paginaerror.css',
})
export class PaginaError implements OnInit, OnDestroy {
  public vista: EstadoErrorVista = {
    modo: 'ruta-no-encontrada',
    mostrarPagina: true,
    tipoError: 'Ruta no encontrada',
    codigo: '404',
    titulo: 'Página no encontrada',
    lead: '',
    consejos: [],
  };

  private sub?: Subscription;

  constructor(private readonly estadoErrores: EstadoErroresService) {}

  ngOnInit(): void {
    const snap = this.estadoErrores.obtenerSnapshot();
    if (snap.mostrarPagina) {
      this.vista = snap;
    }

    this.sub = this.estadoErrores.estado$.subscribe(e => {
      if (e.mostrarPagina) {
        this.vista = e;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  public volverInicio(): void {
    this.navegarSeccion(0, '/inicio');
  }

  public irContacto(): void {
    this.navegarSeccion(6, '/contacto');
  }

  public reintentar(): void {
    this.estadoErrores.limpiar();
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }

  private navegarSeccion(puntero: number, ruta: string): void {
    if (typeof window === 'undefined') {
      return;
    }
    this.estadoErrores.limpiar();
    localStorage.setItem('punteroCabecera', String(puntero));
    window.location.assign(ruta);
  }
}
