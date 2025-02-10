import { NextResponse } from 'next/server';
import { PrismaClient, Waiter } from '@prisma/client';
import { create } from 'zustand';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data: Waiter = await req.json();
    const waiter = await prisma.waiter.create({
      data: data,
    });

    return NextResponse.json(waiter, { status: 201 });
  } catch (error) {
    console.error('Errore nel database:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const waiter = await prisma.waiter.findUnique({
        where: { id },
      });
      return waiter
        ? NextResponse.json(waiter, { status: 200 })
        : NextResponse.json({ error: 'waiter not found' }, { status: 404 });
    }

    const companies = await prisma.waiter.findMany();
    return NextResponse.json(companies, { status: 200 });
  } catch (error) {
    console.error('Errore nel database:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const data: Partial<Waiter> = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const updatedWaiter = await prisma.waiter.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedWaiter, { status: 200 });
  } catch (error) {
    console.error('Errore nel database:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
