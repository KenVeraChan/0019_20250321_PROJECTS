import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VariablesCompartidas {

    //AREA NOTICIAS DEL APARTADO "INICIO"
      public noticia:Noticias[]=[
        new Noticias(    
        "Titular de la noticia",
        "Subtítulo de la noticia",
        "Contenido detallado de la noticia que proporciona información relevante sobre el tema tratado."
        ),
        new Noticias(    
              "Segundo titular de la noticia",
              "Segundo subtítulo de la noticia",
              "Contenido detallado del segundo noticia que proporciona información relevante sobre el tema tratado."
          ),
        new Noticias(    
              "Tercer titular de la noticia",
              "Tercer subtítulo de la noticia",
              "Contenido detallado del tercer noticia que proporciona información relevante sobre el tema tratado."
          ),  
        new Noticias(    
              "Cuarto titular de la noticia",
              "Cuarto subtítulo de la noticia",
              "Contenido detallado del cuarto noticia que proporciona información relevante sobre el tema tratado."
          ),
        new Noticias(
              "Quinto titular de la noticia",
              "Quinto subtítulo de la noticia",
              "Contenido detallado del quinto noticia que proporciona información relevante sobre el tema tratado."
          )
    ];

      //AREA HISTORIAS DEL APARTADO "NUESTRA HISTORIA"
      public historias: Historias[]=[
        new Historias(0,9,"2024","Inicio en un grupo de escritura y lectura online"),
        new Historias(1,12,"2024","Escritores Sin Fronteras, crea su primer logo corporativo"),
        new Historias(2,1,"2025","Escritores Sin Fronteras, crece en usuarios suscritos tanto de Facebook como de Instagram"),
        new Historias(3,5,"2025","Escritores Sin Fronteras, consigue su registro mercantil en Colombia como corporación online en existencia"),
        new Historias(4,8,"2025","Escritores Sin Fronteras, registra sus primeras ganancias")];

      public escenas:string[]=[
        "Noticia 1: Nuevo concurso literario abierto a todos los escritores emergentes.",
        "Noticia 2: Entrevista exclusiva con el autor best-seller del año.",
        "Noticia 3: Talleres de escritura creativa disponibles en línea.",
        "Noticia 4: Lanzamiento de la nueva plataforma para compartir relatos cortos.",
        "Noticia 5: Evento virtual con autores reconocidos a nivel internacional."
      ];
}
class Noticias
{
    private titular:string="";
    private subTitular:string="";
    private noticia:string="";

    constructor(titular:string, subTitular:string, noticia:string){
        this.titular=titular;
        this.subTitular=subTitular;
        this.noticia=noticia;
    } 
    public getTitular():string{
        return this.titular;
    }
    public getsubTitular():string{
        return this.subTitular;
    }
    public getNoticia():string{
        return this.noticia;
    } 
}
class Historias
{
    private id:number=0.0;
    private mes: number=0; //Luego se convertirá en el nombre del mes según numero incluido
    private anio:string="";
    private contenido: string="";
    private mesTexto: string="";

    constructor(id:number,mes: number,anio: string,contenido:string)
    {
      this.id=id;
      this.mes=mes;
      this.anio=anio;
      this.contenido=contenido;
    }
    public setId(id:number):void
    {
      this.id=id;
    }
    public setMes(mes:number):void
    {
      this.mes=mes;
    }
    public setAnio(anio:string):void
    {
      this.anio=anio
    }
    public setContenido(contenido:string):void
    {
      this.contenido=contenido;
    }
    public getId():number{
        return this.id;
    }
    public getAnio():string
    {
      return this.anio;
    }
    public getMes():string
    {
      switch(this.mes)
      {
        case 1:
          {
            this.mesTexto="ENERO";
            break;
          }
        case 2:
          {
            this.mesTexto="FEBRERO";
            break;
          }
        case 3:
          {
            this.mesTexto="MARZO";
            break;
          }
        case 4:
          {
            this.mesTexto="ABRIL";
            break;
          }
        case 5:
          {
            this.mesTexto="MAYO";
            break;
          }
        case 6:
          {
            this.mesTexto="JUNIO";
            break;
          }
        case 7:
          {
            this.mesTexto="JULIO";
            break;
          }
        case 8:
          {
            this.mesTexto="AGOSTO";
            break;
          }
        case 9:
          {
            this.mesTexto="SEPTIEMBRE";
            break;
          }
        case 10:
          {
            this.mesTexto="OCTUBRE";
            break;
          }
        case 11:
          {
            this.mesTexto="NOVIEMBRE";
            break;
          }
        case 12:
          {
            this.mesTexto="DICIEMBRE";
            break;
          }
        default:
          {
            this.mesTexto="ERROR - REVISE EL MES";
            break;
          }
      }
    return this.mesTexto;
    }
    public getContenido():string
    {
      return this.contenido;
    }
}