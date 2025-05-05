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
        const personalProjects = await prisma.userProject.findMany({
            where: {
                userId: userId,
            },
            include: {
                project: true,
            }
        });

        if (!personalProjects || personalProjects.length === 0) {
            return NextResponse.json({ error: "No projects found for this user" }, { status: 404 });
        }

        return NextResponse.json({ projects: personalProjects });
    } catch (error) {
        console.error("Error fetching personal projects:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}