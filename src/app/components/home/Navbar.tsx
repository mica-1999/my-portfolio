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
    const { t } = useTheme(); // Lang & Theme context

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
            ? 'py-3 bg-white/95 shadow-lg dark:bg-zinc-900/95'
            : 'py-5 bg-white/90 dark:bg-zinc-900/90'
            } backdrop-blur-md`}>
            {/* Container with max-width for navbar contents */}
            <div className="max-w-[1200px] mx-auto px-5 flex justify-between items-center">
                {/* Logo */}
                <div className="font-bold">
                    <Link href="/pages/home" className="flex items-center">
                        <span className="text-gray-800 text-[1.625rem] font-bold tracking-wide dark:text-white">Micael</span>
                        <span className="text-[#FF6B35] text-[1.625rem] font-bold ml-0.5 dark:text-[#666cff]">Dev</span>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="flex flex-col justify-between items-center w-6 h-[18px]"
                        aria-label={t('navbar.toggleMenu')}
                    >
                        <span className={`block w-full h-0.5 bg-gray-800 transition-all duration-300 dark:bg-white ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                            }`}></span>
                        <span className={`block w-full h-0.5 bg-gray-800 transition-all duration-300 dark:bg-white ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                            }`}></span>
                        <span className={`block w-full h-0.5 bg-gray-800 transition-all duration-300 dark:bg-white ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                            }`}></span>
                    </button>
                </div>

                {/* Desktop & Mobile menu */}
                <div className={`md:flex md:items-center md:gap-6 ${mobileMenuOpen
                    ? 'absolute top-full left-0 w-full bg-white/95 dark:bg-zinc-900/95 flex flex-col py-5 space-y-4 shadow-lg animate-slideDown'
                    : 'hidden'
                    }`}>
                    <div className="md:flex md:space-x-6 flex-col md:flex-row md:items-center space-y-3 md:space-y-0 gap-3">
                        <Link
                            href="/pages/home"
                            className={`text-base font-medium py-2 px-4 rounded-md transition-all relative
                                ${isActive('/pages/home')
                                    ? 'text-gray-800 bg-gray-100 after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-[#FF6B35] after:rounded dark:text-white dark:bg-white/10 dark:after:bg-[#666cff]'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10'
                                } md:w-auto w-4/5 mx-auto text-center`}
                        >
                            {t('navbar.home')}
                        </Link>
                        <Link
                            href="/pages/home/projects"
                            className={`text-base font-medium py-2 px-4 rounded-md transition-all relative
                                ${isActive('/pages/home/projects')
                                    ? 'text-gray-800 bg-gray-100 after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-[#FF6B35] after:rounded dark:text-white dark:bg-white/10 dark:after:bg-[#666cff]'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10'
                                } md:w-auto w-4/5 mx-auto text-center`}
                        >
                            {t('navbar.projects')}
                        </Link>
                        <Link
                            href="/pages/home/aboutme"
                            className={`text-base font-medium py-2 px-4 rounded-md transition-all relative
                                ${isActive('/pages/home/aboutme')
                                    ? 'text-gray-800 bg-gray-100 after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-[#FF6B35] after:rounded dark:text-white dark:bg-white/10 dark:after:bg-[#666cff]'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10'
                                } md:w-auto w-4/5 mx-auto text-center`}
                        >
                            {t('navbar.about')}
                        </Link>
                        <Link
                            href="/pages/home/contact"
                            className={`text-base font-medium py-2 px-4 rounded-md transition-all relative
                                ${isActive('/pages/home/contact')
                                    ? 'text-gray-800 bg-gray-100 after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-[#FF6B35] after:rounded dark:text-white dark:bg-white/10 dark:after:bg-[#666cff]'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10'
                                } md:w-auto w-4/5 mx-auto text-center`}
                        >
                            {t('navbar.contact')}
                        </Link>
                    </div>

                    {/* Login Button */}
                    <Link
                        href="/pages/login"
                        className="bg-[#FF6B35] hover:bg-[#e55a29] text-white px-7 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md md:ml-4 md:w-auto w-4/5 mx-auto text-center dark:bg-[#666cff] dark:hover:bg-[#5a5fe6]"
                    >
                        {t('navbar.login')}
                    </Link>
                </div>
            </div>
        </nav>
    );
}