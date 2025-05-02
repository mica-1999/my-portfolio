"use client"
import { useState, useEffect } from "react";
import { showToast } from "@/app/components/reusable/Toasters";
import { useTheme } from "@/app/context/ThemeContext";
import { LearningItem, LearningFilters } from "@/app/types/learning";
import { useSession } from "next-auth/react";
import Filters from "./Filters";
import Items from "./Items";

export default function Handler() {
    // State and Hooks
    const { data: session } = useSession();
    const userId = session?.user?.id || ""; // Assuming you have a user ID in the session
    const { savedTheme, t } = useTheme();
    const [filters, setFilters] = useState<LearningFilters>({ status: "", category: "", subcategories: [], timeRange: "", search: "" });
    const [learningItems, setLearningItems] = useState<LearningItem[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    // Fetch learning items data from API
    useEffect(() => {
        const fetchLearningItems = async () => {
            // Don't make the API call if userId is empty
            if (!userId) {
                setLearningItems([]);
                return;
            }

            try {
                const response = await fetch(`/api/learning/software?userId=${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                });

                if (!response.ok && response.status === 404) {
                    showToast("error", t('learningTable.notFound') || "Learning items not found.", savedTheme);
                    return;
                }

                const data = await response.json();
                setLearningItems(Array.isArray(data) ? data : []);

            } catch (error) {
                console.error("Error fetching learning items:", error);
                showToast("error", t('learningTable.fetchError') || "Failed to fetch learning items. Please try again later.", savedTheme);
                setLearningItems([]);
            }
        }
        fetchLearningItems();
    }, [userId, savedTheme, t]); // Use userId in the dependency array instead of session

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