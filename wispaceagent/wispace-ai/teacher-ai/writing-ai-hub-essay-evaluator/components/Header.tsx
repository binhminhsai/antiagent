
import React from 'react';
import { Edit3, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <nav className="bg-[#004d4d] text-white py-4 px-6 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Edit3 className="text-[#1fb2aa] w-8 h-8" />
          <span className="font-bold text-xl tracking-tight">Writing AI-Hub</span>
        </div>
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <a className="hover:text-[#1fb2aa] transition-colors" href="#">Home</a>
          <a className="hover:text-[#1fb2aa] transition-colors" href="#">About Us</a>
          <a className="hover:text-[#1fb2aa] transition-colors" href="#">Virtual Practice</a>
          <a className="hover:text-[#1fb2aa] transition-colors" href="#">Essay Grading</a>
          <a className="hover:text-[#1fb2aa] transition-colors" href="#">Exam Library</a>
          <a className="hover:text-[#1fb2aa] transition-colors" href="#">Virtual Exam</a>
          <a className="hover:text-[#1fb2aa] transition-colors" href="#">Progress Tracking</a>
          <a className="hover:text-[#1fb2aa] transition-colors" href="#">Blog</a>
        </div>
        <button className="bg-[#fdb022] hover:bg-[#f79009] text-slate-900 px-5 py-2 rounded-lg font-bold flex items-center gap-2 transition-all">
          <User size={18} /> Login
        </button>
      </div>
    </nav>
  );
};

export default Header;
