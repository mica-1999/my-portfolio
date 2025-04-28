"use client"
import { useState } from "react";
import FiltersManageUsers from "./Filters";


export default function Handler() {
    const [filters, setFilters] = useState({ role: "", status: "", timeRange: "", search: "", });
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    return (
        <>
            <div className="w-full mt-4">
                <div className="w-full rounded-xl bg-white shadow-md dark:bg-[#30334E]">
                    <div className="p-4">
                        <div className="flex items-center p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-600 dark:text-[#9698af]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="8.5" cy="7" r="4"></circle>
                                <line x1="20" y1="8" x2="20" y2="14"></line>
                                <line x1="23" y1="11" x2="17" y2="11"></line>
                            </svg>
                            <h5 className="text-xl font-semibold text-gray-800 dark:text-[#d7d8ed]">Users</h5>
                        </div>
                    </div>
                    <div className="p-4">
                        <FiltersManageUsers />
                    </div>
                </div>
            </div>
        </>
    )
}