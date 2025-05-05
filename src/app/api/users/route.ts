import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdat: 'desc',
            },
        });

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const { firstName, lastName, email, phone, role } = await req.json();

    if (!firstName || !lastName || !email || !phone || !role) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Generate username (first name + first letter of last name, lowercase)
    const username = `${firstName.toLowerCase()}${lastName.substring(0, 1).toLowerCase()}`;

    try {
        // Check if username or email already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email }
                ]
            }
        });

        // If user already exists, return error
        if (existingUser) {
            return NextResponse.json({
                error: "User with this username or email already exists",
                exists: true
            }, { status: 409 });  // 409 Conflict status code
        }

        // Default password hash
        const defaultPassword = "$2y$10$72LZo6Lo6ZTN50Gf9UCDfuvVcywDLdSHBcWOxUQxK06HpfzPuLzfy";

        const newUser = await prisma.user.create({
            data: {
                firstname: firstName,
                lastname: lastName,
                email: email,
                phone: phone,
                role: role,
                username: username,
                password: defaultPassword,
            }
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Error creating user" }, { status: 500 });
    }
}