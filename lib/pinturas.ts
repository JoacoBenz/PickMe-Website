export interface Pintura {
  id: number;
  nombre: string;
  slug: string;
  estilo: string;
  color: string;
  precio: number;
  gradiente: string;
  imagen?: string;
  descripcion: string;
}

export const pinturas: Pintura[] = [
  // ── Pop Art ──
  { id: 1, nombre: 'Catzilla', slug: 'catzilla', estilo: 'Pop Art', color: 'Rojo', precio: 18000, imagen: '/images/cat-godzilla.jpg', gradiente: '', descripcion: 'Un gato gigante destruye la ciudad al más puro estilo kaiju. Ilustración pop art con estética de propaganda soviética. Ideal para los amantes de los gatos y el humor visual.' },
  { id: 2, nombre: 'Neko Ramen', slug: 'neko-ramen', estilo: 'Pop Art', color: 'Multicolor', precio: 22000, imagen: '/images/cat-ramen.jpg', gradiente: '', descripcion: 'Adorable gato negro disfrutando un bowl de ramen en estilo ukiyo-e japonés. Una fusión perfecta entre la cultura pop y el arte tradicional nipón. Ideal para cocinas y comedores.' },
  { id: 3, nombre: 'Spiderman Clásico', slug: 'spiderman-clasico', estilo: 'Pop Art', color: 'Multicolor', precio: 25000, imagen: '/images/spiderman1.jpg', gradiente: '', descripcion: 'El amigable vecino en acción sobre los rascacielos de Nueva York. Ilustración vintage con estética de cómic clásico. Pieza esencial para fans del universo Marvel.' },

  // ── Deportes ──
  { id: 4, nombre: 'Messi — La Gloria Eterna', slug: 'messi-gloria-eterna', estilo: 'Deportes', color: 'Multicolor', precio: 28000, imagen: '/images/messi-wc.jpg', gradiente: '', descripcion: 'Lionel Messi y el momento más esperado: la Copa del Mundo. Collage fotográfico que captura la emoción, las lágrimas y la grandeza. Un cuadro que emociona cada vez que lo mirás.' },
  { id: 5, nombre: 'Maradona — El Diez Eterno', slug: 'maradona-diez-eterno', estilo: 'Deportes', color: 'Neutro', precio: 26000, imagen: '/images/maradona-eterno.jpg', gradiente: '', descripcion: 'Homenaje en blanco y negro al Diego. "Un pibe de barrio, como cualquiera de nosotros." Poster editorial que captura la esencia del ídolo más grande del fútbol argentino.' },

  // ── Poster Retro ──
  { id: 6, nombre: 'Espresso — Made in Italy', slug: 'espresso-made-in-italy', estilo: 'Poster Retro', color: 'Neutro', precio: 15000, imagen: '/images/espresso-italy.jpg', gradiente: '', descripcion: 'Poster vintage de café espresso con diseño gráfico italiano. Tonos verdes y tipografía clásica que evocan la dolce vita. Perfecto para cocinas, cafeterías y rincones con estilo.' },
  { id: 7, nombre: 'You Make My Day', slug: 'you-make-my-day', estilo: 'Poster Retro', color: 'Neutro', precio: 16000, imagen: '/images/you-make-my-day.jpg', gradiente: '', descripcion: 'Ilustración de una cafetera retro sirviendo el café de cada mañana. Colores pastel y estética mid-century que alegran cualquier espacio. El regalo ideal para un amante del café.' },
  { id: 8, nombre: 'Cassette Dorado', slug: 'cassette-dorado', estilo: 'Poster Retro', color: 'Neutro', precio: 19000, imagen: '/images/cassette.jpg', gradiente: '', descripcion: 'Cassette transparente con detalles dorados sobre fondo negro. Nostalgia analógica en alta definición. Una pieza elegante para estudios de música, livings y espacios creativos.' },
  { id: 9, nombre: 'DTMF — Yeh Yeh', slug: 'dtmf-yeh-yeh', estilo: 'Poster Retro', color: 'Neutro', precio: 20000, imagen: '/images/bb-poster.jpg', gradiente: '', descripcion: 'Poster estilo álbum musical con tipografía bold y paleta sepia. "El mejor de la nueva, porque me crié en la vieja." Arte urbano para quienes viven la cultura de la calle.' },

  // ── Buenos Aires ──
  { id: 10, nombre: 'Argentina Original', slug: 'argentina-original', estilo: 'Buenos Aires', color: 'Azul', precio: 17000, imagen: '/images/argentina-original.jpg', gradiente: '', descripcion: 'Doodle ilustrado con íconos de la cultura argentina: mate, asado, fútbol, empanadas, Boca Juniors y el sol de mayo. Un cuadro que grita orgullo nacional en cada trazo.' },
  { id: 11, nombre: 'Buenos Aires — Evita', slug: 'buenos-aires-evita', estilo: 'Buenos Aires', color: 'Neutro', precio: 21000, imagen: '/images/bsas-evita.jpg', gradiente: '', descripcion: 'Skyline de Buenos Aires con el icónico edificio de Evita. Ilustración monocromática con estética de poster de viaje vintage. Una declaración de amor a la ciudad porteña.' },

  // ── Ilustración ──
  { id: 12, nombre: 'Ballenas Azules', slug: 'ballenas-azules', estilo: 'Ilustración', color: 'Azul', precio: 23000, imagen: '/images/ballenas.jpg', gradiente: '', descripcion: 'Ballenas nadando entre olas estilizadas en azul profundo. Patrón decorativo con influencia art nouveau que transmite calma y conexión con el océano. Ideal para dormitorios.' },
  { id: 13, nombre: 'Cielo Nocturno', slug: 'cielo-nocturno', estilo: 'Ilustración', color: 'Multicolor', precio: 24000, imagen: '/images/clouds-night-star.jpg', gradiente: '', descripcion: 'Nubes doradas flotando en un cielo estrellado. Ilustración digital con paleta cálida sobre fondo oscuro que evoca noches de verano. Una ventana a un cielo que nunca se apaga.' },
  { id: 14, nombre: 'Entre Cielo y Cosmos', slug: 'entre-cielo-y-cosmos', estilo: 'Ilustración', color: 'Multicolor', precio: 38000, imagen: '/images/heaven-space-man.jpg', gradiente: '', descripcion: 'Un hombre entre el cielo azul y el cosmos infinito. Pintura hiperrealista que explora la dualidad entre lo terrenal y lo celestial. Pieza de impacto para espacios contemplativos.' },
  { id: 15, nombre: 'Porsche Racing', slug: 'porsche-racing', estilo: 'Ilustración', color: 'Rojo', precio: 27000, imagen: '/images/car1.jpg', gradiente: '', descripcion: 'Porsche clásico con franjas racing rojas. Ilustración con pinceladas expresivas y fondo texturado que captura la velocidad y la elegancia del automovilismo vintage.' },
  { id: 16, nombre: 'Nebulosa Cromática', slug: 'nebulosa-cromatica', estilo: 'Abstracto', color: 'Multicolor', precio: 35000, imagen: '/images/abstracto.jpg', gradiente: '', descripcion: 'Explosión de colores fluidos que evocan una nebulosa cósmica. Cada trazo transmite movimiento y energía. Pieza central ideal para livings y estudios creativos.' },
  { id: 17, nombre: 'Atardecer en la Costa', slug: 'atardecer-en-la-costa', estilo: 'Paisaje', color: 'Multicolor', precio: 42000, imagen: '/images/paisaje.jpg', gradiente: '', descripcion: 'Pintura al óleo que captura la luz dorada del atardecer sobre la costa. Colores cálidos y pinceladas expresivas que llenan de vida cualquier pared.' },
  { id: 18, nombre: 'Líneas del Silencio', slug: 'lineas-del-silencio', estilo: 'Abstracto', color: 'Multicolor', precio: 27000, imagen: '/images/minimalista.jpg', gradiente: '', descripcion: 'Trazos libres sobre fondo blanco que dialogan entre el caos y la armonía. Arte minimalista que aporta sofisticación sin sobrecargar. Ideal para espacios modernos.' },
  { id: 19, nombre: 'Jardín Salvaje', slug: 'jardin-salvaje', estilo: 'Ilustración', color: 'Multicolor', precio: 31000, imagen: '/images/botanico.jpg', gradiente: '', descripcion: 'Flores y follaje en pinceladas sueltas llenas de color y vida. Inspirado en jardines silvestres, esta obra trae la naturaleza al interior de tu hogar.' },
  { id: 20, nombre: 'Prisma Urbano', slug: 'prisma-urbano', estilo: 'Abstracto', color: 'Multicolor', precio: 29000, imagen: '/images/geometrico.jpg', gradiente: '', descripcion: 'Composición de formas geométricas vibrantes que juegan con la perspectiva y el color. Una pieza audaz que transforma cualquier ambiente en una galería contemporánea.' },
];
