"use client";
import { useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { UserProject, ProjectState } from '@/app/types/dashmain';

interface ProjectTableProps {
    projects: UserProject[];
}

export default function ProjectTable({ projects = [] }: ProjectTableProps) {
    const [hidden, setHidden] = useState(false);
    const { t } = useTheme(); // Get translation function from context

    // Get badge color based on state
    const getBadgeColor = (state: string) => {
        switch (state) {
            case 'COMPLETED':
                return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case 'IN_PROGRESS':
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
            case 'PLANNING':
                return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
            case 'DELAYED':
                return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400";
        }
    };

    // Format state for display
    const formatState = (state: string) => {
        return state.replace('_', ' ').toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="w-full mt-4">
            <div className="w-full rounded-xl bg-white shadow-md dark:bg-[#30334E] h-[450px] flex flex-col overflow-hidden">
                <div className={`${hidden ? 'blur-sm' : ''} flex flex-col h-full`}>
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600 dark:text-[#9698af]" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a2 2 0 012 2v2h4a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-2H4a2 2 0 01-2-2V6zm10 2H6v2h6V8z" clipRule="evenodd" />
                                </svg>
                                <h5 className="text-xl font-semibold text-gray-800 dark:text-[#d7d8ed]">{t('projectTable.title')}</h5>
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
                    <div className="flex-1 overflow-hidden flex flex-col">
                        <div className="sticky top-0 z-10">
                            <table className="w-full table-fixed">
                                <colgroup>
                                    <col style={{ width: '12%' }} />
                                    <col style={{ width: '18%' }} />
                                    <col style={{ width: '40%' }} />
                                    <col style={{ width: '15%' }} />
                                    <col style={{ width: '15%' }} />
                                </colgroup>
                                <thead className="bg-gray-50 dark:bg-[#3A3E5B] text-gray-600 dark:text-[#d7d8ed] text-sm uppercase">
                                    <tr>
                                        <th className="px-6 py-3 text-left">{t('projectTable.idHeader')}</th>
                                        <th className="px-6 py-3 text-left">{t('projectTable.nameHeader')}</th>
                                        <th className="px-6 py-3 text-left">{t('projectTable.descriptionHeader')}</th>
                                        <th className="px-6 py-3 text-left">{t('projectTable.stateHeader')}</th>
                                        <th className="px-6 py-3 text-left">{t('projectTable.activeHeader')}</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="flex-1 overflow-y-auto
                                  [&::-webkit-scrollbar]:w-[13px]
                                  [&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-track]:bg-[#30334E] 
                                  [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-[#464963] 
                                  [&::-webkit-scrollbar-thumb]:rounded-[10px]
                                  [&::-webkit-scrollbar-thumb]:border-[3px]
                                  [&::-webkit-scrollbar-thumb]:border-solid
                                  [&::-webkit-scrollbar-thumb]:border-white dark:[&::-webkit-scrollbar-thumb]:border-[#30334E]
                                  [&::-webkit-scrollbar-thumb:hover]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb:hover]:bg-[#b2b3c7]
                                  [&::-webkit-scrollbar-thumb]:transition-colors
                                  [&::-webkit-scrollbar-thumb]:duration-300
                                  [&::-webkit-scrollbar-thumb]:ease-in-out">
                            <table className="w-full table-fixed">
                                <colgroup>
                                    <col style={{ width: '12%' }} />
                                    <col style={{ width: '18%' }} />
                                    <col style={{ width: '40%' }} />
                                    <col style={{ width: '15%' }} />
                                    <col style={{ width: '15%' }} />
                                </colgroup>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {projects.length > 0 ? (
                                        projects.map((userProject) => (
                                            <tr key={userProject.id} className="hover:bg-gray-50 dark:hover:bg-[#282A42] cursor-pointer">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-[#9698af]">PRJ-{userProject.projectId.toString().padStart(3, '0')}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-[#9698af]">{userProject.project.name}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-[#9698af] truncate">{userProject.project.description || '-'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(userProject.project.state)}`}>
                                                        {formatState(userProject.project.state)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-[#9698af]">{formatDate(userProject.project.updatedAt)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="text-center py-24">
                                                <div className="flex flex-col items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 dark:text-gray-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                    </svg>
                                                    <p className="text-gray-600 dark:text-[#9698af] text-lg font-medium mb-1">
                                                        {t('projectTable.noProjects')}
                                                    </p>
                                                    <p className="text-gray-500 dark:text-gray-500 text-sm">
                                                        {t('projectTable.startProject')}
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}
