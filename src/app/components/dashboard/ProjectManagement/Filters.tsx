import { useState } from 'react';
import { stateFilters, tagFilters, timeRangeFilters } from '@/app/data/manageFilters';
import { useTheme } from "@/app/context/ThemeContext";

interface FiltersProps {
    filters: {
        status: string;
        tags: string[];
        timeRange: string;
        search: string;
    };
    setFilters: React.Dispatch<React.SetStateAction<{
        status: string;
        tags: string[];
        timeRange: string;
        search: string;
    }>>;
    clearFilters: () => void;
}

export default function FiltersManageProjects({ filters, setFilters, clearFilters }: FiltersProps) {
    // States & Hooks
    const { t } = useTheme();
    const [openDropdown, setOpenDropdown] = useState('');
    const [tagSearchInput, setTagSearchInput] = useState('');

    // Helper function to format display value
    const getDisplayValue = (currentValue: string | string[], filterType: string) => {
        if (filterType === 'tags') {
            if (!currentValue.length) return t('filters.tagsLabel') || 'Select tags';
            return `${currentValue.length} tag${currentValue.length > 1 ? 's' : ''} selected`;
        }

        if (!currentValue) {
            return filterType === 'status' ? t('filters.statusLabel') || 'Status' :
                t('filters.timeRangeLabel') || 'Time Range';
        }

        if (filterType === 'timeRange') {
            const timeOption = timeRangeFilters.find(option => option.value === currentValue);
            return timeOption ? timeOption.display : typeof currentValue === 'string' ? currentValue.charAt(0).toUpperCase() + currentValue.slice(1) : currentValue;
        }

        return typeof currentValue === 'string' ? currentValue.charAt(0).toUpperCase() + currentValue.slice(1) : currentValue.toString();
    };

    // Update a specific filter
    const updateFilter = (key: 'status' | 'timeRange' | 'search', value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setOpenDropdown('');
    };

    // Toggle tag selection
    const toggleTag = (tag: string) => {
        setFilters(prev => {
            if (prev.tags.includes(tag)) {
                return { ...prev, tags: prev.tags.filter(t => t !== tag) };
            } else {
                return { ...prev, tags: [...prev.tags, tag] };
            }
        });
    };

    // Handle search input
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, search: e.target.value }));
    };

    // Filter tags based on search input
    const filteredTags = tagSearchInput
        ? tagFilters.filter(tag => tag.display.toLowerCase().includes(tagSearchInput.toLowerCase()))
        : tagFilters;

    return (
        <>
            <div className="flex flex-col md:flex-row gap-4 w-full border-[#464963] border-b-1 pb-7 p-4 -mt-3">
                {/* Status Filter */}
                <div className="flex-1 relative">
                    <button
                        type="button"
                        onClick={() => setOpenDropdown(openDropdown === 'status' ? '' : 'status')}
                        className="w-full h-[44px] rounded-lg border-[0.09rem] border-gray-300 bg-white px-3 py-2 text-gray-700 
                        shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 flex justify-between items-center
                        dark:border-[#464963] dark:bg-[#30334E] dark:text-gray-200 dark:focus:border-indigo-400"
                    >
                        <span>{getDisplayValue(filters.status, 'status')}</span>
                        <svg
                            className={`w-5 h-5 ml-2 transform transition-transform duration-300 ease-in-out ${openDropdown === 'status' ? 'rotate-180' : ''}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>

                    {openDropdown === 'status' && (
                        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg dark:bg-[#282A42] border border-gray-200 dark:border-[#464963]">
                            <ul className="max-h-60 overflow-auto rounded-md">
                                {stateFilters.map((option) => (
                                    <li
                                        key={option.value}
                                        onClick={() => updateFilter('status', option.value)}
                                        className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-[#99C8FF] hover:text-[#30334E] dark:hover:text-[#282A42]"
                                    >
                                        {option.display}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Tags Filter with Search */}
                <div className="flex-1 relative">
                    <button
                        type="button"
                        onClick={() => setOpenDropdown(openDropdown === 'tags' ? '' : 'tags')}
                        className="w-full h-[44px] rounded-lg border-[0.09rem] border-gray-300 bg-white px-3 py-2 text-gray-700 
                        shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 flex justify-between items-center
                        dark:border-[#464963] dark:bg-[#30334E] dark:text-gray-200 dark:focus:border-indigo-400"
                    >
                        <span>{getDisplayValue(filters.tags, 'tags')}</span>
                        <svg
                            className={`w-5 h-5 ml-2 transform transition-transform duration-300 ease-in-out ${openDropdown === 'tags' ? 'rotate-180' : ''}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>

                    {openDropdown === 'tags' && (
                        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg dark:bg-[#282A42] border border-gray-200 dark:border-[#464963]">
                            {/* Search input for tags */}
                            <div className="p-2 border-b border-gray-200 dark:border-[#464963]">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        value={tagSearchInput}
                                        onChange={(e) => setTagSearchInput(e.target.value)}
                                        className="w-full pl-10 py-1 text-sm rounded-md border border-gray-300 
                                                dark:border-[#464963] dark:bg-[#30334E] dark:text-gray-200"
                                        placeholder={t('filters.searchProjects') || "Search tags..."}
                                    />
                                </div>
                            </div>
                            <ul className="max-h-60 overflow-auto rounded-md">
                                {filteredTags.map((option) => (
                                    <li
                                        key={option.value}
                                        onClick={() => toggleTag(option.value)}
                                        className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-[#99C8FF] hover:text-[#30334E] dark:hover:text-[#282A42] flex items-center"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={filters.tags.includes(option.value)}
                                            onChange={() => { }}
                                            className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        {option.display}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Time Range Filter */}
                <div className="flex-1 relative">
                    <button
                        type="button"
                        onClick={() => setOpenDropdown(openDropdown === 'timeRange' ? '' : 'timeRange')}
                        className="w-full h-[44px] rounded-lg border-[0.09rem] border-gray-300 bg-white px-3 py-2 text-gray-700 
                        shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 flex justify-between items-center
                        dark:border-[#464963] dark:bg-[#30334E] dark:text-gray-200 dark:focus:border-indigo-400"
                    >
                        <span>{getDisplayValue(filters.timeRange, 'timeRange')}</span>
                        <svg
                            className={`w-5 h-5 ml-2 transform transition-transform duration-300 ease-in-out ${openDropdown === 'timeRange' ? 'rotate-180' : ''}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>

                    {openDropdown === 'timeRange' && (
                        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg dark:bg-[#282A42] border border-gray-200 dark:border-[#464963]">
                            <ul className="max-h-60 overflow-auto rounded-md">
                                {timeRangeFilters.map((option) => (
                                    <li
                                        key={option.value}
                                        onClick={() => updateFilter('timeRange', option.value)}
                                        className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-[#99C8FF] hover:text-[#30334E] dark:hover:text-[#282A42]"
                                    >
                                        {option.display}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className='p-4'>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full mt-2">
                    {/* Left side - Export and Clear Filters buttons */}
                    <div className="flex gap-2">
                        <button className="w-[150px] h-[40px] flex items-center justify-center bg-transparent hover:bg-[#393C6A] text-[#6D788D] hover:text-white rounded-md border-1 hover:border-2 border-[#464963] transition-colors cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            {t('filters.export') || 'Export'}
                        </button>
                        <button
                            onClick={clearFilters}
                            className="w-[44px] h-[40px] flex items-center justify-center p-2 hover:bg-[#393C6A] text-[#6D788D] hover:text-white rounded-md border-1 hover:border-2 border-[#464963] transition-colors cursor-pointer"
                            title={t('filters.clearFilters') || 'Clear filters'}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    {/* Right side - Search and Add Project */}
                    <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={filters.search}
                                onChange={handleSearchChange}
                                className="w-[215px] h-[40px] pl-10 pr-10 py-2 rounded-lg text-[#6D788D] hover:text-white
                                    focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:w-[240px]
                                    dark:border-[#464963] dark:bg-[#30334E] dark:text-gray-200
                                    hover:bg-[#393C6A] border-[#464963] border-1 hover:border-2
                                    transition-all duration-200 ease-in-out"
                                placeholder={t('filters.searchProjects') || 'Search projects...'}
                                aria-label={t('filters.searchProjects') || 'Search projects...'}
                            />
                            {filters.search && (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <button
                                        onClick={() => updateFilter('search', '')}
                                        className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                        <button
                            className="px-6 h-[40px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors shadow-sm dark:bg-indigo-500 dark:hover:bg-indigo-600 cursor-pointer"
                            aria-label={t('filters.addNewProject') || 'Add New Project'}
                        >
                            {t('filters.addNewProject') || 'Add New Project'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}