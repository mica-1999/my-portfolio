"use client"
import { useState, useEffect } from "react";
import { showToast } from "../../reusable/Toasters";
import { useTheme } from "@/app/context/ThemeContext";
import FiltersManageUsers from "./Filters";
import ManageUsersTable from "./UserTable";
import { User } from "@/app/types/dashmain";


export default function Handler() {
    // State and Hooks
    const { t, savedTheme } = useTheme();
    const [filters, setFilters] = useState({ role: "", status: "", timeRange: "", search: "", });
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch users from API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/users", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok && response.status === 404) {
                    showToast("error", t("userManagement.noUsersFound"), savedTheme);
                }
                else {
                    const data = await response.json();
                    setUsers(data || []);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                showToast("error", t("userManagement.errorFetchingUsers"), savedTheme);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, [])

    // Clear all filters
    const clearFilters = () => {
        setFilters({ role: "", status: "", timeRange: "", search: "" });
    };

    return (
        <>
            <div className="w-full mt-4">
                <div className="w-full rounded-xl bg-white shadow-md dark:bg-[#30334E]">
                    <div className="p-4">
                        <div className="flex items-center p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-600 dark:text-[#D7D8ED]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="8.5" cy="7" r="4"></circle>
                                <line x1="20" y1="8" x2="20" y2="14"></line>
                                <line x1="23" y1="11" x2="17" y2="11"></line>
                            </svg>
                            <h5 className="text-xl font-semibold text-gray-800 dark:text-[#d7d8ed]">Users</h5>
                        </div>
                    </div>
                    <div className="">
                        <FiltersManageUsers filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
                    </div>
                    <div>
                        <ManageUsersTable users={users} filters={filters} clearFilters={clearFilters} setUsers={setUsers} />
                    </div>
                </div>
            </div>
        </>
    )
}