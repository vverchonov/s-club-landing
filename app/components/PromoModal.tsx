'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '../../lib/context/TranslationContext';

const PROMO_MODAL_KEY = 'promoModalLastShown';
const TWELVE_HOURS = 1 * 60 * 60 * 1000; // 1 hours in milliseconds
const SHOW_DELAY = 10 * 1000; // 30 seconds in milliseconds

export default function PromoModal() {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (!hasMounted) return;

        const checkAndShowModal = () => {
            try {
                const lastShown = localStorage.getItem(PROMO_MODAL_KEY);
                const now = Date.now();

                // If never shown before or 12 hours have passed
                if (!lastShown || (now - parseInt(lastShown)) >= TWELVE_HOURS) {
                    // Show modal after 30 seconds
                    const timer = setTimeout(() => {
                        setIsVisible(true);
                        // Update localStorage when modal is shown
                        localStorage.setItem(PROMO_MODAL_KEY, now.toString());
                    }, SHOW_DELAY);

                    return () => clearTimeout(timer);
                }
            } catch (error) {
                console.error('Error checking promo modal localStorage:', error);
            }
        };

        checkAndShowModal();
    }, [hasMounted]);

    const closeModal = () => {
        setIsVisible(false);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    // Don't render anything until component has mounted (prevents hydration mismatch)
    if (!hasMounted || !isVisible) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={handleBackdropClick}
        >
            {/* Red glow effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]" />
            </div>

            <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl max-w-md w-full mx-auto animate-scale-in">
                {/* Close button */}
                <button
                    onClick={closeModal}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 z-10 shadow-lg"
                    aria-label="Close modal"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Modal content */}
                <div className="p-0 overflow-hidden rounded-lg">
                    {/* Promo image */}
                    <div className="relative w-full h-auto">
                        <Image
                            src="/promo.jpg"
                            alt="BDSM Party Promotion"
                            width={400}
                            height={600}
                            className="w-full h-auto object-cover rounded-t-lg"
                            priority
                        />
                    </div>

                    {/* Book button */}
                    <div className="p-6 text-center">
                        <Link
                            href="/book"
                            onClick={closeModal}
                            className="inline-block w-full px-8 py-4 bg-[#8B0000] hover:bg-[#660000] text-white rounded-full text-lg font-medium tracking-wider shadow-lg transition-colors duration-300 transform hover:scale-105"
                        >
                            {t?.booking?.form?.book || 'Book Table'}
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes scale-in {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }

                .animate-scale-in {
                    animation: scale-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
