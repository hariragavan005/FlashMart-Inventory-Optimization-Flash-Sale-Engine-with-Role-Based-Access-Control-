import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowLeft, ZapOff, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
    const { wishlistItems, clearWishlist } = useWishlist();

    return (
        <div className="min-h-screen bg-[#FDFCF9] dark:bg-[#0E0E0E] pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        <div className="bg-[#FF4D1C]/10 p-3 rounded-2xl text-[#FF4D1C]">
                            <Heart size={28} fill="currentColor" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-display font-bold text-[#111111] dark:text-white">Your Wishlist</h1>
                            <p className="text-sm text-zinc-500 font-medium">Saved items you love</p>
                        </div>
                    </div>
                    
                    {wishlistItems.length > 0 && (
                        <button 
                            onClick={clearWishlist}
                            className="bg-[#F4F1EC] dark:bg-[#1A1A1A] text-zinc-600 dark:text-zinc-400 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-red-50 hover:text-[#DC2626] transition-all cursor-pointer border border-[#E8E4DC] dark:border-[#2A2A2A]"
                        >
                            Clear All Saved Items
                        </button>
                    )}
                </div>

                {wishlistItems.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-[#171717] rounded-3xl border-2 border-dashed border-[#E8E4DC] dark:border-[#2A2A2A]"
                    >
                        <div className="w-24 h-24 bg-[#F4F1EC] dark:bg-[#1A1A1A] rounded-full flex items-center justify-center mb-6 text-[#FF4D1C]/30">
                            <ZapOff size={40} />
                        </div>
                        <h2 className="text-2xl font-display font-bold text-[#111111] dark:text-white mb-2">No saved items yet</h2>
                        <p className="text-zinc-500 max-w-xs mb-10">Start saving items you love and they will appear here so you can buy them later!</p>
                        <Link to="/">
                            <button className="bg-[#111111] dark:bg-white text-white dark:text-[#111111] px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all cursor-pointer">
                                <Sparkles size={18} className="text-[#F5A623]" />
                                Explore Products
                            </button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <AnimatePresence>
                            {wishlistItems.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <ProductCard product={item} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
