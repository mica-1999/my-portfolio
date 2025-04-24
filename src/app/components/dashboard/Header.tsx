"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { showToast } from "../reusable/Toasters";
import { useTheme } from "@/app/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";

export default function Header() {

    // States & Hooks
    const { data: session } = useSession();
    const { t, savedTheme } = useTheme();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOut({ redirect: false });
            showToast("success", "Thank you for your visit", savedTheme);
        } catch (error) {
            console.error("Error signing out:", error);
            showToast("error", "Error signing out. Please try again.", savedTheme);
        }
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="w-full h-[48px] bg-transparent flex items-center justify-between mt-10 px-4">
            <div id="searchInput" className="flex flex-grow items-center gap-2 h-full hover:bg-[#33354C] transition-all duration-200 ease-in-out rounded-md px-2 mr-5">
                <i className="ri-search-line text-[1.5rem] font-black text-[#d7d8ed]"></i>
                <input type="text" placeholder="Search (Ctrl+/)" className="w-full h-full px-2 rounded-md text-white placeholder:text-[#7b7c95] focus:outline-none" />
            </div>

            <div className="flex items-center gap-3 ml-auto mr-10">
                <Link href="https://www.youtube.com/"><i className="ri-youtube-fill text-[1.7rem] hover:text-red-500"></i></Link>
                <Link href="https://github.com/mica-1999"><i className="ri-github-fill text-[1.7rem] hover:text-gray-900"></i></Link>
                <i className="ri-refresh-line text-[1.7rem] cursor-pointer hover:text-green-500" onClick={() => window.location.reload()}></i>
                <i className="ri-notification-line text-[1.7rem] cursor-pointer hover:text-yellow-400"></i>

                <div className="relative">
                    <Image
                        src="/images/dashboard/miniIcon.png"
                        alt="Profile Icon"
                        className="profile-icon dropdown-toggle rounded-full cursor-pointer"
                        width={40}
                        height={40}
                        onClick={toggleDropdown}
                    />

                    {dropdownOpen && (
                        <ul className="absolute right-0 mt-2 bg-[#282A42] border border-[#393B50] rounded-lg shadow-lg z-50 min-w-[200px]">
                            <li className="dropdown-header flex items-center p-3">
                                <Image
                                    src="/images/dashboard/miniIcon.png"
                                    className="profile-icon rounded-full"
                                    alt="Profile Icon"
                                    width={40}
                                    height={40}
                                />
                                <div className="ml-2">
                                    <p className="mb-0 text-[#d7d8ed]">{session?.user?.firstName || "Guest"} {session?.user?.lastName || ""}</p>
                                    <small className="text-[#7b7c95]">{session?.user?.role || "User"}</small>
                                </div>
                            </li>
                            <hr className="border-[#393B50]" />
                            <li><Link className="dropdown-item block px-4 py-2 hover:bg-[#373951] cursor-pointer" href={`/pages/dashboard/personal?userId=${session?.user?.id}`}><i className="ri-user-line mr-2"></i>My Profile</Link></li>
                            <li><Link className="dropdown-item block px-4 py-2 hover:bg-[#373951] cursor-pointer" href="#"><i className="ri-settings-line mr-2"></i>Settings</Link></li>
                            <hr className="border-[#393B50]" />
                            <li><Link className="dropdown-item block px-4 py-2 hover:bg-[#373951] cursor-pointer" href="#"><i className="ri-question-line mr-2"></i>FAQ</Link></li>
                            <li><button className="dropdown-item logout-btn bg-red-600 hover:bg-red-700 text-white w-full text-left px-4 py-2 cursor-pointer" onClick={handleSignOut}><i className="ri-logout-box-line mr-2"></i>Logout</button></li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}