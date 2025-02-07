import { JobPost, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data: JobPost = await req.json();

    if (!data.companyId || !data.title || !data.description) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const companyExists = await prisma.company.findUnique({
      where: { id: data.companyId },
    });

    if (!companyExists) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    const jobPost = await prisma.jobPost.create({
      data,
    });

    return NextResponse.json(jobPost, { status: 201 });
  } catch (error) {
    console.error('Errore nel database:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get('companyId'); // Prendere l'ID dell'azienda dal parametro della query

    let jobPosts;

    if (companyId) {
      // Recuperare i job posts associati all'azienda con le applications
      jobPosts = await prisma.jobPost.findMany({
        where: { companyId }, // Filtrare i job posts per companyId
        include: {
          applications: {
            select: {
              id: true,
              status: true,
              waiterId: true, // Manteniamo waiterId solo se si filtra per azienda
              createdAt: true,
            },
          },
        },
      });

      if (jobPosts.length === 0) {
        return NextResponse.json(
          { error: 'No job posts found for this company' },
          { status: 404 }
        );
      }
    } else {
      jobPosts = await prisma.jobPost.findMany();
      // Se non viene fornito un companyId, recuperare tutti i job posts disponibili senza waiterId
      // jobPosts = await prisma.jobPost.findMany({
      //   include: {
      //     applications: {
      //       select: {
      //         id: true,
      //         status: true,
      //         createdAt: true,
      //       },
      //     },
      //   },
      // });
    }

    return NextResponse.json(jobPosts, { status: 200 });
  } catch (error) {
    console.error('Errore nel database:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const data = await req.json();
    const { id, ...updates } = data;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const jobPost = await prisma.jobPost.update({
      where: { id },
      data: updates,
    });

    return NextResponse.json(jobPost, { status: 200 });
  } catch (error) {
    console.error('Errore nel database:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
