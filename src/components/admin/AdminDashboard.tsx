import React, { useState } from 'react';
import {
  SchoolInfo,
  PrincipalMessage,
  Teacher,
  Student,
  RoutinePeriod,
  Examination,
  StudentResult,
  Notice,
  GalleryItem
} from '../../types';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Calendar,
  Award,
  FileText,
  Bell,
  Image,
  School,
  Database,
  LogOut,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { SchoolLogo } from '../SchoolLogo';
import { AdminTeachers } from './AdminTeachers';
import { AdminStudents } from './AdminStudents';
import { AdminRoutines } from './AdminRoutines';
import { AdminExams } from './AdminExams';
import { AdminResults } from './AdminResults';
import { AdminNotices } from './AdminNotices';
import { AdminGallery } from './AdminGallery';
import { AdminSchoolInfo } from './AdminSchoolInfo';
import { toBengaliNumber } from '../../utils/gradeCalculator';

interface AdminDashboardProps {
  info: SchoolInfo;
  principal: PrincipalMessage;
  teachers: Teacher[];
  students: Student[];
  routines: RoutinePeriod[];
  exams: Examination[];
  results: StudentResult[];
  notices: Notice[];
  gallery: GalleryItem[];
  isUsingSupabase: boolean;
  onLogout: () => void;
  onReturnToSite: () => void;
  // Handlers
  onSaveTeacher: (t: Teacher) => Promise<void>;
  onDeleteTeacher: (id: string) => Promise<void>;
  onSaveStudent: (s: Student) => Promise<void>;
  onDeleteStudent: (id: string) => Promise<void>;
  onSaveRoutine: (r: RoutinePeriod) => Promise<void>;
  onDeleteRoutine: (id: string) => Promise<void>;
  onSaveExam: (e: Examination) => Promise<void>;
  onDeleteExam: (id: string) => Promise<void>;
  onSaveResult: (res: StudentResult) => Promise<void>;
  onDeleteResult: (id: string) => Promise<void>;
  onSaveNotice: (n: Notice) => Promise<void>;
  onDeleteNotice: (id: string) => Promise<void>;
  onSaveGalleryItem: (g: GalleryItem) => Promise<void>;
  onDeleteGalleryItem: (id: string) => Promise<void>;
  onSaveInfo: (inf: SchoolInfo) => Promise<void>;
  onSavePrincipal: (p: PrincipalMessage) => Promise<void>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
  const [activeTab, setActiveTab] = useState<string>('overview');

  const navTabs = [
    { id: 'overview', label: 'ওভারভিউ', icon: LayoutDashboard },
    { id: 'students', label: 'শিক্ষার্থী', icon: Users, badge: props.students.length },
    { id: 'teachers', label: 'শিক্ষকবৃন্দ', icon: GraduationCap, badge: props.teachers.length },
    { id: 'results', label: 'ফলাফল ও মার্কশিট', icon: FileText, badge: props.results.length },
    { id: 'exams', label: 'পরীক্ষা', icon: Award, badge: props.exams.length },
    { id: 'routines', label: 'ক্লাস রুটিন', icon: Calendar, badge: props.routines.length },
    { id: 'notices', label: 'নোটিশ বোর্ড', icon: Bell, badge: props.notices.length },
    { id: 'gallery', label: 'ফটো গ্যালারি', icon: Image, badge: props.gallery.length },
    { id: 'info', label: 'বিদ্যালয় ও বাণী', icon: School },
    { id: 'database', label: 'ক্লাউড স্টোরেজ', icon: Database }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-emerald-950 text-white border-b border-emerald-900 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={props.onReturnToSite}
              className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900 flex items-center gap-1.5 text-xs font-semibold"
              title="ওয়েবসাইটে ফিরে যান"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">ওয়েবসাইটে ফিরে যান</span>
            </button>
            <div className="h-6 w-px bg-emerald-800 hidden sm:block" />
            <div className="flex items-center gap-2">
              <SchoolLogo size={36} />
              <div>
                <h1 className="text-sm sm:text-base font-bold font-bengali leading-tight">
                  মোসলেমগঞ্জ উচ্চ বিদ্যালয়
                </h1>
                <p className="text-[10px] text-amber-300 font-medium">প্রশাসনিক কন্ট্রোল প্যানেল (Admin Panel)</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-800 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-200">
                {props.isUsingSupabase ? 'Supabase Cloud Connected' : 'Local Storage Engine'}
              </span>
            </div>

            <button
              onClick={props.onLogout}
              className="px-3 py-1.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>লগআউট</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        {/* Navigation Tabs Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm mb-6 overflow-x-auto flex items-center gap-1">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-emerald-800 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab View Routing */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-semibold">মোট নথিভুক্ত শিক্ষার্থী</p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">
                    {toBengaliNumber(props.students.length)} জন
                  </p>
                  <p className="text-[11px] text-emerald-600 mt-0.5">৬ষ্ঠ - ১০ম শ্রেণি</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-semibold">শিক্ষক ও স্টাফ</p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">
                    {toBengaliNumber(props.teachers.length)} জন
                  </p>
                  <p className="text-[11px] text-emerald-600 mt-0.5">অভিজ্ঞ শিক্ষকমণ্ডলী</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                  <GraduationCap className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-semibold">প্রকাশিত ফলাফল</p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">
                    {toBengaliNumber(props.results.length)} টি
                  </p>
                  <p className="text-[11px] text-emerald-600 mt-0.5">ডিজিটাল মার্কশিট সক্রিয়</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <FileText className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-semibold">মোট পরীক্ষা ও রুটিন</p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">
                    {toBengaliNumber(props.exams.length)} টি
                  </p>
                  <p className="text-[11px] text-emerald-600 mt-0.5">{toBengaliNumber(props.routines.length)} টি রুটিন পিরিয়ড</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Quick Action Shortcuts */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h4 className="text-base font-bold text-slate-900">দ্রুত প্রশাসনিক কাজ (Quick Actions)</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => setActiveTab('students')}
                  className="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-left transition-colors"
                >
                  <Users className="w-5 h-5 text-emerald-700 mb-2" />
                  <p className="text-xs font-bold text-slate-800">শিক্ষার্থী ভর্তি</p>
                  <p className="text-[10px] text-slate-500">নতুন তথ্য যুক্ত করুন</p>
                </button>

