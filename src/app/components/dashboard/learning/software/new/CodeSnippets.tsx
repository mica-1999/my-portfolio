// REVISED: 2025-05-05 - Great implementation ✅
import React from 'react';
import { CodeSnippetsProps } from '@/app/types/learnform';

const CodeSnippets: React.FC<CodeSnippetsProps> = ({ codeSnippets, setCodeSnippets, errors }) => {
    // Handle code snippet changes
    const handleCodeSnippetChange = (index: number, field: string, value: string) => {
        const updatedSnippets = [...codeSnippets];
        updatedSnippets[index] = { ...updatedSnippets[index], [field]: value };
        setCodeSnippets(updatedSnippets);
    };

    // Add a new code snippet
    const addCodeSnippet = () => {
        setCodeSnippets([...codeSnippets, { title: "", language: "javascript", code: "", explanation: "" }]);
    };

    // Remove a code snippet
    const removeCodeSnippet = (index: number) => {
        if (codeSnippets.length > 1) {
            setCodeSnippets(codeSnippets.filter((_, i) => i !== index));
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-[#282A42] p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Code Snippets</h3>
                <button
                    type="button"
                    onClick={addCodeSnippet}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-300 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Code Snippet
                </button>
            </div>

            {codeSnippets.map((snippet, index) => (
                <div key={`snippet-${index}`} className="mb-4 p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Code Snippet #{index + 1}</h4>
                        {codeSnippets.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeCodeSnippet(index)}
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
                                Title *
                            </label>
                            <input
                                type="text"
                                value={snippet.title}
                                onChange={e => handleCodeSnippetChange(index, 'title', e.target.value)}
                                className={`peer w-full px-3 py-2 border ${errors[`snippet_${index}_title`] ? 'border-red-500 border-2' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-indigo-500 focus:border-2 dark:bg-[#30334E] dark:text-white dark:focus:border-indigo-400`}
                                placeholder="Snippet title"
                            />
                            {errors[`snippet_${index}_title`] && <p className="mt-1 text-sm text-red-500">{errors[`snippet_${index}_title`]}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400">
                                Language
                            </label>
                            <input
                                type="text"
                                value={snippet.language}
                                onChange={e => handleCodeSnippetChange(index, 'language', e.target.value)}
                                className="peer w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-indigo-500 focus:border-2 dark:bg-[#30334E] dark:text-white dark:focus:border-indigo-400"
                                placeholder="e.g., javascript, python, etc."
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400">
                            Code *
                        </label>
                        <textarea
                            value={snippet.code}
                            onChange={e => handleCodeSnippetChange(index, 'code', e.target.value)}
                            rows={5}
                            className={`peer w-full px-3 py-2 border ${errors[`snippet_${index}_code`] ? 'border-red-500 border-2' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-indigo-500 focus:border-2 dark:bg-[#30334E] dark:text-white font-mono dark:focus:border-indigo-400`}
                            placeholder="Paste your code here..."
                        ></textarea>
                        {errors[`snippet_${index}_code`] && <p className="mt-1 text-sm text-red-500">{errors[`snippet_${index}_code`]}</p>}
                    </div>
                    <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400">
                            Explanation
                        </label>
                        <textarea
                            value={snippet.explanation || ''}
                            onChange={e => handleCodeSnippetChange(index, 'explanation', e.target.value)}
                            rows={3}
                            className="peer w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-indigo-500 focus:border-2 dark:bg-[#30334E] dark:text-white dark:focus:border-indigo-400"
                            placeholder="Explain what this code does..."
                        ></textarea>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CodeSnippets;