// REVIEWED: 2025-05-05 - Good to go ✅

"use client";
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { useSearchParams } from 'next/navigation';

export default function Contact() {
    // State & Hooks
    const { t } = useTheme();
    const messageFormRef = useRef(null); // Ref for the contact form
    const [openFaq, setOpenFaq] = useState<number | null>(null); // Open FAQ sections
    const searchParams = useSearchParams(); // To scroll into form if present

    // Smooth scroll function
    const smoothScrollToForm = () => {
        if (messageFormRef.current) {
            const startPosition = window.scrollY;
            const element = messageFormRef.current as HTMLElement;
            const yOffset = -90;
            const endPosition = element.getBoundingClientRect().top + window.scrollY + yOffset;

            const duration = 1000;
            const startTime = performance.now();

            const animateScroll = (currentTime: number) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const easeInOut = progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

                const position = startPosition + (endPosition - startPosition) * easeInOut;

                window.scrollTo(0, position);

                if (elapsedTime < duration) {
                    requestAnimationFrame(animateScroll);
                }
            };

            requestAnimationFrame(animateScroll);
        }
    };

    // Check for scrollToForm parameter when component mounts
    useEffect(() => {
        if (searchParams.get('scrollToForm') === 'true') {
            setTimeout(smoothScrollToForm, 300);
        }
    }, [searchParams]);

    // Toggle FAQ item
    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Scroll to form on button click
    const scrollToForm = (e: React.MouseEvent) => {
        e.preventDefault();
        smoothScrollToForm();
    };

    return (
        <div className="max-w-[1400px] mx-auto px-4 py-16 md:px-8 lg:px-16">
            <div className="text-center mb-25">
                <h2 className="text-[2.5rem] font-bold text-gray-800 dark:text-[#666cff] mb-2">{t('contact.title')}</h2>
                <p className="text-[1.1rem] text-gray-600 dark:text-[#9698af] max-w-2xl mx-auto">
                    {t('contact.subtitle')}
                </p>
            </div>

            {/* First Row with Cards */}
            <div className="mb-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-3/4 space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{t('contact.whyWorkWithMe')}</h3>

                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Fast Delivery Card */}
                            <div className="md:flex-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md overflow-hidden" style={{ height: '280px' }}>
                                <div className="bg-[#FF6B35]/10 dark:bg-[#666cff]/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                                    <i className="ri-timer-line text-[#FF6B35] dark:text-[#666cff] text-2xl"></i>
                                </div>
                                <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">{t('contact.cards.fastDelivery.title')}</h4>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    {t('contact.cards.fastDelivery.description')}
                                </p>
                            </div>

                            {/* Responsive Design Card */}
                            <div className="md:flex-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md overflow-hidden" style={{ height: '280px' }}>
                                <div className="bg-[#FF6B35]/10 dark:bg-[#666cff]/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                                    <i className="ri-smartphone-line text-[#FF6B35] dark:text-[#666cff] text-2xl"></i>
                                </div>
                                <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">{t('contact.cards.responsiveDesign.title')}</h4>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    {t('contact.cards.responsiveDesign.description')}
                                </p>
                            </div>

                            {/* Dedicated Support Card */}
                            <div className="md:flex-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md overflow-hidden" style={{ height: '280px' }}>
                                <div className="bg-[#FF6B35]/10 dark:bg-[#666cff]/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                                    <i className="ri-customer-service-2-line text-[#FF6B35] dark:text-[#666cff] text-2xl"></i>
                                </div>
                                <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">{t('contact.cards.dedicatedSupport.title')}</h4>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    {t('contact.cards.dedicatedSupport.description')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Availability Card */}
                    <div className="lg:w-1/4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md overflow-hidden">
                        <div className="h-full pb-10">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{t('contact.availability.title')}</h3>

                            <div className="flex items-center space-x-3 mb-4">
                                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                <span className="text-gray-800 dark:text-white font-medium">{t('contact.availability.status')}</span>
                            </div>

                            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm">
                                <p>{t('contact.availability.startDate')} <span className="font-semibold text-gray-800 dark:text-white">June 2023</span>.</p>
                                <p>{t('contact.availability.responseTime')} <span className="font-semibold text-gray-800 dark:text-white">24 {t('contact.availability.hours')}</span></p>

                                <div className="pt-2">
                                    <h4 className="text-gray-800 dark:text-white font-medium mb-3">{t('contact.availability.preferredProjects')}:</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-center">
                                            <i className="ri-check-line text-[#FF6B35] dark:text-[#666cff] mr-2"></i>
                                            <span>{t('contact.availability.projects.webApps')}</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="ri-check-line text-[#FF6B35] dark:text-[#666cff] mr-2"></i>
                                            <span>{t('contact.availability.projects.ecommerce')}</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="ri-check-line text-[#FF6B35] dark:text-[#666cff] mr-2"></i>
                                            <span>{t('contact.availability.projects.frontend')}</span>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="ri-check-line text-[#FF6B35] dark:text-[#666cff] mr-2"></i>
                                            <span>{t('contact.availability.projects.react')}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Row - Contact Form (Full Width) */}
            <div ref={messageFormRef} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-16">
                <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">{t('contact.form.title')}</h3>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium">
                                    {t('contact.form.nameLabel')} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder={t('contact.form.namePlaceholder')}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-[#666cff]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium">
                                    {t('contact.form.emailLabel')} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder={t('contact.form.emailPlaceholder')}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-[#666cff]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 font-medium">{t('contact.form.subjectLabel')}</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                placeholder={t('contact.form.subjectPlaceholder')}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-[#666cff]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-medium">
                                {t('contact.form.messageLabel')} <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder={t('contact.form.messagePlaceholder')}
                                rows={6}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-[#666cff]"
                            ></textarea>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="bg-[#FF6B35] hover:bg-[#e55a29] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 dark:bg-[#666cff] dark:hover:bg-[#5a5fe6]"
                            >
                                <i className="ri-send-plane-fill"></i>
                                <span>{t('contact.form.sendButton')}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-16">
                <div className="p-8">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-8 text-center">{t('contact.faq.title')}</h3>

                    <div className="max-w-3xl mx-auto divide-y divide-gray-200 dark:divide-gray-700">
                        {/* Question 1 */}
                        <div className="py-6 cursor-pointer">
                            <div
                                className="flex justify-between items-center"
                                onClick={() => toggleFaq(0)}
                            >
                                <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                                    {t('contact.faq.question1')}
                                </h4>
                                <span className="ml-6 flex-shrink-0">
                                    <i className={`ri-${openFaq === 0 ? 'subtract' : 'add'}-line text-[#FF6B35] dark:text-[#666cff]`}></i>
                                </span>
                            </div>
                            <div className={`mt-3 overflow-hidden transition-all duration-300 ${openFaq === 0 ? 'max-h-96' : 'max-h-0'}`}>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {t('contact.faq.answer1')}
                                </p>
                            </div>
                        </div>

                        {/* Question 2 */}
                        <div className="py-6 cursor-pointer">
                            <div
                                className="flex justify-between items-center"
                                onClick={() => toggleFaq(1)}
                            >
                                <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                                    {t('contact.faq.question2')}
                                </h4>
                                <span className="ml-6 flex-shrink-0">
                                    <i className={`ri-${openFaq === 1 ? 'subtract' : 'add'}-line text-[#FF6B35] dark:text-[#666cff]`}></i>
                                </span>
                            </div>
                            <div className={`mt-3 overflow-hidden transition-all duration-300 ${openFaq === 1 ? 'max-h-96' : 'max-h-0'}`}>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {t('contact.faq.answer2')}
                                </p>
                            </div>
                        </div>

                        {/* Question 3 */}
                        <div className="py-6 cursor-pointer">
                            <div
                                className="flex justify-between items-center"
                                onClick={() => toggleFaq(2)}
                            >
                                <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                                    {t('contact.faq.question3')}
                                </h4>
                                <span className="ml-6 flex-shrink-0">
                                    <i className={`ri-${openFaq === 2 ? 'subtract' : 'add'}-line text-[#FF6B35] dark:text-[#666cff]`}></i>
                                </span>
                            </div>
                            <div className={`mt-3 overflow-hidden transition-all duration-300 ${openFaq === 2 ? 'max-h-96' : 'max-h-0'}`}>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {t('contact.faq.answer3')}
                                </p>
                            </div>
                        </div>

                        {/* Question 4 */}
                        <div className="py-6 cursor-pointer">
                            <div
                                className="flex justify-between items-center"
                                onClick={() => toggleFaq(3)}
                            >
                                <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                                    {t('contact.faq.question4')}
                                </h4>
                                <span className="ml-6 flex-shrink-0">
                                    <i className={`ri-${openFaq === 3 ? 'subtract' : 'add'}-line text-[#FF6B35] dark:text-[#666cff]`}></i>
                                </span>
                            </div>
                            <div className={`mt-3 overflow-hidden transition-all duration-300 ${openFaq === 3 ? 'max-h-96' : 'max-h-0'}`}>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {t('contact.faq.answer4')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8F62] dark:from-[#666cff] dark:to-[#8b8eff] rounded-xl shadow-lg overflow-hidden">
                <div className="px-6 py-12 text-center text-white">
                    <h3 className="text-2xl font-bold mb-3">{t('contact.cta.title')}</h3>
                    <p className="text-lg mb-6">{t('contact.cta.subtitle')}</p>
                    <button
                        onClick={scrollToForm}
                        className="bg-white text-[#FF6B35] dark:bg-gray-900 dark:text-[#666cff] px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg flex items-center space-x-2 mx-auto cursor-pointer"
                    >
                        <i className="ri-calendar-line"></i>
                        <span>{t('contact.cta.button')}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}