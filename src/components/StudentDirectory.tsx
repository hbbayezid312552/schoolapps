import React, { useState } from 'react';
import { Student, ClassGrade } from '../types';
import { Search, UserCheck, ShieldCheck, IdCard, Users, ExternalLink, GraduationCap, X } from 'lucide-react';
import { toBengaliNumber } from '../utils/gradeCalculator';
import { SchoolLogo } from './SchoolLogo';

interface StudentDirectoryProps {
  students: Student[];
  isAdminLoggedIn?: boolean;
  onManageStudentsClick?: () => void;
}

export const StudentDirectory: React.FC<StudentDirectoryProps> = ({
  students,
  isAdminLoggedIn,
  onManageStudentsClick
}) => {
  const [selectedClass, setSelectedClass] = useState<string>('সব');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewStudent, setPreviewStudent] = useState<Student | null>(null);

  const classesList: string[] = ['সব', '৬ষ্ঠ', '৭ম', '৮ম', '৯ম', '১০ম'];

  const filteredStudents = students.filter((s) => {
    const matchesClass = selectedClass === 'সব' || s.class === selectedClass;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      s.name.toLowerCase().includes(q) ||
      String(s.roll).includes(q) ||
      toBengaliNumber(s.roll).includes(q) ||
      s.studentId.toLowerCase().includes(q);

    return matchesClass && matchesSearch;
  });

  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-200">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
              <span>ডিজিটাল শিক্ষার্থী ডিরেক্টরি</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-emerald-950 font-bengali">
              শিক্ষার্থী তালিকা
            </h2>
            <p className="mt-1 text-slate-600 text-sm sm:text-base">
              ৬ষ্ঠ থেকে ১০ম শ্রেণির সকল নিয়মিত শিক্ষার্থীদের তথ্যাবলি অনুসন্ধান করুন।
            </p>
          </div>

          {isAdminLoggedIn && onManageStudentsClick && (
            <button
              onClick={onManageStudentsClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition-all shrink-0"
            >
              <Users className="w-4 h-4 text-emerald-200" />
              <span>শিক্ষার্থী ব্যবস্থাপনা (সম্পূর্ণ তথ্য)</span>
            </button>
          )}
        </div>

        {/* Privacy Assurance Notice Box */}
        <div className="mb-8 p-3.5 sm:p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
          <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
            <span className="font-bold">গোপনীয়তা সুরক্ষা নোটিশ:</span> শিক্ষার্থীদের ব্যক্তিগত নিরাপত্তা বজায় রাখার স্বার্থে অভিভাবকের মোবাইল নম্বর, জন্মতারিখ ও পূর্ণ ঠিকানা পাবলিক তালিকায় প্রদর্শন করা হয় না। এই তথ্যগুলো কেবল অনুমোদিত প্রশাসন কর্তৃক সংরক্ষিত।
          </p>
        </div>

        {/* Search & Class Filter Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="শিক্ষার্থীর নাম, রোল বা স্টুডেন্ট আইডি দিয়ে খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Class Pill Filters */}
            <div className="md:col-span-6 flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs font-semibold text-slate-500 shrink-0 mr-1">শ্রেণি নির্বাচন:</span>
              {classesList.map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    selectedClass === cls
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-emerald-50'
                  }`}
                >
                  {cls === 'সব' ? 'সব শ্রেণি' : `${cls} শ্রেণি`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Public Student Grid (Strictly only: Photo, Name, Class, Roll, Student ID) */}
        {filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all p-5 flex flex-col items-center text-center group"
              >
                {/* Photo */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-500 shadow-sm mb-3.5 bg-slate-100">
                  <img
                    src={student.photoUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop'}
                    alt={student.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Name */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {student.name}
                </h3>

                {/* ID & Badges */}
                <span className="mt-1 text-xs text-slate-400 font-mono bg-slate-100 px-2 py-0.5 rounded">
                  {student.studentId}
                </span>

                {/* Class & Roll Badges */}
                <div className="mt-3 grid grid-cols-2 gap-2 w-full pt-3 border-t border-slate-100">
                  <div className="bg-emerald-50/70 p-2 rounded-xl text-center">
                    <p className="text-[10px] text-slate-500 font-medium">শ্রেণি</p>
                    <p className="text-sm font-bold text-emerald-900">{student.class} {student.section && `(${student.section})`}</p>
                  </div>
                  <div className="bg-amber-50/70 p-2 rounded-xl text-center">
                    <p className="text-[10px] text-slate-500 font-medium">রোল নং</p>
                    <p className="text-sm font-bold text-amber-900">{toBengaliNumber(student.roll)}</p>
                  </div>
                </div>

                {/* Digital Card Preview Modal trigger */}
                <button
                  onClick={() => setPreviewStudent(student)}
                  className="mt-3.5 w-full py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <IdCard className="w-3.5 h-3.5" />
                  <span>আইডি কার্ড প্রিভিউ</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
            <UserCheck className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-700">কোনো শিক্ষার্থী পাওয়া যায়নি</h3>
            <p className="text-xs text-slate-500 mt-1">অনুসন্ধানের কি-ওয়ার্ড বা শ্রেণি ফিল্টার পরিবর্তন করুন।</p>
          </div>
        )}
      </div>

      {/* Digital Student ID Badge Modal Preview */}
      {previewStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-emerald-100 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-emerald-800 text-white p-4 relative text-center">
              <button
                onClick={() => setPreviewStudent(null)}
                className="absolute top-3 right-3 text-emerald-200 hover:text-white p-1 rounded-full hover:bg-emerald-700/50"
              >
                <X className="w-5 h-5" />
              </button>
              <SchoolLogo size={42} className="mx-auto mb-1.5" />
              <h4 className="text-sm font-bold font-bengali">মোসলেমগঞ্জ উচ্চ বিদ্যালয়</h4>
              <p className="text-[10px] text-emerald-200">ডিজিটাল শিক্ষার্থী পরিচয়পত্র (Student ID Card)</p>
            </div>

            {/* Body */}
            <div className="p-6 text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden border-2 border-emerald-600 shadow-md">
                <img
                  src={previewStudent.photoUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop'}
                  alt={previewStudent.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">{previewStudent.name}</h3>
                <p className="text-xs font-mono text-emerald-700 font-semibold">{previewStudent.studentId}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">শ্রেণি:</span>
                  <span className="font-bold text-slate-800">{previewStudent.class} শ্রেণি</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">শাখা / গ্রুপ:</span>
                  <span className="font-bold text-slate-800">{previewStudent.section || 'ক'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">রোল নম্বর:</span>
                  <span className="font-bold text-slate-800">{toBengaliNumber(previewStudent.roll)}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">ভর্তির বছর:</span>
                  <span className="font-bold text-slate-800">{toBengaliNumber(previewStudent.admissionYear)}</span>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 italic">
                * শিক্ষার্থীর সংবেদনশীল তথ্য বিদ্যালয়ের মূল রেজিস্টারে সংরক্ষিত।
              </p>

              <button
                onClick={() => setPreviewStudent(null)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
