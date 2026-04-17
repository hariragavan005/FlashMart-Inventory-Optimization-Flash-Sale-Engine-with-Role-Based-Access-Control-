import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthSplitLayout from '../components/AuthSplitLayout';
import AuthToast from '../components/AuthToast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not sign in');
      }

      login(data.user);

      const redirectPath = searchParams.get('redirect');
      const roleRoute =
        data.user?.role === 'admin'
          ? '/admin/dashboard'
          : data.user?.role === 'seller'
            ? '/seller/dashboard'
            : '/';

      setToastMessage('Successfully logged in');
      setTimeout(() => {
        navigate(redirectPath || roleRoute, { replace: true });
      }, 700);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthToast message={toastMessage} />
      <AuthSplitLayout
        heading="Welcome back"
        subheading="Sign in to continue shopping and manage your account."
        formContent={(
          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                {error}
              </p>
            )}

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
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl border border-[#DDD7CD] bg-[#FAF8F4] px-4 py-3 pr-12 text-sm text-[#111111] outline-none transition focus:border-[#F5A623] dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#F0EDE8]"
                  placeholder="Enter your password"
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

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F5A623] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#E8940A] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
              {!isLoading && <ArrowRight size={17} />}
            </button>

            <p className="text-center text-sm text-[#6D6A66] dark:text-[#A5A29C]">
              New customer?{' '}
              <Link to="/register" className="font-semibold text-[#F5A623] hover:text-[#E8940A]">
                Create an account
              </Link>
            </p>
          </form>
        )}
      />
    </>
  );
};

export default Login;
