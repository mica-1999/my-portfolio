import type { Metadata } from "next";
import Navbar from "@/app/components/home/Navbar";
import Footer from "@/app/components/home/Footer";

export const metadata: Metadata = {
    title: "Micael's Portfolio",
    description: "Full Stack Developer Portfolio showcasing web development projects and skills",
};

export default function PagesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow mt-16">
                {children}
            </main>
            <Footer />
        </div>
    );
}