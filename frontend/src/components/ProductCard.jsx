import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product, isFlashSale = false }) => {
  const { name, price, originalPrice, stock, maxStock, image, rating = 4.5, reviews = 0 } = product;
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const wishlisted = isInWishlist(product.id);

  // Format Indian Rupees
  const formatINR = (amount) => {
    return 'Rs.' + amount.toLocaleString('en-IN');
  };

  // Generate star rating display
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={14} className="fill-premium-gold text-premium-gold" />
        ))}
        {hasHalfStar && (
          <Star size={14} className="fill-premium-gold text-premium-gold" fillOpacity={0.5} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={14} className="text-premium-gold/30 dark:text-gray-600" />
        ))}
        <span className="text-xs text-premium-dark/60 dark:text-white/60 font-medium ml-1">({reviews})</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-surface rounded-2xl overflow-hidden shadow-lg dark:shadow-none hover:shadow-2xl dark:hover:shadow-[0_10px_30px_rgba(245,176,65,0.15)] transition-all duration-300 border border-premium-gold/10 group flex flex-col h-full"
    >
        {/* Image with group-hover scale + dark overlay — #3 from spec */}
        <div className="relative overflow-hidden aspect-[4/5] bg-gradient-to-br from-[#F4F1EC] to-white dark:from-[#1A1A1A] dark:to-[#0F0F0F] p-6">
          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 z-10 pointer-events-none rounded-t-2xl" />

          {/* Wishlist button */}
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!user) {
                navigate('/login');
              } else {
                toggleWishlist(product);
              }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`absolute top-3 right-3 bg-white/80 dark:bg-[#1A1A1A]/80 backdrop-blur-sm w-8 h-8 flex items-center justify-center rounded-full transition-colors z-20 shadow-sm ${
              wishlisted
                ? 'text-[#FF4D1C]'
                : 'text-gray-400 hover:text-[#FF4D1C] dark:hover:text-[#FF4D1C]'
            }`}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={16} className={`transition-colors ${wishlisted ? 'fill-[#FF4D1C]' : ''}`} />
          </motion.button>

          {/* Quick Buy */}
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!user) {
                navigate('/login');
              } else {
                addToCart(product);
              }
            }}
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05, opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0, y: 20 }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#111111]/95 dark:bg-[#F5A623] text-white dark:text-[#111111] px-5 py-2.5 rounded-full text-sm font-body font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 shadow-xl cursor-pointer"
          >
            <ShoppingCart size={15} />
            Quick Buy
          </motion.button>

          <Link to={`/product/${product.id}`} className="block h-full cursor-pointer">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 rounded-sm"
            />
          </Link>
        </div>

      {/* Product Info Section */}
      <div className="p-4 md:p-5 flex flex-col flex-grow bg-white dark:bg-surface transition-colors duration-300">
        <Link to={`/product/${product.id}`} className="hover:text-premium-gold transition-colors block">
          <h3 className="font-body font-semibold text-[#111111] dark:text-white line-clamp-2 text-[15px] leading-snug mb-2 min-h-[44px]">
            {name}
          </h3>
        </Link>

        {/* Rating Stars */}
        {rating && <div className="mb-3">{renderStars()}</div>}

        {/* Price Section */}
        <div className="flex items-baseline flex-wrap gap-2 mt-auto mb-4">
          {isFlashSale && originalPrice ? (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold text-premium-dark/50 dark:text-white/40 uppercase tracking-tighter">MRP</span>
              <span className="text-xs text-red-500/70 line-through font-semibold tracking-tight">
                {formatINR(originalPrice)}
              </span>
              <span className="text-[10px] font-bold text-premium-dark/50 dark:text-white/40 uppercase tracking-tighter">to</span>
              <span className="text-lg font-mono font-bold text-[#111111] dark:text-[#F5A623] tracking-tight">{formatINR(price)}</span>
            </div>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-mono font-bold text-[#111111] dark:text-[#F5A623] tracking-tight">{formatINR(price)}</span>
              {originalPrice && (
                <span className="text-sm text-red-500/70 line-through font-semibold tracking-tight">
                  {formatINR(originalPrice)}
                </span>
              )}
            </div>
          )}
        </div>

        {/* High Urgency Stock Badge for Flash Sales */}
        {isFlashSale && (
          <div className="mt-auto pt-3">
            <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 px-3 py-1.5 rounded-xl w-full">
              <span className="flex h-2 w-2 rounded-full bg-[#FF4D1C] animate-ping" />
              <span className="text-[11px] font-mono font-bold text-[#FF4D1C] tracking-tight uppercase">
                ⚠️ Only 3 stocks left!
              </span>
            </div>
          </div>
        )}

        {/* Flash Sale Badge */}
        {isFlashSale && (
          <div className="mt-3">
            {/* Shimmer badge — #6 from spec */}
            <span className="relative overflow-hidden inline-flex items-center gap-1 bg-[#FF4D1C] text-white text-[11px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm
              before:absolute before:inset-0 before:-translate-x-full
              before:bg-white/20 hover:before:translate-x-full
              before:transition-transform before:duration-500">
              <Flame size={12} strokeWidth={3} className="fill-white shrink-0" />
              FLASH SALE
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
