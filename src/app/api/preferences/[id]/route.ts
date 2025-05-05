import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
) {
    const userId = parseInt(params.id);

    // Verify Parameters
    if (!userId) {
        return NextResponse.json({ error: "Invalid UserID" }, { status: 400 });
    }

    try {
        // DB Query for fetching user preferences
        const preferences = await prisma.userPreferences.findUnique({
            select: {
                visualtheme: true,
                language: true
            },
            where: {
                userid: userId
            }
        });

        if (!preferences) {
            return NextResponse.json({ error: "Preferences not found" }, { status: 404 });
        }
        return NextResponse.json(preferences, { status: 200 });
    }
    catch (error) {
        console.error("Error fetching preferences:", error);
        return NextResponse.json({ error: "Error fetching preferences" }, { status: 500 });
    }
}