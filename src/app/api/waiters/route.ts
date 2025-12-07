import type { Prisma, Waiter } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
	try {
		const data: Waiter = await req.json();
		const waiter = await prisma.waiter.create({
			data: data,
		});

		return NextResponse.json(waiter, { status: 201 });
	} catch (error) {
		console.error("Errore nel database:", error);
		return NextResponse.json({ error: error }, { status: 500 });
	}
}

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get("id");
		const country = searchParams.get("country");
		const region = searchParams.get("region");
		const province = searchParams.get("province");
		const municipality = searchParams.get("municipality");
		const page = parseInt(searchParams.get("page") || "1", 10);
		const limit = parseInt(searchParams.get("limit") || "10", 10);

		if (id) {
			const waiter = await prisma.waiter.findUnique({
				where: { id },
				include: {
					location: true,
				},
			});
			return waiter
				? NextResponse.json(waiter, { status: 200 })
				: NextResponse.json({ error: "Waiter not found" }, { status: 404 });
		}

		const where: Prisma.WaiterWhereInput = {};
		if (country || region || province || municipality) {
			where.location = {};
			if (country) where.location.country = country;
			if (region) where.location.region = region;
			if (province) where.location.province = province;
			if (municipality) where.location.municipality = municipality;
		}

		const skip = (page - 1) * limit;
		const totalCount = await prisma.waiter.count({ where });

		const waiters = await prisma.waiter.findMany({
			where,
			orderBy: { createdAt: "desc" },
			include: {
				location: true,
			},
			skip,
			take: limit,
		});

		return NextResponse.json(
			{
				waiters,
				totalPages: Math.ceil(totalCount / limit),
				currentPage: page,
				totalCount,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Errore nel database:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

export async function PATCH(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get("id");
		const data: Partial<Waiter> = await req.json();

		if (!id) {
			return NextResponse.json({ error: "ID is required" }, { status: 400 });
		}

		const updatedWaiter = await prisma.waiter.update({
			where: { id },
			data,
		});

		return NextResponse.json(updatedWaiter, { status: 200 });
	} catch (error) {
		console.error("Errore nel database:", error);
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
