// REVIEWED: 2025-05-05 - Good to go ✅
"use client";
import { useState } from 'react';
import { skills } from '@/app/data/aboutmeData';
import { useTheme } from '@/app/context/ThemeContext';
import Image from 'next/image';
import Link from 'next/link';
import { ExperienceItem, EducationItem } from '@/app/types/home';

export default function AboutMe() {
    const { t, tArray } = useTheme();
    const [activeTab, setActiveTab] = useState('overview');

    // Fetch experience and education items using tArray
    const experienceItems = tArray<ExperienceItem>('about.experience.items');
    const educationItems = tArray<EducationItem>('about.education.items');

    return (
        <div className="max-w-[1400px] mx-auto px-4 py-16 md:px-8 lg:px-16">
            <div className="text-center mb-12">
                <h2 className="text-[2.5rem] font-bold text-gray-800 dark:text-[#666cff] mb-2">{t('about.title')}</h2>
                <p className="text-[1.1rem] text-gray-600 dark:text-[#6c757d] max-w-2xl mx-auto">{t('about.subtitle')}</p>
            </div>

            <div className="space-y-12">
                {/* About intro section with image and bio */}
                <div className="flex flex-col lg:flex-row gap-8 items-start mt-20">
                    <div className="lg:w-1/3">
                        <div className="relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800">
                            <div className="aspect-w-3 aspect-h-4 relative h-[400px]">
                                <Image
                                    src="/images/blog/Micael.jpg"
                                    alt={t('about.imageAlt')}
                                    fill
                                    className="object-cover"
                                    onError={(e: any) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/350x350?text=Micael+Ribeiro';
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-2/3 space-y-6">
                        <div>
                            <h3 className="text-[2rem] font-bold text-gray-800 dark:text-white">Micael Ribeiro</h3>
                            <p className="text-[#FF6B35] font-semibold text-[1.1rem] dark:text-[#666cff]">{t('about.role')}</p>
                        </div>

                        <div className="space-y-4 text-gray-600 dark:text-[#d7d8ed] text-[1rem]">
                            <p>
                                {t('about.bio.paragraph1')}
                            </p>

                            <p>
                                {t('about.bio.paragraph2')}
                            </p>
                        </div>

                        <div className="space-y-3 pb-3">
                            <div className="flex flex-col sm:flex-row sm:gap-12 gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">{t('about.email')}:</span>
                                    <span className="text-gray-600 dark:text-gray-400">micael1999work@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">{t('about.location')}:</span>
                                    <span className="text-gray-600 dark:text-gray-400">Madeira, Portugal</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">{t('about.availability')}:</span>
                                    <span className="text-gray-600 dark:text-gray-400">{t('about.availabilityStatus')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <a href="/path-to-cv.pdf" className="bg-[#FF6B35] hover:bg-[#e55a29] text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md flex items-center gap-2 dark:bg-[#666cff] dark:hover:bg-[#5a5fe6]">
                                <i className="ri-download-line"></i> {t('about.downloadCV')}
                            </a>
                            <Link
                                href={{
                                    pathname: "/pages/home/contact",
                                    query: { scrollToForm: 'true' }
                                }}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md flex items-center gap-2 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                            >
                                <i className="ri-mail-line"></i> {t('about.contactMe')}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Tabs section */}
                <div className="bg-white shadow-md rounded-xl overflow-hidden dark:bg-gray-800">
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <div className="flex overflow-x-auto">
                            <button
                                className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-all border-b-2 ${activeTab === 'overview'
                                    ? 'text-[#FF6B35] border-[#FF6B35] dark:text-[#666cff] dark:border-[#666cff]'
                                    : 'text-gray-600 border-transparent hover:text-gray-800 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600 cursor-pointer'
                                    }`}
                                onClick={() => setActiveTab('overview')}
                            >
                                {t('about.tabs.overview')}
                            </button>
                            <button
                                className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-all border-b-2 ${activeTab === 'experience'
                                    ? 'text-[#FF6B35] border-[#FF6B35] dark:text-[#666cff] dark:border-[#666cff]'
                                    : 'text-gray-600 border-transparent hover:text-gray-800 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600 cursor-pointer'
                                    }`}
                                onClick={() => setActiveTab('experience')}
                            >
                                {t('about.tabs.experience')}
                            </button>
                            <button
                                className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-all border-b-2 ${activeTab === 'education'
                                    ? 'text-[#FF6B35] border-[#FF6B35] dark:text-[#666cff] dark:border-[#666cff]'
                                    : 'text-gray-600 border-transparent hover:text-gray-800 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600 cursor-pointer'
                                    }`}
                                onClick={() => setActiveTab('education')}
                            >
                                {t('about.tabs.education')}
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{t('about.skills.title')}</h4>

                                <div className="space-y-5">
                                    <div>
                                        <h5 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-3">{t('about.skills.frontend')}</h5>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.frontend.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-white px-3 py-1.5 rounded-md text-sm font-medium dark:bg-gray-800"
                                                    style={{
                                                        borderColor: skill.color,
                                                        color: skill.color,
                                                        borderWidth: '1px',
                                                        borderStyle: 'solid'
                                                    }}
                                                >
                                                    {skill.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h5 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-3">{t('about.skills.backend')}</h5>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.backend.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-white px-3 py-1.5 rounded-md text-sm font-medium dark:bg-gray-800"
                                                    style={{
                                                        borderColor: skill.color,
                                                        color: skill.color,
                                                        borderWidth: '1px',
                                                        borderStyle: 'solid'
                                                    }}
                                                >
                                                    {skill.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h5 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-3">{t('about.skills.tools')}</h5>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.tools.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-white px-3 py-1.5 rounded-md text-sm font-medium dark:bg-gray-800"
                                                    style={{
                                                        borderColor: skill.color,
                                                        color: skill.color,
                                                        borderWidth: '1px',
                                                        borderStyle: 'solid'
                                                    }}
                                                >
                                                    {skill.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Experience Tab */}
                        {activeTab === 'experience' && (
                            <div className="animate-fade-in">
                                <h4 className="text-2xl font-semibold text-[#FF6B35] dark:text-[#666cff] mb-6">{t('about.experience.title')}</h4>

                                <div className="relative pl-8 border-l border-gray-200 dark:border-gray-700/70">
                                    {experienceItems.map((exp, index) => (
                                        <div key={index} className="relative mb-10">
                                            <div className="absolute -left-10 top-1 w-4 h-4 rounded-full bg-[#FF6B35] dark:bg-[#666cff] border-[3px] border-white dark:border-gray-800 shadow-[0_0_0_2px] shadow-[#FF6B35]/30 dark:shadow-[#666cff]/30"></div>
                                            <div>
                                                <h5 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                                                    {exp.title}
                                                </h5>
                                                <div className="flex justify-between items-center text-sm mb-2">
                                                    <span className="text-[#FF6B35] dark:text-[#666cff] font-medium">
                                                        {exp.company}
                                                    </span>
                                                    <span className="text-gray-500 dark:text-gray-400">
                                                        {exp.period}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    {exp.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Education Tab */}
                        {activeTab === 'education' && (
                            <div className="animate-fade-in">
                                <h4 className="text-2xl font-semibold text-[#FF6B35] dark:text-[#666cff] mb-6">{t('about.education.title')}</h4>

                                <div className="relative pl-8 border-l border-gray-200 dark:border-gray-700/70">
                                    {educationItems.map((edu, index) => (
                                        <div key={index} className="relative mb-10">
                                            <div className="absolute -left-10 top-1 w-4 h-4 rounded-full bg-[#FF6B35] dark:bg-[#666cff] border-[3px] border-white dark:border-gray-800 shadow-[0_0_0_2px] shadow-[#FF6B35]/30 dark:shadow-[#666cff]/30"></div>
                                            <div>
                                                <h5 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                                                    {edu.degree}
                                                </h5>
                                                <div className="flex justify-between items-center text-sm mb-2">
                                                    <span className="text-[#FF6B35] dark:text-[#666cff] font-medium">
                                                        {edu.institution}
                                                    </span>
                                                    <span className="text-gray-500 dark:text-gray-400">
                                                        {edu.period}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    {edu.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}