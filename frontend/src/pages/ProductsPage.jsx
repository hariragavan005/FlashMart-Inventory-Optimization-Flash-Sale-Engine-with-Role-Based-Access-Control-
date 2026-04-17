import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, Grid, List, Zap, ArrowRight, LayoutGrid } from 'lucide-react';
import { products, categories } from '../utils/mockData';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';
  const [sortBy, setSortBy] = useState('newest');
  const [displayCount, setDisplayCount] = useState(9);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Reset display count when category changes
  useEffect(() => {
    setDisplayCount(9);
  }, [currentCategory]);

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (currentCategory !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase());
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [currentCategory, sortBy]);

  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMore = filteredProducts.length > displayCount && displayCount === 9;

  const handleCategoryClick = (id) => {
    setSearchParams(id === 'all' ? {} : { category: id });
  };

  const handleLoadMore = () => {
    // Add exactly 3 more as requested (total 12 if 9+3)
    setDisplayCount(prev => prev + 3);
  };

  return (
    <div className="min-h-screen bg-premium-cream dark:bg-background transition-colors duration-300 pt-24 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-premium-gold/10 pb-10">
          <div>
            <h1 className="text-5xl font-display font-black text-premium-dark dark:text-white mb-4 capitalize">
              {currentCategory === 'all' ? 'Our Collection' : currentCategory}
            </h1>
            <div className="flex items-center gap-4 text-sm font-bold tracking-widest text-premium-gold uppercase font-mono">
              <Link to="/" className="hover:text-premium-dark dark:hover:text-white transition-colors">Home</Link>
              <ArrowRight size={14} />
              <span>Shop All</span>
            </div>
          </div>

          {/* Sorting & Stats */}
          <div className="flex items-center gap-4">
            <div className="bg-white dark:bg-surface border border-premium-gold/20 rounded-2xl px-5 py-3 flex items-center gap-4 shadow-sm">
               <span className="text-xs font-black text-premium-dark/40 dark:text-white/40 uppercase tracking-widest whitespace-nowrap">Sort By:</span>
               <div className="relative group">
                 <select 
                   value={sortBy}
                   onChange={(e) => setSortBy(e.target.value)}
                   className="bg-transparent text-sm font-bold text-premium-dark dark:text-white focus:outline-none cursor-pointer appearance-none pr-6"
                 >
                   <option value="newest" className="bg-white dark:bg-surface text-premium-dark dark:text-white">Newest First</option>
                   <option value="price-low" className="bg-white dark:bg-surface text-premium-dark dark:text-white">Price: Low to High</option>
                   <option value="price-high" className="bg-white dark:bg-surface text-premium-dark dark:text-white">Price: High to Low</option>
                   <option value="rating" className="bg-white dark:bg-surface text-premium-dark dark:text-white">Top Rated</option>
                 </select>
                 <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-premium-gold" />
               </div>
            </div>
            <div className="hidden sm:flex bg-white dark:bg-surface border border-premium-gold/20 rounded-2xl p-1.5 shadow-sm">
              <button className="p-2 bg-premium-dark text-white rounded-xl shadow-lg"><LayoutGrid size={20} /></button>
              <button className="p-2 text-premium-dark/40 dark:text-white/40"><List size={20} /></button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar: Sticky Categories */}
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-28 space-y-8">
              <div className="bg-white dark:bg-surface rounded-3xl p-6 border border-premium-gold/10 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-premium-gold/10 p-2.5 rounded-xl text-premium-gold">
                    <Filter size={20} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-premium-dark dark:text-white">Categories</h3>
                </div>

                <div className="space-y-2">
                  <button 
                    onClick={() => handleCategoryClick('all')}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all group ${
                      currentCategory === 'all' 
                        ? 'bg-premium-dark dark:bg-premium-gold text-white dark:text-premium-dark shadow-xl scale-[1.02]' 
                        : 'hover:bg-premium-gold/5 dark:hover:bg-premium-gold/10 text-premium-dark/60 dark:text-white/60 hover:text-premium-gold'
                    }`}
                  >
                    <span className="font-bold text-sm tracking-wide">All Collection</span>
                    <span className="text-[10px] font-mono opacity-50">{products.length}</span>
                  </button>

                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button 
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all group ${
                          currentCategory.toLowerCase() === cat.id.toLowerCase()
                            ? 'bg-premium-dark dark:bg-premium-gold text-white dark:text-premium-dark shadow-xl scale-[1.02]' 
                            : 'hover:bg-premium-gold/5 dark:hover:bg-premium-gold/10 text-premium-dark/60 dark:text-white/60 hover:text-premium-gold'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <Icon size={18} className="group-hover:rotate-12 transition-transform" />
                          <span className="font-bold text-sm tracking-wide">{cat.name}</span>
                        </div>
                        <span className="text-[10px] font-mono opacity-50">
                          {products.filter(p => p.category === cat.id).length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Flash Deals Spotlight Sidebar Card */}
              <div className="bg-gradient-to-br from-[#111111] to-[#222222] rounded-3xl p-6 border border-[#FF4D1C]/20 shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-8 -bottom-8 bg-[#FF4D1C]/10 w-32 h-32 rounded-full blur-3xl" />
                <Zap size={40} className="text-[#FF4D1C] mb-4 group-hover:scale-110 transition-transform duration-500 animate-pulse" />
                <h4 className="text-white font-display font-bold text-lg mb-2">Flash Deals Live</h4>
                <p className="text-zinc-500 text-xs mb-4">Limited time offers reaching up to 60% discount.</p>
                <Link to="/flash-sale" className="text-[#FF4D1C] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                  Shop Deals <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </aside>

          {/* Right Main Segment: Product Grid */}
          <main className="flex-1">
            {displayedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  <AnimatePresence mode="popLayout">
                    {displayedProducts.map((product, idx) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                         <ProductCard product={product} isFlashSale={product.isFlashSale} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Load More Button - Limited to 3 more as requested */}
                {hasMore && (
                  <div className="mt-20 flex justify-center">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLoadMore}
                      className="group relative flex items-center gap-4 bg-white dark:bg-surface px-10 py-5 rounded-2xl border border-premium-gold/20 shadow-xl overflow-hidden cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-premium-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="font-display font-black text-premium-dark dark:text-white tracking-widest text-sm relative z-10 uppercase">
                        Load More Products
                      </span>
                      <div className="p-2 bg-premium-gold/10 text-premium-gold rounded-xl relative z-10 group-hover:rotate-90 transition-transform duration-500">
                        <ChevronDown size={18} />
                      </div>
                    </motion.button>
                  </div>
                )}
                
                {/* Stats Footer */}
                <div className="mt-12 text-center">
                  <p className="text-premium-dark/40 dark:text-white/40 font-mono text-xs font-bold uppercase tracking-widest">
                    Showing {displayedProducts.length} of {filteredProducts.length} products
                  </p>
                </div>
              </>
            ) : (
              <div className="h-[50vh] flex flex-col items-center justify-center text-center">
                <div className="bg-premium-gold/5 p-8 rounded-full mb-6">
                  <LayoutGrid size={64} className="text-premium-gold opacity-20" />
                </div>
                <h3 className="text-2xl font-display font-bold text-premium-dark dark:text-white mb-2">No Products Found</h3>
                <p className="text-premium-dark/40 dark:text-white/40 mb-8 max-w-xs">We couldn't find any products in the "{currentCategory}" category.</p>
                <button 
                  onClick={() => handleCategoryClick('all')}
                  className="premium-button"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
