"use client"
import { useState, useEffect } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import { useRouter } from "next/navigation";
import { LearningItem } from "@/app/types/learning";
import { getStatusColor, formatDate } from "@/app/components/reusable/Utils";
import { showToast } from "@/app/components/reusable/Toasters";
import Link from "next/link";

export default function ItemDetails({ id }: { id: string }) {
    // State and hooks
    const router = useRouter();
    const { savedTheme, t } = useTheme();
    const [item, setItem] = useState<LearningItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>("overview");

    // Fetch item details
    useEffect(() => {
        const fetchItemDetails = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const response = await fetch(`/api/learning/software/item/${id}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        setError(t('softwareDetails.itemNotFound'));
                    } else {
                        setError(t('softwareDetails.fetchError'));
                    }
                    return;
                }

                const data = await response.json();
                setItem(data);
            } catch (error) {
                console.error("Error fetching item details:", error);
                setError(t('softwareDetails.errorOccurred'));
            } finally {
                setLoading(false);
            }
        };

        fetchItemDetails();
    }, [id, t]);

    // Handle delete item
    const handleDeleteItem = async () => {
        if (!item) return;

        if (!window.confirm(t('softwareDetails.deleteConfirmation'))) {
            return;
        }

        try {
            const response = await fetch(`/api/learning/software/item/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                showToast("error", t('softwareDetails.deleteError'), savedTheme);
                return;
            }
            showToast("success", t('softwareDetails.deleteSuccess'), savedTheme);
            router.push("/pages/dashboard/softwareManage");
        } catch (error) {
            console.error("Error deleting item:", error);
            showToast("error", t('softwareDetails.deleteError'), savedTheme);
        }
    };

    // Handle edit navigation
    const handleEdit = () => {
        router.push(`/dashboard/learning/software/edit/${id}`);
    };

    // If loading
    if (loading) {
        return (
            <div className="w-full mt-4 p-6 rounded-xl bg-white shadow-md dark:bg-[#30334E] flex items-center min-h-[300px]">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">{t('softwareDetails.loading')}</p>
                </div>
            </div>
        );
    }

    // If error
    if (error || !item) {
        return (
            <div className="w-full mt-4 p-6 rounded-xl bg-white shadow-md dark:bg-[#30334E]">
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <i className="ri-error-warning-line text-[3rem] text-red-500"></i>
                    <h5 className="mt-3 text-gray-700 dark:text-gray-300 text-[1.25rem] font-medium">
                        {error || t('softwareDetails.itemNotFound')}
                    </h5>
                    <p className="text-gray-500 dark:text-[#7B7C95] max-w-md mb-6">
                        {t('softwareDetails.retrievalError')}
                    </p>
                    <Link
                        href="/pages/dashboard/softwareManage"
                        className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-md font-medium rounded-md transition-colors cursor-pointer"
                    >
                        {t('softwareDetails.backToList')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="w-full rounded-xl bg-white shadow-md dark:bg-[#30334E] overflow-hidden">
                {/* Header Section with Banner and Basic Info */}
                <div className="relative h-40 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-900">
                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="absolute top-4 left-4 p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </button>

                    {/* Status Badge */}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </div>

                    {/* Title overlay at bottom of banner */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                        <h1 className="text-2xl font-bold text-white">{item.title}</h1>

                        {/* Category Badge */}
                        <div className="mt-2">
                            <span className="px-3 py-1 bg-black/30 backdrop-blur-sm text-white rounded-full text-xs font-medium">
                                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="flex px-4 pt-4 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'overview'
                                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                        >
                            {t('softwareDetails.tabs.overview')}
                        </button>
                        <button
                            onClick={() => setActiveTab('resources')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'resources'
                                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                        >
                            {t('softwareDetails.tabs.resources')}
                        </button>
                        <button
                            onClick={() => setActiveTab('codeSnippets')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'codeSnippets'
                                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                        >
                            {t('softwareDetails.tabs.codeSnippets')}
                        </button>
                        <button
                            onClick={() => setActiveTab('concepts')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'concepts'
                                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                        >
                            {t('softwareDetails.tabs.concepts')}
                        </button>
                        <button
                            onClick={() => setActiveTab('links')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'links'
                                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                        >
                            {t('softwareDetails.tabs.links')}
                        </button>
                    </nav>
                </div>

                {/* Main Content Area */}
                <div className="p-6">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Description */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{t('softwareDetails.description')}</h2>
                                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                            </div>

                            {/* Personal Notes */}
                            {item.personalNotes && (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{t('softwareDetails.personalNotes')}</h2>
                                    <div className="bg-gray-50 dark:bg-[#282A42] rounded-lg p-4">
                                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{item.personalNotes}</p>
                                    </div>
                                </div>
                            )}

                            {/* Progress */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{t('softwareDetails.progress')}</h2>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                                    <div
                                        className={`h-2.5 rounded-full ${getStatusColor(item.status)}`}
                                        style={{ width: `${item.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Subcategories */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{t('softwareDetails.subcategories')}</h2>
                                <div className="flex flex-wrap gap-2">
                                    {item.subcategories.map((subcategory, index) => (
                                        <span key={index} className="px-3 py-1 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded">
                                            {subcategory}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 dark:bg-[#282A42] rounded-lg">
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{t('softwareDetails.startDate')}</h3>
                                    <p className="text-gray-800 dark:text-white">{formatDate(item.startDate)}</p>
                                </div>
                                {item.endDate && (
                                    <div className="p-4 bg-gray-50 dark:bg-[#282A42] rounded-lg">
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{t('softwareDetails.endDate')}</h3>
                                        <p className="text-gray-800 dark:text-white">{formatDate(item.endDate)}</p>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={handleDeleteItem}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition-colors"
                                >
                                    {t('softwareDetails.actions.delete')}
                                </button>
                                <button
                                    onClick={handleEdit}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded transition-colors"
                                >
                                    {t('softwareDetails.actions.edit')}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Resources Tab */}
                    {activeTab === 'resources' && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{t('softwareDetails.resourcesTitle')}</h2>

                            {item.resources && item.resources.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {item.resources.map((resource, index) => (
                                        <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 rounded">
                                                    {resource.type || t('softwareDetails.resource')}
                                                </span>
                                                <h3 className="font-medium text-gray-800 dark:text-white">{resource.title}</h3>
                                            </div>

                                            {resource.notes && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-2">{resource.notes}</p>
                                            )}

                                            {resource.url && (
                                                <a
                                                    href={resource.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm inline-flex items-center"
                                                >
                                                    {t('softwareDetails.visitResource')}
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-gray-50 dark:bg-[#282A42] rounded-lg p-6 text-center">
                                    <p className="text-gray-500 dark:text-gray-400">{t('softwareDetails.noResources')}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Code Snippets Tab */}
                    {activeTab === 'codeSnippets' && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{t('softwareDetails.codeSnippetsTitle')}</h2>

                            {item.codeSnippets && item.codeSnippets.length > 0 ? (
                                <div className="space-y-6">
                                    {item.codeSnippets.map((snippet, index) => (
                                        <div key={index} className="rounded-lg overflow-hidden">
                                            <div className="bg-gray-800 text-white p-3 flex justify-between items-center">
                                                <span>{snippet.title || `${t('softwareDetails.snippet')} ${index + 1}`}</span>
                                                <span className="text-xs px-2 py-1 bg-gray-700 rounded">{snippet.language || 'code'}</span>
                                            </div>
                                            <pre className="bg-gray-900 text-gray-300 p-4 overflow-x-auto">
                                                <code>{snippet.code}</code>
                                            </pre>
                                            {snippet.explanation && (
                                                <div className="bg-gray-100 dark:bg-gray-800 p-3 text-sm text-gray-700 dark:text-gray-300">
                                                    {snippet.explanation}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-gray-50 dark:bg-[#282A42] rounded-lg p-6 text-center">
                                    <p className="text-gray-500 dark:text-gray-400">{t('softwareDetails.noCodeSnippets')}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Concepts Tab */}
                    {activeTab === 'concepts' && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{t('softwareDetails.conceptsTitle')}</h2>

                            {item.concepts && item.concepts.length > 0 ? (
                                <div className="space-y-4">
                                    {item.concepts.map((concept, index) => (
                                        <div key={index} className="bg-white dark:bg-[#282A42] p-5 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                                            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">{concept.name}</h3>
                                            <p className="text-gray-600 dark:text-gray-300">{concept.description}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-gray-50 dark:bg-[#282A42] rounded-lg p-6 text-center">
                                    <p className="text-gray-500 dark:text-gray-400">{t('softwareDetails.noConcepts')}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Links Tab */}
                    {activeTab === 'links' && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{t('softwareDetails.linksTitle')}</h2>

                            {item.links && item.links.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {item.links.map((link, index) => (
                                        <div key={index} className="p-4 bg-white dark:bg-[#282A42] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                                            <h3 className="font-medium text-gray-800 dark:text-white mb-1">{link.title}</h3>
                                            {link.description && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{link.description}</p>
                                            )}
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
                                            >
                                                {t('softwareDetails.visitLink')}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-gray-50 dark:bg-[#282A42] rounded-lg p-6 text-center">
                                    <p className="text-gray-500 dark:text-gray-400">{t('softwareDetails.noLinks')}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}