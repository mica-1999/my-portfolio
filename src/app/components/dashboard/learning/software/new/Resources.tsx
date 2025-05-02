import React from 'react';
import { ResourcesProps } from '@/app/types/learnform';


const Resources: React.FC<ResourcesProps> = ({ resources, setResources, errors }) => {
    // Handle resource changes
    const handleResourceChange = (index: number, field: string, value: string) => {
        const updatedResources = [...resources];
        updatedResources[index] = { ...updatedResources[index], [field]: value };
        setResources(updatedResources);
    };

    // Add a new resource
    const addResource = () => {
        setResources([...resources, { type: "DOCUMENTATION", title: "", url: "", notes: "" }]);
    };

    // Remove a resource
    const removeResource = (index: number) => {
        if (resources.length > 1) {
            setResources(resources.filter((_, i) => i !== index));
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-[#282A42] p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Resources</h3>
                <button
                    type="button"
                    onClick={addResource}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-300 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Resource
                </button>
            </div>

            {resources.map((resource, index) => (
                <div key={`resource-${index}`} className="mb-4 p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Resource #{index + 1}</h4>
                        {resources.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeResource(index)}
                                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400">
                                Type
                            </label>
                            <select
                                value={resource.type}
                                onChange={e => handleResourceChange(index, 'type', e.target.value)}
                                className="peer w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-indigo-500 focus:border-2 dark:bg-[#30334E] dark:text-white dark:focus:border-indigo-400"
                            >
                                <option value="DOCUMENTATION">Documentation</option>
                                <option value="ARTICLE">Article</option>
                                <option value="VIDEO">Video</option>
                                <option value="COURSE">Course</option>
                                <option value="BOOK">Book</option>
                                <option value="GITHUB_REPO">GitHub Repository</option>
                                <option value="TUTORIAL">Tutorial</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400">
                                Title *
                            </label>
                            <input
                                type="text"
                                value={resource.title}
                                onChange={e => handleResourceChange(index, 'title', e.target.value)}
                                className={`peer w-full px-3 py-2 border ${errors[`resource_${index}_title`] ? 'border-red-500 border-2' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-indigo-500 focus:border-2 dark:bg-[#30334E] dark:text-white dark:focus:border-indigo-400`}
                                placeholder="Resource title"
                            />
                            {errors[`resource_${index}_title`] && <p className="mt-1 text-sm text-red-500">{errors[`resource_${index}_title`]}</p>}
                        </div>
                    </div>
                    <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400">
                            URL
                        </label>
                        <input
                            type="text"
                            value={resource.url || ''}
                            onChange={e => handleResourceChange(index, 'url', e.target.value)}
                            className={`peer w-full px-3 py-2 border ${errors[`resource_${index}_url`] ? 'border-red-500 border-2' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-indigo-500 focus:border-2 dark:bg-[#30334E] dark:text-white dark:focus:border-indigo-400`}
                            placeholder="https://example.com"
                        />
                        {errors[`resource_${index}_url`] && <p className="mt-1 text-sm text-red-500">{errors[`resource_${index}_url`]}</p>}
                    </div>
                    <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400">
                            Notes
                        </label>
                        <input
                            type="text"
                            value={resource.notes || ''}
                            onChange={e => handleResourceChange(index, 'notes', e.target.value)}
                            className="peer w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-indigo-500 focus:border-2 dark:bg-[#30334E] dark:text-white dark:focus:border-indigo-400"
                            placeholder="Additional notes about this resource"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Resources;