import React, { useState } from 'react';
import { Examination, StudentResult, ClassGrade } from '../types';
import { Search, Printer, Download, Award, CheckCircle2, AlertCircle, FileText, ChevronRight, School } from 'lucide-react';
import { SchoolLogo } from './SchoolLogo';
import { toBengaliNumber } from '../utils/gradeCalculator';

interface ResultSearchProps {
  exams: Examination[];
  results: StudentResult[];
  isAdminLoggedIn?: boolean;
  onManageResultsClick?: () => void;
}

export const ResultSearch: React.FC<ResultSearchProps> = ({
  exams,
  results,
  isAdminLoggedIn,
  onManageResultsClick
}) => {
  const [selectedExamId, setSelectedExamId] = useState<string>(exams[0]?.id || '');
  const [selectedClass, setSelectedClass] = useState<ClassGrade>('১০ম');
  const [rollNumber, setRollNumber] = useState<string>('');
  const [studentIdInput, setStudentIdInput] = useState<string>('');

  const [searchedResult, setSearchedResult] = useState<StudentResult | null>(null);
  const [searchAttempted, setSearchAttempted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const classes: ClassGrade[] = ['৬ষ্ঠ', '৭ম', '৮ম', '৯ম', '১০ম'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchAttempted(true);
    setErrorMessage('');
    setSearchedResult(null);

    if (!rollNumber.trim() && !studentIdInput.trim()) {
      setErrorMessage('অনুগ্রহ করে শিক্ষার্থীর রোল নম্বর অথবা স্টুডেন্ট আইডি প্রদান করুন।');
      return;
    }

    const rollNum = parseInt(rollNumber.trim(), 10);
    const sid = studentIdInput.trim().toUpperCase();

    // Look for published results matching exam, class, and roll / studentId
    const found = results.find((r) => {
      // Must be published for public search
      if (!r.isPublished) return false;

      const matchClass = r.class === selectedClass;
      const matchExam = !selectedExamId || r.examId === selectedExamId;

      let matchIdentity = false;
      if (!isNaN(rollNum) && r.roll === rollNum) {
        matchIdentity = true;
      }
      if (sid && r.studentId.toUpperCase().includes(sid)) {
        matchIdentity = true;
      }

      return matchClass && matchExam && matchIdentity;
    });

    if (found) {
      setSearchedResult(found);
    } else {
      setErrorMessage('দুঃখিত! প্রদত্ত রোল বা আইডি অনুযায়ী কোনো প্রকাশিত ফলাফল পাওয়া যায়নি। দয়া করে তথ্য পুনরায় যাচাই করুন।');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 no-print">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-200">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>অনলাইন ফলাফল সেবা</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-emerald-950 font-bengali">
            অনলাইন ফলাফল অনুসন্ধান
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            পরীক্ষা, শ্রেণি এবং রোল নম্বর দিয়ে তাৎক্ষণিকভাবে অফিশিয়াল গ্রেডশিট ও মার্কশিট দেখুন।
          </p>

          {isAdminLoggedIn && onManageResultsClick && (
            <button
              onClick={onManageResultsClick}
              className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-amber-700" />
              <span>নম্বর এন্ট্রি ও ফলাফল ব্যবস্থাপনা (Admin)</span>
            </button>
          )}
        </div>

        {/* Search Card (No Print) */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-10 no-print">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Exam Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  পরীক্ষা নির্বাচন করুন <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedExamId}
                  onChange={(e) => setSelectedExamId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {exams.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.name} ({ex.class} শ্রেণি)
                    </option>
                  ))}
                </select>
              </div>

              {/* Class Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  শ্রেণি <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value as ClassGrade)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls} শ্রেণি
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Roll input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  শিক্ষার্থীর রোল নম্বর <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="যেমন: ১ বা 1"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Student ID input (optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  স্টুডেন্ট আইডি (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  placeholder="যেমন: MGHS-2024-1001"
                  value={studentIdInput}
                  onChange={(e) => setStudentIdInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>ফলাফল দেখুন</span>
            </button>
          </form>
        </div>

        {/* Display Official Result Marksheet */}
        {searchedResult && (
          <div className="max-w-3xl mx-auto">
            {/* Marksheet Actions Bar (No Print) */}
            <div className="mb-4 flex items-center justify-between no-print bg-emerald-100/60 p-3 rounded-2xl border border-emerald-200">
              <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>ফলাফল প্রস্তুত রয়েছে</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>প্রিন্ট করুন (Print Result)</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>মার্কশিট ডাউনলোড (PDF)</span>
                </button>
              </div>
            </div>

            {/* Official Marksheet Card */}
            <div className="bg-white rounded-3xl border-2 border-emerald-800 shadow-xl overflow-hidden p-6 sm:p-10 print-container">
              {/* Header */}
              <div className="text-center pb-6 border-b-2 border-emerald-800 space-y-1">
                <SchoolLogo size={56} className="mx-auto mb-2" />
                <h3 className="text-xl sm:text-3xl font-extrabold text-emerald-950 font-bengali">
                  মোসলেমগঞ্জ উচ্চ বিদ্যালয়
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  ডাকঘর: মোসলেমগঞ্জ, উপজেলা: মহাদেবপুর, নওগাঁ | EIIN: ১২৮৪৫৬
                </p>
                <div className="pt-2">
                  <span className="inline-block px-4 py-1 rounded-full text-xs sm:text-sm font-bold bg-emerald-900 text-amber-300">
                    একাডেমিক ট্রান্সক্রিপ্ট / ফলাফল পত্র (Marksheet)
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-800 pt-1">
                  {searchedResult.examName} (শিক্ষাবর্ষ: {searchedResult.examYear})
                </p>
              </div>

              {/* Student Info Grid */}
              <div className="py-6 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-9 grid grid-cols-2 gap-y-2 gap-x-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 block text-xs">শিক্ষার্থীর নাম:</span>
                    <span className="font-bold text-slate-900">{searchedResult.studentName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">স্টুডেন্ট আইডি:</span>
                    <span className="font-mono font-bold text-emerald-800">{searchedResult.studentId}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">শ্রেণি ও শাখা:</span>
                    <span className="font-bold text-slate-900">{searchedResult.class} শ্রেণি ({searchedResult.section})</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">রোল নম্বর:</span>
                    <span className="font-bold text-slate-900">{toBengaliNumber(searchedResult.roll)}</span>
                  </div>
                </div>

                <div className="sm:col-span-3 flex justify-center sm:justify-end">
                  <div className="w-20 h-24 rounded-lg overflow-hidden border border-slate-300 shadow-sm bg-slate-100">
                    <img
                      src={searchedResult.studentPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'}
                      alt={searchedResult.studentName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Subject-Wise Marks Table */}
              <div className="py-6 overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-emerald-900 text-white font-bold">
                      <th className="py-2.5 px-3 border border-emerald-800">ক্রমিক</th>
                      <th className="py-2.5 px-3 border border-emerald-800">বিষয়ের নাম (Subject)</th>
                      <th className="py-2.5 px-3 border border-emerald-800 text-center">পূর্ণমান</th>
                      <th className="py-2.5 px-3 border border-emerald-800 text-center">প্রাপ্ত নম্বর</th>
                      <th className="py-2.5 px-3 border border-emerald-800 text-center">লেটার গ্রেড</th>
                      <th className="py-2.5 px-3 border border-emerald-800 text-center">গ্রেড পয়েন্ট</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchedResult.subjectDetails.map((sub, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="py-2 px-3 border border-slate-200 text-center font-medium text-slate-500">
                          {toBengaliNumber(idx + 1)}
                        </td>
                        <td className="py-2 px-3 border border-slate-200 font-semibold text-slate-800">
                          {sub.subjectName}
                        </td>
                        <td className="py-2 px-3 border border-slate-200 text-center font-medium">
                          {toBengaliNumber(sub.fullMarks)}
                        </td>
                        <td className="py-2 px-3 border border-slate-200 text-center font-bold text-emerald-900">
                          {toBengaliNumber(sub.obtainedMarks)}
                        </td>
                        <td className="py-2 px-3 border border-slate-200 text-center font-bold">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-xs ${
                              sub.grade === 'A+'
                                ? 'bg-emerald-100 text-emerald-800'
                                : sub.grade === 'F'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-slate-100 text-slate-800'
                            }`}
                          >
                            {sub.grade}
                          </span>
                        </td>
                        <td className="py-2 px-3 border border-slate-200 text-center font-bold text-slate-800">
                          {sub.gradePoint.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* Totals */}
                  <tfoot>
                    <tr className="bg-emerald-50/80 font-bold border-t-2 border-emerald-800 text-slate-900">
                      <td colSpan={2} className="py-2.5 px-3 border border-slate-200 text-right">
                        সর্বমোট প্রাপ্ত নম্বর ও শতকরা হার:
                      </td>
                      <td colSpan={2} className="py-2.5 px-3 border border-slate-200 text-center font-extrabold text-emerald-950">
                        {toBengaliNumber(searchedResult.totalMarks)} ({searchedResult.percentage}%)
                      </td>
                      <td className="py-2.5 px-3 border border-slate-200 text-center font-extrabold text-emerald-900">
                        গ্রেড: {searchedResult.grade}
                      </td>
                      <td className="py-2.5 px-3 border border-slate-200 text-center font-extrabold text-emerald-900">
                        GPA: {searchedResult.gpa.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Overall Outcome Banner */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div>
                  <p className="text-xs text-slate-500 font-medium">ফলাফল মূল্যায়ন:</p>
                  <div className="flex items-center gap-2 mt-0.5 justify-center sm:justify-start">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                        searchedResult.status === 'উত্তীর্ণ'
                          ? 'bg-emerald-700 text-white'
                          : 'bg-red-600 text-white'
                      }`}
                    >
                      {searchedResult.status}
                    </span>
                    <span className="text-sm font-bold text-slate-800">
                      জিপিএ: <span className="text-emerald-800">{searchedResult.gpa.toFixed(2)}</span> ({searchedResult.grade})
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-500">
                  <p>প্রকাশের তারিখ: {searchedResult.publishedAt || '২০২৪-১২-১০'}</p>
                  <p className="text-[10px] text-slate-400">কম্পিউটার জেনারেটেড ডিজিটাল মার্কশিট</p>
                </div>
              </div>

              {/* Signatures */}
              <div className="pt-12 grid grid-cols-2 gap-8 text-center text-xs text-slate-700">
                <div>
                  <div className="w-36 border-t border-slate-400 mx-auto pt-1 font-semibold">
                    শ্রেণি শিক্ষকের স্বাক্ষর
                  </div>
                </div>
                <div>
                  <div className="w-36 border-t border-slate-400 mx-auto pt-1 font-semibold">
                    প্রধান শিক্ষকের স্বাক্ষর ও সিল
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
