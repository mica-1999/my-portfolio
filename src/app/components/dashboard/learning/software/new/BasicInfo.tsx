// REVISED: 2025-05-05 - Great implementation ✅
import React from 'react';
import { categoryFilters, complexityOptions, statusFilters } from '@/app/data/learningSoftwareData';
import { BasicInfoProps } from '@/app/types/learnform';
import { useTheme } from '@/app/context/ThemeContext';

const BasicInfo: React.FC<BasicInfoProps> = ({
    formData,
    availableSubcategories,
    errors,
    handleInputChange,
    handleCheckboxChange,
    handleSubcategoryChange
}) => {
    const { t } = useTheme();

    return (
        <div className="bg-gray-50 dark:bg-[#282A42] p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">{t('softwareForm.basicInfo.title')}</h3>
            <div className="space-y-4">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400">
                        {t('softwareForm.basicInfo.title')} *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={`peer w-full px-3 py-2 border ${errors.title ? 'border-red-500 border-2' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-indigo-500 focus:border-2 dark:bg-[#30334E] dark:text-white dark:focus:border-indigo-400`}
                        placeholder={t('softwareForm.basicInfo.titlePlaceholder')}
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400">
                        {t('softwareForm.basicInfo.description')} *
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                        className={`peer w-full px-3 py-2 border ${errors.description ? 'border-red-500 border-2' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-indigo-500 focus:border-2 dark:bg-[#30334E] dark:text-white dark:focus:border-indigo-400`}
                        placeholder={t('softwareForm.basicInfo.descriptionPlaceholder')}
                    ></textarea>
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                </div>

                {/* Status, Category, Complexity Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Status */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400">
                            {t('softwareForm.basicInfo.status')}
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="peer w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-indigo-500 focus:border-2 dark:bg-[#30334E] dark:text-white dark:focus:border-indigo-400"
                        >
                            {statusFilters.filter(option => option.value !== '').map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.value === 'PLANNED' ? t('softwareForm.basicInfo.statusPlanned') :
                                        option.value === 'IN_PROGRESS' ? t('softwareForm.basicInfo.statusInProgress') :
                                            option.value === 'COMPLETED' ? t('softwareForm.basicInfo.statusCompleted') :
                                                option.value === 'ON_HOLD' ? t('softwareForm.basicInfo.statusOnHold') :
                                                    option.display}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400">
                            {t('softwareForm.basicInfo.category')} *
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className={`peer w-full px-3 py-2 border ${errors.category ? 'border-red-500 border-2' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-indigo-500 focus:border-2 dark:bg-[#30334E] dark:text-white dark:focus:border-indigo-400`}
                        >
                            <option value="">{t('softwareForm.basicInfo.selectCategory')}</option>
                            {categoryFilters.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.display}
                                </option>
                            ))}
                        </select>
                        {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                    </div>

                    {/* Complexity */}
                    <div>
                        <label htmlFor="complexity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400">
                            {t('softwareForm.basicInfo.complexity')}
                        </label>
                        <select
                            id="complexity"
                            name="complexity"
                            value={formData.complexity}
                            onChange={handleInputChange}
                            className="peer w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-indigo-500 focus:border-2 dark:bg-[#30334E] dark:text-white dark:focus:border-indigo-400"
                        >
                            {complexityOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.value === 'BEGINNER' ? t('softwareForm.basicInfo.complexityBeginner') :
                                        option.value === 'INTERMEDIATE' ? t('softwareForm.basicInfo.complexityIntermediate') :
                                            option.value === 'ADVANCED' ? t('softwareForm.basicInfo.complexityAdvanced') :
                                                option.display}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Subcategories */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('softwareForm.basicInfo.subcategories')} *
                    </label>
                    {formData.category ? (
                        <div className={`mt-1 p-3 border ${errors.subcategories ? 'border-red-500 border-2' : 'border-gray-300 dark:border-gray-600'} rounded-md dark:bg-[#30334E]`}>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                {availableSubcategories.map(subcategory => (
                                    <div key={subcategory.value} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`subcategory-${subcategory.value}`}
                                            checked={formData.subcategories.includes(subcategory.value)}
                                            onChange={() => handleSubcategoryChange(subcategory.value)}
                                            className="h-4 w-4 text-indigo-600 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 rounded"
                                        />
                                        <label
                                            htmlFor={`subcategory-${subcategory.value}`}
                                            className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                                        >
                                            {subcategory.display}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-[#30334E] text-gray-500 dark:text-gray-400">
                            {t('softwareForm.basicInfo.selectSubcategories')}
                        </div>
                    )}
                    {errors.subcategories && <p className="mt-1 text-sm text-red-500">{errors.subcategories}</p>}
                </div>

                {/* Dates & Progress Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Start Date */}
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400">
                            {t('softwareForm.basicInfo.startDate')}
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            className="peer w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-indigo-500 focus:border-2 dark:bg-[#30334E] dark:text-white dark:focus:border-indigo-400"
                        />
                    </div>

                    {/* End Date */}
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400">
                            {t('softwareForm.basicInfo.endDate')}
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleInputChange}
                            className="peer w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-indigo-500 focus:border-2 dark:bg-[#30334E] dark:text-white dark:focus:border-indigo-400"
                        />
                    </div>

                    {/* Progress */}
                    <div>
                        <label htmlFor="progress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t('softwareForm.basicInfo.progress')} ({formData.progress}%)
                        </label>
                        <input
                            type="range"
                            id="progress"
                            name="progress"
                            min="0"
                            max="100"
                            value={formData.progress}
                            onChange={handleInputChange}
                            className="w-full focus:outline-none"
                        />
                    </div>
                </div>

                {/* Personal Notes */}
                <div>
                    <label htmlFor="personalNotes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400">
                        {t('softwareForm.basicInfo.personalNotes')}
                    </label>
                    <textarea
                        id="personalNotes"
                        name="personalNotes"
                        value={formData.personalNotes}
                        onChange={handleInputChange}
                        rows={2}
                        className="peer w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-indigo-500 focus:border-2 dark:bg-[#30334E] dark:text-white dark:focus:border-indigo-400"
                        placeholder={t('softwareForm.basicInfo.personalNotesPlaceholder')}
                    ></textarea>
                </div>

                {/* Public Toggle */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="isPublic"
                        name="isPublic"
                        checked={formData.isPublic}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 rounded"
                    />
                    <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        {t('softwareForm.basicInfo.isPublic')}
                    </label>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t('softwareForm.basicInfo.isPublicHelp')}
                </p>
            </div>
        </div>
    );
};

export default BasicInfo;