// REVISED: 2025-05-05 - Now using path parameters ✅
import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function DELETE(
    _request: Request,
    { params }: { params: { id: string } }
) {
    const userId = parseInt(params.id);

    // Verify Parameter
    if (!userId || isNaN(userId)) {
        return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
    }

    try {
        const deletedUser = await prisma.user.delete({
            where: {
                id: userId,
            }
        });

        if (!deletedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
    }
}