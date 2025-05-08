// REVISED: 2025-05-05 - Image upload implementation ✅
import React, { useRef } from 'react';
import { useTheme } from '@/app/context/ThemeContext';

interface ImageData {
    file: File | null;
    title: string;
    description: string;
    altText: string;
}

interface ImagesProps {
    images: ImageData[];
    setImages: React.Dispatch<React.SetStateAction<ImageData[]>>;
    errors: { [key: string]: string };
}

const Images: React.FC<ImagesProps> = ({ images, setImages, errors }) => {
    const { t } = useTheme();
    const fileInputRefs = useRef<Array<HTMLInputElement | null>>([]);

    // Handle image changes
    const handleImageChange = (index: number, field: string, value: string | File | null) => {
        const updatedImages = [...images];

        if (field === 'file' && value instanceof File) {
            updatedImages[index] = {
                ...updatedImages[index],
                [field]: value,
                // Auto-populate the title if it's empty
                title: updatedImages[index].title || value.name.split('.')[0]
            };
        } else {
            updatedImages[index] = { ...updatedImages[index], [field]: value };
        }

        setImages(updatedImages);
    };

    // Handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            handleImageChange(index, 'file', file);
        }
    };

    // Add a new image
    const addImage = () => {
        setImages([...images, { file: null, title: '', description: '', altText: '' }]);
    };

    // Remove an image
    const removeImage = (index: number) => {
        if (images.length > 1) {
            setImages(images.filter((_, i) => i !== index));
            // Also update fileInputRefs
            fileInputRefs.current = fileInputRefs.current.filter((_, i) => i !== index);
        }
    };

    // Trigger file input click
    const triggerFileInput = (index: number) => {
        if (fileInputRefs.current[index]) {
            fileInputRefs.current[index]?.click();
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-[#282A42] p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">{t('softwareForm.images.title')}</h3>
                <button
                    type="button"
                    onClick={addImage}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-300 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    {t('softwareForm.images.addImage')}
                </button>
            </div>

            {images.map((image, index) => (
                <div key={`image-${index}`} className="mb-4 p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('softwareForm.images.image')} #{index + 1}</h4>
                        {images.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* File Upload */}
                    <div className="mb-3">
                        <input
                            type="file"
                            id={`image-file-${index}`}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, index)}
                            ref={el => { fileInputRefs.current[index] = el; }}
                        />

                        <div className="flex flex-col items-center justify-center w-full">
                            {image.file ? (
                                <div className="relative w-full">
                                    <img
                                        src={URL.createObjectURL(image.file)}
                                        alt={image.altText || "Preview"}
                                        className="w-full h-40 object-contain border border-gray-300 dark:border-gray-600 rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleImageChange(index, 'file', null)}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <div
                                    onClick={() => triggerFileInput(index)}
                                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-[#30334E] hover:bg-gray-100 dark:hover:bg-[#383B59]"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">{t('softwareForm.images.clickToUpload')}</span>
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{t('softwareForm.images.supportedFormats')}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Image Metadata */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('softwareForm.images.title')}
                            </label>
                            <input
                                type="text"
                                value={image.title}
                                onChange={e => handleImageChange(index, 'title', e.target.value)}
                                className="peer w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-indigo-500 focus:border-2 dark:bg-[#30334E] dark:text-white dark:focus:border-indigo-400"
                                placeholder={t('softwareForm.images.titlePlaceholder')}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('softwareForm.images.altText')} {image.file ? '*' : ''}
                            </label>
                            <input
                                type="text"
                                value={image.altText}
                                onChange={e => handleImageChange(index, 'altText', e.target.value)}
                                className={`peer w-full px-3 py-2 border ${errors[`image_${index}_altText`] ? 'border-red-500 border-2' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-indigo-500 focus:border-2 dark:bg-[#30334E] dark:text-white dark:focus:border-indigo-400`}
                                placeholder={t('softwareForm.images.altTextPlaceholder')}
                            />
                            {errors[`image_${index}_altText`] && <p className="mt-1 text-sm text-red-500">{errors[`image_${index}_altText`]}</p>}
                        </div>
                    </div>
                    <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t('softwareForm.images.description')}
                        </label>
                        <textarea
                            value={image.description}
                            onChange={e => handleImageChange(index, 'description', e.target.value)}
                            rows={2}
                            className="peer w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-indigo-500 focus:border-2 dark:bg-[#30334E] dark:text-white dark:focus:border-indigo-400"
                            placeholder={t('softwareForm.images.descriptionPlaceholder')}
                        ></textarea>
                    </div>
                </div>
            ))}

            {/* Image guidelines/help text */}
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                <p>{t('softwareForm.images.guidelines')}</p>
            </div>
        </div>
    );
};

export default Images;
