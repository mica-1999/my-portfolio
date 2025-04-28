"use client";
import { useTheme } from '@/app/context/ThemeContext';

export default function Stats() {
    // Mock data
    const rating = "4.8/5";
    const sessionCount = "28";
    const { t } = useTheme(); // Get translation function

    return (
        <div className="flex flex-col md:flex-row xl:w-1/2 w-full gap-4">
            {/* Ratings Card */}
            <div className="w-full md:w-1/2 rounded-xl bg-white shadow-md dark:bg-[#30334E]">
                <div className="flex flex-col h-full p-6">
                    <div className="mb-1">
                        <h6 className="text-sm font-medium text-gray-800 dark:text-[#d7d8ed]">{t('stats.ratings')}</h6>
                        <div className="inline-block bg-blue-100 font-bold text-blue-800 dark:bg-[#393C6A] dark:text-[#666CFF] text-xs px-2 py-0.5 mt-3 rounded-full">
                            {t('stats.yearOf')} 2025
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                        <h4 className="text-xl font-bold text-gray-800 dark:text-white">{rating}</h4>
                        <div className="h-10 w-10 bg-blue-100 dark:bg-[#393C6A] rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-[#666CFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sessions Card */}
            <div className="w-full md:w-1/2 rounded-xl bg-white shadow-md dark:bg-[#30334E]">
                <div className="flex flex-col h-full p-6">
                    <div className="mb-1">
                        <h6 className="text-sm font-medium text-gray-800 dark:text-[#d7d8ed]">{t('stats.sessions')}</h6>
                        <div className="inline-block bg-green-100 font-bold text-green-800 dark:bg-[#3B4F48] dark:text-[#72E128] text-xs px-2 py-0.5 mt-3 rounded-full">
                            {t('stats.lastMonth')}
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                        <h4 className="text-xl font-bold text-gray-800 dark:text-white">{sessionCount}</h4>
                        <div className="h-10 w-10 bg-green-100 dark:bg-[#3B4F48] rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-[#72E128]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
