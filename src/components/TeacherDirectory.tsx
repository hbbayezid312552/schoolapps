import React, { useState } from 'react';
import { Teacher } from '../types';
import { Phone, Mail, Award, BookOpen, GraduationCap, Search, UserCheck, PlusCircle } from 'lucide-react';

interface TeacherDirectoryProps {
  teachers: Teacher[];
  isAdminLoggedIn?: boolean;
  onManageTeachersClick?: () => void;
}

export const TeacherDirectory: React.FC<TeacherDirectoryProps> = ({
  teachers,
  isAdminLoggedIn,
  onManageTeachersClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('সব');

  // Extract unique subjects
  const subjects = ['সব', ...Array.from(new Set(teachers.map((t) => t.subject.split(' ')[0])))];

  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.designation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'সব' || t.subject.includes(selectedSubject);
    return matchesSearch && matchesSubject;
  });

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-200">
              <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
              <span>নিবেদিতপ্রাণ শিক্ষকমণ্ডলী</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-emerald-950 font-bengali">
              শিক্ষকবৃন্দ
            </h2>
            <p className="mt-1 text-slate-600 text-sm sm:text-base">
              দক্ষ, অভিজ্ঞ ও স্নেহশীল শিক্ষকমণ্ডলীর প্রত্যক্ষ তত্ত্বাবধানে পরিচালিত আমাদের বিদ্যাপীঠ।
            </p>
          </div>

          {isAdminLoggedIn && onManageTeachersClick && (
            <button
              onClick={onManageTeachersClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition-all shrink-0"
            >
              <PlusCircle className="w-4 h-4 text-emerald-200" />
              <span>শিক্ষক তথ্য পরিচালনা (Admin)</span>
            </button>
          )}
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="শিক্ষকের নাম বা পদবি দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <span className="text-xs font-semibold text-slate-500 shrink-0 mr-1">বিষয়:</span>
            {subjects.slice(0, 6).map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedSubject === sub
                    ? 'bg-emerald-700 text-white'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Teacher Cards Responsive Grid:
            Desktop: 4 cards per row (lg:grid-cols-4)
            Tablet: 2 cards per row (sm:grid-cols-2)
            Mobile: 1 card per row (grid-cols-1)
        */}
        {filteredTeachers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group"
              >
                {/* Teacher Photo */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <img
                    src={teacher.photoUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop'}
                    alt={teacher.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-800/90 text-white backdrop-blur-sm shadow-sm">
                      {teacher.designation}
                    </span>
                  </div>
                </div>

                {/* Teacher Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {teacher.name}
                    </h3>

                    <div className="space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>বিষয়: {teacher.subject}</span>
                      </div>
                      <div className="flex items-start gap-1.5 text-slate-600">
                        <Award className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>যোগ্যতা: {teacher.qualification}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-3 pt-1 border-t border-slate-100 leading-relaxed">
                      {teacher.bio}
                    </p>
                  </div>

                  {/* Contact Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <a
                      href={`tel:${teacher.mobile}`}
                      className="inline-flex items-center gap-1 text-emerald-700 font-semibold hover:text-emerald-850 hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{teacher.mobile}</span>
                    </a>

                    {teacher.email && (
                      <a
                        href={`mailto:${teacher.email}`}
                        title={teacher.email}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-md hover:bg-emerald-50 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <UserCheck className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-700">কোনো শিক্ষক পাওয়া যায়নি</h3>
            <p className="text-xs text-slate-500 mt-1">অনুসন্ধান বা ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।</p>
          </div>
        )}
      </div>
    </section>
  );
};
