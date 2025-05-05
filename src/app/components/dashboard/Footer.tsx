// REVIEWED: 2025-05-05 - Good to go ✅
"use client";
import Link from 'next/link';
import { useTheme } from '@/app/context/ThemeContext';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { t } = useTheme();

    return (
        <div className="w-full py-4 mt-4 px-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-[#d7d8ed] text-[0.9375rem] font-bold">
                <p className="mb-3 md:mb-0">
                    © {currentYear}, {t('dashboardFooter.madeWith')} <span className="text-red-500">❤</span> {t('dashboardFooter.by')}{" "}
                    <Link href="#" className="text-[#646cfa] hover:text-[#8388ff] transition-colors">
                        Micael Ribeiro
                    </Link>
                </p>

                <div className="flex gap-4 md:gap-6">
                    <Link href="#" className="text-[#646cfa] hover:text-[#8388ff] transition-colors">
                        {t('dashboardFooter.license')}
                    </Link>
                    <Link href="#" className="text-[#646cfa] hover:text-[#8388ff] transition-colors">
                        {t('dashboardFooter.themes')}
                    </Link>
                    <Link href="#" className="text-[#646cfa] hover:text-[#8388ff] transition-colors">
                        {t('dashboardFooter.documentation')}
                    </Link>
                    <Link href="#" className="text-[#646cfa] hover:text-[#8388ff] transition-colors">
                        {t('dashboardFooter.support')}
                    </Link>
                </div>
            </div>
        </div>
    );
}