// REVISED: 2025-05-05 - Updated to use path parameters ✅
import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET(
    _request: Request,
    context: { params: { id: string } }
) {
    // Await the params object before destructuring
    const { id } = await context.params;
    const userId = parseInt(id);

    // Verify Parameters
    if (!userId || isNaN(userId)) {
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

export async function POST(
    request: Request,
    context: { params: { id: string } }
) {
    // Await the params object before destructuring
    const { id } = await context.params;
    const userId = parseInt(id);

    // Verify Parameters
    if (!userId || isNaN(userId)) {
        return NextResponse.json({ error: "Invalid UserID" }, { status: 400 });
    }

    try {
        // DB Query for creating user preferences
        await prisma.userPreferences.create({
            data: {
                userid: userId
            }
        })
        return NextResponse.json({ message: "Preferences created for user: " + userId }, { status: 201 });
    }
    catch (error) {
        console.error("Error creating preferences:", error);
        return NextResponse.json({ error: "Error creating preferences" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    context: { params: { id: string } }
) {
    // Await the params object before destructuring
    const { id } = await context.params;
    const userId = parseInt(id);

    // Get Parameters from request body
    const { visualTheme, language } = await request.json();

    if (!userId || isNaN(userId) || !visualTheme || !language) {
        return NextResponse.json({ error: "Invalid Parameters" }, { status: 400 });
    }

    try {
        // DB Query for updating user preferences
        await prisma.userPreferences.update({
            data: {
                visualtheme: visualTheme,
                language: language
            },
            where: {
                userid: userId
            }
        })
        return NextResponse.json({ message: "Preferences updated for user: " + userId }, { status: 200 });
    } catch (error) {
        console.error("Error updating preferences:", error);
        return NextResponse.json({ error: "Error updating preferences" }, { status: 500 });
    }
}