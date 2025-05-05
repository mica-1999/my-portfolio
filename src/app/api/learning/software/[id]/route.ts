// REVISED: 2025-05-05 - Now using path parameters ✅
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
) {
    const userId = parseInt(params.id);

    // Verify Parameter
    if (!userId || isNaN(userId)) {
        return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
    }

    try {
        const learningItems = await prisma.softwareNotes.findMany({
            where: {
                userId: userId,
            },
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

export async function DELETE(
    _request: Request,
    { params }: { params: { id: string } }
) {
    const itemId = parseInt(params.id);

    // Verify Parameter
    if (!itemId || isNaN(itemId)) {
        return NextResponse.json({ error: "Invalid Learning Item ID" }, { status: 400 });
    }

    try {
        const deletedItem = await prisma.softwareNotes.delete({
            where: {
                id: itemId,
            },
        });

        return NextResponse.json(deletedItem, { status: 200 });
    } catch (error) {
        console.error("Error deleting learning item:", error);
        return NextResponse.json({ error: "Failed to delete learning item. Please try again later." }, { status: 500 });
    }
}