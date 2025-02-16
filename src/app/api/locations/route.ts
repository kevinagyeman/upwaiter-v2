import { Location, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data: Location = await req.json();

    if (!data) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const location = await prisma.location.create({
      data,
    });

    return NextResponse.json(location, { status: 201 });
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
    const locationId = searchParams.get('id');
    const country = searchParams.get('country');
    const region = searchParams.get('region');
    const city = searchParams.get('city');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    if (locationId) {
      const location = await prisma.location.findUnique({
        where: { id: locationId },
      });

      if (!location) {
        return NextResponse.json(
          { error: 'Location not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(location, { status: 200 });
    }

    // Filtraggio delle locations
    const where = {} as any;
    if (country) where.country = country;
    if (region) where.region = region;
    if (city) where.city = city;

    // Offset e paginazione
    const skip = (page - 1) * limit;
    const totalCount = await prisma.location.count({ where });

    const locations = await prisma.location.findMany({
      where,
      skip,
      take: limit,
    });

    return NextResponse.json(
      {
        locations,
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

    const location = await prisma.location.update({
      where: { id },
      data: updates,
    });

    return NextResponse.json(location, { status: 200 });
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
    const locationId = searchParams.get('id');

    if (!locationId) {
      return NextResponse.json(
        { error: 'Location ID is required' },
        { status: 400 }
      );
    }

    const location = await prisma.location.findUnique({
      where: { id: locationId },
    });

    if (!location) {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      );
    }

    // Cancella la location
    await prisma.location.delete({ where: { id: locationId } });

    return NextResponse.json(
      { message: 'Location deleted successfully' },
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
