"use client";
import { useMemo } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { Project } from '@/app/types/dashmain';
import { showToast } from '../../reusable/Toasters';
import { getProjectStateBadgeColor, formatProjectState, formatProjectDate, getTagStyling } from '@/app/components/reusable/UserUI';

interface ProjectTableProps {
    projects: Project[];
    filters: {
        status: string;
        tags: string[];
        timeRange: string;
        search: string;
    };
    clearFilters: () => void;
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export default function ManageUsersTable({ projects = [], filters, clearFilters, setProjects }: ProjectTableProps) {
    // State and Hooks
    const { t, savedTheme } = useTheme();

    // Filter projects based on applied filters
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            // Filter by status
            if (filters.status && project.state.toLowerCase() !== filters.status.toLowerCase()) {
                return false;
            }

            // Filter by tags
            if (filters.tags && filters.tags.length > 0) {
                if (!project.tags || !filters.tags.some(tag => project.tags?.includes(tag))) {
                    return false;
                }
            }

            // Filter by search (name or description)
            if (filters.search) {
                const searchTerm = filters.search.toLowerCase();
                const isInName = project.name.toLowerCase().includes(searchTerm);
                const isInDescription = project.description ? project.description.toLowerCase().includes(searchTerm) : false;

                if (!isInName && !isInDescription) {
                    return false;
                }
            }

            // Filter by time range (updatedAt)
            if (filters.timeRange && project.updatedAt) {
                const today = new Date();
                const updatedDate = new Date(project.updatedAt);

                const daysDifference = Math.floor((today.getTime() - updatedDate.getTime()) / (1000 * 60 * 60 * 24));

                switch (filters.timeRange) {
                    case 'last7days':
                        return daysDifference <= 7;
                    case 'last30days':
                        return daysDifference <= 30;
                    case 'last3months':
                        return daysDifference <= 90;
                    case 'last6months':
                        return daysDifference <= 180;
                    case 'thisYear':
                        return updatedDate.getFullYear() === today.getFullYear();
                    default:
                        return true;
                }
            }

            return true;
        });
    }, [projects, filters]);

    // Handle edit project
    const handleEditProject = (projectId: number) => {
        // Implementation for editing a project
        console.log(`Edit project with ID: ${projectId}`);
    };

    // Handle delete project
    const handleDeleteProject = async (projectId: number) => {
        try {
            const response = await fetch(`/api/projects?projectId=${projectId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok && response.status === 404) {
                showToast("error", t("projectTable.projectNotFound") || "Project not found", savedTheme);
                return;
            }
            else {
                // Update projects state by filtering out the deleted project
                setProjects(currentProjects => currentProjects.filter(project => project.id !== projectId));
                showToast("success", t("projectTable.projectDeleted") || "Project deleted successfully", savedTheme);
            }
        } catch (error) {
            console.error("Error deleting project:", error);
            showToast("error", t("projectTable.errorDeletingProject") || "Failed to delete project", savedTheme);
        }
    };

    // Check if any filters are applied
    const hasActiveFilters = filters.status !== "" || filters.tags.length > 0 || filters.timeRange !== "" || filters.search !== "";

    return (
        <div className="w-full overflow-x-auto mt-4">
            <table className="w-full text-left">
                <colgroup>
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '12%' }} />
                    <col style={{ width: '25%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '18%' }} />
                    <col style={{ width: '12%' }} />
                    <col style={{ width: '8%' }} />
                </colgroup>
                <thead className="bg-gray-50 dark:bg-[#3A3E5B] text-gray-600 dark:text-[#D7D8ED] text-sm uppercase">
                    <tr>
                        <th className="px-6 py-4">{t('projectTable.idHeader')}</th>
                        <th className="px-6 py-4">{t('projectTable.nameHeader')}</th>
                        <th className="px-6 py-4">{t('projectTable.descriptionHeader')}</th>
                        <th className="px-6 py-4">{t('projectTable.stateHeader')}</th>
                        <th className="px-6 py-4">Tags</th>
                        <th className="px-6 py-4">{t('projectTable.activeHeader')}</th>
                        <th className="px-6 py-4">{t('projectTable.actionsHeader') || 'Actions'}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-[#282A42] cursor-pointer">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-[#9698af]">PRJ-{project.id.toString().padStart(3, '0')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-[#9698af]">{project.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-[#9698af] truncate">{project.description || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProjectStateBadgeColor(project.state)}`}>
                                        {formatProjectState(project.state)}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {project.tags && project.tags.length > 0 ? (
                                            project.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTagStyling(tag)}`}
                                                >
                                                    {tag}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {t('projectTable.noTags') || 'No tags'}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-[#9698af]">{formatProjectDate(project.updatedAt)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEditProject(project.id)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/50 transition-colors cursor-pointer"
                                            title={t('projectTable.edit') || 'Edit project'}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProject(project.id)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/50 transition-colors cursor-pointer"
                                            title={t('projectTable.delete') || 'Delete project'}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className='hover:bg-[#333656]'>
                                <div className="text-center my-8 py-20">
                                    <i className="ri-folder-search-line text-[3rem] text-gray-500 dark:text-[#7B7C95]"></i>
                                    <h5 className="mt-3 text-gray-700 dark:text-gray-300 text-[1.25rem] font-medium">{t('projectTable.noProjects')}</h5>
                                    {hasActiveFilters && (
                                        <>
                                            <p className="text-gray-500 dark:text-[#7B7C95]">{t('projectTable.adjustFilters') || 'Try adjusting your filters or search terms'}</p>
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
    );
}