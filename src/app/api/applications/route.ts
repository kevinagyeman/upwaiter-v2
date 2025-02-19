import { Application, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data: Application = await req.json();

    if (!data.waiterId || !data.jobPostId) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const waiterExists = await prisma.waiter.findUnique({
      where: { id: data.waiterId },
    });

    const jobPostExists = await prisma.jobPost.findUnique({
      where: { id: data.jobPostId },
    });

    if (!waiterExists) {
      return NextResponse.json({ error: 'Waiter not found' }, { status: 404 });
    }

    if (!jobPostExists) {
      return NextResponse.json({ error: 'JobPost not found' }, { status: 404 });
    }

    const application = await prisma.application.create({
      data,
    });

    return NextResponse.json(application, { status: 201 });
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
    const waiterId = searchParams.get('waiterId');
    const jobPostId = searchParams.get('jobPostId');

    if (!waiterId) {
      return NextResponse.json(
        { error: 'waiterId is required' },
        { status: 400 }
      );
    }

    if (jobPostId) {
      // Se viene fornito anche jobPostId, verifica se esiste una candidatura per quel lavoro
      const applicationExists = await prisma.application.findFirst({
        where: {
          waiterId,
          jobPostId,
        },
      });

      return NextResponse.json(
        { applied: !!applicationExists }, // True se esiste una candidatura, altrimenti false
        { status: 200 }
      );
    }

    // Se jobPostId non è fornito, restituisci tutte le candidature del cameriere
    const applications = await prisma.application.findMany({
      where: { waiterId },
      include: { jobPost: true },
    });

    return NextResponse.json(applications, { status: 200 });
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
    const { id, status } = data;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID and status are required' },
        { status: 400 }
      );
    }

    const application = await prisma.application.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(application, { status: 200 });
  } catch (error) {
    console.error('Errore nel database:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const application = await prisma.application.delete({
      where: { id },
    });

    return NextResponse.json(application, { status: 200 });
  } catch (error) {
    console.error('Errore nel database:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
