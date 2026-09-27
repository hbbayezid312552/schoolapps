import React, { useState } from 'react';
import { Notice } from '../types';
import { Bell, Calendar, FileText, Download, ChevronRight, X, Search, PlusCircle } from 'lucide-react';

interface NoticesSectionProps {
  notices: Notice[];
  isAdminLoggedIn?: boolean;
  onManageNoticesClick?: () => void;
}

export const NoticesSection: React.FC<NoticesSectionProps> = ({
  notices,
  isAdminLoggedIn,
  onManageNoticesClick
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('সব');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNotice, setActiveNotice] = useState<Notice | null>(null);

  const categories = ['সব', 'একাডেমিক', 'পরীক্ষা', 'ছুটি', 'সাধারণ'];

  const filteredNotices = notices.filter((n) => {
    const matchCat = selectedCategory === 'সব' || n.category === selectedCategory;
    const matchSearch =
      !searchQuery ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-200">
              <Bell className="w-3.5 h-3.5 text-amber-500" />
              <span>জরুরি তথ্য ও সার্কুলার</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-emerald-950 font-bengali">
              নোটিশ বোর্ড
            </h2>
            <p className="mt-1 text-slate-600 text-sm sm:text-base">
              বিদ্যালয়ের সাম্প্রতিক পরীক্ষা, ভর্তি ও একাডেমিক বিষয়ক বিজ্ঞপ্তি।
            </p>
          </div>

          {isAdminLoggedIn && onManageNoticesClick && (
            <button
              onClick={onManageNoticesClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition-all shrink-0"
            >
              <PlusCircle className="w-4 h-4 text-emerald-200" />
              <span>নোটিশ পরিচালনা (Admin)</span>
            </button>
          )}
        </div>

        {/* Filter & Search */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="নোটিশের শিরোনাম বা বিষয় দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Notices List */}
        {filteredNotices.length > 0 ? (
          <div className="space-y-3">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                onClick={() => setActiveNotice(notice)}
                className="cursor-pointer p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 shrink-0 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {notice.category}
                      </span>
                      {notice.isImportant && (
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 animate-pulse">
                          জরুরি
                        </span>
                      )}
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {notice.date}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {notice.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{notice.content}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 shrink-0 group-hover:text-emerald-900">
                  <span>বিজ্ঞপ্তি দেখুন</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-slate-700">কোনো নোটিশ পাওয়া যায়নি</h4>
            <p className="text-xs text-slate-500 mt-1">অন্য কোনো ক্যাটাগরি নির্বাচন করুন।</p>
          </div>
        )}
      </div>

      {/* Notice Detail Modal */}
      {activeNotice && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-emerald-100 animate-in fade-in zoom-in-95">
            <div className="bg-emerald-900 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-300 font-bold block">{activeNotice.category} বিজ্ঞপ্তি</span>
                <p className="text-xs text-emerald-200 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5" />
                  প্রকাশের তারিখ: {activeNotice.date}
                </p>
              </div>
              <button
                onClick={() => setActiveNotice(null)}
                className="p-1.5 text-emerald-200 hover:text-white rounded-full hover:bg-emerald-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                {activeNotice.title}
              </h3>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {activeNotice.content}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-500 font-medium">আদেশক্রমে: প্রধান শিক্ষক</span>
                <button
                  onClick={() => setActiveNotice(null)}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
