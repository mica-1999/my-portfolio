// REVIEWED: 2025-05-05 - Good to go ✅

"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { socialLinks } from "@/app/data/socialLinks";
import { useTheme } from '@/app/context/ThemeContext';

export default function Footer() {
    // Get translation function from context
    const { t } = useTheme();

    // States & hooks
    const [currentYear, setCurrentYear] = useState<string>(""); // Gets current year

    // Set current year on component mount
    useEffect(() => {
        setCurrentYear(new Date().getFullYear().toString());
    }, []);

    return (
        <footer>
            {/* Main Footer */}
            <div className=" bg-gray-100 dark:bg-[#282A42] text-gray-800 dark:text-white py-16">
                <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-20">
                    {/* About Section - 40% width */}
                    <div className="md:w-[40%]">
                        <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white relative after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:w-10 after:h-0.5 after:bg-[#FF6B35] after:rounded dark:after:bg-[#666cff]">
                            {t('footer.aboutMeTitle')}
                        </h3>
                        <p className="text-gray-600 dark:text-[#9698af] mb-6 leading-7 mt-8">
                            {t('footer.aboutMeText')}
                        </p>
                        <div className="flex gap-3 mt-6">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.name}
                                    className="w-9 h-9 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center transition-all duration-300 hover:-translate-y-[3px]"
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = link.color;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "";
                                    }}
                                >
                                    <i className={`${link.icon} text-lg`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info - 30% width */}
                    <div className="md:w-[30%] max-lg:w-full">
                        <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white relative after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:w-10 after:h-0.5 after:bg-[#FF6B35] after:rounded dark:after:bg-[#666cff]">
                            {t('footer.contactInfoTitle')}
                        </h3>
                        <ul className="space-y-5 mt-8">
                            <li className="flex items-center gap-3">
                                <i className="ri-map-pin-line text-[#FF6B35] dark:text-[#666cff] mt-1 text-xl"></i>
                                <p className="text-gray-600 dark:text-[#9698af]">{t('footer.address')}</p>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="ri-phone-line text-[#FF6B35] dark:text-[#666cff] text-xl"></i>
                                <a
                                    href="tel:+351964420812"
                                    className="text-gray-600 hover:text-[#FF6B35] dark:text-[#9698af] dark:hover:text-[#666cff] transition-colors duration-200"
                                >
                                    +351 964 420 812
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="ri-mail-line text-[#FF6B35] dark:text-[#666cff] text-xl"></i>
                                <a
                                    href="mailto:micael1999work@gmail.com"
                                    className="text-gray-600 hover:text-[#FF6B35] dark:text-[#9698af] dark:hover:text-[#666cff] transition-colors duration-200"
                                >
                                    micael1999work@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="ri-file-list-line text-[#FF6B35] dark:text-[#666cff] text-xl"></i>
                                <p className="text-gray-600 dark:text-[#9698af]"><strong>{t('footer.taxId')}</strong> 261446509</p>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links - 30% width */}
                    <div className="md:w-[30%] max-lg:w-full">
                        <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white relative after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:w-10 after:h-0.5 after:bg-[#FF6B35] after:rounded dark:after:bg-[#666cff]">
                            {t('footer.quickLinksTitle')}
                        </h3>
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <ul className="space-y-3">
                                <li className="relative">
                                    <Link
                                        href="/pages/home"
                                        className="text-gray-600 hover:text-[#FF6B35] dark:text-[#9698af] dark:hover:text-[#666cff] transition-all duration-200 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#FF6B35] dark:before:bg-[#666cff] before:opacity-60 hover:pl-5 hover:before:opacity-100"
                                    >
                                        {t('footer.links.home')}
                                    </Link>
                                </li>
                                <li className="relative">
                                    <Link
                                        href="/pages/projects"
                                        className="text-gray-600 hover:text-[#FF6B35] dark:text-[#9698af] dark:hover:text-[#666cff] transition-all duration-200 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#FF6B35] dark:before:bg-[#666cff] before:opacity-60 hover:pl-5 hover:before:opacity-100"
                                    >
                                        {t('footer.links.projects')}
                                    </Link>
                                </li>
                                <li className="relative">
                                    <Link
                                        href="/pages/about"
                                        className="text-gray-600 hover:text-[#FF6B35] dark:text-[#9698af] dark:hover:text-[#666cff] transition-all duration-200 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#FF6B35] dark:before:bg-[#666cff] before:opacity-60 hover:pl-5 hover:before:opacity-100"
                                    >
                                        {t('footer.links.about')}
                                    </Link>
                                </li>
                            </ul>
                            <ul className="space-y-3">
                                <li className="relative">
                                    <Link
                                        href="/pages/contact"
                                        className="text-gray-600 hover:text-[#FF6B35] dark:text-[#9698af] dark:hover:text-[#666cff] transition-all duration-200 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#FF6B35] dark:before:bg-[#666cff] before:opacity-60 hover:pl-5 hover:before:opacity-100"
                                    >
                                        {t('footer.links.contact')}
                                    </Link>
                                </li>
                                <li className="relative">
                                    <Link
                                        href="/pages/login"
                                        className="text-gray-600 hover:text-[#FF6B35] dark:text-[#9698af] dark:hover:text-[#666cff] transition-all duration-200 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#FF6B35] dark:before:bg-[#666cff] before:opacity-60 hover:pl-5 hover:before:opacity-100"
                                    >
                                        {t('footer.links.login')}
                                    </Link>
                                </li>
                                <li className="relative">
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-[#FF6B35] dark:text-[#9698af] dark:hover:text-[#666cff] transition-all duration-200 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#FF6B35] dark:before:bg-[#666cff] before:opacity-60 hover:pl-5 hover:before:opacity-100"
                                    >
                                        {t('footer.links.privacyPolicy')}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Footer */}
            <div className="bg-gray-200 dark:bg-[#1e1f32] text-gray-600 dark:text-zinc-400 py-6 text-center">
                <div className="max-w-[1200px] mx-auto px-5">
                    <p className="text-[0.95rem]">© {currentYear} {t('footer.copyright')}</p>
                </div>
            </div>
        </footer>
    );
}