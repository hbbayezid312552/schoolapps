import React, { useState, useEffect } from 'react';
import { SchoolLogo } from './SchoolLogo';
import { Menu, X, Shield, LogOut, ChevronRight, Phone, Mail, Award } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdminLoggedIn: boolean;
  onOpenAdminLogin: () => void;
  onAdminLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isAdminLoggedIn,
  onOpenAdminLogin,
  onAdminLogout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'হোম' },
    { id: 'about', label: 'আমাদের সম্পর্কে' },
    { id: 'teachers', label: 'শিক্ষকবৃন্দ' },
    { id: 'students', label: 'শিক্ষার্থী' },
    { id: 'routine', label: 'ক্লাস রুটিন' },
    { id: 'notices', label: 'নোটিশ' },
    { id: 'results', label: 'ফলাফল' },
    { id: 'gallery', label: 'গ্যালারি' },
    { id: 'contact', label: 'যোগাযোগ' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top emergency & contact bar (Desktop) */}
      <div className="bg-emerald-950 text-emerald-200 text-xs py-1.5 px-4 hidden md:block border-b border-emerald-900/60 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <span className="flex items-center gap-1.5 font-medium">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              EIIN: ১২৮৪৫৬ | প্রতিষ্ঠিত: ১৯৬৮ | নওগাঁ, বাংলাদেশ
            </span>
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a href="tel:+8801712345678" className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+৮৮০ ১৭ ১২৩৪ ৫৬৭৮</span>
            </a>
            <a href="mailto:info@moslemganjhighschool.edu.bd" className="flex items-center gap-1 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>info@moslemganjhighschool.edu.bd</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 no-print ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-emerald-100 text-slate-800'
            : 'bg-white shadow-sm border-b border-emerald-50 text-slate-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* School Brand & Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3.5 text-left group focus:outline-none"
            >
              <SchoolLogo size={52} className="transition-transform group-hover:scale-105" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold font-bengali text-emerald-900 tracking-tight leading-tight flex items-center gap-2">
                  মোসলেমগঞ্জ উচ্চ বিদ্যালয়
                </h1>
                <p className="text-xs text-emerald-700 font-medium tracking-wide">
                  Moslemganj High School <span className="text-slate-400">•</span> <span className="text-amber-600">জ্ঞান • শৃঙ্খলা • মানবিকতা</span>
                </p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1 lg:space-x-1.5">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 whitespace-nowrap ${
                      isActive
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* Admin Button */}
              {isAdminLoggedIn ? (
                <div className="flex items-center pl-2 space-x-1.5">
                  <button
                    onClick={() => handleNavClick('admin')}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-all ${
                      activeTab === 'admin'
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                    }`}
                  >
                    <Shield className="w-4 h-4 text-amber-500" />
                    <span>অ্যাডমিন প্যানেল</span>
                  </button>
                  <button
                    onClick={onAdminLogout}
                    title="লগআউট"
                    className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenAdminLogin}
                  className="ml-2 px-3.5 py-2 rounded-lg text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center gap-1.5 transition-all"
                >
                  <Shield className="w-4 h-4 text-emerald-700" />
                  <span>অ্যাডমিন লগইন</span>
                </button>
              )}
            </nav>

            {/* Mobile / Tablet Menu Button */}
            <div className="flex items-center xl:hidden space-x-2">
              {isAdminLoggedIn && (
                <button
                  onClick={() => handleNavClick('admin')}
                  className="px-2.5 py-1.5 text-xs font-semibold bg-amber-500 text-white rounded-md flex items-center gap-1"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>অ্যাডমিন</span>
                </button>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-lg text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-emerald-100 shadow-xl transition-all">
            <div className="px-4 pt-3 pb-6 space-y-1.5 max-h-[80vh] overflow-y-auto">
              <div className="pb-2 mb-2 border-b border-slate-100 flex items-center justify-between text-xs text-emerald-800 px-2">
                <span>EIIN: ১২৮৪৫৬</span>
                <span>মোসলেমগঞ্জ উচ্চ বিদ্যালয়</span>
              </div>

              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-base font-semibold text-left transition-colors ${
                      isActive
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-900'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  </button>
                );
              })}

              <div className="pt-3 border-t border-slate-100 mt-2">
                {isAdminLoggedIn ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => handleNavClick('admin')}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-amber-600 text-white shadow-sm"
                    >
                      <Shield className="w-4 h-4" />
                      <span>অ্যাডমিন ম্যানেজমেন্ট প্যানেল</span>
                    </button>
                    <button
                      onClick={() => {
                        onAdminLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>লগআউট করুন</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenAdminLogin();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300"
                  >
                    <Shield className="w-4 h-4 text-emerald-800" />
                    <span>অ্যাডমিন লগইন (Admin Login)</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
