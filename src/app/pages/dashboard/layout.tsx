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
        <div className="flex h-full bg-[#282A42]">
            {/* Sticky sidebar */}
            <div className="sticky top-0 h-screen">
                <Sidebar />
            </div>

            {/* Content area with its own scrolling */}
            <div className="flex flex-col flex-1 w-full">
                <Header />
                <div className="flex-1 px-4 md:px-6 pb-4 md:pb-6">
                    {children}
                    <Footer />
                </div>
            </div>
        </div>
    );
}