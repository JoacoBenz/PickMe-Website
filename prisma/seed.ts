import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const productos = [
  { name: 'Catzilla', slug: 'catzilla', style: 'Pop Art', color: 'Rojo', priceARS: 18000, imageUrl: '/images/cat-godzilla.jpg', description: 'Un gato gigante destruye la ciudad al más puro estilo kaiju. Ilustración pop art con estética de propaganda soviética. Ideal para los amantes de los gatos y el humor visual.' },
  { name: 'Neko Ramen', slug: 'neko-ramen', style: 'Pop Art', color: 'Multicolor', priceARS: 22000, imageUrl: '/images/cat-ramen.jpg', description: 'Adorable gato negro disfrutando un bowl de ramen en estilo ukiyo-e japonés. Una fusión perfecta entre la cultura pop y el arte tradicional nipón. Ideal para cocinas y comedores.' },
  { name: 'Spiderman Clásico', slug: 'spiderman-clasico', style: 'Pop Art', color: 'Multicolor', priceARS: 25000, imageUrl: '/images/spiderman1.jpg', description: 'El amigable vecino en acción sobre los rascacielos de Nueva York. Ilustración vintage con estética de cómic clásico. Pieza esencial para fans del universo Marvel.' },
  { name: 'Messi — La Gloria Eterna', slug: 'messi-gloria-eterna', style: 'Deportes', color: 'Multicolor', priceARS: 28000, imageUrl: '/images/messi-wc.jpg', description: 'Lionel Messi y el momento más esperado: la Copa del Mundo. Collage fotográfico que captura la emoción, las lágrimas y la grandeza. Un cuadro que emociona cada vez que lo mirás.' },
  { name: 'Maradona — El Diez Eterno', slug: 'maradona-diez-eterno', style: 'Deportes', color: 'Neutro', priceARS: 26000, imageUrl: '/images/maradona-eterno.jpg', description: 'Homenaje en blanco y negro al Diego. Poster editorial que captura la esencia del ídolo más grande del fútbol argentino.' },
  { name: 'Espresso — Made in Italy', slug: 'espresso-made-in-italy', style: 'Poster Retro', color: 'Neutro', priceARS: 15000, imageUrl: '/images/espresso-italy.jpg', description: 'Poster vintage de café espresso con diseño gráfico italiano. Tonos verdes y tipografía clásica que evocan la dolce vita. Perfecto para cocinas, cafeterías y rincones con estilo.' },
  { name: 'You Make My Day', slug: 'you-make-my-day', style: 'Poster Retro', color: 'Neutro', priceARS: 16000, imageUrl: '/images/you-make-my-day.jpg', description: 'Ilustración de una cafetera retro sirviendo el café de cada mañana. Colores pastel y estética mid-century que alegran cualquier espacio. El regalo ideal para un amante del café.' },
  { name: 'Cassette Dorado', slug: 'cassette-dorado', style: 'Poster Retro', color: 'Neutro', priceARS: 19000, imageUrl: '/images/cassette.jpg', description: 'Cassette transparente con detalles dorados sobre fondo negro. Nostalgia analógica en alta definición. Una pieza elegante para estudios de música, livings y espacios creativos.' },
  { name: 'DTMF — Yeh Yeh', slug: 'dtmf-yeh-yeh', style: 'Poster Retro', color: 'Neutro', priceARS: 20000, imageUrl: '/images/bb-poster.jpg', description: 'Poster estilo álbum musical con tipografía bold y paleta sepia. Arte urbano para quienes viven la cultura de la calle.' },
  { name: 'Argentina Original', slug: 'argentina-original', style: 'Buenos Aires', color: 'Azul', priceARS: 17000, imageUrl: '/images/argentina-original.jpg', description: 'Doodle ilustrado con íconos de la cultura argentina: mate, asado, fútbol, empanadas, Boca Juniors y el sol de mayo. Un cuadro que grita orgullo nacional en cada trazo.' },
  { name: 'Buenos Aires — Evita', slug: 'buenos-aires-evita', style: 'Buenos Aires', color: 'Neutro', priceARS: 21000, imageUrl: '/images/bsas-evita.jpg', description: 'Skyline de Buenos Aires con el icónico edificio de Evita. Ilustración monocromática con estética de poster de viaje vintage. Una declaración de amor a la ciudad porteña.' },
  { name: 'Ballenas Azules', slug: 'ballenas-azules', style: 'Ilustración', color: 'Azul', priceARS: 23000, imageUrl: '/images/ballenas.jpg', description: 'Ballenas nadando entre olas estilizadas en azul profundo. Patrón decorativo con influencia art nouveau que transmite calma y conexión con el océano. Ideal para dormitorios.' },
  { name: 'Cielo Nocturno', slug: 'cielo-nocturno', style: 'Ilustración', color: 'Multicolor', priceARS: 24000, imageUrl: '/images/clouds-night-star.jpg', description: 'Nubes doradas flotando en un cielo estrellado. Ilustración digital con paleta cálida sobre fondo oscuro que evoca noches de verano. Una ventana a un cielo que nunca se apaga.' },
  { name: 'Entre Cielo y Cosmos', slug: 'entre-cielo-y-cosmos', style: 'Ilustración', color: 'Multicolor', priceARS: 38000, imageUrl: '/images/heaven-space-man.jpg', description: 'Un hombre entre el cielo azul y el cosmos infinito. Pintura hiperrealista que explora la dualidad entre lo terrenal y lo celestial. Pieza de impacto para espacios contemplativos.' },
  { name: 'Porsche Racing', slug: 'porsche-racing', style: 'Ilustración', color: 'Rojo', priceARS: 27000, imageUrl: '/images/car1.jpg', description: 'Porsche clásico con franjas racing rojas. Ilustración con pinceladas expresivas y fondo texturado que captura la velocidad y la elegancia del automovilismo vintage.' },
  { name: 'Nebulosa Cromática', slug: 'nebulosa-cromatica', style: 'Abstracto', color: 'Multicolor', priceARS: 35000, imageUrl: '/images/abstracto.jpg', description: 'Explosión de colores fluidos que evocan una nebulosa cósmica. Cada trazo transmite movimiento y energía. Pieza central ideal para livings y estudios creativos.' },
  { name: 'Atardecer en la Costa', slug: 'atardecer-en-la-costa', style: 'Paisaje', color: 'Multicolor', priceARS: 42000, imageUrl: '/images/paisaje.jpg', description: 'Pintura al óleo que captura la luz dorada del atardecer sobre la costa. Colores cálidos y pinceladas expresivas que llenan de vida cualquier pared.' },
  { name: 'Líneas del Silencio', slug: 'lineas-del-silencio', style: 'Abstracto', color: 'Multicolor', priceARS: 27000, imageUrl: '/images/minimalista.jpg', description: 'Trazos libres sobre fondo blanco que dialogan entre el caos y la armonía. Arte minimalista que aporta sofisticación sin sobrecargar. Ideal para espacios modernos.' },
  { name: 'Jardín Salvaje', slug: 'jardin-salvaje', style: 'Ilustración', color: 'Multicolor', priceARS: 31000, imageUrl: '/images/botanico.jpg', description: 'Flores y follaje en pinceladas sueltas llenas de color y vida. Inspirado en jardines silvestres, esta obra trae la naturaleza al interior de tu hogar.' },
  { name: 'Prisma Urbano', slug: 'prisma-urbano', style: 'Abstracto', color: 'Multicolor', priceARS: 29000, imageUrl: '/images/geometrico.jpg', description: 'Composición de formas geométricas vibrantes que juegan con la perspectiva y el color. Una pieza audaz que transforma cualquier ambiente en una galería contemporánea.' },
];

async function main() {
  console.log('Seeding products...');

  for (const p of productos) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  console.log(`Seeded ${productos.length} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
