import { Component } from '@angular/core';

/** Contenido promocional de un apartado (extensible añadiendo entradas al array). */
export type ServicioItem = {
  titulo: string;
  descripcion: string;
};

export type ServicioApartado = {
  id: string;
  title: string;
  teaser: string;
  items: ServicioItem[];
};

@Component({
  selector: 'app-servicios',
  standalone: false,
  templateUrl: './servicios.html',
  styleUrl: './servicios.css',
})
export class Servicios {
  /** Apartados visibles; para añadir más en el futuro, basta con otro objeto en este array. */
  public readonly apartados: ServicioApartado[] = [
    {
      id: 'cursos',
      title: 'Cursos',
      teaser: 'Formación y talleres para escribir con rigor y creatividad.',
      items: [
        {
          titulo: 'Taller de narrativa breve',
          descripcion:
            'Sesiones prácticas para cerrar relatos con estructura clara y voz propia. Próxima convocatoria: consulte fechas.',
        },
        {
          titulo: 'Curso de poesía contemporánea',
          descripcion:
            'Exploración de métrica libre, imágenes y revisiones en grupo. Inscripciones abiertas según calendario anual.',
        },
        {
          titulo: 'Escritura creativa para no iniciados',
          descripcion:
            'Un punto de partida amable para quienes desean empezar sin miedo al folio en blanco.',
        },
      ],
    },
    {
      id: 'entrevistas',
      title: 'Entrevistas',
      teaser: 'Conversaciones con autores, editores y voces del sector.',
      items: [
        {
          titulo: 'Entrevista: oficio y rutina',
          descripcion:
            'Charla sobre hábitos de escritura, revisiones y equilibrio con otras responsabilidades.',
        },
        {
          titulo: 'Entrevista: del manuscrito al lector',
          descripcion:
            'Proceso editorial visto desde ambas orillas: autoría y acompañamiento profesional.',
        },
      ],
    },
    {
      id: 'ediciones',
      title: 'Ediciones',
      teaser: 'Lanzamientos, antologías y materiales que impulsamos o recomendamos.',
      items: [
        {
          titulo: 'Antología comunitaria',
          descripcion:
            'Selección de textos de la comunidad con criterios editoriales transparentes.',
        },
        {
          titulo: 'Guía de buenas prácticas',
          descripcion:
            'Recursos descargables sobre presentación de originales y derechos básicos.',
        },
      ],
    },
    {
      id: 'tertulias',
      title: 'Tertulias',
      teaser: 'Encuentros informales para debatir lecturas y proyectos en curso.',
      items: [
        {
          titulo: 'Tertulia mensual online',
          descripcion:
            'Espacio virtual para comentar una obra propuesta y compañar redacciones abiertas.',
        },
        {
          titulo: 'Círculo presencial (según sede)',
          descripcion:
            'Encuentros locales cuando la agenda lo permita; se anuncian con antelación.',
        },
      ],
    },
    {
      id: 'congresos',
      title: 'Congresos',
      teaser: 'Eventos de mayor alcance: ponencias, mesas y networking.',
      items: [
        {
          titulo: 'Congreso anual Escritores sin Fronteras',
          descripcion:
            'Jornadas con ponentes invitados, talleres intensivos y espacio para networking entre participantes.',
        },
        {
          titulo: 'Mesa redonda: literatura y fronteras',
          descripcion:
            'Reflexión sobre traducción, migración de ideas y lectura transfronteriza.',
        },
      ],
    },
  ];

  /** Id del apartado con contenido desplegado; null si ninguno. */
  public expandedId: string | null = null;

  public toggle(id: string): void {
    this.expandedId = this.expandedId === id ? null : id;
  }

  public isOpen(id: string): boolean {
    return this.expandedId === id;
  }
}