                <button
                  onClick={() => setActiveTab('results')}
                  className="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-left transition-colors"
                >
                  <FileText className="w-5 h-5 text-emerald-700 mb-2" />
                  <p className="text-xs font-bold text-slate-800">নম্বর এন্ট্রি</p>
                  <p className="text-[10px] text-slate-500">ফলাফল তৈরি করুন</p>
                </button>

                <button
                  onClick={() => setActiveTab('notices')}
                  className="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-left transition-colors"
                >
                  <Bell className="w-5 h-5 text-emerald-700 mb-2" />
                  <p className="text-xs font-bold text-slate-800">জরুরি নোটিশ</p>
                  <p className="text-[10px] text-slate-500">বিজ্ঞপ্তি প্রকাশ করুন</p>
                </button>

                <button
                  onClick={() => setActiveTab('routines')}
                  className="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-left transition-colors"
                >
                  <Calendar className="w-5 h-5 text-emerald-700 mb-2" />
                  <p className="text-xs font-bold text-slate-800">ক্লাস রুটিন</p>
                  <p className="text-[10px] text-slate-500">রুটিন আপডেট করুন</p>
                </button>
              </div>
            </div>

            {/* School Profile Card */}
            <div className="bg-emerald-950 text-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <SchoolLogo size={60} />
                <div>
                  <h4 className="text-lg font-bold font-bengali text-amber-300">{props.info.schoolNameBn}</h4>
                  <p className="text-xs text-emerald-200">{props.info.schoolNameEn} | EIIN: {props.info.eiinNumber}</p>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    প্রধান শিক্ষক: <span className="font-bold text-white">{props.principal.name}</span> ({props.principal.qualification})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('info')}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-emerald-950 rounded-xl text-xs font-bold transition-all shrink-0"
              >
                বিদ্যালয়ের তথ্য এডিট করুন
              </button>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <AdminStudents
            students={props.students}
            onSaveStudent={props.onSaveStudent}
            onDeleteStudent={props.onDeleteStudent}
          />
        )}

        {activeTab === 'teachers' && (
          <AdminTeachers
            teachers={props.teachers}
            onSaveTeacher={props.onSaveTeacher}
            onDeleteTeacher={props.onDeleteTeacher}
          />
        )}

        {activeTab === 'results' && (
          <AdminResults
            results={props.results}
            exams={props.exams}
            students={props.students}
            onSaveResult={props.onSaveResult}
            onDeleteResult={props.onDeleteResult}
          />
        )}

        {activeTab === 'exams' && (
          <AdminExams
            exams={props.exams}
            onSaveExam={props.onSaveExam}
            onDeleteExam={props.onDeleteExam}
          />
        )}

        {activeTab === 'routines' && (
          <AdminRoutines
            routines={props.routines}
            teachers={props.teachers}
            onSaveRoutine={props.onSaveRoutine}
            onDeleteRoutine={props.onDeleteRoutine}
          />
        )}

        {activeTab === 'notices' && (
          <AdminNotices
            notices={props.notices}
            onSaveNotice={props.onSaveNotice}
            onDeleteNotice={props.onDeleteNotice}
          />
        )}

        {activeTab === 'gallery' && (
          <AdminGallery
            gallery={props.gallery}
            onSaveGalleryItem={props.onSaveGalleryItem}
            onDeleteGalleryItem={props.onDeleteGalleryItem}
          />
        )}

        {activeTab === 'info' && (
          <AdminSchoolInfo
            info={props.info}
            principal={props.principal}
            onSaveInfo={props.onSaveInfo}
            onSavePrincipal={props.onSavePrincipal}
          />
        )}

        {activeTab === 'database' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <Database className="w-6 h-6 text-emerald-700" />
              <div>
                <h4 className="text-lg font-bold text-slate-900">ক্লাউড ডেটাবেস ও স্টোরেজ সংযোগ স্ট্যাটাস</h4>
                <p className="text-xs text-slate-500">Supabase Database & Storage কনফিগারেশন</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-700">বর্তমান স্টোরেজ মোড:</span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-bold text-emerald-950">
                    {props.isUsingSupabase ? 'Supabase Cloud (সক্রিয়)' : 'Local Storage Engine (অফলাইন ও ডেভেলপমেন্ট রেডি)'}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  ডেটাবেস সার্ভিস স্বয়ংক্রিয়ভাবে ক্লাউড এবং ব্রাউজার স্টোরেজের মধ্যে রিঅ্যাক্টিভ সিঙ্ক বজায় রাখে।
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                <span className="text-xs font-bold text-emerald-900">গিটহাব পেজেস ডিপ্লয়মেন্ট:</span>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  এই অ্যাপ্লিকেশনটি সম্পূর্ণ ক্লায়েন্ট সাইড এবং পিওর স্ট্যাটিক রিয়াক্ট অ্যাপ যা গিটহাব পেজেস (GitHub Pages) এ সহজে ডেপ্লয় করা যাবে।
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
