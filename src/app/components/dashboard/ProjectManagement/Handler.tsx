"use client"
import { useState, useEffect } from "react";
import { showToast } from "../../reusable/Toasters";
import { useTheme } from "@/app/context/ThemeContext";
import FiltersManageProjects from "./Filters";
import ManageProjectsTable from "./ProjectTable";
import { Project } from "@/app/types/dashmain";
import FormInsertionProject from "../../reusable/FormInsertionProject";

interface ProjectFilters {
    status: string;
    tags: string[];
    timeRange: string;
    search: string;
}

export default function Handler() {
    // State and Hooks
    const { savedTheme, t } = useTheme();
    const [filters, setFilters] = useState<ProjectFilters>({ status: "", tags: [], timeRange: "", search: "" });
    const [projects, setProjects] = useState<Project[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    // Fetch projects data from API
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("/api/projects", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (!response.ok && response.status === 404) {
                    showToast("error", t('projectTable.noProjects') || "No projects found.", savedTheme);
                    return;
                }
                else {
                    const data = await response.json();
                    setProjects(data.projects);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
                showToast("error", t('projectTable.fetchError') || "Failed to fetch projects. Please try again later.", savedTheme);
            }
        }
        fetchProjects()
    }, []);

    // Clear all filters
    const clearFilters = () => {
        setFilters({ status: "", tags: [], timeRange: "", search: "" });
    };

    return (
        <>
            <div className="w-full mt-4">
                <div className="w-full rounded-xl bg-white shadow-md dark:bg-[#30334E]">
                    <div className="p-4">
                        <div className="flex items-center p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-600 dark:text-[#D7D8ED]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="3" y1="9" x2="21" y2="9"></line>
                                <line x1="9" y1="21" x2="9" y2="9"></line>
                            </svg>
                            <h5 className="text-xl font-semibold text-gray-800 dark:text-[#d7d8ed]">{t('projectTable.title') || 'Projects'}</h5>
                        </div>
                    </div>
                    <div className="">
                        <FiltersManageProjects filters={filters} setFilters={setFilters} clearFilters={clearFilters} setModalOpen={setModalOpen} />
                    </div>
                    <div>
                        <ManageProjectsTable projects={projects} filters={filters} clearFilters={clearFilters} setProjects={setProjects} />
                    </div>
                </div>
            </div>

            {modalOpen && (
                <FormInsertionProject isOpen={modalOpen} setModalOpen={setModalOpen} setProjects={setProjects} />
            )}
        </>
    )
}