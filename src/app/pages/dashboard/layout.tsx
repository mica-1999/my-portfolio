import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Header from "@/app/components/dashboard/Header";
import Footer from "@/app/components/dashboard/Footer";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Manage your portfolio content and settings",
};

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login'); // Redirect to login if not authenticated
    }

    return (
        <div className="flex h-screen bg-[#282A42]">
            <Sidebar />
            <div className="flex flex-col flex-1 w-full">
                <Header />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}