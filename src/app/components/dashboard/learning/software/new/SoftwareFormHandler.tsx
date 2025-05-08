// REVISED: 2025-05-05 - Exceptional implementation ✅
"use client";
import { useState, useEffect } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { showToast } from "@/app/components/reusable/Toasters";
import { getSubcategoriesByCategory } from '@/app/data/learningSoftwareData';
import { isValidUrl } from '@/app/components/reusable/softwareform/Utils';
import Reset from "@/app/components/reusable/Reset";

// Import section components
import BasicInfo from './BasicInfo';
import Resources from './Resources';
import Links from './Links';
import CodeSnippets from './CodeSnippets';
import KeyConcepts from './KeyConcepts';
import Images from './Images';

export default function SoftwareFormHandler() {
    // State & hooks
    const router = useRouter();
    const { data: session } = useSession();
    const { savedTheme, t } = useTheme();
    const userId = session?.user?.id || "";

    // Main form state
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "PLANNED",
        category: "",
        subcategories: [] as string[],
        complexity: "INTERMEDIATE",
        startDate: "",
        endDate: "",
        progress: 0,
        personalNotes: "",
        isPublic: false,
    });

    // Additional content states
    const [resources, setResources] = useState([{ type: "DOCUMENTATION", title: "", url: "", notes: "" }]);
    const [links, setLinks] = useState([{ title: "", url: "", description: "" }]);
    const [codeSnippets, setCodeSnippets] = useState([{ title: "", language: "javascript", code: "", explanation: "" }]);
    const [concepts, setConcepts] = useState([{ name: "", description: "" }]);
    // Removed image state

    // Section toggle states
    const [showResources, setShowResources] = useState(false);
    const [showLinks, setShowLinks] = useState(false);
    const [showCodeSnippets, setShowCodeSnippets] = useState(false);
    const [showConcepts, setShowConcepts] = useState(false);
    const [showImages, setShowImages] = useState(false); // Kept for UI purposes

    // Form submission state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Available subcategories based on selected category
    const [availableSubcategories, setAvailableSubcategories] = useState<{ value: string, display: string }[]>([]);

    // Update available subcategories when category changes
    useEffect(() => {
        if (formData.category) {
            setAvailableSubcategories(getSubcategoriesByCategory(formData.category));
            // Clear selected subcategories when category changes
            setFormData(prev => ({ ...prev, subcategories: [] }));
        } else {
            setAvailableSubcategories([]);
        }
    }, [formData.category]);

    // Handle basic input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle checkbox changes
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    // Handle subcategory selection
    const handleSubcategoryChange = (subcategory: string) => {
        setFormData(prev => {
            const subcategories = prev.subcategories.includes(subcategory)
                ? prev.subcategories.filter(s => s !== subcategory)
                : [...prev.subcategories, subcategory];
            return { ...prev, subcategories };
        });
    };

    // Validate form
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        // Validate required fields
        if (!formData.title) newErrors.title = t('softwareForm.validation.titleRequired');
        if (!formData.description) newErrors.description = t('softwareForm.validation.descriptionRequired');
        if (!formData.category) newErrors.category = t('softwareForm.validation.categoryRequired');
        if (formData.subcategories.length === 0) newErrors.subcategories = t('softwareForm.validation.subcategoriesRequired');

        // Validate resources if section is toggled on
        if (showResources) {
            resources.forEach((resource, index) => {
                if (!resource.title) newErrors[`resource_${index}_title`] = `${t('softwareForm.resources.resourceTitle')} ${t('softwareForm.validation.required')}`;
                if (resource.url && !isValidUrl(resource.url))
                    newErrors[`resource_${index}_url`] = t('softwareForm.validation.validUrl');
            });
        }

        // Validate links if section is toggled on
        if (showLinks) {
            links.forEach((link, index) => {
                if (!link.title) newErrors[`link_${index}_title`] = `${t('softwareForm.links.linkTitle')} ${t('softwareForm.validation.required')}`;
                if (!link.url) newErrors[`link_${index}_url`] = `${t('softwareForm.links.linkUrl')} ${t('softwareForm.validation.required')}`;
                else if (!isValidUrl(link.url)) newErrors[`link_${index}_url`] = t('softwareForm.validation.validUrl');
            });
        }

        // Validate code snippets if section is toggled on
        if (showCodeSnippets) {
            codeSnippets.forEach((snippet, index) => {
                if (!snippet.title) newErrors[`snippet_${index}_title`] = `${t('softwareForm.codeSnippets.snippetTitle')} ${t('softwareForm.validation.required')}`;
                if (!snippet.code) newErrors[`snippet_${index}_code`] = `${t('softwareForm.codeSnippets.code')} ${t('softwareForm.validation.required')}`;
            });
        }

        // Validate concepts if section is toggled on
        if (showConcepts) {
            concepts.forEach((concept, index) => {
                if (!concept.name) newErrors[`concept_${index}_name`] = `${t('softwareForm.concepts.conceptName')} ${t('softwareForm.validation.required')}`;
                if (!concept.description) newErrors[`concept_${index}_description`] = `${t('softwareForm.concepts.conceptDescription')} ${t('softwareForm.validation.required')}`;
            });
        }

        // Removed image validation

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId) {
            showToast("error", t('softwareForm.notifications.loginRequired'), savedTheme);
            return;
        }

        if (!validateForm()) {
            showToast("error", t('softwareForm.validation.fixFormErrors'), savedTheme);
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare data for API request - now using JSON instead of FormData
            const requestData = {
                userId,
                formData: {
                    title: formData.title,
                    description: formData.description,
                    status: formData.status,
                    category: formData.category,
                    subcategories: formData.subcategories,
                    complexity: formData.complexity,
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    progress: formData.progress,
                    personalNotes: formData.personalNotes,
                    isPublic: formData.isPublic
                },
                resources: showResources ? resources.filter(r => r.title.trim() !== "") : [],
                links: showLinks ? links.filter(l => l.title.trim() !== "" && l.url.trim() !== "") : [],
                codeSnippets: showCodeSnippets ? codeSnippets.filter(c => c.title.trim() !== "" && c.code.trim() !== "") : [],
                concepts: showConcepts ? concepts.filter(c => c.name.trim() !== "" && c.description.trim() !== "") : []
                // Removed images data
            };

            const response = await fetch("/api/learning/software", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || t('softwareForm.notifications.createError'));
            }

            showToast("success", t('softwareForm.notifications.createSuccess'), savedTheme);
            router.push("/pages/dashboard/softwareManage");
        } catch (error) {
            console.error("Error creating learning item:", error);
            showToast("error", (error as Error).message || t('softwareForm.notifications.createError'), savedTheme);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Create a reset form function that resets all form state
    const resetForm = () => {
        // Reset main form data
        setFormData({
            title: "",
            description: "",
            status: "PLANNED",
            category: "",
            subcategories: [] as string[],
            complexity: "INTERMEDIATE",
            startDate: "",
            endDate: "",
            progress: 0,
            personalNotes: "",
            isPublic: false,
        });

        // Reset additional content
        setResources([{ type: "DOCUMENTATION", title: "", url: "", notes: "" }]);
        setLinks([{ title: "", url: "", description: "" }]);
        setCodeSnippets([{ title: "", language: "javascript", code: "", explanation: "" }]);
        setConcepts([{ name: "", description: "" }]);
        // Removed images reset

        // Turn off additional sections
        setShowResources(false);
        setShowLinks(false);
        setShowCodeSnippets(false);
        setShowConcepts(false);
        setShowImages(false);

        // Clear any errors
        setErrors({});

        // Show confirmation toast
        showToast("info", t('softwareForm.notifications.formReset'), savedTheme);
    };

    // Go back to listing page
    const handleCancel = () => {
        router.back();
    };

    // Toggle section visibility
    const toggleSection = (section: string) => {
        switch (section) {
            case 'resources':
                setShowResources(prev => !prev);
                break;
            case 'links':
                setShowLinks(prev => !prev);
                break;
            case 'codeSnippets':
                setShowCodeSnippets(prev => !prev);
                break;
            case 'concepts':
                setShowConcepts(prev => !prev);
                break;
            case 'images':
                setShowImages(prev => !prev);
                break;
        }
    };

    // Component for section toggle button
    const ToggleButton = ({ section, isVisible, label }: { section: string, isVisible: boolean, label: string }) => (
        <button
            type="button"
            onClick={() => toggleSection(section)}
            className={`flex items-center px-4 py-2 border rounded-md text-sm font-medium transition-colors ${isVisible
                ? 'bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-900 dark:text-indigo-200 dark:border-indigo-700'
                : 'bg-white text-gray-700 border-gray-300 dark:bg-[#30334E] dark:text-gray-300 dark:border-gray-600'
                }`}
        >
            <span className="mr-2">{isVisible ? '−' : '+'}</span>
            {label}
        </button>
    );

    return (
        <div className="w-full mt-4">
            <div className="w-full rounded-xl bg-white shadow-md dark:bg-[#30334E] p-6">
                <div className="flex items-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-600 dark:text-[#D7D8ED]" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-[#d7d8ed]">{t('softwareForm.title')}</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Info Section */}
                    <BasicInfo
                        formData={formData}
                        availableSubcategories={availableSubcategories}
                        errors={errors}
                        handleInputChange={handleInputChange}
                        handleCheckboxChange={handleCheckboxChange}
                        handleSubcategoryChange={handleSubcategoryChange}
                    />

                    {/* Additional sections toggle buttons */}
                    <div className="flex flex-wrap gap-3 pt-4 pb-2 border-t border-gray-200 dark:border-gray-700">
                        <h3 className="w-full mb-2 text-md font-medium text-gray-700 dark:text-gray-300">
                            {t('softwareForm.additionalContent')}
                        </h3>
                        <ToggleButton section="resources" isVisible={showResources} label={t('softwareForm.sections.resources')} />
                        <ToggleButton section="links" isVisible={showLinks} label={t('softwareForm.sections.links')} />
                        <ToggleButton section="codeSnippets" isVisible={showCodeSnippets} label={t('softwareForm.sections.codeSnippets')} />
                        <ToggleButton section="concepts" isVisible={showConcepts} label={t('softwareForm.sections.concepts')} />
                        <ToggleButton section="images" isVisible={showImages} label={t('softwareForm.sections.images')} />
                    </div>

                    {/* Resources Section (conditionally rendered) */}
                    {showResources && (
                        <Resources
                            resources={resources}
                            setResources={setResources}
                            errors={errors}
                        />
                    )}

                    {/* Links Section (conditionally rendered) */}
                    {showLinks && (
                        <Links
                            links={links}
                            setLinks={setLinks}
                            errors={errors}
                        />
                    )}

                    {/* Code Snippets Section (conditionally rendered) */}
                    {showCodeSnippets && (
                        <CodeSnippets
                            codeSnippets={codeSnippets}
                            setCodeSnippets={setCodeSnippets}
                            errors={errors}
                        />
                    )}

                    {/* Key Concepts Section (conditionally rendered) */}
                    {showConcepts && (
                        <KeyConcepts
                            concepts={concepts}
                            setConcepts={setConcepts}
                            errors={errors}
                        />
                    )}

                    {/* Images Section - Kept UI but with placeholder functionality */}
                    {showImages && (
                        <div className="bg-gray-50 dark:bg-[#282A42] p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-800 dark:text-white">{t('softwareForm.images.title')}</h3>
                                <div className="text-sm italic text-gray-500 dark:text-gray-400">
                                    {t('softwareForm.images.comingSoon')}
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                                <svg className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="text-base text-gray-500 dark:text-gray-400">
                                    {t('softwareForm.images.uploadFeatureNotAvailable')}
                                </p>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    {t('softwareForm.images.featureInDevelopment')}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-[#30334E] hover:bg-gray-50 dark:hover:bg-[#393C6A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {t('softwareForm.formActions.cancel')}
                        </button>
                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-[#30334E] hover:bg-gray-50 dark:hover:bg-[#393C6A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {t('softwareForm.formActions.reset')}
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? t('softwareForm.formActions.saving') : t('softwareForm.formActions.save')}
                        </button>
                    </div>
                </form>
            </div>

            {/* Reset Button Component */}
            <Reset resetData={resetForm} />
        </div>
    );
}
