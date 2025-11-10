import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CuadroBase } from './cuadroBase/cuadroBase';
import { FormsModule } from '@angular/forms';
import { Cabeceras } from './cuadroBase/cabeceras/cabeceras';
import { Piecera } from './cuadroBase/piecera/piecera';
import { Cuerpo } from './cuadroBase/cuerpo/cuerpo';

@NgModule({
  declarations: [
    App,
    CuadroBase,
    Cabeceras,
    Piecera,
    Cuerpo
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
