import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const products = await prisma.product.findMany({
    where: { active: true },
    select: { slug: true },
  });
  return NextResponse.json(products.map((p: { slug: string }) => p.slug));
}
