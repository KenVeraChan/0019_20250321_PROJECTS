import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FormsModule } from '@angular/forms';
import { Cabecera } from './cabecera/cabecera';
import { Cuerpo } from './cuerpo/cuerpo';
import { Pie } from './pie/pie';
import { Inicio } from './cuerpo/inicio/inicio';
import { Historia } from './cuerpo/historia/historia';
import { Nosotros } from './cuerpo/nosotros/nosotros';
import { Blogs } from './cuerpo/blogs/blogs';
import { Servicios } from './cuerpo/servicios/servicios';
import { Contacto } from './cuerpo/contacto/contacto';
import {RouterModule, Routes} from '@angular/router';
import { Opciones } from './cabecera/opciones/opciones';

const appRoutes: Routes=[
{path:'', component: Inicio},
{path:'inicio', component: Inicio},
{path:'nuestraHistoria', component: Historia},
{path:'quienesSomos', component: Nosotros},
{path:'blogLiterario', component: Blogs},
{path:'nuestrosServicios', component: Servicios},
{path:'contacto', component: Contacto}
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
    Servicios,
    Contacto,
    Opciones
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes) 
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
