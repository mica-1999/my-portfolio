"use client"
import { useState, useRef, useEffect, FormEvent } from 'react';
import { roleFilters } from '@/app/data/manageFilters';

interface FormInsertionProps {
    isOpen: boolean;
    setFormOpen: (isOpen: boolean) => void;
    title?: string;
    onSubmit?: (formData: any) => Promise<void>;
}

export default function FormInsertion({
    isOpen,
    setFormOpen,
    title = "Add New Item",
    onSubmit
}: FormInsertionProps) {
    // State & Hooks
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', role: '', linkedProject: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState<Record<string, boolean>>({});
    const [submitting, setSubmitting] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);

    // Handle form visibility with animation
    useEffect(() => {
        if (isOpen) {
            setFormVisible(true);
        }
        else {
            setFormVisible(false);
            const timer = setTimeout(() => {
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Handle click outside to close
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                handleCloseForm();
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Handle input changes
    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [field]: e.target.value
        });

        // Clear error when user starts typing again
        if (errors[field]) {
            setErrors({
                ...errors,
                [field]: ''
            });
        }
    };

    // Validation function
    const verifyInput = (value: string, field: string) => {
        let error = '';

        if (!value.trim()) {
            error = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        } else {
            switch (field) {
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        error = 'Please enter a valid email address';
                    }
                    break;
                case 'phone':
                    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
                    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                        error = 'Please enter a valid phone number';
                    }
                    break;
            }
        }

        setErrors({
            ...errors,
            [field]: error
        });

        setSuccess({
            ...success,
            [field]: !error
        });

        return !error;
    };

    // Reset form
    const handleReset = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            role: '',
            linkedProject: ''
        });
        setErrors({});
        setSuccess({});
    };

    // Close form
    const handleCloseForm = () => {
        setFormOpen(false);
        setTimeout(handleReset, 300); // Reset after animation completes
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        const fields = Object.keys(formData) as Array<keyof typeof formData>;

        fields.forEach(field => {
            if (!verifyInput(formData[field], field)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        try {
            setSubmitting(true);

            if (onSubmit) {
                await onSubmit(formData);
            }

            // Successful submission
            handleCloseForm();
        } catch (error) {
            console.error("Form submission error:", error);
            // Handle submission errors
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            ref={formRef}
            className={`fixed top-0 right-0 h-full w-[400px] max-w-full bg-white dark:bg-[#30334E] shadow-lg z-50`}
            style={{
                transition: "transform 300ms ease, opacity 300ms ease",
                opacity: formVisible ? 1 : 0,
                transform: formVisible ? 'translateX(0)' : 'translateX(100%)',
                display: isOpen ? 'block' : 'none'
            }}
            role="dialog"
            aria-labelledby="formTitle"
        >
            <div className="h-full flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <h2 id="formTitle" className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleReset}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                            aria-label="Reset form"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button
                            onClick={handleCloseForm}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                            aria-label="Close form"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Form Body */}
                <div className="flex-1 p-4">
                    <form onSubmit={handleSubmit} noValidate>
                        {/* First Name Field */}
                        <div className="mb-4 relative">
                            <input
                                type="text"
                                id="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange('firstName')}
                                onBlur={(e) => verifyInput(e.target.value, 'firstName')}
                                className={`w-full px-3 pt-5 pb-2 bg-transparent border rounded-md focus:outline-none focus:ring-2 transition-colors peer
                                ${errors.firstName
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                        : success.firstName
                                            ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                                            : 'border-[#464963] dark:border-[#464963] focus:border-[#464963] focus:ring-[#464963] dark:focus:ring-[#464963]'}`}
                            />
                            <label
                                htmlFor="firstName"
                                className={`absolute left-3 transition-all duration-200 pointer-events-none text-gray-500 dark:text-gray-400
                                ${formData.firstName ? 'text-xs top-1' : 'top-3 peer-focus:text-xs peer-focus:top-1'}`}
                            >
                                First Name
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
                                className={`w-full px-3 pt-5 pb-2 bg-transparent border rounded-md focus:outline-none focus:ring-2 transition-colors peer
                                ${errors.lastName
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                        : success.lastName
                                            ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                                            : 'border-[#464963] dark:border-[#464963] focus:border-[#464963] focus:ring-[#464963] dark:focus:ring-[#464963]'}`}
                            />
                            <label
                                htmlFor="lastName"
                                className={`absolute left-3 transition-all duration-200 pointer-events-none text-gray-500 dark:text-gray-400
                                ${formData.lastName ? 'text-xs top-1' : 'top-3 peer-focus:text-xs peer-focus:top-1'}`}
                            >
                                Last Name
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
                                className={`w-full px-3 pt-5 pb-2 bg-transparent border rounded-md focus:outline-none focus:ring-2 transition-colors peer
                                ${errors.email
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                        : success.email
                                            ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                                            : 'border-[#464963] dark:border-[#464963] focus:border-[#464963] focus:ring-[#464963] dark:focus:ring-[#464963]'}`}
                            />
                            <label
                                htmlFor="email"
                                className={`absolute left-3 transition-all duration-200 pointer-events-none text-gray-500 dark:text-gray-400
                                ${formData.email ? 'text-xs top-1' : 'top-3 peer-focus:text-xs peer-focus:top-1'}`}
                            >
                                Email
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
                                className={`w-full px-3 pt-5 pb-2 bg-transparent border rounded-md focus:outline-none focus:ring-2 transition-colors peer
                                ${errors.phone
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                        : success.phone
                                            ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                                            : 'border-[#464963] dark:border-[#464963] focus:border-[#464963] focus:ring-[#464963] dark:focus:ring-[#464963]'}`}
                            />
                            <label
                                htmlFor="phone"
                                className={`absolute left-3 transition-all duration-200 pointer-events-none text-gray-500 dark:text-gray-400
                                ${formData.phone ? 'text-xs top-1' : 'top-3 peer-focus:text-xs peer-focus:top-1'}`}
                            >
                                Phone
                            </label>
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                            )}
                        </div>

                        {/* Role Field */}
                        <div className="mb-4 relative">
                            <select
                                id="role"
                                value={formData.role}
                                onChange={handleInputChange('role')}
                                onBlur={(e) => verifyInput(e.target.value, 'role')}
                                className={`w-full px-3 pt-5 pb-2 bg-transparent border rounded-md focus:outline-none focus:ring-2 transition-colors appearance-none peer
                                ${errors.role
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                        : success.role
                                            ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                                            : 'border-[#464963] dark:border-[#464963] focus:border-[#464963] focus:ring-[#464963] dark:focus:ring-[#464963]'}`}
                            >
                                <option value=""></option>
                                {roleFilters.map((role) => (
                                    role.value && <option key={role.value} value={role.value}>{role.display}</option>
                                ))}
                            </select>
                            <label
                                htmlFor="role"
                                className={`absolute left-3 transition-all duration-200 pointer-events-none text-gray-500 dark:text-gray-400
                                ${formData.role ? 'text-xs top-1' : 'top-3 peer-focus:text-xs peer-focus:top-1'}`}
                            >
                                Role
                            </label>
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
                                onBlur={(e) => verifyInput(e.target.value, 'linkedProject')}
                                className={`w-full px-3 pt-5 pb-2 bg-transparent border rounded-md focus:outline-none focus:ring-2 transition-colors peer
                                ${errors.linkedProject
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                        : success.linkedProject
                                            ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                                            : 'border-[#464963] dark:border-[#464963] focus:border-[#464963] focus:ring-[#464963] dark:focus:ring-[#464963]'}`}
                            />
                            <label
                                htmlFor="linkedProject"
                                className={`absolute left-3 transition-all duration-200 pointer-events-none text-gray-500 dark:text-gray-400
                                ${formData.linkedProject ? 'text-xs top-1' : 'top-3 peer-focus:text-xs peer-focus:top-1'}`}
                            >
                                Linked Project
                            </label>
                            {errors.linkedProject && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.linkedProject}</p>
                            )}
                        </div>
                    </form>

                    <div className="flex mt-7 space-x-3">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="w-[100px] h-[37px] bg-[#666CFF] hover:bg-[#4F53D2] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#464963] focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {submitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </span>
                            ) : "Submit"}
                        </button>
                        <button
                            type="button"
                            onClick={handleCloseForm}
                            className="w-[100px] h-[37px] bg-transparent border border-[#464963] text-[#464963] dark:text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors hover:bg-[#464963] hover:text-white dark:hover:bg-[#464963] cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}