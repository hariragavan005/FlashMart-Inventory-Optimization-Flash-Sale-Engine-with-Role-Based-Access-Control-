import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Package, BarChart3, Settings, LogOut, ShieldCheck, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const statCards = [
  { label: 'Total Users',    value: '—', icon: Users,       color: 'text-[#F5A623]' },
  { label: 'Total Orders',   value: '—', icon: Package,     color: 'text-[#22C55E]' },
  { label: 'Revenue',        value: '—', icon: BarChart3,   color: 'text-[#FF4D1C]' },
  { label: 'Active Sellers', value: '—', icon: ShieldCheck, color: 'text-purple-400' },
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F0EDE8] font-body pt-16">
      {/* Sidebar ... */}
      <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-[#1A1A1A] border-r border-[#2A2A2A] flex flex-col z-40">
        {/* Logo Section */}
        <div className="px-6 py-5 border-b border-[#2A2A2A]">
          <span className="font-display font-bold text-xl bg-gradient-to-r from-[#F5A623] to-[#FF4D1C] bg-clip-text text-transparent">
            FlashMart
          </span>
          <p className="text-[11px] font-mono text-[#9C9C8E] tracking-widest uppercase mt-0.5">
            Admin Panel
          </p>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
            { icon: Zap,             label: 'Flash Sales', id: 'flash' },
            { icon: Users,           label: 'Users', id: 'users' },
            { icon: Package,         label: 'Orders', id: 'orders' },
            { icon: BarChart3,       label: 'Analytics', id: 'analytics' },
            { icon: Settings,        label: 'Settings', id: 'settings' },
          ].map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === id
                  ? 'bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]/20'
                  : 'text-[#9C9C8E] hover:bg-[#242424] hover:text-[#F0EDE8]'
              }`}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </nav>

        {/* User + Logout Area */}
        <div className="px-3 py-4 border-t border-[#2A2A2A]">
          <div className="px-4 py-2 mb-2">
            <p className="text-xs text-[#9C9C8E]">Logged in as</p>
            <p className="font-semibold text-sm truncate">{user?.name}</p>
            <span className="inline-block text-[10px] font-mono font-bold tracking-widest uppercase bg-[#F5A623]/10 text-[#F5A623] px-2 py-0.5 rounded-full mt-1">
              {user?.role}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#FF4D1C] hover:bg-[#FF4D1C]/10 transition-all cursor-pointer"
          >
            <LogOut size={17} />
            Log out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'dashboard' && (
            <>
              <h1 className="text-3xl font-display font-bold mb-1">Dashboard</h1>
              <p className="text-sm text-[#9C9C8E] mb-8">Welcome back, {user?.name?.split(' ')[0]} 👋</p>

              {/* Stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {statCards.map(({ label, value, icon: Icon, color }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-5 hover:border-[#F5A623]/20 transition-all"
                  >
                    <div className={`${color} mb-3`}><Icon size={22} /></div>
                    <p className="text-2xl font-mono font-bold mb-0.5">{value}</p>
                    <p className="text-xs text-[#9C9C8E] font-semibold">{label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Placeholder table */}
              <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
                <h2 className="text-lg font-display font-bold mb-4">Recent Orders</h2>
                <p className="text-sm text-[#9C9C8E]">Connect to the backend API to populate this table.</p>
              </div>
            </>
          )}

          {activeTab === 'flash' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-display font-bold mb-1">Flash Sale Management</h1>
                  <p className="text-sm text-[#9C9C8E]">Organize and prioritize your active lightning deals.</p>
                </div>
                <button className="bg-[#F5A623] text-[#111111] px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#E8940A] transition-all cursor-pointer">
                  + Add New Flash Product
                </button>
              </div>

              {/* Flash Sale Product Management Table */}
              <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#242424] text-[#9C9C8E] text-[10px] font-mono font-bold uppercase tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Product Detail</th>
                      <th className="px-6 py-4">Current Price</th>
                      <th className="px-6 py-4">Flash Price</th>
                      <th className="px-6 py-4">Stock Label</th>
                      <th className="px-6 py-4 text-center">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2A2A2A]">
                    {[
                      { id: 1, name: "EliteShield Jacket", price: "Rp525k", flash: "Rp255k", stock: "3 Left" },
                      { id: 2, name: "Gentlemen's Hat", price: "Rp150k", flash: "Rp99k", stock: "3 Left" },
                      { id: 3, name: "OptiZoom Bag", price: "Rp425k", flash: "Rp250k", stock: "3 Left" },
                    ].map((item) => (
                      <tr key={item.id} className="hover:bg-[#242424] transition-colors group">
                        <td className="px-6 py-4">
                          <span className="font-semibold text-sm">{item.name}</span>
                        </td>
                        <td className="px-6 py-4 text-zinc-500 font-mono text-xs">{item.price}</td>
                        <td className="px-6 py-4 text-[#F5A623] font-mono text-sm font-bold">{item.flash}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/10 text-red-500 border border-red-500/20 uppercase">
                            {item.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="w-2 h-2 rounded-full bg-green-500 inline-block shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-zinc-500 hover:text-[#F5A623] transition-colors mr-3 cursor-pointer">Edit</button>
                          <button className="text-zinc-500 hover:text-red-500 transition-colors cursor-pointer">Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab !== 'dashboard' && activeTab !== 'flash' && (
             <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                <div className="bg-[#1A1A1A] p-6 rounded-full mb-4 border border-[#2A2A2A]">
                   <LayoutDashboard size={40} className="text-[#9C9C8E]" />
                </div>
                <h2 className="text-xl font-display font-medium mb-2 uppercase tracking-widest">{activeTab} tab</h2>
                <p className="text-sm">This section is currently being integrated with the live API.</p>
             </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
