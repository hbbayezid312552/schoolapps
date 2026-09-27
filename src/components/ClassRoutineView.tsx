import React, { useState } from 'react';
import { RoutinePeriod, ClassGrade } from '../types';
import { Calendar, Printer, Clock, BookOpen, User, PlusCircle } from 'lucide-react';
import { SchoolLogo } from './SchoolLogo';

interface ClassRoutineViewProps {
  routines: RoutinePeriod[];
  isAdminLoggedIn?: boolean;
  onManageRoutineClick?: () => void;
}

export const ClassRoutineView: React.FC<ClassRoutineViewProps> = ({
  routines,
  isAdminLoggedIn,
  onManageRoutineClick
}) => {
  const [selectedClass, setSelectedClass] = useState<ClassGrade>('১০ম');
  const [selectedDay, setSelectedDay] = useState<string>('সব দিন');

  const classes: ClassGrade[] = ['৬ষ্ঠ', '৭ম', '৮ম', '৯ম', '১০ম'];
  const days = ['সব দিন', 'শনিবার', 'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার'];

  const periodsList = ['১ম', '২য়', '৩য়', '৪র্থ', '৫ম', '৬ষ্ঠ'];

  // Filter routine by class and day
  const filteredRoutines = routines.filter((r) => {
    const matchClass = r.class === selectedClass;
    const matchDay = selectedDay === 'সব দিন' || r.day === selectedDay;
    return matchClass && matchDay;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 no-print">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-200">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span>একাডেমিক ক্লাস শিডিউল</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-emerald-950 font-bengali">
              ক্লাস রুটিন
            </h2>
            <p className="mt-1 text-slate-600 text-sm sm:text-base">
              ৬ষ্ঠ থেকে ১০ম শ্রেণির সাপ্তাহিক পাঠদান সময়সূচি।
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition-all"
            >
              <Printer className="w-4 h-4 text-emerald-200" />
              <span>রুটিন প্রিন্ট করুন (Print Routine)</span>
            </button>

            {isAdminLoggedIn && onManageRoutineClick && (
              <button
                onClick={onManageRoutineClick}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-all shrink-0"
              >
                <PlusCircle className="w-4 h-4 text-amber-600" />
                <span>রুটিন সম্পাদনা (Admin)</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls (No Print) */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 mb-8 space-y-4 no-print">
          {/* Class Select Tabs */}
          <div>
            <span className="text-xs font-semibold text-slate-500 block mb-2">শ্রেণি নির্বাচন করুন:</span>
            <div className="flex flex-wrap gap-2">
              {classes.map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    selectedClass === cls
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50'
                  }`}
                >
                  {cls} শ্রেণি
                </button>
              ))}
            </div>
          </div>

          {/* Day Select Tabs */}
          <div className="pt-2 border-t border-slate-200/70">
            <span className="text-xs font-semibold text-slate-500 block mb-2">বার / দিন নির্বাচন করুন:</span>
            <div className="flex flex-wrap gap-1.5">
              {days.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDay(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedDay === d
                      ? 'bg-teal-700 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-teal-50'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Printable Routine Layout */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden print-container">
          {/* Print Header (Only visible on print or nicely framed) */}
          <div className="p-6 bg-emerald-900 text-white flex items-center justify-between border-b border-emerald-950">
            <div className="flex items-center gap-3">
              <SchoolLogo size={48} />
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-bengali">মোসলেমগঞ্জ উচ্চ বিদ্যালয়</h3>
                <p className="text-xs text-emerald-200">
                  সাপ্তাহিক ক্লাস রুটিন • শ্রেণি: <span className="text-amber-300 font-bold">{selectedClass} শ্রেণি</span>
                </p>
              </div>
            </div>
            <div className="text-right text-xs text-emerald-200 hidden sm:block">
              <p>শিক্ষাবর্ষ: ২০২৪-২৫</p>
              <p>EIIN: ১২৮৪৫৬</p>
            </div>
          </div>

          {/* Table */}
          {filteredRoutines.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 text-xs font-bold border-b border-slate-200">
                    <th className="py-3.5 px-4 text-center w-28">বার / দিন</th>
                    <th className="py-3.5 px-4 text-center w-20">পিরিয়ড</th>
                    <th className="py-3.5 px-4 w-36">সময়</th>
                    <th className="py-3.5 px-4">পাঠ্য বিষয় (Subject)</th>
                    <th className="py-3.5 px-4">বিষয় শিক্ষক (Teacher)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRoutines.map((item, idx) => (
                    <tr
                      key={item.id}
                      className={`hover:bg-emerald-50/50 transition-colors ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                      }`}
                    >
                      <td className="py-3.5 px-4 text-center font-bold text-emerald-900">
                        {item.day}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                          {item.period}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>{item.time}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-emerald-600" />
                          <span>{item.subject}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.teacher}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16 p-6">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-base font-semibold text-slate-700">রুটিন পাওয়া যায়নি</h4>
              <p className="text-xs text-slate-500 mt-1">
                নির্বাচিত শ্রেণি ও বারের জন্য এখনো কোনো ক্লাস রুটিন যুক্ত করা হয়নি।
              </p>
            </div>
          )}

          {/* Routine Footer Notice */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>* বিশেষ প্রয়োজনে বা পরীক্ষার সময় রুটিন পরিবর্তনযোগ্য।</span>
            <span className="font-semibold text-emerald-800">স্বাক্ষরিত: প্রধান শিক্ষক, মোসলেমগঞ্জ উচ্চ বিদ্যালয়</span>
          </div>
        </div>
      </div>
    </section>
  );
};
