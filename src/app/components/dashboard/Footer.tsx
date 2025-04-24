"use client";
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="w-full py-4 mt-4 px-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-[#d7d8ed] text-[0.9375rem] font-bold">
                <p className="mb-3 md:mb-0">
                    © {currentYear}, made with <span className="text-red-500">❤</span> by{" "}
                    <Link href="#" className="text-[#646cfa] hover:text-[#8388ff] transition-colors">
                        Micael Ribeiro
                    </Link>
                </p>

                <div className="flex gap-4 md:gap-6">
                    <Link href="#" className="text-[#646cfa] hover:text-[#8388ff] transition-colors">
                        License
                    </Link>
                    <Link href="#" className="text-[#646cfa] hover:text-[#8388ff] transition-colors">
                        Themes
                    </Link>
                    <Link href="#" className="text-[#646cfa] hover:text-[#8388ff] transition-colors">
                        Documentation
                    </Link>
                    <Link href="#" className="text-[#646cfa] hover:text-[#8388ff] transition-colors">
                        Support
                    </Link>
                </div>
            </div>
        </div>
    );
}