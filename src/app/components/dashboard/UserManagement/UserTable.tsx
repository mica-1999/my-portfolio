"use client";
import { useTheme } from '@/app/context/ThemeContext';
import { User } from '@/app/types/dashmain';
import { UserFilters } from '@/app/types/managePages';
import { getRoleStyles, getActiveStatusStyles, formatDate } from '@/app/components/reusable/UserUI';
import { useMemo } from 'react';
import { showToast } from '../../reusable/Toasters';

interface ManageUsersTableProps {
    users: User[];
    filters: UserFilters;
    clearFilters: () => void;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export default function ManageUsersTable({ users = [], filters, clearFilters, setUsers }: ManageUsersTableProps) {
    // State and Hooks
    const { t, savedTheme } = useTheme();

    // Filter users based on applied filters
    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            // Filter by role
            if (filters.role && user.role.toLowerCase() !== filters.role.toLowerCase()) {
                return false;
            }

            // Filter by status (isactive)
            if (filters.status && user.isactive.toLowerCase() !== filters.status.toLowerCase()) {
                return false;
            }

            // Filter by search (firstname, lastname, or email)
            if (filters.search) {
                const searchTerm = filters.search.toLowerCase();
                const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
                const isInName = fullName.includes(searchTerm);
                const isInEmail = user.email.toLowerCase().includes(searchTerm);
                const isInJob = user.job ? user.job.toLowerCase().includes(searchTerm) : false;

                if (!isInName && !isInEmail && !isInJob) {
                    return false;
                }
            }

            // Filter by time range (lastlogin)
            if (filters.timeRange && user.lastlogin) {
                const today = new Date();
                const lastActive = new Date(user.lastlogin);

                const daysDifference = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

                switch (filters.timeRange) {
                    case 'week':
                        return daysDifference <= 7;
                    case 'month':
                        return daysDifference <= 30;
                    case 'halfyear':
                        return daysDifference <= 180;
                    case 'year':
                        return lastActive.getFullYear() === today.getFullYear();
                    default:
                        return true;
                }
            }

            return true;
        });
    }, [users, filters]);

    // Handle delete user
    const handleDeleteUser = async (userId: number) => {
        try {
            const response = await fetch(`/api/users?userId=${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok && response.status === 404) {
                showToast("error", t("userManagement.userNotFound"), savedTheme);
                return;
            }
            else {
                // Update users state by filtering out the deleted user
                setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
                showToast("success", t("userManagement.userDeleted"), savedTheme);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            showToast("error", t("userManagement.errorDeletingUser"), savedTheme);
        }
    };

    // Check if any filters are applied
    const hasActiveFilters = filters.role !== "" || filters.status !== "" || filters.timeRange !== "" || filters.search !== "";

    return (
        <div className="w-full mt-4">
            <div className="w-full rounded-xl bg-white shadow-md dark:bg-[#30334E]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-[#3A3E5B] text-gray-600 dark:text-[#D7D8ED] text-sm uppercase">
                            <tr>
                                <th className="px-6 py-4">{t('usersTable.userHeader')}</th>
                                <th className="px-6 py-4">{t('usersTable.emailHeader')}</th>
                                <th className="px-6 py-4">{t('usersTable.roleHeader')}</th>
                                <th className="px-6 py-4">{t('usersTable.statusHeader')}</th>
                                <th className="px-6 py-4">{t('usersTable.lastActiveHeader')}</th>
                                <th className="px-6 py-4">{t('usersTable.actionsHeader')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => {
                                    const roleStyle = getRoleStyles(user.role);
                                    const statusStyle = getActiveStatusStyles(user.isactive);
                                    return (
                                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-[#282A42] cursor-pointer">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                            {user.firstname.charAt(0)}{user.lastname.charAt(0)}
                                                        </span>
                                                    </div>
                                                    <div className="ml-3">
                                                        <div className="text-sm font-medium text-gray-800 dark:text-[#d7d8ed]">
                                                            {user.firstname} {user.lastname}
                                                        </div>
                                                        {user.job && (
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                {user.job}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-[#9698af]">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {roleStyle?.icon}
                                                    <span className={`ml-2 text-sm ${roleStyle?.textColor || ''}`}>
                                                        {roleStyle?.output}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle}`}>
                                                    {user.isactive.charAt(0).toUpperCase() + user.isactive.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-[#9698af]">
                                                {formatDate(user.lastlogin?.toString())}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex space-x-2">
                                                    <button
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/50 transition-colors cursor-pointer"
                                                        title={t('usersTable.edit')}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/50 transition-colors cursor-pointer"
                                                        title={t('usersTable.delete')}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={6} className='hover:bg-[#333656]'>
                                        <div className="text-center my-8 py-20 ">
                                            <i className="ri-user-search-line text-[3rem] text-gray-500 dark:text-[#7B7C95]"></i>
                                            <h5 className="mt-3 text-gray-700 dark:text-gray-300 text-[1.25rem] font-medium">{t('usersTable.noUsers')}</h5>
                                            {hasActiveFilters && (
                                                <>
                                                    <p className="text-gray-500 dark:text-[#7B7C95]">{t('usersTable.adjustFilters')}</p>
                                                    <button
                                                        onClick={clearFilters}
                                                        className="mt-4 px-4 py-2 bg-transparent border-1 border-[#666cff] hover:bg-[#666cff] text-[#666cff] hover:text-white text-md font-medium rounded-md transition-colors cursor-pointer"
                                                    >
                                                        {t('filters.clearFilters')}
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}