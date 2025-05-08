// REVISED: 2025-05-05 - Now using path parameters correctly ✅
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    _request: Request,
    context: { params: { id: string } }
) {
    // Await the params object before destructuring
    const { id } = await context.params;
    const userId = parseInt(id);

    // Verify Parameter
    if (!userId || isNaN(userId)) {
        return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
    }

    try {
        const learningItems = await prisma.softwareNotes.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                title: "asc",
            }
        });

        if (!learningItems || learningItems.length === 0) {
            return NextResponse.json({ error: "No learning items found" }, { status: 404 });
        }

        return NextResponse.json(learningItems, { status: 200 });
    } catch (error) {
        console.error("Error fetching learning items:", error);
        return NextResponse.json({ error: "Failed to fetch learning items. Please try again later." }, { status: 500 });
    }
}