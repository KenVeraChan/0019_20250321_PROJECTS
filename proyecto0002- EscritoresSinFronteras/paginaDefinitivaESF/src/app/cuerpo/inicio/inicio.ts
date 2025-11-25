import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
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

      public escenas:string[]=[
        "Noticia 1: Nuevo concurso literario abierto a todos los escritores emergentes.",
        "Noticia 2: Entrevista exclusiva con el autor best-seller del año.",
        "Noticia 3: Talleres de escritura creativa disponibles en línea.",
        "Noticia 4: Lanzamiento de la nueva plataforma para compartir relatos cortos.",
        "Noticia 5: Evento virtual con autores reconocidos a nivel internacional."
      ];
}

class Noticias{
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