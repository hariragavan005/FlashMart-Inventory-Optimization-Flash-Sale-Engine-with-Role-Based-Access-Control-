import { motion } from 'framer-motion';
import { ShieldOff, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const dashboardPath =
    user?.role === 'admin'
      ? '/admin/dashboard'
      : user?.role === 'seller'
        ? '/seller/dashboard'
        : '/';

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0F0F0F] flex items-center justify-center px-4 font-body">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md"
      >
        {/* Icon */}
        <div className="w-20 h-20 bg-[#FF4D1C]/10 border border-[#FF4D1C]/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldOff size={36} className="text-[#FF4D1C]" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-display font-bold text-[#111111] dark:text-[#F0EDE8] mb-3">
          Access Denied
        </h1>

        <p className="text-[#9C9C8E] text-sm mb-2">
          Your account{user ? ` (${user.role})` : ''} doesn't have permission to view this page.
        </p>
        <p className="text-[#9C9C8E] text-sm mb-8">
          Contact an administrator if you believe this is a mistake.
        </p>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#E8E4DC] dark:border-[#2A2A2A] text-[#111111] dark:text-[#F0EDE8] font-semibold text-sm hover:border-[#F5A623] transition-all cursor-pointer"
          >
            <ArrowLeft size={15} /> Go Back
          </button>
          <button
            onClick={() => navigate(dashboardPath)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5A623] text-white font-semibold text-sm hover:bg-[#E8940A] transition-all cursor-pointer"
          >
            {user?.role === 'admin' || user?.role === 'seller' ? 'Dashboard' : 'Home'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Unauthorized;
