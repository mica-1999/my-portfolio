"use client";
import { useState, useEffect } from 'react';
import { projectsData } from '@/app/data/projectsData';
import Image from 'next/image';

export default function ProjectsContent() {

    // State & Hooks
    const [filter, setFilter] = useState(['all']);
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
                <h2 className="text-[2.5rem] font-bold text-gray-800 dark:text-[#666cff]">My Projects</h2>
                <p className="text-[1.1rem] text-gray-600 dark:text-[#6c757d] max-w-2xl mx-auto">Check out some of my recent work</p>
            </div>

            <div className="mb-8 space-y-4">
                <div className="relative max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                    <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <button
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 
              ${filter.includes('all')
                                ? 'bg-orange-500 text-white dark:bg-indigo-600'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                            }`}
                        onClick={() => handleFilterChange('all')}
                    >
                        All
                    </button>

                    {allTags.map(tag => (
                        <button
                            key={tag}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 
                ${filter.includes(tag)
                                    ? 'bg-orange-500 text-white dark:bg-indigo-600'
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
                    <div className="loader"></div>
                </div>
            ) : filteredProjects.length === 0 ? (
                <div className="text-center py-16">
                    <i className="ri-search-line text-5xl text-gray-400 mb-4"></i>
                    <p className="text-gray-600 dark:text-gray-400">No projects found matching your criteria</p>
                    <button
                        className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors dark:bg-indigo-600 dark:hover:bg-indigo-700"
                        onClick={() => { setFilter(['all']); setSearchQuery(''); }}
                    >
                        Reset filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <div
                            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700"
                            key={project.id}
                        >
                            {project.featured && (
                                <div className="absolute top-4 right-4 bg-orange-500 text-white px-2 py-1 text-xs font-semibold rounded-full dark:bg-indigo-600">
                                    Featured
                                </div>
                            )}

                            <div className="relative overflow-hidden group h-52">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    priority={project.featured}
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <a
                                        href={project.demo}
                                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-1 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="ri-external-link-line"></i> Live Demo
                                    </a>
                                    <a
                                        href={project.github}
                                        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-1 dark:bg-gray-700 dark:hover:bg-gray-600"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="ri-github-fill"></i> Code
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
                                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full dark:bg-gray-700 dark:text-gray-300"
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