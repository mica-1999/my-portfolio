"use client"
import { useState, useRef, FormEvent } from 'react';
import { FormInsertionProjectProps } from '@/app/types/dashmain';
import { useClickOutside } from './ClickOutsideDiv';
import { showToast } from './Toasters';
import { useTheme } from '@/app/context/ThemeContext';
import { tagFilters } from '@/app/data/manageFilters'; // Import the tag filters
import { ProjectFormData } from '@/app/types/managePages';

export default function FormInsertionProject({ isOpen, setModalOpen, setProjects }: FormInsertionProjectProps) {
    // State & Hooks
    const { savedTheme, t } = useTheme();
    const [formData, setFormData] = useState<ProjectFormData>({ name: '', description: '', tags: [], state: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState<Record<string, boolean>>({});
    const [submitting, setSubmitting] = useState(false);
    const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
    const [tagsDropdownOpen, setTagsDropdownOpen] = useState(false);
    const [tagSearchInput, setTagSearchInput] = useState('');
    const formRef = useRef<HTMLDivElement>(null);
    const stateDropdownRef = useRef<HTMLDivElement>(null);
    const tagsDropdownRef = useRef<HTMLDivElement>(null);

    // Project states from schema
    const projectStates = [
        { value: 'PLANNING', display: t('projectForm.statePlanning') },
        { value: 'IN_PROGRESS', display: t('projectForm.stateInProgress') },
        { value: 'COMPLETED', display: t('projectForm.stateCompleted') },
        { value: 'DELAYED', display: t('projectForm.stateDelayed') },
    ];

    // Handle click outside to close the form and dropdowns
    useClickOutside(formRef, setModalOpen);
    useClickOutside(stateDropdownRef, setStateDropdownOpen);
    useClickOutside(tagsDropdownRef, setTagsDropdownOpen);

    // Toggle tag selection
    const toggleTag = (tag: string) => {
        setFormData(prev => {
            const updatedTags = prev.tags.includes(tag)
                ? prev.tags.filter(t => t !== tag)
                : [...prev.tags, tag];

            // Validate tags when they change
            if (updatedTags.length > 0) {
                setErrors(prev => ({ ...prev, tags: '' }));
                setSuccess(prev => ({ ...prev, tags: true }));
            } else if (errors.tags) {
                verifyInput('', 'tags');
            }
            return { ...prev, tags: updatedTags };
        });
    };

    // Filter tags based on search input
    const filteredTags = tagSearchInput
        ? tagFilters.filter(tag => tag.display.toLowerCase().includes(tagSearchInput.toLowerCase()))
        : tagFilters;

    // Get display text for tags field
    const getTagsDisplayText = () => {
        if (!formData.tags.length) return '';
        if (formData.tags.length === 1) {
            const tag = tagFilters.find(t => t.value === formData.tags[0]);
            return tag ? tag.display : formData.tags[0];
        }
        return `${formData.tags.length} tags selected`;
    };

    // Validation function
    const verifyInput = (value: string | string[], field: string) => {
        // Skip validation for description as it's optional
        if (field === 'description') {
            setSuccess({ ...success, [field]: true });
            return true;
        }

        let error = '';

        // Handle array values (like tags)
        if (Array.isArray(value)) {
            if (value.length === 0) {
                error = t('projectForm.validationRequired').replace('{field}', t(`projectForm.${field}`));
            }
        } else if (!value.trim()) {
            error = t('projectForm.validationRequired').replace('{field}', t(`projectForm.${field}`));
        }

        setErrors({ ...errors, [field]: error });
        setSuccess({ ...success, [field]: !error });
        return !error;
    };

    // Reset form
    const handleReset = () => {
        setFormData({ name: '', description: '', tags: [], state: '' });
        setTagSearchInput('');
        setErrors({});
        setSuccess({});
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validate all required fields
        let isValid = true;
        const requiredFields = ['name', 'state'] as Array<keyof ProjectFormData>;

        requiredFields.forEach(field => {
            if (!verifyInput(formData[field], field)) {
                isValid = false;
            }
        });

        // Specially validate tags
        if (formData.tags.length === 0) {
            setErrors(prev => ({ ...prev, tags: t('projectForm.validationRequired').replace('{field}', t('projectForm.tags')) }));
            isValid = false;
        }

        if (!isValid) return;

        try {
            setSubmitting(true);

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                showToast('error', t('projectForm.errorMessage'), savedTheme);
                return;
            }
            else {
                const newProject = await response.json();

                // Update the projects array with the new project
                setProjects(prevProjects => [...prevProjects, newProject]);

                showToast('success', t('projectForm.successMessage'), savedTheme);
                setModalOpen(false);
            }
        } catch (error) {
            console.error("Form submission error:", error);
            showToast('error', t('projectForm.formError'), savedTheme);
        } finally {
            setSubmitting(false);
        }
    };

    // Helper function to get display value for state
    const getStateDisplayValue = (value: string) => {
        if (!value) return '';
        const state = projectStates.find(s => s.value === value);
        return state ? state.display : value;
    };

    // Handle state selection
    const handleStateSelect = (value: string) => {
        setFormData({ ...formData, state: value });
        setStateDropdownOpen(false);

        // Clear error when user selects a value
        if (errors.state) {
            setErrors({ ...errors, state: '' });
        }

        // Validate the selection
        verifyInput(value, 'state');
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                style={{
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? 'auto' : 'none',
                    visibility: isOpen ? 'visible' : 'hidden',
                    transition: "opacity 300ms ease, visibility 300ms ease"
                }}
                onClick={() => setModalOpen(false)}
                aria-hidden="true"
            />
            <div
                ref={formRef}
                className={`fixed top-0 right-0 h-full w-[400px] max-w-full bg-white dark:bg-[#30334E] shadow-lg z-50`}
                style={{
                    transition: "transform 300ms ease, opacity 300ms ease",
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                    display: isOpen ? 'block' : 'none'
                }}
                role="dialog"
                aria-labelledby="formTitle"
            >
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="px-6 pt-7 pb-4 border-b border-[#595b75] dark:border-[#595b75] flex items-center justify-between">
                        <h2 id="formTitle" className="text-[1.3rem] text-[#D7D8ED] dark:text-[#D7D8ED]">{t('projectForm.title')}</h2>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleReset}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white cursor-pointer"
                                aria-label="Reset form"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                            <button
                                onClick={() => { setModalOpen(false); }}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white cursor-pointer"
                                aria-label="Close form"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Form Body */}
                    <div className="flex-1 px-6 overflow-y-auto pt-8">
                        <form onSubmit={handleSubmit} noValidate className='flex flex-col gap-2'>
                            {/* Project Name Field */}
                            <div className="mb-4 relative">
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    onBlur={(e) => verifyInput(e.target.value, 'name')}
                                    className={`w-full h-[48px] px-4 py-2 bg-transparent border rounded-md focus:outline-none transition-colors peer
                                ${errors.name
                                            ? 'border-red-500 border-2 focus:border-red-500'
                                            : success.name
                                                ? 'border-green-500 border-2 focus:border-green-500'
                                                : 'border-[#595b75] hover:border-[#9fa1b8] focus:border-indigo-500 focus:border-2'}`}
                                />
                                <label
                                    htmlFor="name"
                                    className={`absolute left-4 transition-all duration-200 pointer-events-none
                                ${errors.name
                                            ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-red-500 z-10'
                                            : success.name
                                                ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-green-500 z-10'
                                                : formData.name
                                                    ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-indigo-500 z-10'
                                                    : 'top-[10px] text-[#73758E] peer-focus:text-xs peer-focus:-top-2.5 peer-focus:px-2 peer-focus:bg-[#30334E] peer-focus:text-indigo-500 peer-focus:z-10'}`}
                                >
                                    {t('projectForm.name')}
                                </label>
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                                )}
                            </div>

                            {/* Project Description Field */}
                            <div className="mb-4 relative">
                                <textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    className={`w-full px-4 py-2 bg-transparent border rounded-md focus:outline-none transition-colors peer
                                ${errors.description
                                            ? 'border-red-500 border-2 focus:border-red-500'
                                            : success.description
                                                ? 'border-green-500 border-2 focus:border-green-500'
                                                : 'border-[#595b75] hover:border-[#9fa1b8] focus:border-indigo-500 focus:border-2'}`}
                                />
                                <label
                                    htmlFor="description"
                                    className={`absolute left-4 transition-all duration-200 pointer-events-none
                                ${errors.description
                                            ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-red-500 z-10'
                                            : success.description
                                                ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-green-500 z-10'
                                                : formData.description
                                                    ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-indigo-500 z-10'
                                                    : 'top-[10px] text-[#73758E] peer-focus:text-xs peer-focus:-top-2.5 peer-focus:px-2 peer-focus:bg-[#30334E] peer-focus:text-indigo-500 peer-focus:z-10'}`}
                                >
                                    {t('projectForm.description')}
                                </label>
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
                                )}
                            </div>

                            {/* Project Tags Field - Custom Dropdown */}
                            <div className="mb-4 relative" ref={tagsDropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setTagsDropdownOpen(!tagsDropdownOpen)}
                                    className={`w-full h-[48px] px-4 py-2 bg-transparent border rounded-md focus:outline-none transition-colors text-left
                                    ${errors.tags
                                            ? 'border-red-500 border-2 focus:border-red-500'
                                            : success.tags
                                                ? 'border-green-500 border-2 focus:border-green-500'
                                                : 'border-[#595b75] hover:border-[#9fa1b8] focus:border-indigo-500 focus:border-2'}`}
                                >
                                    <span className={`${!formData.tags.length ? 'text-[#73758E]' : ''}`}>
                                        {getTagsDisplayText()}
                                    </span>
                                    <svg
                                        className={`w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 transform transition-transform duration-300 ease-in-out ${tagsDropdownOpen ? 'rotate-180' : ''}`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <label
                                    className={`absolute left-4 transition-all duration-200 pointer-events-none
                                    ${errors.tags
                                            ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-red-500 z-10'
                                            : success.tags
                                                ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-green-500 z-10'
                                                : formData.tags.length > 0
                                                    ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-indigo-500 z-10'
                                                    : 'top-[10px] text-[#73758E]'}`}
                                >
                                    {t('projectForm.tags')}
                                </label>

                                {tagsDropdownOpen && (
                                    <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg dark:bg-[#282A42] border border-gray-200 dark:border-[#464963]">
                                        {/* Search input for tags - Fixed at top */}
                                        <div className="sticky top-0 p-2 border-b border-gray-200 dark:border-[#464963] bg-white dark:bg-[#282A42] z-10">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={tagSearchInput}
                                                    onChange={(e) => setTagSearchInput(e.target.value)}
                                                    className="w-full pl-10 py-1 text-sm rounded-md border border-gray-300 
                                                        dark:border-[#464963] dark:bg-[#30334E] dark:text-gray-200"
                                                    placeholder={t('filters.searchTags') || "Search tags..."}
                                                />
                                            </div>
                                        </div>
                                        {/* Scrollable tags list */}
                                        <div className="max-h-48 overflow-y-auto">
                                            <ul>
                                                {filteredTags.map((option) => (
                                                    <li
                                                        key={option.value}
                                                        onClick={() => toggleTag(option.value)}
                                                        className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-[#99C8FF] hover:text-[#30334E] dark:hover:text-[#282A42] flex items-center"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.tags.includes(option.value)}
                                                            onChange={() => { }}
                                                            className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                        />
                                                        {option.display}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {errors.tags && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.tags}</p>
                                )}
                            </div>

                            {/* Project State Field - Custom Dropdown */}
                            <div className="mb-4 relative" ref={stateDropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
                                    className={`w-full h-[48px] px-4 py-2 bg-transparent border rounded-md focus:outline-none transition-colors text-left
                                    ${errors.state
                                            ? 'border-red-500 border-2 focus:border-red-500'
                                            : success.state
                                                ? 'border-green-500 border-2 focus:border-green-500'
                                                : 'border-[#595b75] hover:border-[#9fa1b8] focus:border-indigo-500 focus:border-2'}`}
                                >
                                    <span className={`${!formData.state ? 'text-[#73758E]' : ''}`}>
                                        {formData.state ? getStateDisplayValue(formData.state) : ''}
                                    </span>
                                    <svg
                                        className={`w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 transform transition-transform duration-300 ease-in-out ${stateDropdownOpen ? 'rotate-180' : ''}`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <label
                                    className={`absolute left-4 transition-all duration-200 pointer-events-none
                                    ${errors.state
                                            ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-red-500 z-10'
                                            : success.state
                                                ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-green-500 z-10'
                                                : formData.state
                                                    ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-indigo-500 z-10'
                                                    : 'top-[10px] text-[#73758E]'}`}
                                >
                                    {t('projectForm.state')}
                                </label>

                                {stateDropdownOpen && (
                                    <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg dark:bg-[#282A42] border border-gray-200 dark:border-[#464963] max-h-60 overflow-auto">
                                        <ul>
                                            {projectStates.map((state) => (
                                                <li
                                                    key={state.value}
                                                    onClick={() => handleStateSelect(state.value)}
                                                    className="px-4 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-[#99C8FF] hover:text-[#30334E] dark:hover:text-[#282A42]"
                                                >
                                                    {state.display}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {errors.state && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.state}</p>
                                )}
                            </div>
                        </form>

                        <div className="flex mt-4 space-x-3">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={submitting}
                                className={`h-[37px] ${submitting ? 'w-[140px]' : 'w-[100px]'} bg-[#666CFF] hover:bg-[#4F53D2] text-white rounded-md transition-colors transition-width duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer`}
                            >
                                {submitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {t('projectForm.submitting')}
                                    </span>
                                ) : t('projectForm.submit')}
                            </button>
                            <button
                                type="button"
                                onClick={() => { setModalOpen(false); }}
                                className="w-[100px] h-[37px] bg-transparent border border-[#464963] text-[#464963] dark:text-gray-300 rounded-md transition-colors hover:bg-[#464963] hover:text-white dark:hover:bg-[#464963] cursor-pointer"
                            >
                                {t('projectForm.cancel')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}