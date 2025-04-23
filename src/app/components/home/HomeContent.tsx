"use client";
import { useTheme } from '@/app/context/ThemeContext';

export default function MainContent() {
    const { t } = useTheme();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">{t('home.welcomeTitle')}</h1>
            <p className="text-lg">{t('home.welcomeText')}</p>
        </div>
    );
}