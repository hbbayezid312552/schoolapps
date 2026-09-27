import React, { useState } from 'react';
import { SchoolInfo } from '../types';
import { BookOpen, History, Target, Compass, Trees, CheckCircle2, Award, Edit3 } from 'lucide-react';

interface AboutSectionProps {
  info: SchoolInfo;
  isAdminLoggedIn?: boolean;
  onEditClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ info, isAdminLoggedIn, onEditClick }) => {
  const [activeTab, setActiveTab] = useState<'intro' | 'history' | 'mission' | 'objectives' | 'environment'>('intro');

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-200">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>আমাদের পরিচিতি ও ঐতিহ্য</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-emerald-950 font-bengali">
            আমাদের সম্পর্কে
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            মোসলেমগঞ্জ উচ্চ বিদ্যালয়—আলোকিত সমাজ বিনির্মাণে এক বিশ্বস্ত বিদ্যাপীঠ।
          </p>
          {isAdminLoggedIn && onEditClick && (
            <button
              onClick={onEditClick}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-600" />
              <span>বিদ্যালয়ের তথ্য এডিট করুন (Admin)</span>
            </button>
          )}
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('intro')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'intro'
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>পরিচিতি</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'history'
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
            }`}
          >
            <History className="w-4 h-4" />
            <span>প্রতিষ্ঠার ইতিহাস</span>
          </button>

          <button
            onClick={() => setActiveTab('mission')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'mission'
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>মিশন ও ভিশন</span>
          </button>

          <button
            onClick={() => setActiveTab('objectives')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'objectives'
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>লক্ষ্য ও উদ্দেশ্য</span>
          </button>

          <button
            onClick={() => setActiveTab('environment')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'environment'
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
            }`}
          >
            <Trees className="w-4 h-4" />
            <span>বিদ্যালয়ের পরিবেশ</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-sm">
          {activeTab === 'intro' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">বিদ্যালয়ের পরিচিতি</span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {info.schoolNameBn} ({info.schoolNameEn})
                </h3>
                <p className="text-slate-700 leading-relaxed text-base">
                  {info.shortDescription}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <p className="text-xs text-slate-500">EIIN নম্বর</p>
                    <p className="text-base font-bold text-emerald-800">{info.eiinNumber}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <p className="text-xs text-slate-500">প্রতিষ্ঠাকাল</p>
                    <p className="text-base font-bold text-emerald-800">{info.establishedYear}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
                    <p className="text-xs text-slate-500">মূলনীতি</p>
                    <p className="text-sm font-bold text-amber-700">{info.motto}</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=700&auto=format&fit=crop"
                    alt="বিদ্যালয় পরিচিতি"
                    className="w-full h-56 object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-emerald-800">
                  <History className="w-5 h-5 text-amber-600" />
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">প্রতিষ্ঠার ইতিহাস</h3>
                </div>
                <p className="text-slate-700 leading-relaxed text-base whitespace-pre-line">
                  {info.history}
                </p>
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                  <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                    "১৯৬৮ সাল থেকে উত্তরবঙ্গের এক প্রত্যন্ত অঞ্চলে শিক্ষার আলো ছড়িয়ে দিতে এই প্রতিষ্ঠানটি যে ভূমিকা পালন করেছে তা চিরস্মরণীয়।"
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=700&auto=format&fit=crop"
                    alt="প্রতিষ্ঠার ইতিহাস"
                    className="w-full h-56 object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mission' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-xl border border-emerald-100 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Target className="w-5 h-5 text-emerald-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">আমাদের মিশন (Mission)</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {info.mission}
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl border border-teal-100 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                  <Compass className="w-5 h-5 text-teal-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">আমাদের ভিশন (Vision)</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {info.vision}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'objectives' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">আমাদের লক্ষ্য ও উদ্দেশ্য</h3>
              <p className="text-slate-600 text-sm">
                বিদ্যালয়টি নিম্নোক্ত সুনির্দিষ্ট লক্ষ্য ও উদ্দেশ্য বাস্তবায়নে অঙ্গীকারাবদ্ধ:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {info.objectives.map((obj, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 font-medium leading-relaxed">{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'environment' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-emerald-800">
                  <Trees className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">বিদ্যালয়ের মনোরম পরিবেশ</h3>
                </div>
                <p className="text-slate-700 leading-relaxed text-base">
                  {info.campusEnvironment}
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <p className="text-xs text-slate-500">ক্যাম্পাস আয়তন</p>
                    <p className="text-sm font-bold text-emerald-800">৩ একর উন্মুক্ত প্রাঙ্গণ</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <p className="text-xs text-slate-500">বিশেষ সুবিধা</p>
                    <p className="text-sm font-bold text-emerald-800">মাল্টিমিডিয়া ল্যাব ও খেলার মাঠ</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=700&auto=format&fit=crop"
                    alt="বিদ্যালয়ের পরিবেশ"
                    className="w-full h-56 object-cover"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
