import React, { useState, useEffect } from 'react';
import {
  SchoolInfo,
  PrincipalMessage as PrincipalMessageType,
  Teacher,
  Student,
  RoutinePeriod,
  Examination,
  StudentResult,
  Notice,
  GalleryItem
} from './types';
import { dbService } from './services/dbService';

// Public Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { PrincipalMessage } from './components/PrincipalMessage';
import { TeacherDirectory } from './components/TeacherDirectory';
import { StudentDirectory } from './components/StudentDirectory';
import { ClassRoutineView } from './components/ClassRoutineView';
import { ResultSearch } from './components/ResultSearch';
import { NoticesSection } from './components/NoticesSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ArrowRight, Bell, Sparkles } from 'lucide-react';
import { supabase } from './supabase/client';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Application Data States
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo | null>(null);
  const [principalMessage, setPrincipalMessage] = useState<PrincipalMessageType | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [routines, setRoutines] = useState<RoutinePeriod[]>([]);
  const [exams, setExams] = useState<Examination[]>([]);
  const [results, setResults] = useState<StudentResult[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Restore Supabase admin session after refresh.
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setIsAdminLoggedIn(Boolean(data.session));
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdminLoggedIn(Boolean(session));
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  // Initial Load from Database Service
  useEffect(() => {
    async function loadData() {
      try {
        const [
          infoData,
          principalData,
          teachersData,
          studentsData,
          routinesData,
          examsData,
          resultsData,
          noticesData,
          galleryData
        ] = await Promise.all([
          dbService.getSchoolInfo(),
          dbService.getPrincipalMessage(),
          dbService.getTeachers(),
          dbService.getStudents(),
          dbService.getRoutines(),
          dbService.getExams(),
          dbService.getResults(),
          dbService.getNotices(),
          dbService.getGallery()
        ]);

        setSchoolInfo(infoData);
        setPrincipalMessage(principalData);
        setTeachers(teachersData);
        setStudents(studentsData);
        setRoutines(routinesData);
        setExams(examsData);
        setResults(resultsData);
        setNotices(noticesData);
        setGallery(galleryData);
      } catch (err) {
        console.error('Failed to load initial school data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Admin Data Modification Handlers
  const handleSaveTeacher = async (teacher: Teacher) => {
    await dbService.saveTeacher(teacher);
    setTeachers((prev) => {
      const idx = prev.findIndex((t) => t.id === teacher.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = teacher;
        return copy;
      }
      return [teacher, ...prev];
    });
    showToast('শিক্ষকের তথ্য সফলভাবে সংরক্ষণ করা হয়েছে');
  };

  const handleDeleteTeacher = async (id: string) => {
    await dbService.deleteTeacher(id);
    setTeachers((prev) => prev.filter((t) => t.id !== id));
    showToast('শিক্ষকের তথ্য মুছে ফেলা হয়েছে');
  };

  const handleSaveStudent = async (student: Student) => {
    await dbService.saveStudent(student);
    setStudents((prev) => {
      const idx = prev.findIndex((s) => s.id === student.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = student;
        return copy;
      }
      return [student, ...prev];
    });
    showToast('শিক্ষার্থীর তথ্য সফলভাবে সংরক্ষণ করা হয়েছে');
  };

  const handleDeleteStudent = async (id: string) => {
    await dbService.deleteStudent(id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
    showToast('শিক্ষার্থীর তথ্য মুছে ফেলা হয়েছে');
  };

  const handleSaveRoutine = async (routine: RoutinePeriod) => {
    await dbService.saveRoutine(routine);
    setRoutines((prev) => {
      const idx = prev.findIndex((r) => r.id === routine.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = routine;
        return copy;
      }
      return [...prev, routine];
    });
    showToast('ক্লাস রুটিন সফলভাবে আপডেট করা হয়েছে');
  };

  const handleDeleteRoutine = async (id: string) => {
    await dbService.deleteRoutine(id);
    setRoutines((prev) => prev.filter((r) => r.id !== id));
    showToast('রুটিন পিরিয়ড মুছে ফেলা হয়েছে');
  };

  const handleSaveExam = async (exam: Examination) => {
    await dbService.saveExam(exam);
    setExams((prev) => {
      const idx = prev.findIndex((e) => e.id === exam.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = exam;
        return copy;
      }
      return [exam, ...prev];
    });
    showToast('পরীক্ষার বিবরণ সংরক্ষণ করা হয়েছে');
  };

  const handleDeleteExam = async (id: string) => {
    await dbService.deleteExam(id);
    setExams((prev) => prev.filter((e) => e.id !== id));
    showToast('পরীক্ষা মুছে ফেলা হয়েছে');
  };

  const handleSaveResult = async (result: StudentResult) => {
    await dbService.saveResult(result);
    setResults((prev) => {
      const idx = prev.findIndex((r) => r.id === result.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = result;
        return copy;
      }
      return [result, ...prev];
    });
    showToast('ফলাফল ও মার্কশিট সংরক্ষণ করা হয়েছে');
  };

  const handleDeleteResult = async (id: string) => {
    await dbService.deleteResult(id);
    setResults((prev) => prev.filter((r) => r.id !== id));
    showToast('ফলাফল রেকর্ড মুছে ফেলা হয়েছে');
  };

  const handleSaveNotice = async (notice: Notice) => {
    await dbService.saveNotice(notice);
    setNotices((prev) => {
      const idx = prev.findIndex((n) => n.id === notice.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = notice;
        return copy;
      }
      return [notice, ...prev];
    });
    showToast('বিজ্ঞপ্তি সফলভাবে প্রকাশ করা হয়েছে');
  };

  const handleDeleteNotice = async (id: string) => {
    await dbService.deleteNotice(id);
    setNotices((prev) => prev.filter((n) => n.id !== id));
    showToast('বিজ্ঞপ্তি মুছে ফেলা হয়েছে');
  };

  const handleSaveGalleryItem = async (item: GalleryItem) => {
    await dbService.saveGalleryItem(item);
    setGallery((prev) => {
      const idx = prev.findIndex((g) => g.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = item;
        return copy;
      }
      return [item, ...prev];
    });
    showToast('ছবি গ্যালারিতে যুক্ত করা হয়েছে');
  };

  const handleDeleteGalleryItem = async (id: string) => {
    await dbService.deleteGalleryItem(id);
    setGallery((prev) => prev.filter((g) => g.id !== id));
    showToast('ছবি মুছে ফেলা হয়েছে');
  };

  const handleSaveInfo = async (info: SchoolInfo) => {
    await dbService.saveSchoolInfo(info);
    setSchoolInfo(info);
    showToast('বিদ্যালয়ের তথ্যাবলি সফলভাবে আপডেট করা হয়েছে');
  };

  const handleSavePrincipal = async (principal: PrincipalMessageType) => {
    await dbService.savePrincipalMessage(principal);
    setPrincipalMessage(principal);
    showToast('প্রধান শিক্ষকের বাণী সফলভাবে আপডেট করা হয়েছে');
  };

  if (loading || !schoolInfo || !principalMessage) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-base font-bold text-emerald-950 font-bengali">
            মোসলেমগঞ্জ উচ্চ বিদ্যালয়
          </p>
          <p className="text-xs text-slate-500">লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...</p>
        </div>
      </div>
    );
  }

  // If Admin panel is open
  if (activeTab === 'admin') {
    if (!isAdminLoggedIn) {
      return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center space-y-4">
            <h3 className="text-lg font-bold text-slate-900">প্রশাসনিক এক্সেস প্রয়োজন</h3>
            <p className="text-xs text-slate-600">
              অ্যাডমিন প্যানেলে প্রবেশের জন্য অনুগ্রহ করে লগইন করুন।
            </p>
            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={() => setActiveTab('home')}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
              >
                ওয়েবসাইটে ফিরুন
              </button>
              <button
                onClick={() => setIsAdminLoginOpen(true)}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-sm"
              >
                লগইন করুন
              </button>
            </div>
          </div>
          <AdminLoginModal
            isOpen={isAdminLoginOpen}
            onClose={() => {
              setIsAdminLoginOpen(false);
              if (!isAdminLoggedIn) setActiveTab('home');
            }}
            onLoginSuccess={() => {
              setIsAdminLoggedIn(true);
              setIsAdminLoginOpen(false);
            }}
          />
        </div>
      );
    }

    return (
      <AdminDashboard
        info={schoolInfo}
        principal={principalMessage}
        teachers={teachers}
        students={students}
        routines={routines}
        exams={exams}
        results={results}
        notices={notices}
        gallery={gallery}
        isUsingSupabase={dbService.isUsingSupabase}
        onLogout={async () => {
          if (supabase) await supabase.auth.signOut();
          setIsAdminLoggedIn(false);
          setActiveTab('home');
          showToast('সফলভাবে লগআউট হয়েছেন');
        }}
        onReturnToSite={() => setActiveTab('home')}
        onSaveTeacher={handleSaveTeacher}
        onDeleteTeacher={handleDeleteTeacher}
        onSaveStudent={handleSaveStudent}
        onDeleteStudent={handleDeleteStudent}
        onSaveRoutine={handleSaveRoutine}
        onDeleteRoutine={handleDeleteRoutine}
        onSaveExam={handleSaveExam}
        onDeleteExam={handleDeleteExam}
        onSaveResult={handleSaveResult}
        onDeleteResult={handleDeleteResult}
        onSaveNotice={handleSaveNotice}
        onDeleteNotice={handleDeleteNotice}
        onSaveGalleryItem={handleSaveGalleryItem}
        onDeleteGalleryItem={handleDeleteGalleryItem}
        onSaveInfo={handleSaveInfo}
        onSavePrincipal={handleSavePrincipal}
      />
    );
  }

  // Public View
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 font-sans selection:bg-emerald-800 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-700 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onAdminLogout={async () => {
          if (supabase) await supabase.auth.signOut();
          setIsAdminLoggedIn(false);
          showToast('সফলভাবে লগআউট হয়েছেন');
        }}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              latestNotice={notices.find((n) => n.isImportant) || notices[0]}
            />
            <AboutSection
              info={schoolInfo}
              isAdminLoggedIn={isAdminLoggedIn}
              onEditClick={() => setActiveTab('admin')}
            />
            <PrincipalMessage
              data={principalMessage}
              isAdminLoggedIn={isAdminLoggedIn}
              onEditClick={() => setActiveTab('admin')}
            />
            <TeacherDirectory
              teachers={teachers}
              isAdminLoggedIn={isAdminLoggedIn}
              onManageTeachersClick={() => setActiveTab('admin')}
            />
            <ResultSearch
              exams={exams}
              results={results}
              isAdminLoggedIn={isAdminLoggedIn}
              onManageResultsClick={() => setActiveTab('admin')}
            />
            <NoticesSection
              notices={notices}
              isAdminLoggedIn={isAdminLoggedIn}
              onManageNoticesClick={() => setActiveTab('admin')}
            />
            <GallerySection
              gallery={gallery}
              isAdminLoggedIn={isAdminLoggedIn}
              onManageGalleryClick={() => setActiveTab('admin')}
            />
            <ContactSection info={schoolInfo} />
          </>
        )}

        {activeTab === 'about' && (
          <AboutSection
            info={schoolInfo}
            isAdminLoggedIn={isAdminLoggedIn}
            onEditClick={() => setActiveTab('admin')}
          />
        )}

        {activeTab === 'teachers' && (
          <TeacherDirectory
            teachers={teachers}
            isAdminLoggedIn={isAdminLoggedIn}
            onManageTeachersClick={() => setActiveTab('admin')}
          />
        )}

        {activeTab === 'students' && (
          <StudentDirectory
            students={students}
            isAdminLoggedIn={isAdminLoggedIn}
            onManageStudentsClick={() => setActiveTab('admin')}
          />
        )}

        {activeTab === 'routine' && (
          <ClassRoutineView
            routines={routines}
            isAdminLoggedIn={isAdminLoggedIn}
            onManageRoutineClick={() => setActiveTab('admin')}
          />
        )}

        {activeTab === 'notices' && (
          <NoticesSection
            notices={notices}
            isAdminLoggedIn={isAdminLoggedIn}
            onManageNoticesClick={() => setActiveTab('admin')}
          />
        )}

        {activeTab === 'results' && (
          <ResultSearch
            exams={exams}
            results={results}
            isAdminLoggedIn={isAdminLoggedIn}
            onManageResultsClick={() => setActiveTab('admin')}
          />
        )}

        {activeTab === 'gallery' && (
          <GallerySection
            gallery={gallery}
            isAdminLoggedIn={isAdminLoggedIn}
            onManageGalleryClick={() => setActiveTab('admin')}
          />
        )}

        {activeTab === 'contact' && <ContactSection info={schoolInfo} />}
      </main>

      {/* Footer */}
      <Footer
        info={schoolInfo}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
      />

      {/* Admin Login Dialog */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdminLoggedIn(true);
          showToast('অ্যাডমিন হিসেবে সফলভাবে লগইন করেছেন');
          setActiveTab('admin');
        }}
      />
    </div>
  );
}
