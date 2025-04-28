import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    try {
        const personalProjects = await prisma.userProject.findMany({
            where: {
                userId: parseInt(userId),
            },
            include: {
                project: true,
            }
        })

        if (!personalProjects || personalProjects.length === 0) {
            return NextResponse.json({ error: "No projects found for this user" }, { status: 404 });
        }

        return NextResponse.json({ projects: personalProjects });
    } catch (error) {
        console.error("Error fetching personal projects:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });

    }
}