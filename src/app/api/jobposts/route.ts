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
    const jobId = searchParams.get('id');
    const companyId = searchParams.get('companyId');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    if (jobId) {
      const jobPost = await prisma.jobPost.findUnique({
        where: { id: jobId },
        include: {
          company: { select: { name: true } },
        },
      });

      if (!jobPost) {
        return NextResponse.json(
          { error: 'Job post not found' },
          { status: 404 }
        );
      }

      const applicationsCount = await prisma.application.count({
        where: { jobPostId: jobPost.id },
      });

      return NextResponse.json(
        { ...jobPost, applicationsCount },
        { status: 200 }
      );
    }

    // Offset e paginazione
    const skip = (page - 1) * limit;
    let jobPosts;
    let totalCount;

    if (companyId) {
      totalCount = await prisma.jobPost.count({ where: { companyId } });

      jobPosts = await prisma.jobPost.findMany({
        where: { companyId },
        orderBy: { createdAt: 'desc' },
        include: {
          applications: {
            select: { id: true, status: true, waiterId: true, createdAt: true },
          },
        },
        skip,
        take: limit,
      });

      jobPosts = jobPosts.map((jobPost) => ({
        ...jobPost,
        applicationsCount: jobPost.applications.length,
      }));
    } else {
      totalCount = await prisma.jobPost.count();

      jobPosts = await prisma.jobPost.findMany({
        // select: { id: true, title: true, description: true, ddd: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      });

      jobPosts = await Promise.all(
        jobPosts.map(async (jobPost) => {
          const applicationsCount = await prisma.application.count({
            where: { jobPostId: jobPost.id },
          });
          return { ...jobPost, applicationsCount };
        })
      );
    }

    return NextResponse.json(
      {
        jobPosts,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        totalCount,
      },
      { status: 200 }
    );
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

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('id');
    const companyId = searchParams.get('companyId');

    if (!jobId || !companyId) {
      return NextResponse.json(
        { error: 'Job ID and Company ID are required' },
        { status: 400 }
      );
    }

    // Verifica se il job post esiste e se appartiene alla company
    const jobPost = await prisma.jobPost.findUnique({
      where: { id: jobId },
      select: { companyId: true },
    });

    if (!jobPost) {
      return NextResponse.json(
        { error: 'Job post not found' },
        { status: 404 }
      );
    }

    if (jobPost.companyId !== companyId) {
      return NextResponse.json(
        { error: 'Unauthorized: You can only delete your own job posts' },
        { status: 403 }
      );
    }

    // Cancella il job post
    await prisma.jobPost.delete({ where: { id: jobId } });

    return NextResponse.json(
      { message: 'Job post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Errore nel database:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
