import { Component, HostListener } from '@angular/core';
import { VariablesCompartidas } from '../services/variablesCompartidas';

interface EnlaceCabecera {
  etiqueta: string;
  ruta: string;
  descripcion: string;
  asignacion: number;
}

@Component({
  selector: 'app-cabecera',
  standalone: false,
  templateUrl: './cabecera.html',
  styleUrls: ['./cabecera.css'],
})
export class Cabecera {
  // Variables compartidas para la gestión de la elección del menú (inyectadas)
  constructor(private variables: VariablesCompartidas) {}
  /* Cinta de accesos principales de la web (se renderiza de forma dinámica).  */
  /* Se asignará un número a cada uno de ellos para la gestión de los accesos*/
  protected readonly enlaces: EnlaceCabecera[] = [
    { etiqueta: 'INICIO', ruta: '/inicio', descripcion: 'Página de inicio de Sfer4D Corporation', asignacion: 0},
    { etiqueta: 'HISTORIA', ruta: '/historia', descripcion: 'Historia de la empresa', asignacion: 1 },
    { etiqueta: 'PRODUCTOS', ruta: '/productos', descripcion: 'Catálogo de productos', asignacion: 2 },
    { etiqueta: 'SERVICIOS', ruta: '/servicios', descripcion: 'Servicios que ofrecemos', asignacion: 3 },
    { etiqueta: 'PROYECTOS', ruta: '/proyectos', descripcion: 'Proyectos desarrollados', asignacion: 4 },
    { etiqueta: 'CLIENTE', ruta: '/cliente', descripcion: 'Área de cliente', asignacion: 5 },
  ];

  /** Accesos privados (los desarrolla otro componente): Recursos Humanos y Jefes. */
  protected readonly accesosPrivados: EnlaceCabecera[] = [
    { etiqueta: 'RR. HH.', ruta: '/rrhh', descripcion: 'Zona privada de Recursos Humanos', asignacion: 6 },
    { etiqueta: 'JEFES', ruta: '/jefes', descripcion: 'Zona privada de Jefes', asignacion: 7 },
  ];

  /** Estado del menú de navegación en pantallas pequeñas (móvil / smartwatch). */
  protected menuAbierto = false;

  /** Estado del desplegable del candado de acceso privado. */
  protected accesoAbierto = false;

  protected alternarMenu(): void {
    this.menuAbierto = !this.menuAbierto;
    if (this.menuAbierto) {
      this.accesoAbierto = false;
    }
  }

  protected cerrarMenu(opcion:number): void {
    this.menuAbierto = false;
    //Cerrar menu porque al hacer click en un enlace, el menu se cierra automaticamente
    this.variables.setEleccion(opcion);  //Asigna el valor y notifica a suscriptores
  }

  protected alternarAcceso(): void {
    this.accesoAbierto = !this.accesoAbierto;
    if (this.accesoAbierto) {
      this.menuAbierto = false;
    }
  }
  protected sacarMensaje():void
  {
    alert("Acceso publico con login a la zona superior derecha");
  }
  protected cerrarAcceso(): void {
    this.accesoAbierto = false;
  }

  /** Cierra los desplegables al pulsar la tecla Escape. */
  @HostListener('document:keydown.escape')
  protected alPulsarEscape(): void {
    this.menuAbierto = false;
    this.accesoAbierto = false;
  }
}
