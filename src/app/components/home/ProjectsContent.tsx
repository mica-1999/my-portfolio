// REVIEWED: 2025-05-05 - Good to go ✅
"use client";
import { useState, useEffect } from 'react';
import { projectsData } from '@/app/data/projectsData';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';

export default function ProjectsContent() {
    // Get translation function from context
    const { t } = useTheme();

    // State & Hooks
    const [filter, setFilter] = useState(['all']); // Tag Filters 
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProjects, setFilteredProjects] = useState(projectsData);
    const [loading, setLoading] = useState(true);

    // All unique tags for filtering
    const allTags = [...new Set(projectsData.flatMap(project => project.tags))];

    // Filter projects based on selected filter and search query
    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            let filtered = [...projectsData];

            if (filter[0] !== 'all') {
                filtered = filtered.filter(project =>
                    filter.some(tag => project.tags.includes(tag))
                );
            }

            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                filtered = filtered.filter(project =>
                    project.title.toLowerCase().includes(query) ||
                    project.description.toLowerCase().includes(query) ||
                    project.tags.some(tag => tag.toLowerCase().includes(query))
                );
            }

            setFilteredProjects(filtered);
            setLoading(false);
        }, 400);
    }, [filter, searchQuery]);

    // Handle tag filter changes
    const handleFilterChange = (tag: string) => {
        if (tag === 'all') {
            // If "all" is clicked, we only want "all" in the filter
            setFilter(['all']);
            return;
        }

        const newFilter = filter.filter(t => t !== 'all');

        if (filter.includes(tag)) {
            const updatedFilter = newFilter.filter(t => t !== tag);
            setFilter(updatedFilter.length ? updatedFilter : ['all']);
        } else {
            setFilter([...newFilter, tag]);
            if (newFilter.length === allTags.length - 1) {
                setFilter(['all']);
            }
        }
    }

    return (
        <section className="py-16 px-4 md:px-8 lg:px-16 max-w-[1400px] mx-auto">
            <div className="text-center mb-12 mt-5">
                <h2 className="text-[2.5rem] font-bold text-gray-800 dark:text-[#666cff]">{t('projects.title')}</h2>
                <p className="text-[1.1rem] text-gray-600 dark:text-[#9698af] max-w-2xl mx-auto">{t('projects.subtitle')}</p>
            </div>

            <div className="mb-8 space-y-4">
                <div className="relative max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder={t('projects.searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#666cff] focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                    <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <button
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer 
              ${filter.includes('all')
                                ? 'bg-[#666cff] text-white dark:bg-[#666cff]'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                            }`}
                        onClick={() => handleFilterChange('all')}
                    >
                        {t('projects.filterAll')}
                    </button>

                    {allTags.map(tag => (
                        <button
                            key={tag}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer 
                ${filter.includes(tag)
                                    ? 'bg-[#666cff] text-white dark:bg-[#666cff]'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                }`}
                            onClick={() => handleFilterChange(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="w-10 h-10 border-4 border-[#e0e0ff] border-l-[#666cff] rounded-full animate-spin"></div>
                </div>
            ) : filteredProjects.length === 0 ? (
                <div className="text-center py-16">
                    <i className="ri-search-line text-5xl text-gray-400 mb-4"></i>
                    <p className="text-gray-600 dark:text-gray-400">{t('projects.noProjectsFound')}</p>
                    <button
                        className="mt-4 px-4 py-2 bg-[#666cff] text-white rounded-lg hover:bg-[#5a5fe6] transition-colors"
                        onClick={() => { setFilter(['all']); setSearchQuery(''); }}
                    >
                        {t('projects.resetFilters')}
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <div
                            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700 hover:translate-y-[-10px]"
                            key={project.id}
                        >
                            {project.featured && (
                                <div className="absolute top-4 right-4 bg-[#666cff] text-white px-2 py-1 text-xs font-semibold rounded-full z-10">
                                    {t('projects.featured')}
                                </div>
                            )}

                            <div className="relative overflow-hidden group h-52">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <a
                                        href={project.demo}
                                        className="px-4 py-2 bg-[#666cff] text-white rounded-lg hover:bg-[#5a5fe6] transition-colors flex items-center gap-1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="ri-external-link-line"></i> {t('projects.liveDemo')}
                                    </a>
                                    <a
                                        href={project.github}
                                        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-1 dark:bg-gray-700 dark:hover:bg-gray-600"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="ri-github-fill"></i> {t('projects.code')}
                                    </a>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 dark:text-gray-300">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-gray-100 text-[#FF6B35] text-xs font-medium rounded-md dark:bg-gray-700 dark:text-[#666cff]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center text-gray-500 text-sm dark:text-gray-400">
                                    <i className="ri-calendar-line mr-1"></i>
                                    <span>{project.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}