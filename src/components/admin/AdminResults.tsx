import React, { useState } from 'react';
import { StudentResult, Examination, Student, SubjectDetail, ClassGrade } from '../../types';
import { Plus, Edit2, Trash2, CheckCircle, Calculator, FileText, X, Eye, EyeOff } from 'lucide-react';
import { calculateSubjectGrade, calculateFinalGPA, toBengaliNumber } from '../../utils/gradeCalculator';

interface AdminResultsProps {
  results: StudentResult[];
  exams: Examination[];
  students: Student[];
  onSaveResult: (result: StudentResult) => Promise<void>;
  onDeleteResult: (id: string) => Promise<void>;
}

export const AdminResults: React.FC<AdminResultsProps> = ({
  results,
  exams,
  students,
  onSaveResult,
  onDeleteResult
}) => {
  const [selectedExamId, setSelectedExamId] = useState<string>(exams[0]?.id || '');
  const [isEditing, setIsEditing] = useState(false);

  const defaultSubjects: SubjectDetail[] = [
    { subjectName: 'বাংলা ১ম পত্র', fullMarks: 100, obtainedMarks: 82, grade: 'A+', gradePoint: 5.0 },
    { subjectName: 'বাংলা ২য় পত্র', fullMarks: 100, obtainedMarks: 78, grade: 'A', gradePoint: 4.0 },
    { subjectName: 'ইংরেজি ১ম পত্র', fullMarks: 100, obtainedMarks: 75, grade: 'A', gradePoint: 4.0 },
    { subjectName: 'ইংরেজি ২য় পত্র', fullMarks: 100, obtainedMarks: 80, grade: 'A+', gradePoint: 5.0 },
    { subjectName: 'সাধারণ গণিত', fullMarks: 100, obtainedMarks: 91, grade: 'A+', gradePoint: 5.0 },
    { subjectName: 'সাধারণ বিজ্ঞান', fullMarks: 100, obtainedMarks: 85, grade: 'A+', gradePoint: 5.0 },
    { subjectName: 'বাংলাদেশ ও বিশ্বপরিচয়', fullMarks: 100, obtainedMarks: 83, grade: 'A+', gradePoint: 5.0 },
    { subjectName: 'তথ্য ও যোগাযোগ প্রযুক্তি', fullMarks: 50, obtainedMarks: 44, grade: 'A+', gradePoint: 5.0 },
    { subjectName: 'ধর্ম ও নৈতিক শিক্ষা', fullMarks: 100, obtainedMarks: 88, grade: 'A+', gradePoint: 5.0 }
  ];

  const emptyResult: StudentResult = {
    id: '',
    examId: exams[0]?.id || '',
    examName: exams[0]?.name || 'বার্ষিক পরীক্ষা ২০২৪',
    examYear: exams[0]?.year || 2024,
    studentId: '',
    studentName: '',
    class: '১০ম',
    section: 'ক',
    roll: 1,
    studentPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    subjectDetails: defaultSubjects,
    totalMarks: 726,
    percentage: 85.4,
    gpa: 4.88,
    grade: 'A+',
    status: 'উত্তীর্ণ',
    isPublished: true,
    publishedAt: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState<StudentResult>(emptyResult);

  const handleOpenAdd = () => {
    const targetExam = exams.find((e) => e.id === selectedExamId) || exams[0];
    const initialStudent = students.find((s) => s.class === targetExam?.class) || students[0];

    setFormData({
      ...emptyResult,
      id: `result-${Date.now()}`,
      examId: targetExam?.id || '',
      examName: targetExam?.name || '',
      examYear: targetExam?.year || 2024,
      class: (targetExam?.class || '১০ম') as ClassGrade,
      studentId: initialStudent?.studentId || 'MGHS-2024-1001',
      studentName: initialStudent?.name || 'শিক্ষার্থীর নাম',
      roll: initialStudent?.roll || 1,
      section: initialStudent?.section || 'ক',
      studentPhoto: initialStudent?.photoUrl || emptyResult.studentPhoto
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (res: StudentResult) => {
    setFormData({ ...res });
    setIsEditing(true);
  };

  const handleStudentSelect = (studentId: string) => {
    const s = students.find((item) => item.studentId === studentId);
    if (s) {
      setFormData((prev) => ({
        ...prev,
        studentId: s.studentId,
        studentName: s.name,
        class: s.class,
        roll: s.roll,
        section: s.section,
        studentPhoto: s.photoUrl || prev.studentPhoto
      }));
    }
  };

  const handleMarksChange = (index: number, newMarks: number) => {
    const updated = [...formData.subjectDetails];
    const current = updated[index];
    const { grade, gradePoint } = calculateSubjectGrade(newMarks, current.fullMarks);

    updated[index] = {
      ...current,
      obtainedMarks: newMarks,
      grade,
      gradePoint
    };

    // Auto calculate overall total, gpa, and status
    const overall = calculateFinalGPA(updated);

    setFormData((prev) => ({
      ...prev,
      subjectDetails: updated,
      totalMarks: overall.totalMarks,
      percentage: overall.percentage,
      gpa: overall.gpa,
      grade: overall.grade,
      status: overall.status
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.roll) return;
    await onSaveResult(formData);
    setIsEditing(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('আপনি কি এই ফলাফল রেকর্ডটি মুছে ফেলতে চান?')) {
      await onDeleteResult(id);
    }
  };

  const filteredResults = results.filter(
    (r) => !selectedExamId || r.examId === selectedExamId
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">ফলাফল ও মার্কশিট ব্যবস্থাপনা (Result Management)</h3>
          <p className="text-xs text-slate-500">নম্বর এন্ট্রি, জিপিএ অটো-ক্যালকুলেশন ও ট্রান্সক্রিপ্ট প্রস্তুতকরণ</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>নম্বর এন্ট্রি / নতুন ফলাফল যোগ</span>
        </button>
      </div>

      {/* Exam selection filter */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-600 shrink-0">পরীক্ষা নির্বাচন:</span>
          <select
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
            className="w-full sm:w-72 px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {exams.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.name} ({ex.class} শ্রেণি)
              </option>
            ))}
          </select>
        </div>

        <span className="text-xs text-slate-500 font-medium">
          মোট ফলাফল রেকর্ড: <span className="font-bold text-emerald-800">{filteredResults.length}</span> টি
        </span>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-4">রোল ও শ্রেণি</th>
                <th className="py-3 px-4">শিক্ষার্থীর নাম</th>
                <th className="py-3 px-4">মোট নম্বর</th>
                <th className="py-3 px-4">জিপিএ (GPA)</th>
                <th className="py-3 px-4">লেটার গ্রেড</th>
                <th className="py-3 px-4">ফলাফল</th>
                <th className="py-3 px-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredResults.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-bold text-emerald-800">রোল: {toBengaliNumber(r.roll)}</span>
                    <span className="block text-[11px] text-slate-400 font-mono">{r.class} শ্রেণি ({r.section})</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">{r.studentName}</td>
                  <td className="py-3 px-4 font-bold text-slate-800">
                    {toBengaliNumber(r.totalMarks)} ({r.percentage}%)
                  </td>
                  <td className="py-3 px-4 font-bold text-emerald-800">{r.gpa.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-900">
                      {r.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        r.status === 'উত্তীর্ণ'
                          ? 'bg-emerald-700 text-white'
                          : 'bg-red-600 text-white'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(r)}
                        className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="p-1.5 text-slate-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Mark Entry Modal with Auto-Calculator */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-700" />
                <h4 className="text-lg font-bold text-slate-900">
                  নম্বর এন্ট্রি ও জিপিএ মূল্যায়ন (Marks & GPA Entry)
                </h4>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
              {/* Exam & Student selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">পরীক্ষা *</label>
                  <select
                    value={formData.examId}
                    onChange={(e) => {
                      const ex = exams.find((x) => x.id === e.target.value);
                      if (ex) {
                        setFormData((prev) => ({
                          ...prev,
                          examId: ex.id,
                          examName: ex.name,
                          examYear: ex.year,
                          class: ex.class
                        }));
                      }
                    }}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                  >
                    {exams.map((ex) => (
                      <option key={ex.id} value={ex.id}>
                        {ex.name} ({ex.class} শ্রেণি)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">শিক্ষার্থী নির্বাচন *</label>
                  <select
                    value={formData.studentId}
                    onChange={(e) => handleStudentSelect(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                  >
                    {students.map((st) => (
                      <option key={st.id} value={st.studentId}>
                        {st.name} (রোল: {st.roll}, {st.class} শ্রেণি)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">রোল নম্বর *</label>
                  <input
                    type="number"
                    value={formData.roll}
                    onChange={(e) => setFormData({ ...formData, roll: parseInt(e.target.value, 10) || 1 })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold"
                  />
                </div>
              </div>

              {/* Subject Wise Marks Auto Calculation Table */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-2">
                  বিষয়ভিত্তিক প্রাপ্ত নম্বর (নম্বর পরিবর্তনের সাথে সাথে গ্রেড ও জিপিএ স্বয়ংক্রিয়ভাবে হিসাব হবে):
                </span>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-emerald-900 text-white font-bold">
                      <tr>
                        <th className="p-2.5">বিষয়ের নাম</th>
                        <th className="p-2.5 text-center">পূর্ণমান</th>
                        <th className="p-2.5 text-center w-28">প্রাপ্ত নম্বর *</th>
                        <th className="p-2.5 text-center">গ্রেড</th>
                        <th className="p-2.5 text-center">পয়েন্ট</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {formData.subjectDetails.map((sub, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="p-2.5 font-semibold text-slate-800">{sub.subjectName}</td>
                          <td className="p-2.5 text-center text-slate-600">{sub.fullMarks}</td>
                          <td className="p-2 text-center">
                            <input
                              type="number"
                              min={0}
                              max={sub.fullMarks}
                              value={sub.obtainedMarks}
                              onChange={(e) => handleMarksChange(idx, parseInt(e.target.value, 10) || 0)}
                              className="w-20 px-2 py-1 text-center font-bold text-emerald-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                            />
                          </td>
                          <td className="p-2.5 text-center font-bold">
                            <span
                              className={`px-2 py-0.5 rounded ${
                                sub.grade === 'A+' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100'
                              }`}
                            >
                              {sub.grade}
                            </span>
                          </td>
                          <td className="p-2.5 text-center font-bold text-slate-800">{sub.gradePoint.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Real-time Calculated Summary Bar */}
              <div className="bg-emerald-950 text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-emerald-300">মোট প্রাপ্ত নম্বর</p>
                  <p className="text-lg font-bold">
                    {formData.totalMarks} ({formData.percentage}%)
                  </p>
                </div>
                <div>
                  <p className="text-xs text-emerald-300">জিপিএ (GPA)</p>
                  <p className="text-xl font-extrabold text-amber-300">{formData.gpa.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-emerald-300">লেটার গ্রেড</p>
                  <p className="text-xl font-extrabold text-emerald-400">{formData.grade}</p>
                </div>
                <div>
                  <p className="text-xs text-emerald-300">ফলাফলের অবস্থা</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold mt-0.5 ${
                      formData.status === 'উত্তীর্ণ' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                    }`}
                  >
                    {formData.status}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold"
                >
                  ফলাফল সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
