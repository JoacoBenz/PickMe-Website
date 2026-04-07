import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const productos = [
  { name: 'Llama Interior', slug: 'llama-interior', style: 'Abstracto', color: 'Rojo', priceARS: 18000, gradient: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 45%, #922b21 100%)', description: 'Una explosión de tonos cálidos que captura la energía interior. Ideal para espacios que buscan vitalidad y pasión.' },
  { name: 'Calma Azul', slug: 'calma-azul', style: 'Moderno', color: 'Azul', priceARS: 24000, gradient: 'linear-gradient(160deg, #2980b9 0%, #1a5276 50%, #154360 100%)', description: 'Tonos azules profundos que transmiten serenidad y equilibrio. Perfecto para dormitorios y espacios de relajación.' },
  { name: 'Tierra Neutra', slug: 'tierra-neutra', style: 'Clásico', color: 'Neutro', priceARS: 9500, gradient: 'linear-gradient(145deg, #c9a96e 0%, #a0785a 45%, #7d5a42 100%)', description: 'Inspirado en los tonos tierra de la Patagonia. Una pieza atemporal que complementa cualquier decoración.' },
  { name: 'Sombras Rojas', slug: 'sombras-rojas', style: 'Clásico', color: 'Rojo', priceARS: 32000, gradient: 'linear-gradient(120deg, #cb4335 0%, #922b21 30%, #641e16 70%, #c0392b 100%)', description: 'Profundidad y misterio en capas de rojo intenso. Una obra que se convierte en el centro de atención de cualquier ambiente.' },
  { name: 'Horizonte Índigo', slug: 'horizonte-indigo', style: 'Abstracto', color: 'Azul', priceARS: 15000, gradient: 'linear-gradient(170deg, #1a237e 0%, #283593 40%, #3949ab 70%, #5c6bc0 100%)', description: 'La transición del día a la noche capturada en índigo. Evoca calma y contemplación.' },
  { name: 'Serenidad Cálida', slug: 'serenidad-calida', style: 'Moderno', color: 'Neutro', priceARS: 21000, gradient: 'linear-gradient(130deg, #d5c5a1 0%, #b8a282 40%, #9e8866 70%, #7d6b52 100%)', description: 'Tonos neutros y cálidos que crean un ambiente acogedor. Versatilidad para cualquier espacio.' },
  { name: 'Marea Profunda', slug: 'marea-profunda', style: 'Abstracto', color: 'Azul', priceARS: 39000, gradient: 'linear-gradient(155deg, #006064 0%, #00838f 35%, #4dd0e1 65%, #0097a7 100%)', description: 'Las profundidades del océano en un cuadro. Turquesas y azules que transportan a la costa.' },
  { name: 'Siena Antiguo', slug: 'siena-antiguo', style: 'Clásico', color: 'Rojo', priceARS: 7500, gradient: 'linear-gradient(140deg, #bf360c 0%, #d84315 35%, #e64a19 65%, #a62000 100%)', description: 'Inspirado en los tonos siena de la Toscana. Una pieza clásica a un precio accesible.' },
  { name: 'Vapor y Piedra', slug: 'vapor-y-piedra', style: 'Moderno', color: 'Neutro', priceARS: 28000, gradient: 'linear-gradient(125deg, #eceff1 0%, #b0bec5 35%, #90a4ae 65%, #607d8b 100%)', description: 'Grises y blancos que evocan paisajes de montaña. Minimalismo elegante para espacios modernos.' },
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
