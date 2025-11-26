import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  standalone: false,
  templateUrl: './cabecera.html',
  styleUrl: './cabecera.css',
})
export class Cabecera implements OnInit {
    public inicio: string="INICIO";
    public nuestraHistoria: string="NUESTRA HISTORIA";
    public anios: string[]=["2020","2021","2022","2023","2024","2025","2026"];
    public quienesSomos: string="QUIENES SOMOS";
    public blogLiterario: string="BLOG LITERARIO";
    public enlaces: string[]= ["PUBLICACIONES EN PROSA","PUBLICACIONES EN VERSO","REFLEXIONES DEL DÍA"];
    public nuestrosServicios: string="NUESTROS SERVICIOS";
    public servicios: string[]= ["CURSOS ONLINE","ENTREVISTAS ONLINE","EDICIÓN Y MAQUETACIÓN DE LIBROS","TERTULIAS","CONGRESOS INTERNACIONALES"];
    public contacto: string="CONTACTO";
    public tamanioPantalla:number=0.0;
    public puntero: number=0;

    ngOnInit()    //Al iniciarse el componente
    {
      if (typeof window !== 'undefined' && this.puntero===0) 
        {
          this.tamanioPantalla = window.innerWidth;
          //Se hace que primero no exista subrayado en los enlaces
          const elementos= document.getElementsByClassName("enlaces");
          for(let i=1;i<elementos.length;i++)
            {
              (elementos[i] as HTMLElement).style.textDecoration = "none";
            }
            (elementos[0] as HTMLElement).style.textDecoration = "underline";
            this.puntero=1;
            localStorage.setItem('punteroCabecera', this.puntero.toString());
            this.puntero=Number(localStorage.getItem('punteroCabecera'));
            //GUARDA EL VALOR EN UN ALMACENAMIENTO INTERNO PARA REGISTRAR EL VALOR ANTES DE RECARGAR LA PÁGINA
        }
    }
    /*PARA PANTALLAS DE MOVIL Y TABLET */
    public despliegaMenu():void
    {
      if (typeof window !== 'undefined') 
      {
        window.scroll(window.screen.width, 0);
        document.body.style.overflow = 'hidden'; //Inhabilita el SCROLL vertical
      }
    }
    public volverPagina():void
    {
      if (typeof window !== 'undefined') 
      {
        window.scroll((-1) * window.screen.width, 0);
        document.body.style.overflow = 'visible'; //Habilita el SCROLL vertical
      }
    }
    @HostListener('window:resize', ['$event'])
    onResize(event:any):number {
      this.tamanioPantalla = event.target.innerWidth;
      return(this.tamanioPantalla);
    }
    //Sector de botones y qué componente fue activado
    public accesoHabilitado(opcion:number):void
    {
      if (typeof window !== 'undefined')
      {
        this.puntero=1;
        switch(opcion)
        {
          case 1:
            {
              //Se hace que primero no exista subrayado en los enlaces salvo INICIO
              const elementos= document.getElementsByClassName("enlaces");
              for(let i=0;i<elementos.length;i++)
              {
                (elementos[i] as HTMLElement).style.textDecoration = "none";
              }
              //Habilita el subrayado en INICIO
              (elementos[0] as HTMLElement).style.textDecoration = "underline";
              break;
            }
          case 2:
            {
              //Se hace que primero no exista subrayado en los enlaces salvo NUESTRA HISTORIA
              const elementos= document.getElementsByClassName("enlaces");
              for(let i=0;i<elementos.length;i++)
              {
                (elementos[i] as HTMLElement).style.textDecoration = "none";
              }
              //Habilita el subrayado en NUESTRA HISTORIA
              (elementos[1] as HTMLElement).style.textDecoration = "underline";
              break;
            }
          case 3:
            {
              //Se hace que primero no exista subrayado en los enlaces salvo QUIENES SOMOS
              const elementos= document.getElementsByClassName("enlaces");
              for(let i=0;i<elementos.length;i++)
              {
                (elementos[i] as HTMLElement).style.textDecoration = "none";
              }
              //Habilita el subrayado en QUIENES SOMOS
              (elementos[2] as HTMLElement).style.textDecoration = "underline";
              break;
            }
          case 4:
            {
              //Se hace que primero no exista subrayado en los enlaces salvo BLOG LITERARIO
              const elementos= document.getElementsByClassName("enlaces");
              for(let i=0;i<elementos.length;i++)
              {
                (elementos[i] as HTMLElement).style.textDecoration = "none";
              }
              //Habilita el subrayado en BLOG LITERARIO
              (elementos[3] as HTMLElement).style.textDecoration = "underline";
              break;
            }
          case 5:
            {
              //Se hace que primero no exista subrayado en los enlaces salvo NUESTROS SERVICIOS
              const elementos= document.getElementsByClassName("enlaces");
              for(let i=0;i<elementos.length;i++)
              {
                (elementos[i] as HTMLElement).style.textDecoration = "none";
              }
              //Habilita el subrayado en NUESTROS SERVICIOS
              (elementos[4] as HTMLElement).style.textDecoration = "underline";
              break;
            }
          case 6:
            {
              //Se hace que primero no exista subrayado en los enlaces salvo CONTACTO
              const elementos= document.getElementsByClassName("enlaces");
              for(let i=0;i<elementos.length;i++)
              {
                (elementos[i] as HTMLElement).style.textDecoration = "none";
              }
              //Habilita el subrayado en CONTACTO
              (elementos[5] as HTMLElement).style.textDecoration = "underline";
              break;
            }
        }
      }
    }
  }
