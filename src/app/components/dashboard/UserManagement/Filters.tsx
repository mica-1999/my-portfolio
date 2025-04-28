import { useState } from 'react';

export default function FiltersManageUsers() {
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');
    const [timeRange, setTimeRange] = useState('');

    // Track which dropdown is open
    const [openDropdown, setOpenDropdown] = useState('');

    return (
        <div className="flex flex-col md:flex-row gap-4 w-full">
            {/* Role Filter */}
            <div className="flex-1 relative">
                <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === 'role' ? '' : 'role')}
                    className="w-full h-[44px] rounded-lg border-[0.09rem] border-gray-300 bg-white px-3 py-2 text-gray-700 
                    shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 flex justify-between items-center
                    dark:border-[#464963] dark:bg-[#30334E] dark:text-gray-200 dark:focus:border-indigo-400"
                >
                    <span>{role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Select a role'}</span>
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>

                {openDropdown === 'role' && (
                    <div className="absolute z-10 w-full rounded-md bg-white shadow-lg dark:bg-[#282A42] border border-gray-200 dark:border-[#464963]">
                        <ul className="max-h-60 overflow-auto">
                            <li onClick={() => { setRole(''); setOpenDropdown(''); }}
                                className="px-3 py-2 cursor-pointer text-[gray-700] dark:text-gray-200 hover:bg-[#99C8FF] hover:text-[#30334E] dark:hover:text-[#282A42]">
                                Select a role
                            </li>
                            <li onClick={() => { setRole('admin'); setOpenDropdown(''); }}
                                className="px-3 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-[#99C8FF] hover:text-[#30334E] dark:hover:text-[#282A42]">
                                Admin
                            </li>
                            <li onClick={() => { setRole('editor'); setOpenDropdown(''); }}
                                className="px-3 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-[#99C8FF] hover:text-[#30334E] dark:hover:text-[#282A42]">
                                Editor
                            </li>
                            <li onClick={() => { setRole('developer'); setOpenDropdown(''); }}
                                className="px-3 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-[#99C8FF] hover:text-[#30334E] dark:hover:text-[#282A42]">
                                Developer
                            </li>
                            <li onClick={() => { setRole('viewer'); setOpenDropdown(''); }}
                                className="px-3 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-[#99C8FF] hover:text-[#30334E] dark:hover:text-[#282A42]">
                                Viewer
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Status Filter */}
            <div className="flex-1 relative">
                <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === 'status' ? '' : 'status')}
                    className="w-full h-[44px] rounded-lg border-[0.09rem] border-gray-300 bg-white px-3 py-2 text-gray-700 
                    shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 flex justify-between items-center
                    dark:border-[#464963] dark:bg-[#30334E] dark:text-gray-200 dark:focus:border-indigo-400"
                >
                    <span>{status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Select a status'}</span>
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>

                {openDropdown === 'status' && (
                    <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg dark:bg-[#282A42] border border-gray-200 dark:border-[#464963]">
                        <ul className="max-h-60 overflow-auto py-1">
                            <li onClick={() => { setStatus(''); setOpenDropdown(''); }}
                                className="px-3 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-[#99C8FF]">
                                Select a status
                            </li>
                            <li onClick={() => { setStatus('active'); setOpenDropdown(''); }}
                                className="px-3 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-[#99C8FF]">
                                Active
                            </li>
                            <li onClick={() => { setStatus('pending'); setOpenDropdown(''); }}
                                className="px-3 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-[#99C8FF]">
                                Pending
                            </li>
                            <li onClick={() => { setStatus('suspended'); setOpenDropdown(''); }}
                                className="px-3 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-[#99C8FF]">
                                Suspended
                            </li>
                            <li onClick={() => { setStatus('inactive'); setOpenDropdown(''); }}
                                className="px-3 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-[#99C8FF]">
                                Inactive
                            </li>
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
                    <span>{timeRange ?
                        (timeRange === 'week' ? 'This Week' :
                            timeRange === 'month' ? 'This Month' :
                                timeRange === 'quarter' ? 'This Quarter' :
                                    timeRange === 'year' ? 'This Year' :
                                        timeRange.charAt(0).toUpperCase() + timeRange.slice(1))
                        : 'Select a time range'}</span>
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>

                {openDropdown === 'timeRange' && (
                    <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg dark:bg-[#282A42] border border-gray-200 dark:border-[#464963]">
                        <ul className="max-h-60 overflow-auto py-1">
                            <li onClick={() => { setTimeRange(''); setOpenDropdown(''); }}
                                className="px-3 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-[#99C8FF]">
                                Select a time range
                            </li>
                            <li onClick={() => { setTimeRange('today'); setOpenDropdown(''); }}
                                className="px-3 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-[#99C8FF]">
                                Today
                            </li>
                            <li onClick={() => { setTimeRange('week'); setOpenDropdown(''); }}
                                className="px-3 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-[#99C8FF]">
                                This Week
                            </li>
                            <li onClick={() => { setTimeRange('month'); setOpenDropdown(''); }}
                                className="px-3 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-[#99C8FF]">
                                This Month
                            </li>
                            <li onClick={() => { setTimeRange('quarter'); setOpenDropdown(''); }}
                                className="px-3 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-[#99C8FF]">
                                This Quarter
                            </li>
                            <li onClick={() => { setTimeRange('year'); setOpenDropdown(''); }}
                                className="px-3 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-[#99C8FF]">
                                This Year
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}