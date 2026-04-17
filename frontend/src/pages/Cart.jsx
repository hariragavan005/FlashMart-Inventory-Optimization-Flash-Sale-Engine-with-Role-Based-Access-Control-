import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, CreditCard, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

    const formatINR = (amount) => {
        return 'Rs.' + amount.toLocaleString('en-IN');
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = cartItems.length > 0 ? 199 : 0;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-[#FDFCF9] dark:bg-[#0E0E0E] pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="bg-[#F5A623]/10 p-3 rounded-2xl text-[#F5A623]">
                        <ShoppingBag size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-display font-bold text-[#111111] dark:text-white">Shopping Cart</h1>
                        <p className="text-sm text-zinc-500 font-medium">{cartItems.length} items in your basket</p>
                    </div>
                </div>

                {cartItems.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-[#171717] rounded-3xl border-2 border-dashed border-[#E8E4DC] dark:border-[#2A2A2A]"
                    >
                        <div className="w-24 h-24 bg-[#F4F1EC] dark:bg-[#1A1A1A] rounded-full flex items-center justify-center mb-6 text-zinc-400">
                            <ShoppingCart size={40} />
                        </div>
                        <h2 className="text-2xl font-display font-bold text-[#111111] dark:text-white mb-2">Your cart is empty</h2>
                        <p className="text-zinc-500 max-w-xs mb-10">Looks like you haven't added anything to your cart yet. Let's find some great deals!</p>
                        <Link to="/">
                            <button className="bg-[#F5A623] text-[#111111] px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#E8940A] transition-all cursor-pointer">
                                <ArrowLeft size={18} />
                                Start Shopping
                            </button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            <AnimatePresence>
                                {cartItems.map((item) => (
                                    <motion.div 
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 50 }}
                                        className="bg-white dark:bg-[#171717] rounded-3xl p-5 md:p-6 border border-[#E8E4DC] dark:border-[#2A2A2A] shadow-sm flex flex-col sm:flex-row items-center gap-6"
                                    >
                                        {/* Product Image */}
                                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-[#F4F1EC] dark:bg-[#1A1A1A] shrink-0 border border-[#E8E4DC] dark:border-[#2A2A2A]">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 text-center sm:text-left">
                                            <h3 className="font-display font-bold text-[#111111] dark:text-white text-lg mb-1 line-clamp-1">{item.name}</h3>
                                            <p className="text-sm text-[#F5A623] font-mono font-bold mb-4">{formatINR(item.price)}</p>
                                            
                                            {/* Quantity Controls */}
                                            <div className="inline-flex items-center bg-[#F4F1EC] dark:bg-[#1A1A1A] rounded-xl p-1 border border-[#E8E4DC] dark:border-[#2A2A2A]">
                                                <button 
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="p-1.5 hover:bg-white dark:hover:bg-[#242424] rounded-lg transition-colors cursor-pointer"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-10 text-center font-mono font-bold text-sm">{item.quantity}</span>
                                                <button 
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="p-1.5 hover:bg-white dark:hover:bg-[#242424] rounded-lg transition-colors cursor-pointer"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Final Price & Delete */}
                                        <div className="flex flex-col items-center sm:items-end gap-3 w-full sm:w-auto">
                                            <span className="text-lg font-mono font-black text-[#111111] dark:text-white">
                                                {formatINR(item.price * item.quantity)}
                                            </span>
                                            <button 
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-[#FF4D1C] hover:bg-red-50 dark:hover:bg-red-500/10 p-2 rounded-xl transition-colors cursor-pointer"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            <button 
                                onClick={clearCart}
                                className="text-zinc-500 hover:text-[#DC2626] font-semibold text-sm flex items-center gap-2 transition-colors cursor-pointer ml-2"
                            >
                                <Trash2 size={16} />
                                Clear Shopping Cart
                            </button>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-[#171717] rounded-3xl p-8 border border-[#E8E4DC] dark:border-[#2A2A2A] shadow-xl sticky top-28">
                                <h3 className="text-xl font-display font-bold text-[#111111] dark:text-white mb-6">Order Summary</h3>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-zinc-500 font-medium">
                                        <span>Subtotal</span>
                                        <span className="font-mono text-[#111111] dark:text-[#F0EDE8]">{formatINR(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-500 font-medium">
                                        <span>Shipping</span>
                                        <span className="font-mono text-[#111111] dark:text-[#F0EDE8]">{formatINR(shipping)}</span>
                                    </div>
                                    <div className="border-t border-[#E8E4DC] dark:border-[#2A2A2A] pt-4 flex justify-between">
                                        <span className="font-bold text-[#111111] dark:text-white">Total Amount</span>
                                        <span className="text-2xl font-mono font-black text-[#F5A623]">{formatINR(total)}</span>
                                    </div>
                                </div>

                                <button className="w-full bg-[#111111] dark:bg-white text-white dark:text-[#111111] py-4 rounded-2xl font-display font-bold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl mb-4 cursor-pointer">
                                    <CreditCard size={20} />
                                    Checkout Now
                                </button>

                                <div className="flex items-center justify-center gap-2 text-xs text-secondary-text font-medium opacity-60">
                                    <ShieldCheck size={14} className="text-green-500" />
                                    Secure SSL Checkout - 100% Guaranteed
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
