import { useTheme } from "@/app/context/ThemeContext";
import { useState } from "react";
import Link from "next/link";
import { LearningItem } from "@/app/types/learning";
import { getStatusColor, getStatusBgColor, formatDate } from "@/app/components/reusable/Utils";

interface ItemsProps {
    items: LearningItem[];
    filters: {
        status: string;
        category: string;
        subcategories: string[];
        timeRange: string;
        search: string;
    };
    clearFilters: () => void;
    setItems: React.Dispatch<React.SetStateAction<LearningItem[]>>;
}

export default function Items({ items, filters, clearFilters, setItems }: ItemsProps) {
    const { t } = useTheme();
    const [expandedItem, setExpandedItem] = useState<string | null>(null);

    // Filter items based on the current filters
    const filteredItems = items.filter(item => {
        // Filter by search term
        if (filters.search && !item.title.toLowerCase().includes(filters.search.toLowerCase()) &&
            !item.description.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
        }

        // Filter by status
        if (filters.status && item.status !== filters.status) {
            return false;
        }

        // Filter by category - convert item.category to lowercase for comparison
        if (filters.category && item.category.toLowerCase() !== filters.category.toLowerCase()) {
            return false;
        }

        // Filter by subcategories
        if (filters.subcategories.length > 0 &&
            !item.subcategories.some(sub => filters.subcategories.includes(sub))) {
            return false;
        }

        // Filter by time range (simplified for now)
        if (filters.timeRange) {
            const today = new Date();
            const startDate = new Date(item.startDate);

            switch (filters.timeRange) {
                case 'last7days':
                    const last7Days = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                    if (startDate < last7Days) return false;
                    break;
                case 'last30days':
                    const last30Days = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                    if (startDate < last30Days) return false;
                    break;
                case 'last90days':
                    const last90Days = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
                    if (startDate < last90Days) return false;
                    break;
                case 'lastyear':
                    const lastYear = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
                    if (startDate < lastYear) return false;
                    break;
            }
        }

        return true;
    });

    // Toggle item expansion
    const toggleExpand = (id: string) => {
        setExpandedItem(expandedItem === id ? null : id);
    };

    // Empty state component
    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <i className="ri-book-open-line text-[3rem] text-gray-500 dark:text-[#7B7C95]"></i>
            <h5 className="mt-3 text-gray-700 dark:text-gray-300 text-[1.25rem] font-medium">
                {t('learningTable.noItems') || 'No learning items found'}
            </h5>
            {items.length === 0 ? (
                <p className="text-gray-500 dark:text-[#7B7C95] max-w-md mb-6">
                    {t('learningTable.startLearning') || 'Add your first learning item to get started'}
                </p>
            ) : (
                <p className="text-gray-500 dark:text-[#7B7C95] max-w-md mb-6">
                    {t('learningTable.adjustFilters') || 'Try adjusting your filters or search terms'}
                </p>
            )}
            {items.length > 0 && (
                <button
                    onClick={clearFilters}
                    className="mt-4 px-4 py-2 bg-transparent border border-[#666cff] hover:bg-[#666cff] text-[#666cff] hover:text-white text-md font-medium rounded-md transition-colors cursor-pointer"
                >
                    {t('projects.resetFilters') || 'Reset filters'}
                </button>
            )}
        </div>
    );

    if (filteredItems.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                    <div
                        key={item.id}
                        className={`rounded-xl overflow-hidden shadow-md transition-all duration-300 ease-in-out 
                                 ${getStatusBgColor(item.status)} border border-gray-200 dark:border-gray-700
                                 ${expandedItem === item.id ? 'scale-[1.02] shadow-lg' : 'hover:shadow-lg hover:scale-[1.01]'}`}
                    >
                        {/* Card Header */}
                        <div className="relative h-32 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-900">
                            {/* Status Badge */}
                            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(item.status)}`}>
                                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </div>

                            {/* Category Badge */}
                            <div className="absolute bottom-4 left-4">
                                <span className="px-3 py-1 bg-black/30 backdrop-blur-sm text-white rounded-full text-xs font-medium">
                                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                                </span>
                            </div>

                            {/* Progress Bar (if applicable) */}
                            {(item.progress !== undefined && item.status !== 'planned') && (
                                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200 dark:bg-gray-800">
                                    <div className={`h-full ${getStatusColor(item.status)}`} style={{ width: `${item.progress}%` }}></div>
                                </div>
                            )}
                        </div>

                        {/* Card Content */}
                        <div className="p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate">
                                    {item.title}
                                </h3>
                                <button
                                    onClick={() => toggleExpand(item.id)}
                                    className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform ${expandedItem === item.id ? 'transform rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>

                            {/* Subcategories Badges */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {item.subcategories.map((subcategory, index) => (
                                    <span key={index} className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded">
                                        {subcategory}
                                    </span>
                                ))}
                            </div>

                            {/* Description - Truncated when not expanded */}
                            <p className={`text-gray-600 dark:text-gray-300 text-sm mb-4 ${expandedItem !== item.id && 'line-clamp-2'}`}>
                                {item.description}
                            </p>

                            {/* Date Information */}
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Started: {formatDate(item.startDate)}</span>
                                {item.endDate && (
                                    <>
                                        <span className="mx-2">•</span>
                                        <span>Completed: {formatDate(item.endDate)}</span>
                                    </>
                                )}
                            </div>

                            {/* Expanded Content */}
                            {expandedItem === item.id && (
                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    {/* Progress Section */}
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.progress || 0}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                            <div
                                                className={`h-2.5 rounded-full ${getStatusColor(item.status)}`}
                                                style={{ width: `${item.progress || 0}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Resources Section */}
                                    {item.resources && item.resources.length > 0 && (
                                        <div className="mb-4">
                                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Resources</h4>
                                            <ul className="list-disc list-inside space-y-1">
                                                {item.resources.map((resource, index) => (
                                                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                                                        {resource}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Notes Section */}
                                    {item.notes && (
                                        <div className="mb-4">
                                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Notes</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.notes}</p>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex justify-end gap-2 mt-4">
                                        <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                                            Edit
                                        </button>
                                        <Link href={`/dashboard/learning/software/${item.id}`} className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* Card Footer - Always visible */}
                            {expandedItem !== item.id && (
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center">
                                        {item.progress !== undefined && (
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">{item.progress}% complete</span>
                                            </div>
                                        )}
                                    </div>
                                    <Link
                                        href={`/dashboard/learning/software/${item.id}`}
                                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
