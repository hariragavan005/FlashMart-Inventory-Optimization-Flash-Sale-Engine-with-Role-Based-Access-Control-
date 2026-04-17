import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Smartphone, ShoppingBag, Watch } from 'lucide-react';

const categories = [
  {
    id: 'mobile',
    name: 'Next-Gen Mobiles',
    tagline: 'Experience the future of connectivity.',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=600&auto=format&fit=crop',
    color: '#10B981', // Emerald
    bgColor: 'bg-emerald-500/10',
    icon: Smartphone,
  },
  {
    id: 'shoes',
    name: 'Premium Footwear',
    tagline: 'Step into comfort and style.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
    color: '#F5A623', // Amber
    bgColor: 'bg-amber-500/10',
    icon: ShoppingBag,
  },
  {
    id: 'watches',
    name: 'Luxury Timepieces',
    tagline: 'Timeless elegance for every occasion.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',
    color: '#8B5CF6', // Violet
    bgColor: 'bg-violet-500/10',
    icon: Watch,
  },
];

const AuthSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const activeCategory = categories[currentIndex];

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden p-8 lg:p-12">
      {/* Dynamic Background Glow */}
      <motion.div
        animate={{
          backgroundColor: `${activeCategory.color}15`,
        }}
        className="absolute inset-0 transition-colors duration-1000"
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full blur-xl"
            style={{
              width: `${20 + i * 10}px`,
              height: `${20 + i * 10}px`,
              backgroundColor: activeCategory.color,
              top: `${15 + i * 12}%`,
              left: `${10 + i * 15}%`,
              opacity: 0.1,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            {/* Card UI */}
            <div className="group relative mb-6">
              <div 
                className="blob-1 blob-animation absolute inset-0 -z-10 bg-white/50 backdrop-blur-sm transition-all duration-500 group-hover:scale-105"
                style={{ backgroundColor: `${activeCategory.color}20` }}
              />
              <div className="relative overflow-hidden shadow-2xl blob-2 w-48 h-64 sm:w-56 sm:h-72">
                <img
                  src={activeCategory.image}
                  alt={activeCategory.name}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              
              {/* Floating Badge */}
              <motion.div
                initial={{ rotate: -10, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                className="absolute -right-3 -top-3 rounded-xl bg-white p-3 shadow-xl dark:bg-zinc-900"
              >
                <activeCategory.icon size={20} style={{ color: activeCategory.color }} />
              </motion.div>
            </div>

            {/* Typography */}
            <h2 className="mb-2 font-display text-2xl font-bold tracking-tight text-white lg:text-3xl">
              {activeCategory.name}
            </h2>
            <p className="max-w-xs text-base text-zinc-300">
              {activeCategory.tagline}
            </p>

            {/* Pagination Dots */}
            <div className="mt-10 flex gap-2">
              {categories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 transition-all duration-300 ${
                    i === currentIndex ? 'w-8 rounded-full' : 'w-2 rounded-full opacity-30'
                  }`}
                  style={{ backgroundColor: i === currentIndex ? activeCategory.color : '#fff' }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Decorative Branding */}
      <div className="absolute bottom-12 left-12 right-12 z-20 flex items-center justify-between opacity-50">
        <div className="flex items-center gap-2">
          <Zap size={16} fill="currentColor" />
          <span className="text-sm font-bold tracking-widest uppercase">FlashMart</span>
        </div>
        <div className="flex gap-4">
          <ShoppingBag size={18} />
          <Sparkles size={18} />
        </div>
      </div>
    </div>
  );
};

export default AuthSlider;
