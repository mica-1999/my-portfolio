import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("itemId");

    if (!id) {
        return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    try {
        const itemDetails = await prisma.softwareNotes.findUnique({
            where: {
                id: Number(id),
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

        console.log("Item details fetched successfully:", itemDetails);

        return NextResponse.json(itemDetails);
    } catch (error) {
        console.error("Error fetching item details:", error);
        return NextResponse.json({ error: "Failed to fetch item details" }, { status: 500 });
    }
}