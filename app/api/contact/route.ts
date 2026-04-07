import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, apellido, email, telefono, asunto, mensaje } = body;

    if (!nombre || !email || !asunto || !mensaje) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    const contact = await prisma.contactMessage.create({
      data: {
        name: `${nombre} ${apellido}`.trim(),
        email,
        phone: telefono || null,
        subject: asunto,
        message: mensaje,
      },
    });

    return NextResponse.json({ success: true, id: contact.id });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
