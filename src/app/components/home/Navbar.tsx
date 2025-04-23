"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from '@/app/context/ThemeContext';

export default function Navbar() {

    // State & Hooks
    const pathname = usePathname(); // Get active path
    const [scrolled, setScrolled] = useState(false); // Makes the navbar sticky when scrolled
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Responsive menu state
    const { t, savedTheme } = useTheme(); // Lang & Theme context

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Check if current path is active
    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
            ? 'py-3 bg-zinc-900/95 shadow-lg'
            : 'py-5 bg-zinc-900/90'
            } backdrop-blur-md`}>
            {/* Container with max-width for navbar contents */}
            <div className="max-w-[1200px] mx-auto px-5 flex justify-between items-center">
                {/* Logo */}
                <div className="font-bold">
                    <Link href="/pages/home" className="flex items-center">
                        <span className="text-white text-[1.625rem] font-bold tracking-wide">Micael</span>
                        <span className="text-indigo-500 text-[1.625rem] font-bold ml-0.5">Dev</span>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="flex flex-col justify-between items-center w-6 h-[18px]"
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                            }`}></span>
                        <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                            }`}></span>
                        <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                            }`}></span>
                    </button>
                </div>

                {/* Desktop & Mobile menu */}
                <div className={`md:flex md:items-center md:gap-6 ${mobileMenuOpen
                    ? 'absolute top-full left-0 w-full bg-zinc-900/95 flex flex-col py-5 space-y-4 shadow-lg animate-slideDown'
                    : 'hidden'
                    }`}>
                    <div className="md:flex md:space-x-6 flex-col md:flex-row md:items-center space-y-3 md:space-y-0 gap-3">
                        <Link
                            href="/pages/home"
                            className={`text-base font-medium py-2 px-4 rounded-md transition-all relative
                                ${isActive('/pages/home')
                                    ? 'text-white bg-white/10 after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-indigo-500 after:rounded'
                                    : 'text-white/70 hover:text-white hover:bg-white/10'
                                } md:w-auto w-4/5 mx-auto text-center`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/pages/projects"
                            className={`text-base font-medium py-2 px-4 rounded-md transition-all relative
                                ${isActive('/pages/projects')
                                    ? 'text-white bg-white/10 after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-indigo-500 after:rounded'
                                    : 'text-white/70 hover:text-white hover:bg-white/10'
                                } md:w-auto w-4/5 mx-auto text-center`}
                        >
                            Projects
                        </Link>
                        <Link
                            href="/pages/about"
                            className={`text-base font-medium py-2 px-4 rounded-md transition-all relative
                                ${isActive('/pages/about')
                                    ? 'text-white bg-white/10 after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-indigo-500 after:rounded'
                                    : 'text-white/70 hover:text-white hover:bg-white/10'
                                } md:w-auto w-4/5 mx-auto text-center`}
                        >
                            About
                        </Link>
                        <Link
                            href="/pages/contact"
                            className={`text-base font-medium py-2 px-4 rounded-md transition-all relative
                                ${isActive('/pages/contact')
                                    ? 'text-white bg-white/10 after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-indigo-500 after:rounded'
                                    : 'text-white/70 hover:text-white hover:bg-white/10'
                                } md:w-auto w-4/5 mx-auto text-center`}
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Login Button */}
                    <Link
                        href="/pages/login"
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-7 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md md:ml-4 md:w-auto w-4/5 mx-auto text-center"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}