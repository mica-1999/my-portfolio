// REVISED: 2025-05-05 - Now using path parameters ✅
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
    _request: Request,
    { params }: { params: { id: string } }
) {
    const projectId = parseInt(params.id);

    // Verify Parameter
    if (!projectId || isNaN(projectId)) {
        return NextResponse.json({ error: "Invalid Project ID" }, { status: 400 });
    }

    try {
        const deletedProject = await prisma.projects.delete({
            where: {
                id: projectId,
            }
        });

        if (!deletedProject) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting project:", error);
        return NextResponse.json({ error: "Error deleting project" }, { status: 500 });
    }
}