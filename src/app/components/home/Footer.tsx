"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { socialLinks } from "@/app/data/socialLinks";

export default function Footer() {

    // States & hooks
    const [currentYear, setCurrentYear] = useState<string>(""); // Gets current year

    useEffect(() => {
        setCurrentYear(new Date().getFullYear().toString());
    }, []);

    return (
        <footer className="mt-20">
            {/* Main Footer */}
            <div className="bg-[#282A42] text-[white] py-16">
                <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-20">
                    {/* About Section - 40% width */}
                    <div className="md:w-[40%] -ml-10">
                        <h3 className="text-xl font-semibold mb-6 text-white relative after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:w-10 after:h-0.5 after:bg-indigo-500">
                            About Me
                        </h3>
                        <p className="text-[#9698af] mb-6 leading-7 mt-8">
                            Hello! My name is Micael Ribeiro and I'm a web developer passionate about creating innovative and efficient solutions. With experience in various technologies, I'm always looking for new challenges to improve my skills.
                        </p>
                        <div className="flex gap-3 mt-6">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.name}
                                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:-translate-y-[3px]"
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
                    <div className="md:w-[30%] max-lg:w-full ml-20">
                        <h3 className="text-xl font-semibold mb-6 text-white relative after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:w-10 after:h-0.5 after:bg-indigo-500">
                            Contact Info
                        </h3>
                        <ul className="space-y-5 mt-8">
                            <li className="flex items-center gap-3">
                                <i className="ri-map-pin-line text-indigo-500 mt-1 text-xl"></i>
                                <p className="text-[#9698af]">Canhas, Funchal, Madeira</p>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="ri-phone-line text-indigo-500 text-xl"></i>
                                <a
                                    href="tel:+351964420812"
                                    className="text-[#9698af] hover:text-indigo-500 transition-colors duration-200"
                                >
                                    +351 964 420 812
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="ri-mail-line text-indigo-500 text-xl"></i>
                                <a
                                    href="mailto:micael1999work@gmail.com"
                                    className="text-[#9698af] hover:text-indigo-500 transition-colors duration-200"
                                >
                                    micael1999work@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="ri-file-list-line text-indigo-500 text-xl"></i>
                                <p className="text-[#9698af]"><strong>Tax ID:</strong> 261446509</p>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links - 30% width */}
                    <div className="md:w-[30%] max-lg:w-full ml-20">
                        <h3 className="text-xl font-semibold mb-6 text-white relative after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:w-10 after:h-0.5 after:bg-indigo-500">
                            Quick Links
                        </h3>
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <ul className="space-y-3">
                                <li className="relative">
                                    <Link
                                        href="/pages/home"
                                        className="text-[#9698af] hover:text-indigo-500 transition-all duration-200 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-indigo-500 before:opacity-60 hover:pl-5 hover:before:opacity-100"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="relative">
                                    <Link
                                        href="/pages/projects"
                                        className="text-[#9698af] hover:text-indigo-500 transition-all duration-200 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-indigo-500 before:opacity-60 hover:pl-5 hover:before:opacity-100"
                                    >
                                        Projects
                                    </Link>
                                </li>
                                <li className="relative">
                                    <Link
                                        href="/pages/about"
                                        className="text-[#9698af] hover:text-indigo-500 transition-all duration-200 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-indigo-500 before:opacity-60 hover:pl-5 hover:before:opacity-100"
                                    >
                                        About Me
                                    </Link>
                                </li>
                            </ul>
                            <ul className="space-y-3">
                                <li className="relative">
                                    <Link
                                        href="/pages/contact"
                                        className="text-[#9698af] hover:text-indigo-500 transition-all duration-200 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-indigo-500 before:opacity-60 hover:pl-5 hover:before:opacity-100"
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <li className="relative">
                                    <Link
                                        href="/pages/login"
                                        className="text-[#9698af] hover:text-indigo-500 transition-all duration-200 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-indigo-500 before:opacity-60 hover:pl-5 hover:before:opacity-100"
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li className="relative">
                                    <a
                                        href="#"
                                        className="text-[#9698af] hover:text-indigo-500 transition-all duration-200 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-indigo-500 before:opacity-60 hover:pl-5 hover:before:opacity-100"
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Footer */}
            <div className="bg-black/20 text-zinc-400 py-6 text-center">
                <div className="max-w-[1200px] mx-auto px-5">
                    <p className="text-[0.95rem]">© {currentYear} Micael Ribeiro · Web Design & Development · Madeira - Portugal</p>
                </div>
            </div>
        </footer>
    );
}