import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdat: 'desc',
            },
        });

        console.log("Fetched users:", users); // Log the fetched users
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
    }
}