import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ArrowLeft, ArrowRight, Zap, Gift, Truck, Shield, Headphones } from 'lucide-react';
import { FaTshirt, FaUserTie, FaUserSecret, FaBriefcase, FaShoePrints, FaClock, FaHatCowboy } from 'react-icons/fa';

import { categories, products } from '../utils/mockData';

const Home = () => {
  // Flash Sale Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 17,
    seconds: 56
  });

  // Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slider Configurations (Placeholder images, user will swap)
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&auto=format',
      title: 'Living in style',
      subtitle: 'Made with real wood',
      badge: 'UPTO 60% OFF'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&auto=format',
      title: 'Elite Fashion Season',
      subtitle: 'New Arrivals',
      badge: 'NEW RANGE'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&auto=format',
      title: 'Tech Revolution',
      subtitle: 'Premium Gadgets',
      badge: 'FLASH SALE'
    }
  ];

  // Auto-advance slider
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // changes every 5 seconds
    return () => clearInterval(slideTimer);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashProductsView = products.filter(p => p.isFlashSale).slice(0, 4);
  const forYouProductsView = products.filter(p => !p.isFlashSale).slice(0, 4);

  const services = [
    { icon: <Truck size={28} />, title: 'Free Shipping', desc: 'On orders over $50' },
    { icon: <Shield size={28} />, title: 'Secure Payment', desc: '100% secure' },
    { icon: <Headphones size={28} />, title: '24/7 Support', desc: 'Dedicated help' },
    { icon: <Gift size={28} />, title: 'Special Gifts', desc: 'On first purchase' },
  ];

  return (
    <div className="min-h-screen bg-premium-cream dark:bg-background transition-colors duration-300">
      {/* Hero Carousel Section */}
      <section className="relative overflow-hidden pt-24 bg-premium-dark dark:bg-surface h-[80vh] min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image (User swaps via slides array) */}
            <div className="absolute inset-0">
              <img 
                src={slides[currentSlide].image} 
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover opacity-50 dark:opacity-40"
              />
              {/* Grandient Overlay to ensure text pops */}
              <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Slider Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="max-w-2xl"
                >
                  {/* Badge — stagger slot 1 */}
                  <div
                    key={`badge-${currentSlide}`}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F5A623] to-[#FF4D1C] text-white px-5 py-2 rounded-full font-mono font-bold text-[11px] tracking-widest uppercase shadow-lg mb-6
                      animate-[fadeInUp_0.6s_ease] opacity-0 [animation-fill-mode:forwards]"
                  >
                    {slides[currentSlide].badge}
                  </div>

                  {/* Subtitle — stagger slot 2 */}
                  <h2
                    key={`sub-${currentSlide}`}
                    className="text-xl md:text-3xl font-display font-bold text-[#F5A623] mb-2 uppercase tracking-widest drop-shadow-md
                      animate-[fadeInUp_0.6s_ease_0.12s] opacity-0 [animation-fill-mode:forwards]"
                  >
                    {slides[currentSlide].subtitle}
                  </h2>

                  {/* Hero h1 — stagger slot 3 */}
                  <h1
                    key={`title-${currentSlide}`}
                    className="text-6xl md:text-8xl font-display font-extrabold text-white leading-[1.1] mb-8 drop-shadow-xl
                      animate-[fadeInUp_0.6s_ease_0.24s] opacity-0 [animation-fill-mode:forwards]"
                  >
                    {slides[currentSlide].title}
                  </h1>

                  {/* CTA — stagger slot 4 */}
                  <button
                    key={`cta-${currentSlide}`}
                    className="premium-button text-lg px-8 py-4 uppercase tracking-wider
                      animate-[fadeInUp_0.6s_ease_0.36s] opacity-0 [animation-fill-mode:forwards]"
                  >
                    Explore Now
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide 
                  ? 'bg-premium-gold w-10 shadow-[0_0_10px_#F5B041]' 
                  : 'bg-white/40 w-2.5 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Categories Row */}
      <section className="py-12 bg-premium-cream dark:bg-background border-b border-premium-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-wrap justify-center sm:justify-between items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link key={idx} to={`/products?category=${cat.id}`}>
                  <motion.div 
                    className="flex flex-col items-center gap-3 cursor-pointer group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-[72px] h-[72px] rounded-full bg-white dark:bg-surface shadow-[0_5px_15px_rgba(0,0,0,0.05)] dark:shadow-none flex items-center justify-center text-3xl group-hover:bg-premium-gold/10 transition-all duration-300 border border-premium-gold/20 text-premium-dark dark:text-premium-gold">
                      <Icon />
                    </div>
                    <span className="text-xs font-bold text-premium-dark dark:text-white group-hover:text-premium-gold transition-colors">{cat.name}</span>
                  </motion.div>
                </Link>
              );
            })}
            <Link to="/products">
              <div className="flex flex-col items-center gap-3 cursor-pointer group">
                <div className="w-[72px] h-[72px] rounded-full bg-white dark:bg-surface border-2 border-premium-gold/20 flex items-center justify-center group-hover:border-premium-gold transition-colors shadow-md">
                  <div className="grid grid-cols-2 gap-1 opacity-60">
                    <div className="w-2 h-2 bg-premium-dark dark:bg-premium-gold rounded-sm"></div>
                    <div className="w-2 h-2 bg-premium-dark dark:bg-premium-gold rounded-sm"></div>
                    <div className="w-2 h-2 bg-premium-dark dark:bg-premium-gold rounded-sm"></div>
                    <div className="w-2 h-2 bg-premium-dark dark:bg-premium-gold rounded-sm"></div>
                  </div>
                </div>
                <span className="text-xs font-bold text-premium-dark dark:text-white transition-colors">All Category</span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Background Wrapper for content below */}
      <div className="bg-premium-cream/50 dark:bg-background/50 py-16 transition-colors duration-300">
        
        {/* Flash Sale Banner — High Impact Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="relative rounded-3xl overflow-hidden bg-[#111111] dark:bg-[#1A1A1A] p-8 md:p-12 border-2 border-[#F5A623]/20 shadow-2xl">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#F5A623]/10 to-transparent pointer-events-none" />
            <motion.div 
               animate={{ opacity: [0.3, 0.6, 0.3] }}
               transition={{ duration: 3, repeat: Infinity }}
               className="absolute -top-24 -right-24 w-64 h-64 bg-[#F5A623]/20 rounded-full blur-[100px]" 
            />

            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 bg-[#FF4D1C] text-white px-4 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-6 shadow-lg shadow-red-500/20">
                <Zap size={12} fill="currentColor" />
                Limited Time Lightning Deals
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 leading-tight">
                Flash Sale <span className="text-[#F5A623]">Is Live</span>
              </h2>
              <p className="max-w-xl text-zinc-400 text-lg mb-10 font-medium">
                Unbeatable discounts on your favorite tech and fashion items. Grab them before the clock runs out!
              </p>
              
              <Link to="/flash-sale">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(245, 166, 35, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#F5A623] text-[#111111] px-10 py-4 rounded-2xl font-display font-bold text-lg flex items-center gap-3 transition-all cursor-pointer"
                >
                  Shop Now <ArrowRight size={20} />
                </motion.button>
              </Link>
            </div>
          </div>
        </section>

        {/* Flash Sale Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-premium-dark dark:bg-surface rounded-full p-2 text-premium-gold shadow-lg border border-premium-gold/10">
                <Zap size={20} fill="currentColor" />
              </div>
              <h2 className="text-3xl font-display font-bold text-premium-dark dark:text-white mr-4">Flash Sale</h2>
              
              {/* Timer Pills */}
              <div className="flex items-center gap-2">
                {/* flip-in keyed to current value so animation fires on every tick */}
                <div
                  key={`h-${timeLeft.hours}`}
                  className="bg-[#111111] dark:bg-[#1A1A1A] text-[#F5A623] px-3 py-1.5 rounded-xl text-lg font-mono font-bold min-w-[44px] text-center shadow-inner border border-white/5
                    animate-[flipIn_0.3s_ease] tabular-nums"
                >
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <span className="text-xl font-mono font-black text-[#111111] dark:text-white/50">:</span>
                <div
                  key={`m-${timeLeft.minutes}`}
                  className="bg-[#111111] dark:bg-[#1A1A1A] text-[#F5A623] px-3 py-1.5 rounded-xl text-lg font-mono font-bold min-w-[44px] text-center shadow-inner border border-white/5
                    animate-[flipIn_0.3s_ease] tabular-nums"
                >
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <span className="text-xl font-mono font-black text-[#111111] dark:text-white/50">:</span>
                <div
                  key={`s-${timeLeft.seconds}`}
                  className="bg-[#111111] dark:bg-[#1A1A1A] text-[#F5A623] px-3 py-1.5 rounded-xl text-lg font-mono font-bold min-w-[44px] text-center shadow-inner border border-white/5
                    animate-[flipIn_0.3s_ease] tabular-nums"
                >
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
              </div>
            </div>

            <div className="hidden sm:flex gap-2">
              <button className="p-3 rounded-xl bg-white dark:bg-surface border border-premium-gold/20 text-premium-dark dark:text-white hover:bg-premium-gold hover:text-white dark:hover:bg-premium-gold transition-all duration-300 shadow-sm cursor-pointer">
                <ArrowLeft size={20} />
              </button>
              <button className="p-3 rounded-xl bg-premium-dark text-white hover:bg-premium-gold hover:text-white transition-all duration-300 shadow-sm cursor-pointer">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashProductsView.map(product => (
              <ProductCard key={product.id} product={product} isFlashSale={true} />
            ))}
          </div>

          {/* View All Deals Button */}
          <div className="mt-12 flex justify-center">
            <Link to="/flash-sale">
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                className="flex items-center gap-2 text-[#F5A623] font-display font-black text-lg group cursor-pointer"
              >
                <span>View All Flash Deals Today</span>
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </Link>
          </div>
        </section>

        {/* Today's For You Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-surface/50 rounded-3xl shadow-xl dark:shadow-none p-8 mb-16 border border-premium-gold/10">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
            <h2 className="text-2xl font-display font-bold text-premium-dark dark:text-white whitespace-nowrap">Today's For You!</h2>
            
            <div className="flex flex-wrap gap-2">
              <button className="px-5 py-2.5 rounded-xl bg-premium-dark text-white text-sm font-bold shadow-md hover:bg-premium-gold transition-all duration-300 cursor-pointer">
                Best Seller
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-premium-cream dark:bg-surface/80 border border-premium-gold/20 text-premium-dark dark:text-white text-sm font-bold hover:bg-premium-gold hover:text-white dark:hover:bg-premium-gold transition-all duration-300 cursor-pointer">
                Keep Stylish
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-premium-cream dark:bg-surface/80 border border-premium-gold/20 text-premium-dark dark:text-white text-sm font-bold hover:bg-premium-gold hover:text-white dark:hover:bg-premium-gold transition-all duration-300 cursor-pointer">
                Special Discount
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-premium-cream dark:bg-surface/80 border border-premium-gold/20 text-premium-dark dark:text-white text-sm font-bold hover:bg-premium-gold hover:text-white dark:hover:bg-premium-gold transition-all duration-300 cursor-pointer">
                Official Store
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-premium-cream dark:bg-surface/80 border border-premium-gold/20 text-premium-dark dark:text-white text-sm font-bold hover:bg-premium-gold hover:text-white dark:hover:bg-premium-gold transition-all duration-300 cursor-pointer">
                Coveted Product
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {forYouProductsView.map(product => (
              <ProductCard key={`today-${product.id}`} product={product} isFlashSale={false} />
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-surface/70 rounded-2xl p-6 text-center shadow-lg dark:shadow-none hover:shadow-xl transition-all duration-300 border border-premium-gold/10"
              >
                <div className="text-premium-gold mb-4 flex justify-center bg-premium-gold/5 w-16 h-16 mx-auto items-center rounded-full">
                  {service.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-premium-dark dark:text-white mb-2">{service.title}</h3>
                <p className="text-premium-dark/60 dark:text-white/60 font-medium text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;