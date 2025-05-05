// REVIEWED: 2025-05-05 - Good to go ✅
import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
) {
    const userId = parseInt(params.id);

    // Verify Parameter
    if (!userId || isNaN(userId)) {
        return NextResponse.json({ error: "Invalid UserID" }, { status: 400 });
    }

    try {
        const timelineItems = await prisma.timeline.findMany({
            where: {
                userId: userId,
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