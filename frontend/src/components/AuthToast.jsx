import { CheckCircle2 } from 'lucide-react';

const AuthToast = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed right-4 top-4 z-[100]">
      <div className="flex items-center gap-2 rounded-xl border border-[#F5A623]/40 bg-[#111111] px-4 py-2.5 text-sm font-semibold text-[#F0EDE8] shadow-xl">
        <CheckCircle2 size={16} className="text-[#F5A623]" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default AuthToast;
