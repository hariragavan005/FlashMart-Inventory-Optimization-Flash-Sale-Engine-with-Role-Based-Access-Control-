import { motion } from 'framer-motion';
import { Store, Package, PlusCircle, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SellerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0F0F0F] text-[#111111] dark:text-[#F0EDE8] font-body pt-16">
      {/* Top bar */}
      <header className="sticky top-16 z-40 bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-md border-b border-[#E8E4DC] dark:border-[#2A2A2A] px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Store size={20} className="text-[#F5A623]" />
          <span className="font-display font-bold text-lg">Seller Hub</span>
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-[#F5A623]/10 text-[#F5A623] px-2 py-0.5 rounded-full border border-[#F5A623]/20">
            {user?.name}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-semibold text-[#FF4D1C] hover:bg-[#FF4D1C]/10 px-4 py-2 rounded-xl transition-all cursor-pointer"
        >
          <LogOut size={15} /> Log out
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-display font-bold mb-1">Your Store</h1>
          <p className="text-sm text-[#9C9C8E] mb-8">Manage your listings, orders, and performance.</p>

          {/* Quick actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {[
              { icon: PlusCircle, label: 'Add Product',    color: 'text-[#F5A623]', bg: 'bg-[#F5A623]/10' },
              { icon: Package,    label: 'View Orders',    color: 'text-[#22C55E]', bg: 'bg-[#22C55E]/10' },
              { icon: BarChart3,  label: 'Analytics',      color: 'text-purple-500', bg: 'bg-purple-500/10' },
            ].map(({ icon: Icon, label, color, bg }, i) => (
              <motion.button
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-[#1A1A1A] border border-[#E8E4DC] dark:border-[#2A2A2A] rounded-2xl hover:border-[#F5A623]/30 transition-all cursor-pointer shadow-sm"
              >
                <div className={`${bg} ${color} p-3 rounded-xl`}>
                  <Icon size={22} />
                </div>
                <span className="font-semibold text-sm">{label}</span>
              </motion.button>
            ))}
          </div>

          {/* Placeholder listings table */}
          <div className="bg-white dark:bg-[#1A1A1A] border border-[#E8E4DC] dark:border-[#2A2A2A] rounded-2xl p-6">
            <h2 className="text-lg font-display font-bold mb-4">Your Listings</h2>
            <p className="text-sm text-[#9C9C8E]">Connect to the backend API to manage your products here.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default SellerDashboard;
