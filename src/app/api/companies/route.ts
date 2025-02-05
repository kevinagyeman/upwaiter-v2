import { Company, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data: Company = await req.json();
    const company = await prisma.company.create({
      data: data,
    });

    return NextResponse.json(company, { status: 201 });
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
      const company = await prisma.company.findUnique({
        where: { id },
      });
      return company
        ? NextResponse.json(company, { status: 200 })
        : NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    const companies = await prisma.company.findMany();
    return NextResponse.json(companies, { status: 200 });
  } catch (error) {
    console.error('Errore nel database:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
