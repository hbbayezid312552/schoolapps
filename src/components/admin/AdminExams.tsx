import React, { useState } from 'react';
import { Examination, ClassGrade } from '../../types';
import { Plus, Edit2, Trash2, Calendar, X, CheckCircle, Eye, EyeOff } from 'lucide-react';

interface AdminExamsProps {
  exams: Examination[];
  onSaveExam: (exam: Examination) => Promise<void>;
  onDeleteExam: (id: string) => Promise<void>;
}

export const AdminExams: React.FC<AdminExamsProps> = ({
  exams,
  onSaveExam,
  onDeleteExam
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const classes: ClassGrade[] = ['৬ষ্ঠ', '৭ম', '৮ম', '৯ম', '১০ম'];

  const emptyExam: Examination = {
    id: '',
    name: 'বার্ষিক পরীক্ষা ২০২৪',
    class: '১০ম',
    year: new Date().getFullYear(),
    term: 'বার্ষিক',
    startDate: '2024-11-20',
    endDate: '2024-12-05',
    isPublished: true
  };

  const [formData, setFormData] = useState<Examination>(emptyExam);

  const handleOpenAdd = () => {
    setFormData({
      ...emptyExam,
      id: `exam-${Date.now()}`
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (exam: Examination) => {
    setFormData({ ...exam });
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSaveExam(formData);
    setIsEditing(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('আপনি কি এই পরীক্ষাটি মুছে ফেলতে চান? সংশ্লিষ্ট ফলাফলগুলোও ক্ষতিগ্রস্ত হতে পারে।')) {
      await onDeleteExam(id);
    }
  };

  const handleTogglePublish = async (exam: Examination) => {
    await onSaveExam({
      ...exam,
      isPublished: !exam.isPublished
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">পরীক্ষা ব্যবস্থাপনা (Exam Management)</h3>
          <p className="text-xs text-slate-500">পরীক্ষা তৈরি, সম্পাদনা ও ফলাফল প্রকাশের নিয়ন্ত্রণ</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন পরীক্ষা তৈরি করুন</span>
        </button>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  {exam.class} শ্রেণি
                </span>
                <button
                  onClick={() => handleTogglePublish(exam)}
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    exam.isPublished
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {exam.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  <span>{exam.isPublished ? 'ফলাফল প্রকাশিত' : 'অপ্রকাশিত'}</span>
                </button>
              </div>

              <h4 className="text-lg font-bold text-slate-900 mt-2.5">{exam.name}</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                শিক্ষাবর্ষ: <span className="font-bold text-slate-700">{exam.year}</span> | পর্ব: {exam.term}
              </p>

              <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                <span>সময়কাল:</span>
                <span className="font-semibold text-slate-800">
                  {exam.startDate} হতে {exam.endDate}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => handleOpenEdit(exam)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>এডিট</span>
              </button>
              <button
                onClick={() => handleDelete(exam.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>মুছুন</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Exam Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h4 className="text-lg font-bold text-slate-900">
                {formData.id ? 'পরীক্ষার বিবরণ সম্পাদনা' : 'নতুন পরীক্ষা তৈরি করুন'}
              </h4>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">পরীক্ষার নাম *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="যেমন: অর্ধ-বার্ষিক পরীক্ষা ২০২৪"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">শ্রেণি *</label>
                  <select
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value as ClassGrade })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  >
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls} শ্রেণি
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">শিক্ষাবর্ষ *</label>
                  <input
                    type="number"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value, 10) || 2024 })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">শুরুর তারিখ</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">শেষের তারিখ</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishCheckbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="rounded text-emerald-700 focus:ring-emerald-500 w-4 h-4"
                />
                <label htmlFor="publishCheckbox" className="text-xs font-bold text-slate-800">
                  ফলাফল অনলাইনে এখনই প্রকাশ করুন (Publish Result Publicly)
                </label>
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
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
