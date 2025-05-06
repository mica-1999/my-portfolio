// REVISED: 2025-05-05 - Updated to use awaited context ✅
import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET(
    _request: Request,
    context: { params: { id: string } }
) {
    // Await the params object before destructuring
    const { id } = await context.params;
    const userId = parseInt(id);

    // Verify Parameter
    if (!userId || isNaN(userId)) {
        return NextResponse.json({ error: "Invalid UserID" }, { status: 400 });
    }

    try {
        const bankDetails = await prisma.bankAccount.findUnique({
            where: {
                userId: userId
            },
            include: {
                transactions: {
                    where: {
                        createdAt: {
                            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                        }
                    },
                    select: {
                        amount: true,
                        type: true
                    }
                }
            }
        })

        if (!bankDetails) {
            return NextResponse.json({ error: "Bank details not found" }, { status: 404 });
        }
        else {
            const totalBalance = bankDetails.balance;
            const depositThisMonth = bankDetails.transactions.reduce((acc, transaction) => {
                return transaction.type === "DEPOSIT" ? acc + transaction.amount : acc;
            }, 0);
            const withdrawThisMonth = bankDetails.transactions.reduce((acc, transaction) => {
                return transaction.type === "WITHDRAWAL" ? acc + transaction.amount : acc;
            }, 0);

            return NextResponse.json({ totalBalance, depositThisMonth, withdrawThisMonth });
        }
    } catch (error) {
        console.error("Error fetching bank details:", error);
        return NextResponse.json({ error: "Error fetching bank details" }, { status: 500 });
    }
}