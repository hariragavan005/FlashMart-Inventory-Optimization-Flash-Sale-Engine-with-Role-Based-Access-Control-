import { useState, useEffect } from 'react';
import { FaShoppingCart, FaUser, FaStore, FaSearch, FaBars, FaTimes, FaSun, FaMoon, FaChevronDown, FaBox, FaBolt, FaHeart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const manageProfilePath =
    user?.role === 'admin' || user?.role === 'seller' ? '/dashboard' : '/profile';

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  // #5 — Navbar scroll effect
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300
      ${
        scrolled
          ? 'bg-white/[0.97] dark:bg-[#1A1A1A]/[0.97] shadow-[0_4px_24px_rgba(0,0,0,0.10)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] border-b border-[#E8E4DC]/80 dark:border-[#2A2A2A]'
          : 'bg-white/90 dark:bg-[#1A1A1A]/95 border-b border-[#E8E4DC] dark:border-[#2A2A2A] shadow-sm'
      }
    `}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex items-center gap-4 md:gap-6 h-16">

          {/* ── Logo ── */}
          <Link to="/" className="shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <span className="text-[#F5A623] text-xl animate-pulse">
                <FaBolt />
              </span>
              <span className="text-xl md:text-2xl font-display font-bold bg-gradient-to-r from-[#F5A623] to-[#FF4D1C] bg-clip-text text-transparent whitespace-nowrap">
                FlashMart
              </span>
            </motion.div>
          </Link>

          {/* ── Search bar (flex-1) ── */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for Products, Brands and More..."
                className="w-full pl-5 pr-12 py-2.5 rounded-full bg-[#F4F1EC] dark:bg-[#242424] border border-[#E8E4DC] dark:border-[#2A2A2A] focus:border-[#F5A623] dark:focus:border-[#F5A623] focus:outline-none text-sm font-body text-[#111111] dark:text-[#F0EDE8] placeholder-[#9C9C8E] transition-all duration-300 shadow-inner"
              />
              <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-[#F5A623] text-sm" />
            </div>
          </div>

          {/* ── Desktop right-side actions ── */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 shrink-0 ml-auto">
            {/* Flash Sale Pulsating Button */}
            <Link to="/flash-sale">
              <motion.button
                animate={{ boxShadow: ["0 0 0px #F5A623", "0 0 10px #F5A623", "0 0 0px #F5A623"] }}
                transition={{ repeat: Infinity, duration: 2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] dark:bg-[#F5A623] text-[#F5A623] dark:text-[#111111] font-body font-bold text-sm border-2 border-[#F5A623] hover:bg-[#F5A623] hover:text-[#111111] dark:hover:bg-white transition-all duration-300 shadow-[0_0_15px_rgba(245,166,35,0.3)]"
              >
                <FaBolt className="text-[13px] animate-bounce" />
                <span>Flash Deals</span>
              </motion.button>
            </Link>

            {/* Sell on FlashMart — pill button */}
            <Link to="/seller-register">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#F5A623] dark:border-[#F5A623] text-[#F5A623] font-body font-semibold text-sm hover:bg-[#F5A623] hover:text-white dark:hover:bg-[#F5A623] dark:hover:text-white transition-all duration-200 whitespace-nowrap"
              >
                <FaStore className="text-[13px]" />
                <span>Sell on FlashMart</span>
              </motion.button>
            </Link>

            {/* Cart icon + label */}
            <Link to="/cart">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="relative flex flex-col items-center gap-0.5 px-3 py-1 text-[#111111] dark:text-[#F0EDE8] hover:text-[#F5A623] dark:hover:text-[#F5A623] transition-colors group cursor-pointer"
              >
                <div className="relative">
                  <FaShoppingCart className="text-[22px]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 bg-[#FF4D1C] text-white text-[10px] font-mono font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-0.5 shadow-md">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-body font-semibold tracking-wide">Cart</span>
              </motion.button>
            </Link>

            {/* Dark / Light toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 12 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="flex flex-col items-center gap-0.5 px-3 py-1 text-[#111111] dark:text-[#F0EDE8] hover:text-[#F5A623] dark:hover:text-[#F5A623] transition-colors cursor-pointer"
            >
              <span className="text-[22px]">
                {isDark ? <FaSun /> : <FaMoon />}
              </span>
              <span className="text-[11px] font-body font-semibold tracking-wide">
                {isDark ? 'Light' : 'Dark'}
              </span>
            </motion.button>

            {/* Login / Account */}
            {user ? (
              <div className="relative">
                <motion.button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  whileHover={{ scale: 1.03 }}
                  className="flex flex-col items-center gap-0.5 px-3 py-1 text-[#111111] dark:text-[#F0EDE8] hover:text-[#F5A623] dark:hover:text-[#F5A623] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1 text-[22px]">
                    <FaUser className="text-[18px]" />
                    <FaChevronDown className={`text-[10px] mt-0.5 transition-transform duration-300 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                  <span className="text-[11px] font-body font-semibold tracking-wide max-w-[64px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] py-2 border border-[#E8E4DC] dark:border-[#2A2A2A] overflow-hidden z-50"
                    >
                      <div className="px-4 py-2 border-b border-[#E8E4DC] dark:border-[#2A2A2A] mb-1">
                        <p className="text-xs font-body text-[#9C9C8E]">Logged in as</p>
                        <p className="font-body font-semibold text-[#111111] dark:text-[#F0EDE8] truncate">{user.name}</p>
                      </div>
                      <Link to={manageProfilePath} onClick={() => setIsUserDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#F4F1EC] dark:hover:bg-[#242424] transition-colors text-sm font-body text-[#111111] dark:text-[#F0EDE8]">
                        <FaUser className="text-[#F5A623]" /> Manage Profile
                      </Link>
                      <Link to="/cart" onClick={() => setIsUserDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#F4F1EC] dark:hover:bg-[#242424] transition-colors text-sm font-body text-[#111111] dark:text-[#F0EDE8]">
                        <FaShoppingCart className="text-[#F5A623]" /> Your Cart ({cartCount})
                      </Link>
                      <Link to="/wishlist" onClick={() => setIsUserDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#F4F1EC] dark:hover:bg-[#242424] transition-colors text-sm font-body text-[#111111] dark:text-[#F0EDE8]">
                        <FaHeart className="text-[#F5A623]" /> Wishlist ({wishlistCount})
                      </Link>
                      <Link to="/orders" onClick={() => setIsUserDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#F4F1EC] dark:hover:bg-[#242424] transition-colors text-sm font-body text-[#111111] dark:text-[#F0EDE8]">
                        <FaBox className="text-[#F5A623]" /> My Orders
                      </Link>
                      <div className="border-t border-[#E8E4DC] dark:border-[#2A2A2A] my-1" />
                      <button
                        onClick={() => { logout(); setIsUserDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-500/10 text-[#DC2626] dark:text-[#FF4D1C] transition-colors cursor-pointer text-sm font-body font-semibold"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Log out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Login button — Flipkart style: white bg with orange text & border */
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-white dark:bg-[#F5A623] border-2 border-[#F5A623] text-[#F5A623] dark:text-white font-body font-semibold text-sm hover:bg-[#F5A623] hover:text-white dark:hover:bg-[#E8940A] transition-all duration-200 shadow-sm whitespace-nowrap"
                >
                  <FaUser className="text-[13px]" />
                  <span>Login</span>
                </motion.button>
              </Link>
            )}
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden ml-auto text-2xl text-[#111111] dark:text-[#F0EDE8] cursor-pointer"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/97 dark:bg-[#1A1A1A]/97 border-t border-[#E8E4DC] dark:border-[#2A2A2A] overflow-hidden"
          >
            <div className="px-4 py-5 space-y-3">
              {/* Mobile search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-5 pr-10 py-2.5 rounded-full bg-[#F4F1EC] dark:bg-[#242424] border border-[#E8E4DC] dark:border-[#2A2A2A] focus:border-[#F5A623] focus:outline-none text-sm font-body text-[#111111] dark:text-[#F0EDE8]"
                />
                <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-[#F5A623] text-sm" />
              </div>

              <div className="flex flex-col gap-0.5">
                {/* Theme toggle */}
                <button onClick={toggleTheme} className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-[#F4F1EC] dark:hover:bg-[#242424] transition-colors font-body text-[#111111] dark:text-[#F0EDE8]">
                  {isDark ? <FaSun className="text-[#F5A623]" /> : <FaMoon className="text-[#F5A623]" />}
                  <span className="text-sm font-semibold">{isDark ? 'Switch to Light' : 'Switch to Dark'}</span>
                </button>

                {/* Flash Deals */}
                <Link to="/flash-sale" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-3 px-3 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 transition-colors animate-pulse">
                  <FaBolt className="text-[#F5A623]" />
                  <span className="text-sm font-body font-bold text-[#F5A623]">Flash Deals — Live!</span>
                </Link>

                {/* Sell on FlashMart */}

                {/* Cart */}
                <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-[#F4F1EC] dark:hover:bg-[#242424] transition-colors relative">
                  <FaShoppingCart className="text-[#F5A623]" />
                  <span className="text-sm font-body font-semibold text-[#111111] dark:text-[#F0EDE8]">Shopping Cart</span>
                  {cartCount > 0 && (
                    <span className="ml-auto bg-[#FF4D1C] text-white text-xs font-mono font-bold px-2 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link to="/wishlist" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-[#F4F1EC] dark:hover:bg-[#242424] transition-colors relative">
                  <FaHeart className="text-[#F5A623]" />
                  <span className="text-sm font-body font-semibold text-[#111111] dark:text-[#F0EDE8]">Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="ml-auto bg-[#FF4D1C] text-white text-xs font-mono font-bold px-2 py-0.5 rounded-full">
                      {wishlistCount > 99 ? '99+' : wishlistCount}
                    </span>
                  )}
                </Link>

                <div className="border-t border-[#E8E4DC] dark:border-[#2A2A2A] my-2" />

                {user ? (
                  <div className="space-y-0.5">
                    <div className="py-2 px-3 font-body font-bold text-[#F5A623] text-sm">Hello, {user.name}</div>
                    <Link to={manageProfilePath} onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-[#F4F1EC] dark:hover:bg-[#242424] transition-colors text-sm font-body text-[#111111] dark:text-[#F0EDE8]">Manage Profile</Link>
                    <Link to="/orders" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-[#F4F1EC] dark:hover:bg-[#242424] transition-colors text-sm font-body text-[#111111] dark:text-[#F0EDE8]">My Orders</Link>
                    <button onClick={() => { logout(); setIsOpen(false); }} className="w-full flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-[#DC2626] dark:text-[#FF4D1C] transition-colors cursor-pointer text-sm font-body font-bold">
                      Log out
                    </button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block">
                    <button className="w-full flex items-center justify-center gap-2 py-3 rounded-full border-2 border-[#F5A623] text-[#F5A623] font-body font-semibold text-sm hover:bg-[#F5A623] hover:text-white transition-all duration-200">
                      <FaUser className="text-[13px]" /> Login / Sign Up
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
