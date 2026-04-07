/* ============================================================
   Zodiac-based painting recommendation engine
   144 unique luna x ascendente combinations
   ============================================================ */

export type Elemento = 'Fuego' | 'Tierra' | 'Aire' | 'Agua';

export interface Signo {
  name: string;
  emoji: string;
  element: Elemento;
}

export interface ZodiacResult {
  luna: string;
  ascendente: string;
  nombre: string;
  slug: string;
  imagen: string;
  descripcion: string;
  elementDominante: Elemento;
}

export const signos: Signo[] = [
  { name: 'Aries',       emoji: '\u2648', element: 'Fuego' },
  { name: 'Tauro',       emoji: '\u2649', element: 'Tierra' },
  { name: 'G\u00e9minis',    emoji: '\u264A', element: 'Aire' },
  { name: 'C\u00e1ncer',     emoji: '\u264B', element: 'Agua' },
  { name: 'Leo',         emoji: '\u264C', element: 'Fuego' },
  { name: 'Virgo',       emoji: '\u264D', element: 'Tierra' },
  { name: 'Libra',       emoji: '\u264E', element: 'Aire' },
  { name: 'Escorpio',    emoji: '\u264F', element: 'Agua' },
  { name: 'Sagitario',   emoji: '\u2650', element: 'Fuego' },
  { name: 'Capricornio', emoji: '\u2651', element: 'Tierra' },
  { name: 'Acuario',     emoji: '\u2652', element: 'Aire' },
  { name: 'Piscis',      emoji: '\u2653', element: 'Agua' },
];

/* Helper: strip accents for filenames */
function toFileSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-');
}

/* Determine dominant element from two signs */
function dominantElement(a: Elemento, b: Elemento): Elemento {
  if (a === b) return a;
  const priority: Elemento[] = ['Fuego', 'Agua', 'Tierra', 'Aire'];
  return priority.indexOf(a) <= priority.indexOf(b) ? a : b;
}

/* ── All 144 combination data ── */

interface ComboData {
  nombre: string;
  descripcion: string;
}

