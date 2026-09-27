import React from 'react';
import { SchoolLogo } from './SchoolLogo';
import { FileText, Calendar, Search, Award, Users, BookOpen, CheckCircle, Bell, ArrowRight } from 'lucide-react';
import { Notice } from '../types';

interface HeroProps {
  onNavigate: (tab: string) => void;
  latestNotice?: Notice;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, latestNotice }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-teal-900 text-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Decorative patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-400 blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-teal-300 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-amber-400 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Notice Bar */}
        {latestNotice && (
          <div className="mb-8">
            <div className="bg-emerald-950/80 border border-emerald-500/30 rounded-xl p-2.5 sm:p-3 flex items-center gap-3 backdrop-blur-sm shadow-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-emerald-950 shrink-0">
                <Bell className="w-3.5 h-3.5 animate-bounce" />
                জরুরি নোটিশ
              </span>
              <p className="text-xs sm:text-sm text-emerald-100 truncate flex-1 font-medium">
                {latestNotice.title}
              </p>
              <button
                onClick={() => onNavigate('notices')}
                className="text-xs text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1 shrink-0 ml-2"
              >
                <span>বিস্তারিত</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-700/60 border border-emerald-400/30 text-emerald-200 text-xs sm:text-sm font-medium">
              <Award className="w-4 h-4 text-amber-400" />
              <span>ঐতিহ্যবাহী বিদ্যাপীঠ • EIIN: ১২৮৪৫৬</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-bengali text-white tracking-tight leading-tight">
                মোসলেমগঞ্জ উচ্চ বিদ্যালয়
              </h1>
              <p className="text-lg sm:text-2xl font-semibold text-amber-300 font-bengali tracking-wide">
                জ্ঞান • শৃঙ্খলা • মানবিকতা
              </p>
            </div>

            <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              "শিক্ষা, নৈতিকতা ও প্রযুক্তির সমন্বয়ে আগামীর প্রজন্ম গড়ে তোলার অঙ্গীকার।"
            </p>

            {/* The 3 Requested Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={() => onNavigate('results')}
                className="px-5 sm:px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-amber-500 hover:bg-amber-400 text-emerald-950 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <FileText className="w-5 h-5 text-emerald-900" />
                <span>ফলাফল দেখুন</span>
              </button>

              <button
                onClick={() => onNavigate('routine')}
                className="px-5 sm:px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-emerald-700 hover:bg-emerald-600 text-white border border-emerald-400/40 shadow-md transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Calendar className="w-5 h-5 text-emerald-200" />
                <span>ক্লাস রুটিন</span>
              </button>

              <button
                onClick={() => onNavigate('students')}
                className="px-5 sm:px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-white/10 hover:bg-white/20 text-emerald-100 border border-white/20 backdrop-blur-sm transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Search className="w-5 h-5 text-emerald-300" />
                <span>শিক্ষার্থী খুঁজুন</span>
              </button>
            </div>

            {/* Quick Badges */}
            <div className="pt-4 grid grid-cols-3 gap-2 sm:gap-4 border-t border-emerald-700/50 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-left">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-emerald-200">স্মার্ট ক্লাসরুম</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-emerald-200">বিজ্ঞান ও আইসিটি ল্যাব</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-emerald-200">নিরাপদ ক্যাম্পাস</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual School Banner & Live Counter Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Image Card */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-400/30 shadow-2xl bg-emerald-950/40 backdrop-blur-sm">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=900&auto=format&fit=crop"
                  alt="মোসলেমগঞ্জ উচ্চ বিদ্যালয় ক্যাম্পাস"
                  className="w-full h-72 sm:h-80 object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent" />

                <div className="absolute top-4 left-4">
                  <div className="p-2 rounded-xl bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 flex items-center gap-2.5">
                    <SchoolLogo size={36} />
                    <div>
                      <p className="text-xs font-bold text-white">মোসলেমগঞ্জ উচ্চ বিদ্যালয়</p>
                      <p className="text-[10px] text-emerald-300">স্থাপিত: ১৯৬৮ খ্রিস্টাব্দ</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 text-white">
                    <p className="text-xs font-semibold text-emerald-200">আমাদের অঙ্গীকার</p>
                    <p className="text-xs text-slate-100">
                      প্রত্যেক শিক্ষার্থীর সুপ্ত প্রতিভার বিকাশ ও আধুনিক তথ্যপ্রযুক্তিভিত্তিক মানসম্মত পাঠদান।
                    </p>
                  </div>
                </div>
              </div>

              {/* Float Stats Grid */}
              <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                <div className="bg-emerald-950/70 border border-emerald-500/20 rounded-xl p-2.5 backdrop-blur-sm">
                  <p className="text-lg sm:text-xl font-extrabold text-amber-400">১৯৬৮</p>
                  <p className="text-[10px] text-emerald-200 font-medium">প্রতিষ্ঠা</p>
                </div>
                <div className="bg-emerald-950/70 border border-emerald-500/20 rounded-xl p-2.5 backdrop-blur-sm">
                  <p className="text-lg sm:text-xl font-extrabold text-white">৮৫০+</p>
                  <p className="text-[10px] text-emerald-200 font-medium">শিক্ষার্থী</p>
                </div>
                <div className="bg-emerald-950/70 border border-emerald-500/20 rounded-xl p-2.5 backdrop-blur-sm">
                  <p className="text-lg sm:text-xl font-extrabold text-white">২৫+</p>
                  <p className="text-[10px] text-emerald-200 font-medium">শিক্ষক-কর্মী</p>
                </div>
                <div className="bg-emerald-950/70 border border-emerald-500/20 rounded-xl p-2.5 backdrop-blur-sm">
                  <p className="text-lg sm:text-xl font-extrabold text-emerald-400">১০০%</p>
                  <p className="text-[10px] text-emerald-200 font-medium">পাসের হার</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
