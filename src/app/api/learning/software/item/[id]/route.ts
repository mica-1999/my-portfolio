// REVISED: 2025-05-05 - Now using path parameters correctly ✅
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    _request: Request,
    context: { params: { id: string } }
) {
    // Await the params object before destructuring
    const { id } = await context.params;
    const itemId = parseInt(id);

    // Verify Parameter
    if (!itemId || isNaN(itemId)) {
        return NextResponse.json({ error: "Invalid Item ID" }, { status: 400 });
    }

    try {
        const itemDetails = await prisma.softwareNotes.findUnique({
            where: {
                id: itemId,
            },
            include: {
                resources: true,
                links: true,
                codeSnippets: true,
                concepts: true,
                User: {
                    select: {
                        id: true,
                        username: true,
                        firstname: true,
                        lastname: true,
                        email: true,
                    }
                }
            }
        });

        if (!itemDetails) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        return NextResponse.json(itemDetails);
    } catch (error) {
        console.error("Error fetching item details:", error);
        return NextResponse.json({ error: "Failed to fetch item details" }, { status: 500 });
    }
}

export async function DELETE(
    _request: Request,
    context: { params: { id: string } }
) {
    // Await the params object before destructuring
    const { id } = await context.params;
    const itemId = parseInt(id);

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