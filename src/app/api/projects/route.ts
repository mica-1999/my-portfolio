import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const allProjects = await prisma.projects.findMany({});

        if (!allProjects || allProjects.length === 0) {
            return NextResponse.json({ error: "No projects found" }, { status: 404 });
        }

        return NextResponse.json({ projects: allProjects });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
        return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    try {
        const deletedProject = await prisma.projects.delete({
            where: {
                id: parseInt(projectId),
            }
        })

        if (!deletedProject) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting project:", error);
        return NextResponse.json({ error: "Error deleting project" }, { status: 500 });

    }

}