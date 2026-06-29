import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Cookie } from './cuerpo/cookie/cookie';
import { Inicio } from './cuerpo/inicio/inicio';
import { Historia } from './cuerpo/historia/historia';
import { Productos } from './cuerpo/productos/productos';
import { Servicios } from './cuerpo/servicios/servicios';
import { Proyectos } from './cuerpo/proyectos/proyectos';
import { Cliente } from './cuerpo/cliente/cliente';
import { VentasInterfaz } from './cuerpo/ventasInterfaz/ventasInterfaz';
import { Cuerpo } from './cuerpo/cuerpo';
import { Cabecera } from './cabecera/cabecera';
import { Pie } from './pie/pie';
import { Error } from './cuerpo/error/error';
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
    VentasInterfaz,
    Cabecera,
    Cuerpo,
    Pie,
    Error
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners(), provideClientHydration(withEventReplay())],
  bootstrap: [App],
})
export class AppModule {}
