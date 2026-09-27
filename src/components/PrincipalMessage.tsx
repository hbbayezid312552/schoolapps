import React from 'react';
import { PrincipalMessage as PrincipalMessageType } from '../types';
import { Quote, Award, Edit3 } from 'lucide-react';

interface PrincipalMessageProps {
  data: PrincipalMessageType;
  isAdminLoggedIn?: boolean;
  onEditClick?: () => void;
}

export const PrincipalMessage: React.FC<PrincipalMessageProps> = ({ data, isAdminLoggedIn, onEditClick }) => {
  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm overflow-hidden p-6 sm:p-10 lg:p-12 relative">
          {/* Subtle quotation background watermark */}
          <Quote className="absolute right-6 bottom-6 w-32 h-32 text-emerald-100/60 pointer-events-none -scale-x-100" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Photo and designation */}
            <div className="lg:col-span-4 text-center">
              <div className="relative inline-block">
                <div className="w-48 h-56 sm:w-56 sm:h-64 mx-auto rounded-2xl overflow-hidden shadow-lg border-4 border-white ring-4 ring-emerald-100">
                  <img
                    src={data.photoUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop'}
                    alt={data.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-800 text-white shadow-md">
                    {data.designation}
                  </span>
                </div>
              </div>

              <div className="mt-5 space-y-1">
                <h3 className="text-xl font-bold text-slate-900 font-bengali">
                  {data.name}
                </h3>
                <p className="text-xs text-emerald-700 font-medium">
                  {data.qualification}
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  মোসলেমগঞ্জ উচ্চ বিদ্যালয়, নওগাঁ
                </p>
              </div>

              {isAdminLoggedIn && onEditClick && (
                <button
                  onClick={onEditClick}
                  className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                  <span>বাণী আপডেট করুন (Admin)</span>
                </button>
              )}
            </div>

            {/* Right: Message Content */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>নেতৃত্ব ও দিকনির্দেশনা</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-bengali leading-snug">
                প্রধান শিক্ষকের বাণী
              </h2>

              <div className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-3 font-normal">
                {data.message}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">{data.name}</p>
                  <p className="text-xs text-slate-500">{data.designation}, মোসলেমগঞ্জ উচ্চ বিদ্যালয়</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-700 font-semibold italic">
                    "সততা ও নিষ্ঠাই শিক্ষার প্রাণ"
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
