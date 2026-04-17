import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Store, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthSplitLayout from '../components/AuthSplitLayout';

const Register = () => {
  const [role, setRole] = useState('shopper');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role, name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not create account');
      }

      login(data.user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthSplitLayout
      heading="Create your account"
      subheading="Join FlashMart and start buying or selling in minutes."
      formContent={(
        <form className="space-y-5" onSubmit={handleRegister}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#3F3C37] dark:text-[#CBC6BF]">
              Register as
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('shopper')}
                className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                  role === 'shopper'
                    ? 'border-[#F5A623] bg-[#F5A623]/10 text-[#B56F00] dark:text-[#F5A623]'
                    : 'border-[#DDD7CD] text-[#6D6A66] hover:border-[#F5A623]/40 dark:border-[#2A2A2A] dark:text-[#A5A29C]'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <User size={16} /> Shopper
                </span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/seller-register')}
                className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                  role === 'seller'
                    ? 'border-[#F5A623] bg-[#F5A623]/10 text-[#B56F00] dark:text-[#F5A623]'
                    : 'border-[#DDD7CD] text-[#6D6A66] hover:border-[#F5A623]/40 dark:border-[#2A2A2A] dark:text-[#A5A29C]'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <Store size={16} /> Seller
                </span>
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-[#3F3C37] dark:text-[#CBC6BF]">
              {role === 'seller' ? 'Store name' : 'Full name'}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full rounded-xl border border-[#DDD7CD] bg-[#FAF8F4] px-4 py-3 text-sm text-[#111111] outline-none transition focus:border-[#F5A623] dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#F0EDE8]"
              placeholder={role === 'seller' ? 'Your brand name' : 'John Doe'}
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-[#3F3C37] dark:text-[#CBC6BF]">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-xl border border-[#DDD7CD] bg-[#FAF8F4] px-4 py-3 text-sm text-[#111111] outline-none transition focus:border-[#F5A623] dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#F0EDE8]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-[#3F3C37] dark:text-[#CBC6BF]">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-xl border border-[#DDD7CD] bg-[#FAF8F4] px-4 py-3 pr-12 text-sm text-[#111111] outline-none transition focus:border-[#F5A623] dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#F0EDE8]"
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F6A63] transition hover:text-[#F5A623] dark:text-[#A5A29C]"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F5A623] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#E8940A] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? 'Creating account...' : 'Create account'}
            {!isLoading && <ArrowRight size={17} />}
          </button>

          <p className="text-center text-sm text-[#6D6A66] dark:text-[#A5A29C]">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#F5A623] hover:text-[#E8940A]">
              Sign in
            </Link>
          </p>
        </form>
      )}
    />
  );
};

export default Register;
