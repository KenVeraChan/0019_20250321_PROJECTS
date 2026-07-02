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
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { HttpClientModule, provideHttpClient, withFetch, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EstadoErroresService } from './services/estado-errores.service';
import { ErroresHttpInterceptor } from '../app/services/errores-http.interceptor';
import { variablesCompartidas } from '../app/services/variablesCompartidas';
import { ErrorHandler } from '@angular/core';
import { ErroresGlobalHandler } from '../app/services/errores-global.handler';


const appRoutes: Routes=
[
{path:'', redirectTo: 'inicio', pathMatch: 'full'},
{path:'inicio', component: Inicio},
{path:'historia', component: Historia},
{path:'productos', component: Productos},
{path:'servicios', component: Servicios},
{path:'proyectos', component: Proyectos},
{path:'cliente', component: Cliente},
{path: '**', component: Error}
];

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
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgOptimizedImage,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),
    EstadoErroresService,
      { provide: HTTP_INTERCEPTORS, useClass: ErroresHttpInterceptor, multi: true },
      { provide: ErrorHandler, useClass: ErroresGlobalHandler },
    variablesCompartidas,
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App],
})
export class AppModule {}
