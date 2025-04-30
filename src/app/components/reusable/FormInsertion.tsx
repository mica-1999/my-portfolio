"use client"
import { useState, useRef, FormEvent, useEffect } from 'react';
import { roleFilters } from '@/app/data/manageFilters';
import { FormInsertionProps } from '@/app/types/dashmain';
import { useClickOutside } from './ClickOutsideDiv';
import { showToast } from './Toasters';
import { useTheme } from '@/app/context/ThemeContext';

export default function FormInsertion({ isOpen, setFormOpen, setUsers }: FormInsertionProps) {
    // State & Hooks
    const { savedTheme, t } = useTheme();
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', role: '', linkedProject: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState<Record<string, boolean>>({});
    const [submitting, setSubmitting] = useState(false);
    const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);
    const roleDropdownRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close the form
    useClickOutside(formRef, setFormOpen);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target as Node)) {
                setRoleDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [roleDropdownRef]);

    // Handle input changes
    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [field]: e.target.value });

        // Clear error when user starts typing again
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    // Validation function
    const verifyInput = (value: string, field: string) => {
        // Skip validation for linkedProject as it's optional
        if (field === 'linkedProject') {
            setSuccess({ ...success, [field]: true });
            return true;
        }

        let error = '';

        if (!value.trim()) {
            error = t('userForm.validationRequired').replace('{field}', t(`userForm.${field}`));
        } else {
            switch (field) {
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        error = t('userForm.validationEmail');
                    }
                    break;
                case 'phone':
                    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3}$/;
                    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                        error = t('userForm.validationPhone');
                    }
                    break;
            }
        }
        setErrors({ ...errors, [field]: error });
        setSuccess({ ...success, [field]: !error });
        return !error;
    };

    // Reset form
    const handleReset = () => {
        setFormData({ firstName: '', lastName: '', email: '', phone: '', role: '', linkedProject: '' });
        setErrors({});
        setSuccess({});
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validate all required fields (excluding linkedProject)
        let isValid = true;
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'role'] as Array<keyof typeof formData>;

        requiredFields.forEach(field => {
            if (!verifyInput(formData[field], field)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        try {
            setSubmitting(true);

            // Simulate network delay (2 seconds timeout)
            await new Promise(resolve => setTimeout(resolve, 2000));

            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                showToast('error', t('userForm.errorMessage'), savedTheme);
                return;
            }
            else {
                const newUser = await response.json();

                // Update the users array with the new user
                setUsers(prevUsers => [...prevUsers, newUser]);

                showToast('success', t('userForm.successMessage'), savedTheme);
                setFormOpen(false);
            }
        } catch (error) {
            console.error("Form submission error:", error);
            showToast('error', t('userForm.formError'), savedTheme);
        } finally {
            setSubmitting(false);
        }
    };

    // Helper function to get display value for role
    const getRoleDisplayValue = (value: string) => {
        if (!value) return '';
        const role = roleFilters.find(r => r.value === value);
        return role ? role.display : value;
    };

    // Handle role selection
    const handleRoleSelect = (value: string) => {
        setFormData({ ...formData, role: value });
        setRoleDropdownOpen(false);

        // Clear error when user selects a value
        if (errors.role) {
            setErrors({ ...errors, role: '' });
        }

        // Validate the selection
        verifyInput(value, 'role');
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
                onClick={() => setFormOpen(false)}
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
                        <h2 id="formTitle" className="text-[1.3rem] text-[#D7D8ED] dark:text-[#D7D8ED]">{t('userForm.title')}</h2>
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
                                onClick={() => { setFormOpen(false); }}
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
                            {/* First Name Field */}
                            <div className="mb-4 relative">
                                <input
                                    type="text"
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange('firstName')}
                                    onBlur={(e) => verifyInput(e.target.value, 'firstName')}
                                    className={`w-full h-[48px] px-4 py-2 bg-transparent border rounded-md focus:outline-none transition-colors peer
                                ${errors.firstName
                                            ? 'border-red-500 border-2 focus:border-red-500'
                                            : success.firstName
                                                ? 'border-green-500 border-2 focus:border-green-500'
                                                : 'border-[#595b75] hover:border-[#9fa1b8] focus:border-indigo-500 focus:border-2'}`}
                                />
                                <label
                                    htmlFor="firstName"
                                    className={`absolute left-4 transition-all duration-200 pointer-events-none
                                ${errors.firstName
                                            ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-red-500 z-10'
                                            : success.firstName
                                                ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-green-500 z-10'
                                                : formData.firstName
                                                    ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-indigo-500 z-10'
                                                    : 'top-[10px] text-[#73758E] peer-focus:text-xs peer-focus:-top-2.5 peer-focus:px-2 peer-focus:bg-[#30334E] peer-focus:text-indigo-500 peer-focus:z-10'}`}
                                >
                                    {t('userForm.firstName')}
                                </label>
                                {errors.firstName && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>
                                )}
                            </div>

                            {/* Last Name Field */}
                            <div className="mb-4 relative">
                                <input
                                    type="text"
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange('lastName')}
                                    onBlur={(e) => verifyInput(e.target.value, 'lastName')}
                                    className={`w-full h-[48px] px-4 py-2 bg-transparent border rounded-md focus:outline-none transition-colors peer
                                ${errors.lastName
                                            ? 'border-red-500 border-2 focus:border-red-500'
                                            : success.lastName
                                                ? 'border-green-500 border-2 focus:border-green-500'
                                                : 'border-[#595b75] hover:border-[#9fa1b8] focus:border-indigo-500 focus:border-2'}`}
                                />
                                <label
                                    htmlFor="lastName"
                                    className={`absolute left-4 transition-all duration-200 pointer-events-none
                                ${errors.lastName
                                            ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-red-500 z-10'
                                            : success.lastName
                                                ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-green-500 z-10'
                                                : formData.lastName
                                                    ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-indigo-500 z-10'
                                                    : 'top-[10px] text-[#73758E] peer-focus:text-xs peer-focus:-top-2.5 peer-focus:px-2 peer-focus:bg-[#30334E] peer-focus:text-indigo-500 peer-focus:z-10'}`}
                                >
                                    {t('userForm.lastName')}
                                </label>
                                {errors.lastName && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="mb-4 relative">
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange('email')}
                                    onBlur={(e) => verifyInput(e.target.value, 'email')}
                                    className={`w-full h-[48px] px-4 py-2 bg-transparent border rounded-md focus:outline-none transition-colors peer
                                ${errors.email
                                            ? 'border-red-500 border-2 focus:border-red-500'
                                            : success.email
                                                ? 'border-green-500 border-2 focus:border-green-500'
                                                : 'border-[#595b75] hover:border-[#9fa1b8] focus:border-indigo-500 focus:border-2'}`}
                                />
                                <label
                                    htmlFor="email"
                                    className={`absolute left-4 transition-all duration-200 pointer-events-none
                                ${errors.email
                                            ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-red-500 z-10'
                                            : success.email
                                                ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-green-500 z-10'
                                                : formData.email
                                                    ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-indigo-500 z-10'
                                                    : 'top-[10px] text-[#73758E] peer-focus:text-xs peer-focus:-top-2.5 peer-focus:px-2 peer-focus:bg-[#30334E] peer-focus:text-indigo-500 peer-focus:z-10'}`}
                                >
                                    {t('userForm.email')}
                                </label>
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                                )}
                            </div>

                            {/* Phone Field */}
                            <div className="mb-4 relative">
                                <input
                                    type="text"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange('phone')}
                                    onBlur={(e) => verifyInput(e.target.value, 'phone')}
                                    className={`w-full h-[48px] px-4 py-2 bg-transparent border rounded-md focus:outline-none transition-colors peer
                                ${errors.phone
                                            ? 'border-red-500 border-2 focus:border-red-500'
                                            : success.phone
                                                ? 'border-green-500 border-2 focus:border-green-500'
                                                : 'border-[#595b75] hover:border-[#9fa1b8] focus:border-indigo-500 focus:border-2'}`}
                                />
                                <label
                                    htmlFor="phone"
                                    className={`absolute left-4 transition-all duration-200 pointer-events-none
                                ${errors.phone
                                            ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-red-500 z-10'
                                            : success.phone
                                                ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-green-500 z-10'
                                                : formData.phone
                                                    ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-indigo-500 z-10'
                                                    : 'top-[10px] text-[#73758E] peer-focus:text-xs peer-focus:-top-2.5 peer-focus:px-2 peer-focus:bg-[#30334E] peer-focus:text-indigo-500 peer-focus:z-10'}`}
                                >
                                    {t('userForm.phone')}
                                </label>
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                                )}
                            </div>

                            {/* Role Field - Custom Dropdown */}
                            <div className="mb-4 relative" ref={roleDropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                                    className={`w-full h-[48px] px-4 py-2 bg-transparent border rounded-md focus:outline-none transition-colors text-left
                                    ${errors.role
                                            ? 'border-red-500 border-2 focus:border-red-500'
                                            : success.role
                                                ? 'border-green-500 border-2 focus:border-green-500'
                                                : 'border-[#595b75] hover:border-[#9fa1b8] focus:border-indigo-500 focus:border-2'}`}
                                >
                                    <span className={`${!formData.role ? 'text-[#73758E]' : ''}`}>
                                        {formData.role ? getRoleDisplayValue(formData.role) : ''}
                                    </span>
                                    <svg
                                        className={`w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 transform transition-transform duration-300 ease-in-out ${roleDropdownOpen ? 'rotate-180' : ''}`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <label
                                    className={`absolute left-4 transition-all duration-200 pointer-events-none
                                    ${errors.role
                                            ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-red-500 z-10'
                                            : success.role
                                                ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-green-500 z-10'
                                                : formData.role
                                                    ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-indigo-500 z-10'
                                                    : 'top-[10px] text-[#73758E]'}`}
                                >
                                    {t('userForm.role')}
                                </label>

                                {roleDropdownOpen && (
                                    <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg dark:bg-[#282A42] border border-gray-200 dark:border-[#464963] max-h-60 overflow-auto">
                                        <ul>
                                            {roleFilters.map((role) => (
                                                role.value && (
                                                    <li
                                                        key={role.value}
                                                        onClick={() => handleRoleSelect(role.value)}
                                                        className="px-4 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-[#99C8FF] hover:text-[#30334E] dark:hover:text-[#282A42]"
                                                    >
                                                        {role.display}
                                                    </li>
                                                )
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {errors.role && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.role}</p>
                                )}
                            </div>

                            {/* Linked Project Field */}
                            <div className="mb-4 relative">
                                <input
                                    type="text"
                                    id="linkedProject"
                                    value={formData.linkedProject}
                                    onChange={handleInputChange('linkedProject')}
                                    className={`w-full h-[48px] px-4 py-2 bg-transparent border rounded-md focus:outline-none transition-colors peer
                                ${errors.linkedProject
                                            ? 'border-red-500 border-2 focus:border-red-500'
                                            : success.linkedProject
                                                ? 'border-green-500 border-2 focus:border-green-500'
                                                : 'border-[#595b75] hover:border-[#9fa1b8] focus:border-indigo-500 focus:border-2'}`}
                                />
                                <label
                                    htmlFor="linkedProject"
                                    className={`absolute left-4 transition-all duration-200 pointer-events-none
                                ${errors.linkedProject
                                            ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-red-500 z-10'
                                            : success.linkedProject
                                                ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-green-500 z-10'
                                                : formData.linkedProject
                                                    ? 'text-xs -top-2.5 px-2 bg-[#30334E] text-indigo-500 z-10'
                                                    : 'top-[10px] text-[#73758E] peer-focus:text-xs peer-focus:-top-2.5 peer-focus:px-2 peer-focus:bg-[#30334E] peer-focus:text-indigo-500 peer-focus:z-10'}`}
                                >
                                    {t('userForm.linkedProject')}
                                </label>
                                {errors.linkedProject && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.linkedProject}</p>
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
                                        {t('userForm.submitting')}
                                    </span>
                                ) : t('userForm.submit')}
                            </button>
                            <button
                                type="button"
                                onClick={() => { setFormOpen(false); }}
                                className="w-[100px] h-[37px] bg-transparent border border-[#464963] text-[#464963] dark:text-gray-300 rounded-md transition-colors hover:bg-[#464963] hover:text-white dark:hover:bg-[#464963] cursor-pointer"
                            >
                                {t('userForm.cancel')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}