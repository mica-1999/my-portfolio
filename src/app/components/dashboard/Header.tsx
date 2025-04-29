"use client";
import { useRef, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { showToast } from "../reusable/Toasters";
import { useTheme } from "@/app/context/ThemeContext";
import { useClickOutside } from "../reusable/ClickOutsideDiv";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    // States & Hooks
    const { data: session } = useSession();
    const { t, savedTheme } = useTheme();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const settingsRef = useRef<HTMLUListElement>(null);

    useClickOutside(settingsRef, setDropdownOpen);

    const handleSignOut = async () => {
        try {
            await signOut({ callbackUrl: "/pages/login" });
            showToast("success", t('header.signOutSuccess'), savedTheme);
        } catch (error) {
            console.error("Error signing out:", error);
            showToast("error", t('header.signOutError'), savedTheme);
        }
    }

    return (
        <div className="w-full h-[48px] bg-transparent flex items-center justify-between mt-10 px-4 mb-5">
            <div id="searchInput" className="flex flex-grow items-center gap-2 h-full hover:bg-[#33354C] transition-all duration-200 ease-in-out rounded-md px-2 ml-4 mr-5">
                <i className="ri-search-line text-[1.5rem] font-black text-[#d7d8ed]"></i>
                <input type="text" placeholder={t('header.searchPlaceholder')} className="w-full h-full px-2 rounded-md text-white placeholder:text-[#7b7c95] focus:outline-none" />
            </div>

            <div className="flex items-center gap-3 ml-auto mr-10">
                <Link href="https://www.youtube.com/"><i className="ri-youtube-fill text-[1.7rem] hover:text-red-500"></i></Link>
                <Link href="https://github.com/mica-1999"><i className="ri-github-fill text-[1.7rem] hover:text-gray-900"></i></Link>
                <i className="ri-refresh-line text-[1.7rem] cursor-pointer hover:text-green-500" onClick={() => window.location.reload()}></i>
                <i className="ri-notification-line text-[1.7rem] cursor-pointer hover:text-yellow-400"></i>

                <div className="relative">
                    <Image
                        src="/images/dashboard/miniIcon.png"
                        alt={t('header.profileIcon')}
                        className="profile-icon dropdown-toggle rounded-full cursor-pointer"
                        width={40}
                        height={40}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    />

                    {dropdownOpen && (
                        <ul className="absolute right-0 mt-2 bg-[#282A42] border border-[#393B50] rounded-lg shadow-lg z-50 min-w-[200px]" ref={settingsRef}>
                            <li className="dropdown-header flex items-center p-3">
                                <Image
                                    src="/images/dashboard/miniIcon.png"
                                    className="profile-icon rounded-full"
                                    alt={t('header.profileIcon')}
                                    width={40}
                                    height={40}
                                />
                                <div className="ml-2">
                                    <p className="mb-0 text-[#d7d8ed]">{session?.user?.firstName || t('header.guest')} {session?.user?.lastName || ""}</p>
                                    <small className="text-[#7b7c95]">{session?.user?.role || t('header.userRole')}</small>
                                </div>
                            </li>
                            <hr className="border-[#393B50]" />
                            <li><Link className="dropdown-item block px-4 py-2 hover:bg-[#373951] cursor-pointer" href={`/pages/dashboard/personal?userId=${session?.user?.id}`}><i className="ri-user-line mr-2"></i>{t('header.myProfile')}</Link></li>
                            <li><Link className="dropdown-item block px-4 py-2 hover:bg-[#373951] cursor-pointer" href="#"><i className="ri-settings-line mr-2"></i>{t('header.settings')}</Link></li>
                            <hr className="border-[#393B50]" />
                            <li><Link className="dropdown-item block px-4 py-2 hover:bg-[#373951] cursor-pointer" href="#"><i className="ri-question-line mr-2"></i>{t('header.faq')}</Link></li>
                            <li><button className="dropdown-item logout-btn bg-red-600 hover:bg-red-700 text-white w-full text-left px-4 py-2 cursor-pointer" onClick={handleSignOut}><i className="ri-logout-box-line mr-2"></i>{t('header.logout')}</button></li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}