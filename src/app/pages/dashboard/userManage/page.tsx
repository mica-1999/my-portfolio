import Handler from "@/app/components/dashboard/UserManagement/Handler"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "User Management | Dashboard",
    description: "Manage users, roles and permissions",
};

export default async function UserManagePage() {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);

    // Redirect to main page if not authenticated & show error message
    if (session?.user?.role !== "admin") {
        redirect('/pages/dashboard');
    }

    return (
        <>
            <Handler />
        </>
    )
}