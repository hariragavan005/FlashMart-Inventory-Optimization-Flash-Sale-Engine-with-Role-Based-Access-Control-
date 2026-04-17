import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, ArrowLeft, Star, Flame, Shield, Truck, RotateCcw, Zap } from 'lucide-react';
import { products } from '../utils/mockData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  
  const product = products.find(p => p.id === parseInt(id));
  const [selectedSize, setSelectedSize] = useState('M');
  
  // Flash Sale Timer (Simulated)
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 45, s: 12 });

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else if (m > 0) { m--; s = 59; }
        else if (h > 0) { h--; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-premium-cream dark:bg-background pt-20">
        <h2 className="text-2xl font-display font-bold text-premium-dark dark:text-white mb-4">Product Not Found</h2>
        <Link to="/" className="premium-button">Back to Home</Link>
      </div>
    );
  }

  const formatINR = (amount) => {
    return 'Rs.' + amount.toLocaleString('en-IN');
  };

  return (
    <div className="min-h-screen bg-premium-cream dark:bg-background transition-colors duration-300 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs & Back */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-premium-dark/60 dark:text-white/60 hover:text-premium-gold transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-sm uppercase tracking-widest font-mono">Back to Shop</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          
          {/* Left: Image Container */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-white dark:bg-surface border border-premium-gold/10 shadow-2xl group flex items-center justify-center p-8">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-contain"
              />
              
              {/* Overlay Badges */}
              {product.isFlashSale && (
                <div className="absolute top-6 left-6">
                  <span className="flex items-center gap-2 bg-[#FF4D1C] text-white px-4 py-2 rounded-full font-mono font-bold text-xs tracking-widest shadow-lg animate-pulse">
                    <Flame size={14} fill="currentColor" />
                    FLASH SALE
                  </span>
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery (Simulated) */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              {[1, 2, 3, 4].map(idx => (
                <div key={idx} className="aspect-square rounded-xl bg-white dark:bg-surface border border-premium-gold/10 hover:border-premium-gold transition-colors cursor-pointer overflow-hidden p-2">
                  <img src={product.image} className="w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity" alt="" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Info Container */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            {/* Category & Rating */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-premium-gold font-mono font-bold text-sm tracking-widest uppercase">{product.category}</span>
              <div className="flex items-center gap-2 bg-white dark:bg-surface px-3 py-1.5 rounded-full border border-premium-gold/10 shadow-sm">
                <Star size={16} className="fill-premium-gold text-premium-gold" />
                <span className="font-bold text-sm dark:text-white">{product.rating}</span>
                <span className="text-premium-dark/40 dark:text-white/40 text-xs">({product.reviews} Reviews)</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-black text-premium-dark dark:text-white mb-6 leading-tight">
              {product.name}
            </h1>

            {/* Flash Sale Banner in Sidebar */}
            {product.isFlashSale && (
              <div className="bg-[#111111] dark:bg-surface rounded-2xl p-5 border border-[#FF4D1C]/30 mb-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4D1C]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-[#FF4D1C] font-mono font-bold text-[10px] tracking-widest uppercase mb-1 block">Ends In:</span>
                    <div className="flex items-center gap-2">
                      <div className="bg-[#1A1A1A] text-white px-2 py-1 rounded-lg font-mono font-bold min-w-[35px] text-center border border-white/5">{String(timeLeft.h).padStart(2,'0')}</div>
                      <span className="text-zinc-600">:</span>
                      <div className="bg-[#1A1A1A] text-white px-2 py-1 rounded-lg font-mono font-bold min-w-[35px] text-center border border-white/5">{String(timeLeft.m).padStart(2,'0')}</div>
                      <span className="text-zinc-600">:</span>
                      <div className="bg-[#1A1A1A] text-white px-2 py-1 rounded-lg font-mono font-bold min-w-[35px] text-center border border-white/5">{String(timeLeft.s).padStart(2,'0')}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Stock Left</span>
                    <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF4D1C] w-[20%]" />
                    </div>
                    <span className="text-xs font-bold text-[#FF4D1C] mt-1 italic">Only 9 units left!</span>
                  </div>
                </div>
              </div>
            )}

            {/* Pricing */}
            <div className="flex items-center gap-4 mb-8">
              {product.isFlashSale && product.originalPrice ? (
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-sm font-bold text-premium-dark/40 dark:text-white/40 uppercase tracking-widest">MRP</span>
                  <span className="text-2xl text-red-500/50 line-through font-bold decoration-2">
                    {formatINR(product.originalPrice)}
                  </span>
                  <span className="text-sm font-bold text-premium-dark/40 dark:text-white/40 uppercase tracking-widest">to</span>
                  <span className="text-5xl font-mono font-extrabold text-[#111111] dark:text-[#F5A623] tracking-tighter">
                    {formatINR(product.price)}
                  </span>
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
                    -{product.discount}% OFF
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-mono font-extrabold text-[#111111] dark:text-[#F5A623] tracking-tighter">
                    {formatINR(product.price)}
                  </span>
                  {product.originalPrice && (
                    <div className="flex flex-col">
                      <span className="text-xl text-red-500/50 line-through font-bold decoration-2">
                        {formatINR(product.originalPrice)}
                      </span>
                      <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full w-fit">
                        -{product.discount}% OFF
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="text-premium-dark/70 dark:text-white/70 text-lg leading-relaxed mb-10 font-medium">
              {product.description}
            </p>

            {/* Options */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div>
                <span className="block text-xs font-black uppercase tracking-widest text-premium-dark/40 dark:text-white/40 mb-3">Select Size</span>
                <div className="flex gap-2">
                  {['S', 'M', 'L', 'XL'].map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-xl border-2 font-mono font-bold transition-all ${
                        selectedSize === size 
                          ? 'border-premium-gold bg-premium-gold text-white shadow-lg' 
                          : 'border-premium-gold/10 dark:border-white/10 dark:text-white hover:border-premium-gold/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                   if (!user) navigate('/login');
                   else addToCart(product);
                }}
                className="flex-[2] bg-premium-dark dark:bg-premium-gold text-white dark:text-premium-dark px-8 py-5 rounded-2xl font-display font-black text-lg flex items-center justify-center gap-3 shadow-2xl hover:bg-premium-gold transition-colors cursor-pointer group"
              >
                <ShoppingCart size={22} className="group-hover:rotate-12 transition-transform" />
                ADD TO CART
              </motion.button>
              
              <button
                onClick={() => {
                  if (!user) navigate('/login');
                  else toggleWishlist(product);
                }}
                className={`flex-1 p-5 rounded-2xl border-2 border-premium-gold/20 flex items-center justify-center transition-all ${
                  isInWishlist(product.id) 
                    ? 'bg-red-50 dark:bg-red-500/10 border-red-500 text-red-500 shadow-inner' 
                    : 'bg-white dark:bg-surface text-premium-dark dark:text-white hover:border-premium-gold'
                }`}
              >
                <Heart size={24} className={isInWishlist(product.id) ? 'fill-current' : ''} />
              </button>
            </div>

            {/* Service Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-premium-gold/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-premium-gold/10 text-premium-gold"><Truck size={18} /></div>
                <span className="text-xs font-bold dark:text-white">Free Express Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-premium-gold/10 text-premium-gold"><Shield size={18} /></div>
                <span className="text-xs font-bold dark:text-white">Official Warranty</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-premium-gold/10 text-premium-gold"><RotateCcw size={18} /></div>
                <span className="text-xs font-bold dark:text-white">Flexible Returns</span>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
