// REVIEWED: 2025-05-05 - Good to go ✅
"use client";
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from "@/app/context/ThemeContext";
import { usePathname } from 'next/navigation';
import { dashboardMenuData, appsAndPagesData, configsData } from '@/app/data/dashboardMenuData';

export default function Sidebar() {
    // Get the current pathname for active menu highlighting
    const pathname = usePathname();
    const { t } = useTheme();

    // Determine selected menu based on pathname
    const findSelectedMenu = () => {
        // Combine all menu data
        const allMenuItems = [...dashboardMenuData, ...appsAndPagesData, ...configsData];

        // First check direct matches
        for (const item of allMenuItems) {
            if ('/pages' + item.link === pathname) {
                return item.title;
            }

            // Check sublinks if they exist
            if ('sublinks' in item && item.sublinks) {
                for (const sublink of item.sublinks) {
                    if ('/pages' + sublink.link === pathname) {
                        return sublink.title;
                    }
                }
            }
        }

        // Default to Home if no match found
        return "Home";
    };

    // State for selected menu based on pathname
    const [selectedMenu, setSelectedMenu] = useState(findSelectedMenu);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // Update selected menu when pathname changes
    useEffect(() => {
        setSelectedMenu(findSelectedMenu());
    }, [pathname]);

    const toggleDropdown = (title: string) => {
        setActiveDropdown(activeDropdown === title ? null : title);
    };

    const isDropdownOpen = (title: string) => { return activeDropdown === title; };

    // Check if selected menu is inside a dropdown and open it automatically
    useEffect(() => {
        // Check in dashboard menu data
        for (const menuItem of dashboardMenuData) {
            if (menuItem.sublinks) {
                const isSubMenuSelected = menuItem.sublinks.some(sublink => sublink.title === selectedMenu);
                if (isSubMenuSelected) {
                    setActiveDropdown(menuItem.title);
                    break;
                }
            }
        }

        // Check in apps and pages data
        for (const menuItem of appsAndPagesData) {
            if (menuItem.sublinks) {
                const isSubMenuSelected = menuItem.sublinks.some(sublink => sublink.title === selectedMenu);
                if (isSubMenuSelected) {
                    setActiveDropdown(menuItem.title);
                    break;
                }
            }
        }
    }, [selectedMenu]);

    return (
        <div className='hidden lg:flex flex-col w-64 bg-[#282A42] text-white h-screen'>
            {/* Logo Section */}
            <div className='w-full flex items-center px-4 mt-10'>
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

            {/* Menu Section - Changed from overflow-y-auto to overflow-auto and added custom scrollbar */}
            <div className='flex flex-col flex-1 px-2 mt-5 overflow-auto 
                          [&::-webkit-scrollbar]:w-[13px]
                          [&::-webkit-scrollbar-track]:bg-[#282A42] 
                          [&::-webkit-scrollbar-thumb]:bg-[#464963] 
                          [&::-webkit-scrollbar-thumb]:rounded-[10px]
                          [&::-webkit-scrollbar-thumb]:border-[3px]
                          [&::-webkit-scrollbar-thumb]:border-solid
                          [&::-webkit-scrollbar-thumb]:border-[#282A42]
                          [&::-webkit-scrollbar-thumb:hover]:bg-[#b2b3c7]
                          [&::-webkit-scrollbar-thumb]:transition-colors
                          [&::-webkit-scrollbar-thumb]:duration-800
                          [&::-webkit-scrollbar-thumb]:ease-in-out'>
                {/* DASHBOARD section */}
                <div className="mt-4 mb-6">
                    <ul id="generalMenu" className='flex flex-col w-full space-y-1'>
                        {dashboardMenuData.map((menuItem, index) => (
                            <li key={index} className="w-full">
                                {menuItem.sublinks ? (
                                    <div className="mb-1">
                                        <div
                                            className={`w-full h-[38px] flex items-center justify-between cursor-pointer 
                                                ${isDropdownOpen(menuItem.title)
                                                    ? "bg-[#373951] text-white"
                                                    : "bg-transparent hover:bg-[#373951] text-[#d7d8ed] hover:text-white"
                                                }
                                                rounded-[13px] px-3 transition-all duration-200 ease-in-out`}
                                            onClick={() => toggleDropdown(menuItem.title)}
                                        >
                                            <div className="flex items-center">
                                                <i className={`${menuItem.icon} text-xl`}></i>
                                                <span className='ml-2'>{t(`sidebar.${menuItem.title.toLowerCase()}`)}</span>
                                            </div>
                                            <i className={`ri-arrow-right-s-line text-xl transform transition-transform duration-200 ${isDropdownOpen(menuItem.title) ? 'rotate-90' : ''}`}></i>
                                        </div>

                                        <div
                                            className="overflow-hidden transition-all duration-300 ease-in-out origin-top"
                                            style={{
                                                maxHeight: isDropdownOpen(menuItem.title) ? '500px' : '0',
                                                opacity: isDropdownOpen(menuItem.title) ? 1 : 0,
                                                transform: isDropdownOpen(menuItem.title) ? 'scaleY(1)' : 'scaleY(0.9)',
                                                transformOrigin: 'top',
                                            }}
                                            ref={(el) => { dropdownRefs.current[menuItem.title] = el; }}
                                        >
                                            <ul className="space-y-1 py-1 px-1">
                                                {menuItem.sublinks.map((sublink, subIdx) => (
                                                    <li key={subIdx}>
                                                        <Link href={`/pages${sublink.link}`}>
                                                            <div
                                                                className={`w-full h-[36px] flex items-center
                                                                    ${selectedMenu === sublink.title
                                                                        ? "bg-[#666CFF] text-white"
                                                                        : "bg-transparent hover:bg-[#373951] text-[#d7d8ed] hover:text-white"
                                                                    }
                                                                    rounded-[13px] transition-colors duration-200 px-3`}
                                                                onClick={() => setSelectedMenu(sublink.title)}
                                                            >
                                                                <i className="ri-circle-fill text-[0.6rem] text-white ml-1"></i>
                                                                <span className='ml-4'>{t(`sidebar.${sublink.title.toLowerCase().replace(/\s+/g, '')}`)}</span>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <Link href={`/pages${menuItem.link}`}>
                                        <div
                                            className={`w-full h-[38px] flex items-center 
                                                ${selectedMenu === menuItem.title
                                                    ? "bg-[#666CFF] text-white"
                                                    : "bg-transparent hover:bg-[#373951] text-[#d7d8ed] hover:text-white"
                                                }
                                                rounded-[13px] px-3 transition-colors duration-200`}
                                            onClick={() => setSelectedMenu(menuItem.title)}
                                        >
                                            <i className={`${menuItem.icon} text-xl`}></i>
                                            <span className='ml-2'>{t(`sidebar.${menuItem.title.toLowerCase()}`)}</span>
                                        </div>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* APPS & PAGES section */}
                <div>
                    <div className="mb-3 px-3">
                        <span className="text-[#7b7c95] text-[0.8125rem] font-medium uppercase">{t('sidebar.appsAndPages')}</span>
                    </div>
                    <ul id="appsMenu" className='flex flex-col w-full space-y-1'>
                        {appsAndPagesData.map((menuItem, index) => (
                            <li key={index} className="w-full">
                                {menuItem.sublinks ? (
                                    <div className="mb-1">
                                        <div
                                            className={`w-full h-[38px] flex items-center justify-between cursor-pointer 
                                                ${isDropdownOpen(menuItem.title)
                                                    ? "bg-[#373951] text-white"
                                                    : "bg-transparent hover:bg-[#373951] text-[#d7d8ed] hover:text-white"
                                                }
                                                rounded-[13px] px-3 transition-all duration-200 ease-in-out`}
                                            onClick={() => toggleDropdown(menuItem.title)}
                                        >
                                            <div className="flex items-center">
                                                <i className={`${menuItem.icon} text-xl`}></i>
                                                <span className='ml-2'>{t(`sidebar.${menuItem.title.toLowerCase()}`)}</span>
                                            </div>
                                            <i className={`ri-arrow-right-s-line text-xl transform transition-transform duration-200 ${isDropdownOpen(menuItem.title) ? 'rotate-90' : ''}`}></i>
                                        </div>

                                        <div
                                            className="overflow-hidden transition-all duration-300 ease-in-out origin-top"
                                            style={{
                                                maxHeight: isDropdownOpen(menuItem.title) ? '500px' : '0',
                                                opacity: isDropdownOpen(menuItem.title) ? 1 : 0,
                                                transform: isDropdownOpen(menuItem.title) ? 'scaleY(1)' : 'scaleY(0.9)',
                                                transformOrigin: 'top',
                                            }}
                                            ref={(el) => { dropdownRefs.current[menuItem.title] = el; }}
                                        >
                                            <ul className="space-y-1 py-1 px-1">
                                                {menuItem.sublinks.map((sublink, subIdx) => (
                                                    <li key={subIdx}>
                                                        <Link href={`/pages${sublink.link}`}>
                                                            <div
                                                                className={`w-full h-[36px] flex items-center
                                                                    ${selectedMenu === sublink.title
                                                                        ? "bg-[#666CFF] text-white"
                                                                        : "bg-transparent hover:bg-[#373951] text-[#d7d8ed] hover:text-white"
                                                                    }
                                                                    rounded-[13px] transition-colors duration-200 px-3`}
                                                                onClick={() => setSelectedMenu(sublink.title)}
                                                            >
                                                                <i className="ri-circle-fill text-[0.6rem] text-white ml-1"></i>
                                                                <span className='ml-4'>{t(`sidebar.${sublink.title.toLowerCase().replace(/\s+/g, '')}`)}</span>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <Link href={`/pages${menuItem.link}`}>
                                        <div
                                            className={`w-full h-[38px] flex items-center 
                                                ${selectedMenu === menuItem.title
                                                    ? "bg-[#666CFF] text-white"
                                                    : "bg-transparent hover:bg-[#373951] text-[#d7d8ed] hover:text-white"
                                                }
                                                rounded-[13px] px-3 transition-colors duration-200`}
                                            onClick={() => setSelectedMenu(menuItem.title)}
                                        >
                                            <i className={`${menuItem.icon} text-xl`}></i>
                                            <span className='ml-2'>{t(`sidebar.${menuItem.title.toLowerCase().replace(/\s+/g, '')}`)}</span>
                                        </div>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CONFIGS section */}
                <div>
                    <div className="mb-3 px-3">
                        <span className="text-[#7b7c95] text-[0.8125rem] font-medium uppercase">{t('sidebar.configs')}</span>
                    </div>
                    <ul id="configsMenu" className='flex flex-col w-full space-y-1'>
                        {configsData.map((menuItem, index) => (
                            <li key={index} className="w-full">
                                <Link href={`/pages${menuItem.link}`}>
                                    <div
                                        className={`w-full h-[38px] flex items-center 
                                            ${selectedMenu === menuItem.title
                                                ? "bg-[#666CFF] text-white"
                                                : "bg-transparent hover:bg-[#373951] text-[#d7d8ed] hover:text-white"
                                            }
                                            rounded-[13px] px-3 transition-colors duration-200`}
                                        onClick={() => setSelectedMenu(menuItem.title)}
                                    >
                                        <i className={`${menuItem.icon} text-xl`}></i>
                                        <span className='ml-2'>{t(`sidebar.${menuItem.title.toLowerCase()}`)}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}