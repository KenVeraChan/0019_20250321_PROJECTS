import { ErrorHandler, NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { NgOptimizedImage } from '@angular/common';
import { App } from './app';
import { FormsModule } from '@angular/forms';
import { Cabecera } from './cabecera/cabecera';
import { Cuerpo } from './cuerpo/cuerpo';
import { Pie } from './pie/pie';
import { Inicio } from './cuerpo/inicio/inicio';
import { Historia } from './cuerpo/historia/historia';
import { Nosotros } from './cuerpo/nosotros/nosotros';
import { Blogs } from './cuerpo/blogs/blogs';
import { Publicaciones } from './cuerpo/publicaciones/publicaciones';
import { Servicios } from './cuerpo/servicios/servicios';
import { Contacto } from './cuerpo/contacto/contacto';
import {RouterModule, Routes} from '@angular/router';
import { Opciones } from './cabecera/opciones/opciones';
import { PaginaError } from './paginaerror/paginaerror'
import { VariablesCompartidas } from './servicios/variablesCompartidas';
import { Librointeractivo } from './cuerpo/historia/librointeractivo/librointeractivo';
import { HttpClientModule } from '@angular/common/http';
import { ErroresHttpInterceptor } from './servicios/errores-http.interceptor';
import { ErroresGlobalHandler } from './servicios/errores-global.handler';
import { EstadoErroresService } from './servicios/estado-errores.service';
import { CookieBanner } from './cookie-banner/cookie-banner';

const appRoutes: Routes=[
{path:'', component: Inicio},
{path:'inicio', component: Inicio},
{path:'nuestraHistoria', component: Historia},
{path:'quienesSomos', component: Nosotros},
{path:'blogLiterario', component: Blogs},
{path:'nuestrosServicios', component: Servicios},
{path:'publicaciones', component: Publicaciones},
{path:'contacto', component: Contacto},
{ path: '**', component: PaginaError }
];

@NgModule({
  declarations: [
    App,
    Cabecera,
    Cuerpo,
    Pie,
    Inicio,
    Historia,
    Nosotros,
    Blogs,
    Publicaciones,
    Servicios,
    Contacto,
    Opciones,
    PaginaError,
    Librointeractivo,
    CookieBanner
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
    VariablesCompartidas,
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
