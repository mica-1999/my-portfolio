"use client";
import { useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { User, UserRole, UserStatus } from '@/app/types/dashmain';

interface UsersTableProps {
    users: User[];
}

export default function UsersTable({ users = [] }: UsersTableProps) {
    const [hidden, setHidden] = useState(false);
    const { t } = useTheme(); // Get translation function

    // Helper function to get role styles
    const getRoleStyles = (role: string) => {
        switch (role.toLowerCase()) {
            case UserRole.ADMIN:
                return {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#666CFF]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.352-.035-.696-.1-1.028A5.001 5.001 0 0010 11z" clipRule="evenodd" />
                        </svg>
                    ),
                    textColor: 'text-[#666CFF]',
                    output: 'Admin'
                };
            case UserRole.EDITOR:
                return {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF4D49]" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    ),
                    textColor: 'text-[#FF4D49]',
                    output: 'Editor'
                };
            case UserRole.DEVELOPER:
                return {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#72E128]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    ),
                    textColor: 'text-[#72E128]',
                    output: 'Developer'
                };
            default:
                return {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#A26CF8]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    ),
                    textColor: 'text-[#A26CF8]',
                    output: 'Viewer'
                };
        }
    };

    // Helper function to get active status styles
    const getActiveStatusStyles = (status: string) => {
        switch (status.toLowerCase()) {
            case UserStatus.ACTIVE:
                return 'bg-[#3B4F48] text-[#72E128]';
            case UserStatus.PENDING:
                return 'bg-[#4D4538] text-[#FFB400]';
            case UserStatus.SUSPENDED:
                return 'bg-[#4A3F59] text-[#A26CF8]';
            default:
                return 'bg-[#51374D] text-[#FF4D49]';
        }
    };

    // Format date for display
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return 'Never';
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="w-full mt-4">
            <div className="w-full rounded-xl bg-white shadow-md dark:bg-[#30334E]">
                <div className={hidden ? 'blur-sm' : ''}>
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600 dark:text-[#9698af]" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                </svg>
                                <h5 className="text-xl font-semibold text-gray-800 dark:text-[#d7d8ed]">{t('usersTable.title')}</h5>
                            </div>
                            <div className='flex items-center'>
                                <button onClick={() => setHidden(!hidden)} className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white cursor-pointer">
                                    {hidden ?
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg> :
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                        </svg>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        {users.length > 0 ? (
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-[#3A3E5B] text-gray-600 dark:text-[#9698af] text-sm uppercase">
                                    <tr>
                                        <th className="px-6 py-3">{t('usersTable.userHeader')}</th>
                                        <th className="px-6 py-3">{t('usersTable.emailHeader')}</th>
                                        <th className="px-6 py-3">{t('usersTable.roleHeader')}</th>
                                        <th className="px-6 py-3">{t('usersTable.statusHeader')}</th>
                                        <th className="px-6 py-3">{t('usersTable.lastActiveHeader')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {users.map((user) => {
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
                                                        {roleStyle.icon}
                                                        <span className={`ml-2 text-sm ${roleStyle.textColor}`}>
                                                            {roleStyle.output}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle}`}>
                                                        {user.isactive.charAt(0).toUpperCase() + user.isactive.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-[#9698af]">
                                                    {formatDate(user.lastlogin)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            <div className="py-10 text-center text-gray-500 dark:text-gray-400">
                                <p>No users found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
