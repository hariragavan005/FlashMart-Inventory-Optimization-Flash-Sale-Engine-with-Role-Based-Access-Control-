import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import AuthSlider from './AuthSlider';

const AuthSplitLayout = ({ heading, subheading, formContent }) => {
  return (
    <div className="min-h-screen bg-[#FDFCF9] dark:bg-[#0E0E0E] pt-20">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Left Section: Animation/Visuals */}
        <section className="relative hidden overflow-hidden bg-[#171717] lg:flex lg:order-1">
          <AuthSlider />
        </section>

        {/* Right Section: Form */}
        <section className="flex items-center justify-center px-6 py-12 lg:px-20 lg:order-2">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <Link to="/" className="inline-flex items-center gap-2 mb-6">
                <span className="rounded-xl bg-[#F5A623] p-1.5 text-[#171717]">
                  <Zap size={18} />
                </span>
                <span className="font-display text-xl font-bold tracking-tight text-[#111111] dark:text-[#F0EDE8]">
                  FlashMart
                </span>
              </Link>
              <h1 className="font-display text-2xl font-bold text-[#111111] dark:text-[#F0EDE8]">
                {heading}
              </h1>
              <p className="mt-2 text-sm text-[#6D6A66] dark:text-[#A5A29C]">
                {subheading}
              </p>
            </div>
            
            <div className="rounded-3xl border border-[#E8E4DC] bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:border-[#2A2A2A] dark:bg-[#171717] sm:p-8">
              {formContent}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthSplitLayout;
