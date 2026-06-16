import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Cookie } from './cookie/cookie';
import { Inicio } from './inicio/inicio';
import { Historia } from './historia/historia';
import { Productos } from './productos/productos';
import { Servicios } from './servicios/servicios';
import { Proyectos } from './proyectos/proyectos';
import { Cliente } from './cliente/cliente';
import { S4DEControlVentasInterfaz } from './s4-de-control-ventas-interfaz/s4-de-control-ventas-interfaz';
import { S4dControlVentasInterfaz } from './s4d-control-ventas-interfaz/s4d-control-ventas-interfaz';

@NgModule({
  declarations: [
    App,
    Cookie,
    Inicio,
    Historia,
    Productos,
    Servicios,
    Proyectos,
    Cliente,
    S4DEControlVentasInterfaz,
    S4dControlVentasInterfaz,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners(), provideClientHydration(withEventReplay())],
  bootstrap: [App],
})
export class AppModule {}