const comboTable: Record<string, ComboData> = {
  /* ── Aries Luna ── */
  'Aries-Aries': {
    nombre: 'Doble Llama Eterna',
    descripcion: 'Dos fuegos que arden en el mismo coraz\u00f3n. Este cuadro captura la pasi\u00f3n desbordante y el impulso imparable de quien vive encendido por dentro. Una obra de rojos intensos y trazos audaces que grita valent\u00eda.',
  },
  'Aries-Tauro': {
    nombre: 'Brasa en la Roca',
    descripcion: 'El fuego del impulso encuentra la paciencia de la tierra. Esta pintura fusiona tonos c\u00e1lidos con texturas org\u00e1nicas, representando la fuerza que nace cuando la pasi\u00f3n se ancla en lo s\u00f3lido.',
  },
  'Aries-G\u00e9minis': {
    nombre: 'Chispa de Mil Voces',
    descripcion: 'La energ\u00eda impulsiva del fuego se dispersa en un torbellino de ideas. Colores el\u00e9ctricos y formas fragmentadas crean un mosaico vibrante de curiosidad y acci\u00f3n.',
  },
  'Aries-C\u00e1ncer': {
    nombre: 'Volcanes del Refugio',
    descripcion: 'Lava ardiente que busca un hogar. Esta obra mezcla rojos profundos con azules protectores, revelando la ternura escondida detr\u00e1s de la armadura del guerrero.',
  },
  'Aries-Leo': {
    nombre: 'Llamarada Interior',
    descripcion: 'Dos fuegos reales se encuentran en una explosi\u00f3n de gloria. Dorados y escarlatas danzan en una composici\u00f3n majestuosa que irradia confianza, poder y un magnetismo imposible de ignorar.',
  },
  'Aries-Virgo': {
    nombre: 'Fuego Ordenado',
    descripcion: 'La llama salvaje encuentra su forma perfecta. L\u00edneas precisas contienen la energ\u00eda de tonos \u00edgneos, creando un equilibrio entre la pasi\u00f3n descontrolada y la belleza del detalle.',
  },
  'Aries-Libra': {
    nombre: 'Espada y Balanza',
    descripcion: 'El impulso del combate se suaviza con armon\u00eda. Esta obra equilibra formas agresivas con curvas elegantes, pintada en contrastes de rojo y rosa antiguo.',
  },
  'Aries-Escorpio': {
    nombre: 'Fuego en las Profundidades',
    descripcion: 'La energ\u00eda volcánica se sumerge en aguas oscuras. Rojos magm\u00e1ticos y negros abismales crean una obra de intensidad magn\u00e9tica, donde la pasi\u00f3n y el misterio se devoran mutuamente.',
  },
  'Aries-Sagitario': {
    nombre: 'Centella Viajera',
    descripcion: 'Fuego sobre fuego en un horizonte infinito. Trazos din\u00e1micos y colores expansivos celebran la libertad de quien siempre busca el pr\u00f3ximo amanecer.',
  },
  'Aries-Capricornio': {
    nombre: 'Cumbre en Llamas',
    descripcion: 'La ambici\u00f3n escala monta\u00f1as mientras el fuego ilumina el camino. Tonos tierra coronados por rojos incandescentes simbolizan la conquista que solo logra quien no se detiene.',
  },
  'Aries-Acuario': {
    nombre: 'Rayo Rebelde',
    descripcion: 'Electricidad y fuego colisionan en un estallido de originalidad. Neon y escarlata se entrelazan en una obra que rompe moldes y celebra la irreverencia creativa.',
  },
  'Aries-Piscis': {
    nombre: 'Vapor de Batalla',
    descripcion: 'El fuego toca el agua y nace una niebla m\u00edstica. Esta obra difumina los bordes entre la acci\u00f3n y el sue\u00f1o, con tonos c\u00e1lidos que se disuelven en lavandas oce\u00e1nicos.',
  },

  /* ── Tauro Luna ── */
  'Tauro-Aries': {
    nombre: 'Jard\u00edn en Erupci\u00f3n',
    descripcion: 'Flores robustas brotan de tierra volc\u00e1nica. La calma del jard\u00edn se enciende con pinceladas de fuego, representando la belleza que nace del contraste entre paciencia y estallido.',
  },
  'Tauro-Tauro': {
    nombre: 'Ra\u00edces Infinitas',
    descripcion: 'La tierra se abraza a s\u00ed misma en capas de texturas org\u00e1nicas. Verdes musgo y marrones profundos crean un paisaje de serenidad absoluta. Un cuadro que es puro refugio.',
  },
  'Tauro-G\u00e9minis': {
    nombre: 'Pradera de Ecos',
    descripcion: 'El campo abierto susurra mil historias al viento. Tonos terrosos se mezclan con amarillos \u00e1giles, representando una mente curiosa con pies firmes en la tierra.',
  },
  'Tauro-C\u00e1ncer': {
    nombre: 'Nido de Arcilla',
    descripcion: 'El hogar perfecto moldeado con las manos. Tonos c\u00e1lidos de terracota y azul luna crean una obra que envuelve, protege y recuerda lo sagrado de la intimidad.',
  },
  'Tauro-Leo': {
    nombre: 'Trono de Roble',
    descripcion: 'La nobleza de la tierra sostiene la corona del sol. Dorados regios sobre fondos de madera oscura celebran la dignidad de quien brilla sin necesidad de moverse.',
  },
  'Tauro-Virgo': {
    nombre: 'Surco Perfecto',
    descripcion: 'Cada l\u00ednea tiene prop\u00f3sito, cada color su lugar exacto. Esta obra celebra la belleza de lo meticuloso con paleta de tierra sabia y verdes curativos.',
  },
  'Tauro-Libra': {
    nombre: 'Terciopelo y Bronce',
    descripcion: 'Texturas lujosas se encuentran en perfecta armon\u00eda. La sensualidad terrestre de Tauro se eleva con la elegancia a\u00e9rea de Libra en tonos pastel y cobre.',
  },
  'Tauro-Escorpio': {
    nombre: 'Bosque Sumergido',
    descripcion: 'Ra\u00edces antiguas se hunden en aguas oscuras y profundas. Una obra de verdes nocturnos y azules abismales que habla de lealtad inquebrantable y deseo en silencio.',
  },
  'Tauro-Sagitario': {
    nombre: 'Horizonte de Trigo',
    descripcion: 'Campos dorados se extienden hacia un cielo infinito. La tierra fértil anhela la aventura, creando una obra luminosa donde lo seguro y lo salvaje conviven.',
  },
  'Tauro-Capricornio': {
    nombre: 'Monta\u00f1a de Jade',
    descripcion: 'La piedra preciosa de la paciencia. Verdes profundos y grises p\u00e9treos forman un paisaje de fortaleza silenciosa. Una pintura para quienes construyen imperios en calma.',
  },
  'Tauro-Acuario': {
    nombre: 'Ra\u00edces en el Viento',
    descripcion: 'Lo est\u00e1tico y lo libre colisionan. Formas org\u00e1nicas se fragmentan con l\u00edneas el\u00e9ctricas en esta obra que celebra la tensi\u00f3n creativa entre tradici\u00f3n y revoluci\u00f3n.',
  },
  'Tauro-Piscis': {
    nombre: 'Lago en el Bosque',
    descripcion: 'Aguas cristalinas reflejan un dosel de hojas eternas. Verde esmeralda y azul opalino se funden en una pintura de tranquilidad po\u00e9tica y conexi\u00f3n con lo invisible.',
  },

  /* ── Géminis Luna ── */
  'G\u00e9minis-Aries': {
    nombre: 'Cometa de Palabras',
    descripcion: 'Una estela de fuego escribe mensajes en el cielo nocturno. Trazos r\u00e1pidos y colores encendidos capturan la mente veloz que act\u00faa antes de pensar.',
  },
  'G\u00e9minis-Tauro': {
    nombre: 'Biblioteca en el Jard\u00edn',
    descripcion: 'P\u00e1ginas volando entre flores. La curiosidad a\u00e9rea encuentra ra\u00edces en un paisaje de verdes sabios y blancos papel, donde cada idea tiene su lugar.',
  },
  'G\u00e9minis-G\u00e9minis': {
    nombre: 'Espejo de Viento',
    descripcion: 'Dos reflejos que nunca son iguales. Formas sim\u00e9tricas que se distorsionan con el movimiento, en una paleta de plata y celeste que celebra la dualidad infinita.',
  },
  'G\u00e9minis-C\u00e1ncer': {
    nombre: 'Carta a la Luna',
    descripcion: 'Palabras que flotan hacia el cielo nocturno. Azules suaves y blancos luminosos crean una obra \u00edntima donde la comunicaci\u00f3n se convierte en plegaria emocional.',
  },
  'G\u00e9minis-Leo': {
    nombre: 'Escenario Doble',
    descripcion: 'Dos personalidades, un solo escenario brillante. Dorados teatrales y amarillos nerviosos componen una obra que celebra a quien sabe ser protagonista y p\u00fablico a la vez.',
  },
  'G\u00e9minis-Virgo': {
    nombre: 'Mapa del Pensamiento',
    descripcion: 'Cada conexi\u00f3n neural dibujada con precisi\u00f3n. L\u00edneas finas en tonos verde menta y gris grafito forman una cartograf\u00eda de la mente analítica que nunca descansa.',
  },
  'G\u00e9minis-Libra': {
    nombre: 'Brisa entre Espejos',
    descripcion: 'El aire juega con reflejos infinitos. Tonos rosados y plateados crean una obra et\u00e9rea de armon\u00eda social y encanto intelectual que flota en pura ligereza.',
  },
  'G\u00e9minis-Escorpio': {
    nombre: 'Susurro Cifrado',
    descripcion: 'Mensajes ocultos en capas de tinta profunda. El azul medianoche y el violeta oscuro esconden palabras que solo los m\u00e1s atentos pueden descifrar.',
  },
  'G\u00e9minis-Sagitario': {
    nombre: 'Atlas de los Vientos',
    descripcion: 'Un mapa de rutas imposibles dibujado con corrientes de aire. Colores de atardecer y trazos expansivos celebran la mente que viaja sin moverse del sitio.',
  },
  'G\u00e9minis-Capricornio': {
    nombre: 'Reloj de Arena Alado',
    descripcion: 'El tiempo medido por alas de mariposa. Dorados sobrios y azules mercuriales crean una obra donde la ligereza mental y la disciplina terrestre se complementan.',
  },
  'G\u00e9minis-Acuario': {
    nombre: 'Se\u00f1al del Futuro',
    descripcion: 'Frecuencias de luz transmitiendo ideas que a\u00fan no existen. Ne\u00f3n y plata sobre fondo oscuro forman una obra de vanguardia pura y comunicaci\u00f3n interestelar.',
  },
  'G\u00e9minis-Piscis': {
    nombre: 'Burbujas de Tinta',
    descripcion: 'Palabras que se disuelven en el agua. Acuarelas diluidas en azul y violeta crean una obra donde la l\u00f3gica se rinde ante la poes\u00eda y todo flota en belleza.',
  },

  /* ── Cáncer Luna ── */
  'C\u00e1ncer-Aries': {
    nombre: 'Marea de Fuego',
    descripcion: 'Olas encendidas rompen contra la orilla emocional. Rojos apasionados y azules protectores chocan en una pintura que revela la fuerza que nace del sentir profundo.',
  },
  'C\u00e1ncer-Tauro': {
    nombre: 'Casa de Coral',
    descripcion: 'Un refugio construido con capas de tiempo y afecto. Tonos rosa coral y tierra c\u00e1lida crean un espacio visual donde cada mirada es un abrazo de vuelta a casa.',
  },
  'C\u00e1ncer-G\u00e9minis': {
    nombre: 'Conchas Parlantes',
    descripcion: 'El mar susurra historias al o\u00eddo curioso. Turquesas y blancos nacarados se combinan con l\u00edneas juguetonas en una obra de emoci\u00f3n expresada con ligereza.',
  },
  'C\u00e1ncer-C\u00e1ncer': {
    nombre: 'Luna sobre Luna',
    descripcion: 'Dos lunas reflejadas en un mar en calma. Plateados y azules lunares crean un paisaje de introspecci\u00f3n infinita, donde la emoci\u00f3n se refleja en s\u00ed misma eternamente.',
  },
  'C\u00e1ncer-Leo': {
    nombre: 'Sol en la Bahía',
    descripcion: 'El sol poniente dora las aguas de una bahía secreta. Naranjas c\u00e1lidos y azules profundos componen una obra donde la emoci\u00f3n se viste de majestuosidad.',
  },
  'C\u00e1ncer-Virgo': {
    nombre: 'Herbolario Lunar',
    descripcion: 'Hierbas medicinales cultivadas bajo la luz de la luna. Verdes suaves y plateados curativos forman una obra de sanaci\u00f3n silenciosa y cuidado met\u00f3dico.',
  },
  'C\u00e1ncer-Libra': {
    nombre: 'Perla en la Balanza',
    descripcion: 'La emoci\u00f3n m\u00e1s preciosa encontrando su equilibrio. Blancos nacarados y rosas delicados crean una obra de belleza emocional armonizada con gracia est\u00e9tica.',
  },
  'C\u00e1ncer-Escorpio': {
    nombre: 'Ab\u00edso Maternal',
    descripcion: 'Las aguas m\u00e1s profundas guardan el amor m\u00e1s intenso. Azules abismales y violetas nocturnos pintan una obra de entrega total y protecci\u00f3n feroz e incondicional.',
  },
  'C\u00e1ncer-Sagitario': {
    nombre: 'Faro del Horizonte',
    descripcion: 'Una luz gu\u00eda desde la costa hacia lo desconocido. Amarillos c\u00e1lidos y azules oce\u00e1nicos se encuentran en una obra que abraza y libera al mismo tiempo.',
  },
  'C\u00e1ncer-Capricornio': {
    nombre: 'Castillo de Arena Eterna',
    descripcion: 'Lo efímero construido para durar. Arena dorada y gris piedra forman una fortaleza emocional que desaf\u00eda las mareas con estructura y ternura a partes iguales.',
  },
  'C\u00e1ncer-Acuario': {
    nombre: 'Lluvia Electrificada',
    descripcion: 'Gotas de emoci\u00f3n cargadas de electricidad futurista. Azul cerúleo y destellos ne\u00f3n crean una obra donde el coraz\u00f3n late al ritmo de lo inesperado.',
  },
  'C\u00e1ncer-Piscis': {
    nombre: 'Mareas del Alma',
    descripcion: 'Dos oc\u00e9anos se funden en un abrazo infinito. Azules opalescentes y verdes marinos crean la obra m\u00e1s emotiva de la colecci\u00f3n: pura intuici\u00f3n hecha color.',
  },

  /* ── Leo Luna ── */
  'Leo-Aries': {
    nombre: 'Corona de Centellas',
    descripcion: 'Fuego que re\u00edna sobre fuego. Dorados imperiales y rojos ardientes explotan en una composici\u00f3n de poder absoluto. Una obra para quienes nacieron para liderar.',
  },
  'Leo-Tauro': {
    nombre: 'Trono en el Prado',
    descripcion: 'La realeza descansa entre flores silvestres. Dorado y verde esmeralda crean un paisaje donde el poder se expresa con abundancia natural y generosidad terrestre.',
  },
  'Leo-G\u00e9minis': {
    nombre: 'Carrusel de Estrellas',
    descripcion: 'El brillo del sol jugando con la rapidez del viento. Amarillos brillantes y celestes vivos giran en una obra festiva de creatividad desbordante.',
  },
  'Leo-C\u00e1ncer': {
    nombre: 'Le\u00f3n de Agua',
    descripcion: 'La majestuosidad protege con ternura oce\u00e1nica. Dorados c\u00e1lidos se derraman sobre azules profundos en una obra donde la grandeza es sin\u00f3nimo de cuidado.',
  },
  'Leo-Leo': {
    nombre: 'Sol Absoluto',
    descripcion: 'Un sol que ocupa todo el lienzo. Oro puro, \u00e1mbar y fuego blanco componen una obra deslumbrante de autoconfianza radiante. Imposible no mirarla.',
  },
  'Leo-Virgo': {
    nombre: 'Orfebre del Sol',
    descripcion: 'Cada rayo de luz tallado con precisi\u00f3n milim\u00e9trica. Dorados delicados y l\u00edneas finas crean una joya visual donde la creatividad se pule hasta la perfecci\u00f3n.',
  },
  'Leo-Libra': {
    nombre: 'Gala de Terciopelo',
    descripcion: 'Elegancia digna de un escenario real. Borgoña, dorado y marfil se entrelazan en una obra que captura la gracia de quien brilla en sociedad sin esfuerzo.',
  },
  'Leo-Escorpio': {
    nombre: 'Eclipse Dorado',
    descripcion: 'El sol desaparece tras la luna oscura. Dorado y negro se enfrentan en una obra de magnetismo intenso donde la luz y la sombra luchan por dominar.',
  },
  'Leo-Sagitario': {
    nombre: 'Hoguera del Nómada',
    descripcion: 'El fuego de la celebraci\u00f3n bajo cielos abiertos. Naranjas expansivos y violetas de atardecer crean una fiesta visual de libertad generosa y alegr\u00eda contagiosa.',
  },
  'Leo-Capricornio': {
    nombre: 'Cetro de Piedra',
    descripcion: 'El poder que perdura est\u00e1 tallado en roca. Dorado envejecido y gris granito componen una obra de autoridad permanente y legado construido con intenci\u00f3n.',
  },
  'Leo-Acuario': {
    nombre: 'Supernova Social',
    descripcion: 'Una estrella que explota iluminando a todos. Ne\u00f3n dorado y azul el\u00e9ctrico forman una obra de carisma revolucionario y liderazgo que mira hacia el futuro.',
  },
  'Leo-Piscis': {
    nombre: 'Rey del Coral',
    descripcion: 'Una corona de criaturas marinas iridiscentes. Dorado y tornasol oce\u00e1nico crean una obra donde la nobleza se disuelve en sensibilidad art\u00edstica y compasi\u00f3n.',
  },

  /* ── Virgo Luna ── */
  'Virgo-Aries': {
    nombre: 'Bistur\u00ed de Fuego',
    descripcion: 'La precisi\u00f3n corta con llama viva. L\u00edneas rojas incisivas sobre fondo blanco cl\u00ednico crean una obra de eficiencia apasionada y acci\u00f3n calculada al detalle.',
  },
  'Virgo-Tauro': {
    nombre: 'Herbario Sagrado',
    descripcion: 'Cada hoja prensada con amor y catalogada con esmero. Verdes bot\u00e1nicos y marrones papel crean un gabinete visual de la belleza natural m\u00e1s pura y ordenada.',
  },
  'Virgo-G\u00e9minis': {
    nombre: 'Filigrana de Datos',
    descripcion: 'Informaci\u00f3n transformada en arte decorativo. L\u00edneas finísimas en gris y verde menta trazan patrones complejos que revelan la belleza oculta en la l\u00f3gica.',
  },
  'Virgo-C\u00e1ncer': {
    nombre: 'Botica del Alma',
    descripcion: 'Remedios emocionales ordenados en frascos de cristal. Azules curativos y blancos esterilizados crean una farmacia visual donde cada color sana una herida distinta.',
  },
  'Virgo-Leo': {
    nombre: 'Reloj de Sol Dorado',
    descripcion: 'El tiempo medido por la luz del astro rey. Dorados c\u00e1lidos y sombras precisas componen una obra donde la disciplina se ilumina con orgullo solar.',
  },
  'Virgo-Virgo': {
    nombre: 'Geometr\u00eda del Silencio',
    descripcion: 'Orden absoluto en cada p\u00edxel. Blancos, grises y un solo toque de verde salvia crean una obra maestra del minimalismo perfeccionista. El silencio hecho forma.',
  },
  'Virgo-Libra': {
    nombre: 'Simetr\u00eda Natural',
    descripcion: 'La perfecci\u00f3n de una hoja reflejada en el agua. Verdes suaves y rosas p\u00e1lidos componen una obra donde el an\u00e1lisis se viste de gracia y la belleza tiene estructura.',
  },
  'Virgo-Escorpio': {
    nombre: 'Microscopio Abisal',
    descripcion: 'Lo invisible revelado en el fondo del oc\u00e9ano. Azules oscuros y detalles microsc\u00f3picos crean una obra de investigaci\u00f3n profunda donde nada escapa al ojo atento.',
  },
  'Virgo-Sagitario': {
    nombre: 'Brújula Botánica',
    descripcion: 'Una rosa de los vientos hecha de hojas y flores. Verdes viajeros y amarillos aventureros componen una gu\u00eda visual para quien explora el mundo con m\u00e9todo.',
  },
  'Virgo-Capricornio': {
    nombre: 'Catedral de Cuarzo',
    descripcion: 'Cristales perfectos formando una arquitectura imposible. Transparencias y grises minerales crean una obra monumental de precisi\u00f3n y permanencia silenciosa.',
  },
  'Virgo-Acuario': {
    nombre: 'Algoritmo Org\u00e1nico',
    descripcion: 'C\u00f3digo que crece como una planta. Verde circuito y azul digital se trenzan en una obra que une la naturaleza con la tecnolog\u00eda de forma inesperadamente bella.',
  },
  'Virgo-Piscis': {
    nombre: 'Acuarela Medicinal',
    descripcion: 'Colores que sanan al disolverse. Lavandas y verdes agua se mezclan con la delicadeza de una receta antigua, creando una obra de sensibilidad curativa.',
  },

  /* ── Libra Luna ── */
  'Libra-Aries': {
    nombre: 'Danza del Acero',
    descripcion: 'Una espada que corta el aire con gracia de bailar\u00edn. Rojos apasionados y plateados refinados crean una obra de tensi\u00f3n bella entre acci\u00f3n y armon\u00eda.',
  },
  'Libra-Tauro': {
    nombre: 'Bodeg\u00f3n de Venus',
    descripcion: 'Frutas y flores dispuestas con perfecci\u00f3n sensual. Rosas terrosos y verdes aterciopelados componen un festín visual de belleza material y placer est\u00e9tico.',
  },
  'Libra-G\u00e9minis': {
    nombre: 'Abanico de Cristal',
    descripcion: 'Transparencias que danzan al comp\u00e1s de la conversaci\u00f3n. Celestes y blancos prism\u00e1ticos crean una obra liviana de conexi\u00f3n social y encanto intelectual.',
  },
  'Libra-C\u00e1ncer': {
    nombre: 'Vals de la Luna',
    descripcion: 'Un baile lento bajo la luz plateada. Azules nocturnos y rosas p\u00e1lidos giran en una composici\u00f3n rom\u00e1ntica donde la emoci\u00f3n y la elegancia son inseparables.',
  },
  'Libra-Leo': {
    nombre: 'Sal\u00f3n de los Espejos',
    descripcion: 'La belleza multiplicada al infinito. Dorados, cristales y reflejos crean un espacio visual de opulencia arm\u00f3nica donde cada \u00e1ngulo es una nueva revelaci\u00f3n.',
  },
  'Libra-Virgo': {
    nombre: 'Porcelana Viva',
    descripcion: 'Delicadeza pintada con mano firme. Blancos puros y azules de Delft crean una obra de perfecci\u00f3n artesanal donde cada trazo es medido y cada espacio, respirado.',
  },
  'Libra-Libra': {
    nombre: 'Armon\u00eda Infinita',
    descripcion: 'El equilibrio perfecto reflejado en s\u00ed mismo. Rosa cuarzo y dorado suave crean una composici\u00f3n donde nada sobra y nada falta. La belleza en su estado m\u00e1s puro.',
  },
  'Libra-Escorpio': {
    nombre: 'Rosa de Obsidiana',
    descripcion: 'La flor m\u00e1s bella tallada en piedra volc\u00e1nica negra. Rosas profundos y negros brillantes crean una obra de belleza peligrosa y elegancia oscura.',
  },
  'Libra-Sagitario': {
    nombre: 'Puente de Arcoíris',
    descripcion: 'Colores que unen dos mundos distantes. Una paleta completa se ordena en arcos perfectos, celebrando la diplomacia que conecta lo local con lo universal.',
  },
  'Libra-Capricornio': {
    nombre: 'M\u00e1rmol y Seda',
    descripcion: 'Lo duro y lo suave en di\u00e1logo eterno. Blancos p\u00e9treos y telas fluidas crean una obra de contrastes sofisticados donde la ambici\u00f3n se viste de buen gusto.',
  },
  'Libra-Acuario': {
    nombre: 'Prisma del Ma\u00f1ana',
    descripcion: 'La luz del futuro descompuesta en armon\u00edas nuevas. Colores iridiscentes y formas geom\u00e9tricas suaves crean una visi\u00f3n est\u00e9tica de un mundo m\u00e1s justo y bello.',
  },
  'Libra-Piscis': {
    nombre: 'Nen\u00fafar de Plata',
    descripcion: 'Una flor ac\u00fa\u00e1tica ba\u00f1ada en luz de luna. Plateados y verdes agua crean una obra de belleza flotante y paz so\u00f1adora que armoniza cualquier espacio.',
  },

  /* ── Escorpio Luna ── */
  'Escorpio-Aries': {
    nombre: 'Forja del F\u00e9nix',
    descripcion: 'De las cenizas del fuego m\u00e1s intenso renace algo indestructible. Rojos sangrientos y negros profundos crean una obra de transformaci\u00f3n radical y poder regenerativo.',
  },
  'Escorpio-Tauro': {
    nombre: 'Cueva de Gemas',
    descripcion: 'Tesoros escondidos en la oscuridad m\u00e1s profunda de la tierra. Verdes oscuros y destellos de amatista crean un cofre visual de riqueza oculta y deseo.',
  },
  'Escorpio-G\u00e9minis': {
    nombre: 'C\u00f3dice Prohibido',
    descripcion: 'Un libro de secretos escritos en tinta que cambia de color. Violetas y grises mercuriales forman una obra de intriga intelectual y misterio comunicado en c\u00f3digo.',
  },
  'Escorpio-C\u00e1ncer': {
    nombre: 'Fosa Abisal',
    descripcion: 'Lo más profundo del oc\u00e9ano emocional. Azul medianoche y negro abisal crean una obra de intensidad emocional extrema donde el amor y el misterio son uno.',
  },
  'Escorpio-Leo': {
    nombre: 'Trono de Sombras',
    descripcion: 'El poder que se ejerce desde la oscuridad. Dorado oscurecido y negro real crean una obra magn\u00e9tica de liderazgo invisible y presencia que no necesita luz.',
  },
  'Escorpio-Virgo': {
    nombre: 'Autopsia de Estrellas',
    descripcion: 'Cada estrella diseccionada para revelar su misterio. Blancos cl\u00ednicos y azules nocturnos crean una obra de an\u00e1lisis profundo que penetra hasta el n\u00facleo de todo.',
  },
  'Escorpio-Libra': {
    nombre: 'Veneno Dulce',
    descripcion: 'Lo bello y lo peligroso en la misma copa. Rosas sat\u00e9n y violetas oscuros crean una obra de seducci\u00f3n refinada donde la elegancia esconde profundidad letal.',
  },
  'Escorpio-Escorpio': {
    nombre: 'Abismo sin Eco',
    descripcion: 'La profundidad que traga toda luz y la devuelve transformada. Negro sobre negro con destellos violeta crean una obra de intensidad absoluta e hipn\u00f3tica.',
  },
  'Escorpio-Sagitario': {
    nombre: 'Flecha Envenenada',
    descripcion: 'El vuelo certero que transforma lo que toca. P\u00farpuras viajeros y rojos oscuros crean una obra de b\u00fasqueda apasionada donde cada descubrimiento es una muerte y un renacimiento.',
  },
  'Escorpio-Capricornio': {
    nombre: 'Obsidiana Imperial',
    descripcion: 'Piedra volc\u00e1nica pulida como espejo de poder. Negros brillantes y grises p\u00e9treos crean una fortaleza visual de ambici\u00f3n implacable y control emocional absoluto.',
  },
  'Escorpio-Acuario': {
    nombre: 'Plasma Oscuro',
    descripcion: 'Energ\u00eda del futuro canalizada desde las profundidades. Azul el\u00e9ctrico y violeta abisal crean una obra de revoluci\u00f3n nacida del caos m\u00e1s profundo.',
  },
  'Escorpio-Piscis': {
    nombre: 'Sirena de las Sombras',
    descripcion: 'Un canto hipn\u00f3tico desde aguas que no conocen el sol. Azules nocturnos y verdes abisales crean la obra m\u00e1s m\u00edstica: intuici\u00f3n y transformaci\u00f3n en estado puro.',
  },

  /* ── Sagitario Luna ── */
  'Sagitario-Aries': {
    nombre: 'Estampida Solar',
    descripcion: 'Caballos de fuego galopando hacia el sol naciente. Naranjas encendidos y rojos salvajes crean una obra de libertad apasionada y aventura sin freno.',
  },
  'Sagitario-Tauro': {
    nombre: 'Viñedo del Peregrino',
    descripcion: 'Uvas maduras en tierras lejanas. Borgoñas y verdes terrosos componen una obra que celebra los placeres descubiertos en el camino de la aventura.',
  },
  'Sagitario-G\u00e9minis': {
    nombre: 'Torre de Babel Dorada',
    descripcion: 'Mil idiomas brillando en una misma estructura. Amarillos poligl\u00f3ticos y azules comunicativos crean una obra de entendimiento universal y curiosidad sin fronteras.',
  },
  'Sagitario-C\u00e1ncer': {
    nombre: 'Barco Nodriza',
    descripcion: 'Un velero que es hogar y aventura al mismo tiempo. Azules oce\u00e1nicos y maderas c\u00e1lidas componen una obra de viajes emocionales hacia puertos seguros.',
  },
  'Sagitario-Leo': {
    nombre: 'Hoguera del Nómada',
    descripcion: 'La fiesta m\u00e1s brillante bajo el cielo m\u00e1s amplio. Dorados festivos y naranjas c\u00e1lidos crean una celebraci\u00f3n visual de generosidad y esp\u00edritu libre.',
  },
  'Sagitario-Virgo': {
    nombre: 'Di\u00e1rio del Explorador',
    descripcion: 'Notas precisas de cada maravilla descubierta. Amarillos papel y verdes selva crean un cuaderno visual de descubrimientos met\u00f3dicos en tierras salvajes.',
  },
  'Sagitario-Libra': {
    nombre: 'Embajada Celeste',
    descripcion: 'Un palacio flotante que une culturas distantes. Dorados diplom\u00e1ticos y azules celestes crean una obra de visi\u00f3n arm\u00f3nica y justicia universal.',
  },
  'Sagitario-Escorpio': {
    nombre: 'Templo Sumergido',
    descripcion: 'Ruinas sagradas en el fondo del oc\u00e9ano. Violetas m\u00edsticos y dorados antiguos crean una obra de b\u00fasqueda espiritual en las profundidades del misterio.',
  },
  'Sagitario-Sagitario': {
    nombre: 'Horizonte Sin Fin',
    descripcion: 'El camino que nunca termina bajo un cielo que siempre promete m\u00e1s. Naranjas de atardecer eterno y violetas de plenitud crean la utop\u00eda del esp\u00edritu libre.',
  },
  'Sagitario-Capricornio': {
    nombre: 'Expedici\u00f3n a la Cumbre',
    descripcion: 'La aventura con destino y prop\u00f3sito. Grises de monta\u00f1a y naranjas de amanecer componen una ascensi\u00f3n visual donde cada paso es calibrado y decidido.',
  },
  'Sagitario-Acuario': {
    nombre: 'Cometa de Ne\u00f3n',
    descripcion: 'Un cuerpo celeste pintado con luces del futuro. Ne\u00f3n violeta y turquesa espacial crean una obra de viaje interestelar y visi\u00f3n progresista sin l\u00edmites.',
  },
  'Sagitario-Piscis': {
    nombre: 'Oc\u00e9ano de Estrellas',
    descripcion: 'Donde el mar se encuentra con la V\u00eda L\u00e1ctea. Azules c\u00f3smicos y turquesas oce\u00e1nicos se funden en una obra de inmensidad espiritual y fe en lo desconocido.',
  },

  /* ── Capricornio Luna ── */
  'Capricornio-Aries': {
    nombre: 'Fragua del Legado',
    descripcion: 'El fuego templa el acero de la ambici\u00f3n. Rojos fundidos y grises de metal forjan una obra de determinaci\u00f3n imparable y poder construido desde la base.',
  },
  'Capricornio-Tauro': {
    nombre: 'Muro de los Siglos',
    descripcion: 'Piedras apiladas por generaciones de manos firmes. Grises, ocres y musgos verdes crean un monumento visual a la persistencia y la tradici\u00f3n que sostiene.',
  },
  'Capricornio-G\u00e9minis': {
    nombre: 'Archivo de Cristal',
    descripcion: 'Datos preciosos almacenados en una estructura transparente. Grises inteligentes y celestes claros crean una obra de organizaci\u00f3n mental y comunicaci\u00f3n estrat\u00e9gica.',
  },
  'Capricornio-C\u00e1ncer': {
    nombre: 'Fortaleza del Hogar',
    descripcion: 'Un castillo que es refugio antes que prisi\u00f3n. Piedra c\u00e1lida y azules hogare\u00f1os crean una obra de seguridad emocional construida con paciencia y devoci\u00f3n.',
  },
  'Capricornio-Leo': {
    nombre: 'Obelisco de Oro',
    descripcion: 'El monumento que marca la eternidad del logro. Dorado antiguo y gris p\u00e9treo se elevan en una obra de ambici\u00f3n noble y legado que brilla por generaciones.',
  },
  'Capricornio-Virgo': {
    nombre: 'Plano Maestro',
    descripcion: 'La perfecci\u00f3n arquitect\u00f3nica dibujada a mano. L\u00edneas azules sobre blanco crean una obra de visi\u00f3n constructiva donde cada detalle tiene su raz\u00f3n de ser.',
  },
  'Capricornio-Libra': {
    nombre: 'Palacio de Justicia',
    descripcion: 'Columnas de m\u00e1rmol sostienen la balanza perfecta. Blancos y dorados institucionales crean una obra de orden social y belleza al servicio de la equidad.',
  },
  'Capricornio-Escorpio': {
    nombre: 'Mina de Diamantes',
    descripcion: 'Tesoros de presi\u00f3n y tiempo en la oscuridad de la roca. Negros profundos con destellos blancos crean una obra de valor forjado en condiciones extremas.',
  },
  'Capricornio-Sagitario': {
    nombre: 'Sendero de Cumbres',
    descripcion: 'De monta\u00f1a en monta\u00f1a, siempre ascendiendo con prop\u00f3sito. Grises nevados y naranjas de aurora componen una odisea visual de disciplina aventurera.',
  },
  'Capricornio-Capricornio': {
    nombre: 'Granito Ancestral',
    descripcion: 'La montaña que siempre estuvo y siempre estar\u00e1. Grises intemporales y negros profundos crean un monolito visual de fortaleza inamovible y sabidur\u00eda antigua.',
  },
  'Capricornio-Acuario': {
    nombre: 'Rascacielos de Hielo',
    descripcion: 'Arquitectura del futuro hecha de cristales helados. Azul glaciar y gris acero crean una obra de visi\u00f3n progresista anclada en estructura inquebrantable.',
  },
  'Capricornio-Piscis': {
    nombre: 'Faro en la Niebla',
    descripcion: 'La luz de la disciplina penetrando la bruma del sue\u00f1o. Amarillos firmes y grises etéreos crean una obra de gu\u00eda espiritual con pies en la realidad.',
  },

  /* ── Acuario Luna ── */
  'Acuario-Aries': {
    nombre: 'Bengala Revolucionaria',
    descripcion: 'Una se\u00f1al de fuego que anuncia el cambio. Rojos ne\u00f3n y azules el\u00e9ctricos explotan en una obra de rebeld\u00eda encendida y acci\u00f3n transformadora.',
  },
  'Acuario-Tauro': {
    nombre: 'Invernadero Espacial',
    descripcion: 'Plantas terrestres floreciendo en gravedad cero. Verdes org\u00e1nicos y azules espaciales crean una obra de futuro sostenible donde la naturaleza y la tecnolog\u00eda crecen juntas.',
  },
  'Acuario-G\u00e9minis': {
    nombre: 'Red Neural C\u00f3smica',
    descripcion: 'Conexiones que viajan a la velocidad del pensamiento. Celestes digitales y blancos sin\u00e1pticos forman una obra de inteligencia colectiva y comunicaci\u00f3n universal.',
  },
  'Acuario-C\u00e1ncer': {
    nombre: 'Nave del Hogar',
    descripcion: 'Un hogar que viaja entre las estrellas. Azules c\u00e1lidos y plateados espaciales crean una obra de pertenencia emocional en contextos completamente nuevos.',
  },
  'Acuario-Leo': {
    nombre: 'Estrella de Plasma',
    descripcion: 'Energ\u00eda estelar en su forma m\u00e1s brillante y libre. Dorado el\u00e9ctrico y azul cósmico crean una obra de carisma futurista y liderazgo visionario.',
  },
  'Acuario-Virgo': {
    nombre: 'Circuito Bot\u00e1nico',
    descripcion: 'Hojas que son microprocesadores, venas que son circuitos. Verde digital y plata t\u00e9cnica componen una obra de naturaleza reprogramada con amor analítico.',
  },
  'Acuario-Libra': {
    nombre: 'Utop\u00eda de Cristal',
    descripcion: 'La sociedad perfecta vista a trav\u00e9s de un prisma. Rosa futurista y azul transparente crean una obra de justicia est\u00e9tica y armon\u00eda vanguardista.',
  },
  'Acuario-Escorpio': {
    nombre: 'Agujero Negro Luminoso',
    descripcion: 'Lo que todo lo absorbe, todo lo transforma. Violeta c\u00f3smico y negro espacial crean una obra de misterio cient\u00edfico y transformaci\u00f3n radical del paradigma.',
  },
  'Acuario-Sagitario': {
    nombre: 'Portal Intergal\u00e1ctico',
    descripcion: 'La puerta que conecta todos los mundos posibles. Turquesa y violeta c\u00f3smico crean una obra de aventura cient\u00edfica y exploraci\u00f3n sin l\u00edmites conocidos.',
  },
  'Acuario-Capricornio': {
    nombre: 'Torre del Innovador',
    descripcion: 'Cimientos antiguos sosteniendo antenas del futuro. Gris piedra y ne\u00f3n azul crean una obra de revoluci\u00f3n con ra\u00edces y progreso con estructura.',
  },
  'Acuario-Acuario': {
    nombre: 'Frecuencia Cero',
    descripcion: 'La onda que reinicia todo. Azul el\u00e9ctrico puro sobre blanco absoluto crean una obra de originalidad radical donde todo lo conocido se reinventa desde cero.',
  },
  'Acuario-Piscis': {
    nombre: 'Medusa de Luz',
    descripcion: 'Tentáculos bioluminiscentes pulsando en el espacio profundo. Turquesa y violeta translúcido crean una obra de consciencia c\u00f3smica y sensibilidad alien.',
  },

  /* ── Piscis Luna ── */
  'Piscis-Aries': {
    nombre: 'G\u00e9iser del Alma',
    descripcion: 'Agua que erupciona con la fuerza del fuego interior. Azules explosivos y rojos oníricos crean una obra de emoci\u00f3n desbordante que rompe toda superficie.',
  },
  'Piscis-Tauro': {
    nombre: 'Estanque de Loto',
    descripcion: 'Flores sagradas flotando en aguas quietas y fértiles. Rosas suaves y verdes profundos crean una obra de paz espiritual enraizada en la belleza terrenal.',
  },
  'Piscis-G\u00e9minis': {
    nombre: 'Acertijo del Agua',
    descripcion: 'Reflejos que cuentan historias diferentes seg\u00fan qui\u00e9n mire. Azules cambiantes y plateados caprichosos crean una obra de misterio comunicable y poes\u00eda l\u00f3gica.',
  },
  'Piscis-C\u00e1ncer': {
    nombre: 'Cuna de Espuma',
    descripcion: 'El mar mece a sus criaturas con la ternura de una madre. Blancos espumosos y azules maternales crean la obra m\u00e1s gentil de la colecci\u00f3n: pura contenci\u00f3n amorosa.',
  },
  'Piscis-Leo': {
    nombre: 'Arrecife Dorado',
    descripcion: 'Corales que brillan como joyas bajo el agua. Dorados submarinos y azules tropicales crean una obra de creatividad generosa y brillo interior que irradia desde lo profundo.',
  },
  'Piscis-Virgo': {
    nombre: 'Acuarela de Sanaci\u00f3n',
    descripcion: 'Cada gota de color es una medicina para el esp\u00edritu. Lavandas y verdes agua se aplican con precisi\u00f3n terap\u00e9utica en una obra de restauraci\u00f3n emocional.',
  },
  'Piscis-Libra': {
    nombre: 'Ballet Subacu\u00e1tico',
    descripcion: 'Bailarines flotando en agua turquesa con gracia infinita. Rosas p\u00e1lidos y azules traslúcidos crean una coreograf\u00eda visual de armon\u00eda et\u00e9rea y belleza on\u00edrica.',
  },
  'Piscis-Escorpio': {
    nombre: 'Tinta del Oc\u00e9ano',
    descripcion: 'Las aguas m\u00e1s oscuras guardan los secretos m\u00e1s luminosos. Negro oce\u00e1nico y azul bioluminiscente crean una obra de misterio espiritual y transformaci\u00f3n sagrada.',
  },
  'Piscis-Sagitario': {
    nombre: 'Ballena Migrante',
    descripcion: 'Un viaje \u00e9pico a trav\u00e9s de oc\u00e9anos infinitos. Azules profundos y violetas de atardecer marino crean una odisea visual de fe, distancia y retorno espiritual.',
  },
  'Piscis-Capricornio': {
    nombre: 'Arrecife de Piedra',
    descripcion: 'Vida marina creciendo sobre roca ancestral. Grises p\u00e9treos y azules vivientes crean una obra de espiritualidad con estructura y sue\u00f1os con cimientos.',
  },
  'Piscis-Acuario': {
    nombre: 'Aurora Submarina',
    descripcion: 'Luces boreales reflejadas en el fondo del mar. Verde aurora y azul abisal crean una obra de consciencia expandida donde cielo y oc\u00e9ano son el mismo lienzo.',
  },
  'Piscis-Piscis': {
    nombre: 'Infinito Opalescente',
    descripcion: 'Dos oc\u00e9anos de sue\u00f1os disueltos en un solo color que no existe. Opalinos, tornasoles y transparencias crean la obra m\u00e1s evasiva y bella: pura trascendencia.',
  },
};

/* ── Build the combinations Map ── */

export const combinaciones = new Map<string, ZodiacResult>();

const signoMap = new Map(signos.map((s) => [s.name, s]));

for (const luna of signos) {
  for (const asc of signos) {
    const key = `${luna.name}-${asc.name}`;
    const data = comboTable[key];
    if (!data) continue;

    const fileSlugLuna = toFileSlug(luna.name);
    const fileSlugAsc = toFileSlug(asc.name);
    const slug = `${fileSlugLuna}-${fileSlugAsc}`;

    combinaciones.set(key, {
      luna: luna.name,
      ascendente: asc.name,
      nombre: data.nombre,
      slug,
      imagen: `/images/zodiaco/${fileSlugLuna}-${fileSlugAsc}.jpg`,
      descripcion: data.descripcion,
      elementDominante: dominantElement(luna.element, asc.element),
    });
  }
}

/* ── Public lookup ── */

export function getRecommendation(luna: string, ascendente: string): ZodiacResult {
  const key = `${luna}-${ascendente}`;
  const result = combinaciones.get(key);
  if (!result) {
    throw new Error(`Combinación no encontrada: ${key}`);
  }
  return result;
}
