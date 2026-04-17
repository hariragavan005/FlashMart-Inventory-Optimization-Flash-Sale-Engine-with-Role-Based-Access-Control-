import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import { products } from '../utils/mockData';
import ProductCard from '../components/ProductCard';

const FlashSale = () => {
    // Use centralized flash sale products
    const flashProducts = products.filter(p => p.isFlashSale);

    const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 23, seconds: 59 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;
                if (seconds > 0) seconds--;
                else if (minutes > 0) { minutes--; seconds = 59; }
                else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
                return { hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#FDFCF9] dark:bg-[#0E0E0E] pt-24 pb-20">
            {/* Hero Header */}
            <section className="relative overflow-hidden bg-[#111111] dark:bg-[#1A1A1A] py-16 mb-12">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/40 via-transparent to-transparent"></div>
                
                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-[#F5A623] text-[#111111] px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase mb-6"
                    >
                        <Zap size={14} fill="currentColor" />
                        Flash Deals is Live!
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-display font-black text-white mb-8 tracking-tight"
                    >
                        Biggest Discounts of the <span className="text-[#F5A623]">Season</span>
                    </motion.h1>

                    {/* Giant Countdown */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center items-center gap-4 md:gap-8"
                    >
                        {[
                            { label: 'HOURS', value: timeLeft.hours },
                            { label: 'MINUTES', value: timeLeft.minutes },
                            { label: 'SECONDS', value: timeLeft.seconds }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <div className="bg-[#1A1A1A] border-2 border-[#F5A623]/30 rounded-2xl w-24 h-24 md:w-32 md:h-32 flex items-center justify-center text-4xl md:text-6xl font-mono font-black text-[#F5A623] shadow-[0_0_30px_rgba(245,166,35,0.15)] mb-3">
                                    {String(item.value).padStart(2, '0')}
                                </div>
                                <span className="text-[10px] md:text-xs font-mono font-bold text-zinc-500 tracking-widest uppercase">{item.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Product Grid */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="text-[#F5A623]" size={24} />
                        <h2 className="text-2xl font-display font-bold text-[#111111] dark:text-white">Active Lightning Deals</h2>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-zinc-500">
                        <ShieldCheck size={18} className="text-green-500" />
                        100% Authentic Products
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {flashProducts.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <ProductCard product={product} isFlashSale={true} />
                        </motion.div>
                    ))}
                </div>

                {/* Info Bar */}
                <div className="mt-20 py-10 border-t border-[#E8E4DC] dark:border-[#2A2A2A] flex flex-wrap justify-between gap-8 text-center sm:text-left">
                    <div className="flex-1 min-w-[200px]">
                        <h4 className="font-display font-bold text-[#111111] dark:text-white mb-2 uppercase tracking-wide">Limited Inventory</h4>
                        <p className="text-sm text-zinc-500 leading-relaxed">Flash Sale items are available in strictly limited quantities. Once they're gone, the price goes back to normal.</p>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <h4 className="font-display font-bold text-[#111111] dark:text-white mb-2 uppercase tracking-wide">Reserved for Cart</h4>
                        <p className="text-sm text-zinc-500 leading-relaxed">Adding an item to your cart does not reserve it. You must complete checkout to secure the flash sale price.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FlashSale;
