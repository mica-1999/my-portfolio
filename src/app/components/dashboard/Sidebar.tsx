"use client";
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const [selectedMenu, setSelectedMenu] = useState('home');
    const pathname = usePathname();

    return (
        <div className='flex flex-col w-64 bg-[#282A42] text-white h-screen'>
            {/* Logo Section */}
            <div className='w-full flex items-center px-4 py-10'>
                <Link href="/pages/dashboard" className="flex items-center">
                    {/* Logo Icon - gradient box with icon */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-[#646cfa] to-[#4a51c5] mr-2 shadow-lg shadow-[#2e2f47]/30">
                        <i className="ri-dashboard-line text-lg"></i>
                    </div>

                    {/* Logo Text */}
                    <div className="font-bold text-2xl tracking-tight">
                        <span className="text-[#cdd0e1]">Dash</span>
                        <span className="text-[#646cfa]">Hub</span>
                    </div>
                </Link>
            </div>

            {/* Rest of your sidebar will go here */}
        </div>
    )
}