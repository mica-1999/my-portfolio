"use client";
import { useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { TimelineItem } from '@/app/types/dashmain';
import { getTimelineEventColor, formatTimelineEventTitle, formatTimelineTime } from '@/app/components/reusable/UserUI';

interface TimelineProps {
    timeline: TimelineItem[];
}

export default function Timeline({ timeline = [] }: TimelineProps) {
    const [hidden, setHidden] = useState(false);
    const { t } = useTheme(); // Get translation function

    return (
        <div className="w-full mt-4 xl:w-1/3">
            <div className="w-full rounded-xl bg-white shadow-md dark:bg-[#30334E] h-[450px] flex flex-col">
                <div className={`${hidden ? 'blur-sm' : ''} flex flex-col h-full`}>
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600 dark:text-[#9698af]" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                <h5 className="text-xl font-semibold text-gray-800 dark:text-[#d7d8ed]">{t('timeline.title')}</h5>
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
                    <div className="flex-1 overflow-y-auto p-4
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
                        {timeline.length > 0 ? (
                            <ul>
                                {timeline.map((item) => (
                                    <li key={item.id} className="relative pl-6 pb-8 last:pb-0">
                                        {/* Timeline connector line */}
                                        <div className="absolute top-0 left-2 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>

                                        {/* Timeline point */}
                                        <div className={`absolute top-1 left-[0.5px] w-4 h-4 rounded-full ${getTimelineEventColor(item.eventType)} border-2 border-white dark:border-[#30334E]`}></div>

                                        {/* Timeline content */}
                                        <div className="mb-2 flex justify-between">
                                            <h6 className="text-sm font-medium text-gray-800 dark:text-[#d7d8ed]">{formatTimelineEventTitle(item.eventType)}</h6>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{formatTimelineTime(item.createdAt)}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-[#9698af]">{item.description || 'No description provided'}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex justify-center items-center h-full">
                                <p className="text-gray-500 dark:text-gray-400">No timeline events found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
