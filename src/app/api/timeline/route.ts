import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    try {
        const timelineItems = await prisma.timeline.findMany({
            where: {
                userId: parseInt(userId),
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 15,
        });

        return NextResponse.json({ timeline: timelineItems }, { status: 200 });
    } catch (error) {
        console.error("Error fetching timeline:", error);
        return NextResponse.json({ error: "Error fetching timeline" }, { status: 500 });
    }
}