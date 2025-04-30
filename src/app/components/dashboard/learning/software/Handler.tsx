"use client"
import { useState, useEffect } from "react";
import { showToast } from "@/app/components/reusable/Toasters";
import { useTheme } from "@/app/context/ThemeContext";
import Filters from "./Filters";
import Items from "./Items";
import { LearningItem, LearningFilters } from "@/app/types/learning";

export default function Handler() {
    // State and Hooks
    const { savedTheme, t } = useTheme();
    const [filters, setFilters] = useState<LearningFilters>({ status: "", category: "", subcategories: [], timeRange: "", search: "" });
    const [learningItems, setLearningItems] = useState<LearningItem[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    // Fetch learning items data from API
    useEffect(() => {
        const fetchLearningItems = async () => {
            try {
                // For now, we'll just use mock data
                // Replace this with actual API call when ready

                // Mock data for development
                const mockItems: LearningItem[] = [
                    {
                        id: "1",
                        title: "React Fundamentals",
                        description: "Learning the core concepts of React including components, props, and state management. Building reusable UI components and understanding the React component lifecycle.",
                        status: "completed",
                        category: "frontend",
                        subcategories: ["react", "javascript"],
                        startDate: "2023-01-15",
                        endDate: "2023-03-20",
                        resources: ["React Documentation", "Udemy Course: React - The Complete Guide", "React official tutorials"],
                        notes: "Completed all exercises and built a sample project. Need to review Context API and hooks more thoroughly.",
                        progress: 100
                    },
                    {
                        id: "2",
                        title: "Node.js Backend Development",
                        description: "Building RESTful APIs with Express.js and MongoDB. Learning about middleware, authentication, and database integration.",
                        status: "ongoing",
                        category: "backend",
                        subcategories: ["node", "express"],
                        startDate: "2023-04-10",
                        resources: ["Node.js Documentation", "YouTube: Node.js Crash Course", "Express.js Guide"],
                        notes: "Currently working on authentication and authorization. JWT implementation is next.",
                        progress: 65
                    },
                    {
                        id: "3",
                        title: "AWS Cloud Practitioner",
                        description: "Studying for AWS Cloud Practitioner certification to gain fundamental knowledge of AWS cloud services and infrastructure.",
                        status: "planned",
                        category: "cloud",
                        subcategories: ["aws"],
                        startDate: "2023-06-01",
                        resources: ["AWS Training and Certification", "Practice Exams", "AWS Documentation"],
                        progress: 0
                    },
                    {
                        id: "4",
                        title: "CSS Grid & Flexbox Mastery",
                        description: "Deepening understanding of modern CSS layout techniques to create responsive and flexible web designs.",
                        status: "ongoing",
                        category: "frontend",
                        subcategories: ["css"],
                        startDate: "2023-02-10",
                        resources: ["CSS Tricks", "MDN Web Docs", "Frontend Masters course"],
                        notes: "Completed grid basics, working on complex layout patterns",
                        progress: 75
                    },
                    {
                        id: "5",
                        title: "TypeScript Advanced Types",
                        description: "Exploring advanced TypeScript features like generics, utility types, mapped types, and type inference.",
                        status: "paused",
                        category: "programming",
                        subcategories: ["typescript"],
                        startDate: "2023-03-05",
                        resources: ["TypeScript Documentation", "Programming TypeScript book"],
                        notes: "Paused due to project priorities. Will resume next month.",
                        progress: 40
                    },
                    {
                        id: "6",
                        title: "Docker Containerization",
                        description: "Learning how to containerize applications using Docker for consistent development and deployment environments.",
                        status: "ongoing",
                        category: "devops",
                        subcategories: ["docker"],
                        startDate: "2023-05-12",
                        resources: ["Docker Documentation", "Docker for Developers course"],
                        notes: "Created first multi-container application with docker-compose",
                        progress: 50
                    }
                ];

                setLearningItems(mockItems);
            } catch (error) {
                console.error("Error fetching learning items:", error);
                showToast("error", t('learningTable.fetchError') || "Failed to fetch learning items. Please try again later.", savedTheme);
            }
        }
        fetchLearningItems()
    }, []);

    // Clear all filters
    const clearFilters = () => {
        setFilters({ status: "", category: "", subcategories: [], timeRange: "", search: "" });
    };

    return (
        <>
            <div className="w-full mt-4">
                <div className="w-full rounded-xl bg-white shadow-md dark:bg-[#30334E]">
                    <div className="p-4">
                        <div className="flex items-center p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-600 dark:text-[#D7D8ED]" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <h5 className="text-xl font-semibold text-gray-800 dark:text-[#d7d8ed]">{t('learningTable.title') || 'Software Learning'}</h5>
                        </div>
                    </div>
                    <div className="">
                        <Filters filters={filters} setFilters={setFilters} clearFilters={clearFilters} setModalOpen={setModalOpen} />
                    </div>
                    <div>
                        <Items items={learningItems} filters={filters} clearFilters={clearFilters} setItems={setLearningItems} />
                    </div>
                </div>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white dark:bg-[#282A42] p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/2 xl:w-2/5">
                        <h2 className="text-xl font-semibold mb-4 dark:text-white">Add Learning Item</h2>
                        <p className="dark:text-gray-300">Form component will be implemented here</p>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md mr-2 hover:bg-gray-100 dark:hover:bg-[#393C6A]"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}