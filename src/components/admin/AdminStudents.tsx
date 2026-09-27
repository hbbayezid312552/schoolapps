import React, { useState } from 'react';
import { Student, ClassGrade } from '../../types';
import { Plus, Edit2, Trash2, Search, X, UserPlus, Eye, ShieldAlert } from 'lucide-react';
import { ImageUploader } from './ImageUploader';
import { toBengaliNumber } from '../../utils/gradeCalculator';

interface AdminStudentsProps {
  students: Student[];
  onSaveStudent: (student: Student) => Promise<void>;
  onDeleteStudent: (id: string) => Promise<void>;
}

export const AdminStudents: React.FC<AdminStudentsProps> = ({
  students,
  onSaveStudent,
  onDeleteStudent
}) => {
  const [selectedClass, setSelectedClass] = useState<string>('সব');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

  const classes: ClassGrade[] = ['৬ষ্ঠ', '৭ম', '৮ম', '৯ম', '১০ম'];

  const emptyStudent: Student = {
    id: '',
    studentId: `MGHS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    name: '',
    class: '১০ম',
    section: 'ক',
    roll: 1,
    fatherName: '',
    motherName: '',
    guardianMobile: '',
    address: 'গ্রাম: মোসলেমগঞ্জ, ডাকঘর: মোসলেমগঞ্জ, নওগাঁ',
    gender: 'ছাত্র',
    birthDate: '2008-01-01',
    bloodGroup: 'B+',
    admissionYear: new Date().getFullYear(),
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop'
  };

  const [formData, setFormData] = useState<Student>(emptyStudent);

  const handleOpenAdd = () => {
    setFormData({
      ...emptyStudent,
      id: `student-${Date.now()}`
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (s: Student) => {
    setFormData({ ...s });
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.roll) return;
    await onSaveStudent(formData);
    setIsEditing(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিতভাবে এই শিক্ষার্থীর সমস্ত রেকর্ড মুছে ফেলতে চান?')) {
      await onDeleteStudent(id);
    }
  };

  const filtered = students.filter((s) => {
    const matchClass = selectedClass === 'সব' || s.class === selectedClass;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      s.name.toLowerCase().includes(q) ||
      String(s.roll).includes(q) ||
      s.studentId.toLowerCase().includes(q);
    return matchClass && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">শিক্ষার্থী ব্যবস্থাপনা (Student Management)</h3>
          <p className="text-xs text-slate-500">
            শিক্ষার্থীদের ব্যক্তিগত তথ্য, অভিভাবকের নম্বর এবং শিক্ষাবর্ষ পরিচালনা (প্রশাসনিক এক্সেস)
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold shadow-sm transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>নতুন শিক্ষার্থী ভর্তি / যোগ করুন</span>
        </button>
      </div>

      {/* Class Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="নাম, রোল বা স্টুডেন্ট আইডি..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setSelectedClass('সব')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              selectedClass === 'সব' ? 'bg-emerald-700 text-white' : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            সব শ্রেণি
          </button>
          {classes.map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                selectedClass === cls
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white border border-slate-200 text-slate-700'
              }`}
            >
              {cls} শ্রেণি
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-4">আইডি ও রোল</th>
                <th className="py-3 px-4">শিক্ষার্থীর নাম</th>
                <th className="py-3 px-4">শ্রেণি ও শাখা</th>
                <th className="py-3 px-4">পিতার নাম</th>
                <th className="py-3 px-4">অভিভাবকের মোবাইল</th>
                <th className="py-3 px-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-bold text-emerald-800">রোল: {toBengaliNumber(s.roll)}</span>
                    <span className="block text-[11px] text-slate-400 font-mono">{s.studentId}</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">{s.name}</td>
                  <td className="py-3 px-4 text-slate-700">
                    {s.class} শ্রেণি {s.section && `(${s.section})`}
                  </td>
                  <td className="py-3 px-4 text-slate-600">{s.fatherName}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-700">{s.guardianMobile}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => setViewingStudent(s)}
                        title="সম্পূর্ণ বিবরণ দেখুন"
                        className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(s)}
                        title="সম্পাদনা"
                        className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        title="মুছে ফেলুন"
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

      {/* Add / Edit Student Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h4 className="text-lg font-bold text-slate-900">
                {formData.id ? 'শিক্ষার্থীর তথ্য পরিবর্তন / এডিট' : 'নতুন শিক্ষার্থী নথিভুক্ত করুন'}
              </h4>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">শিক্ষার্থীর পূর্ণ নাম *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">স্টুডেন্ট আইডি *</label>
                  <input
                    type="text"
                    required
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full px-3 py-2 font-mono border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">শাখা / গ্রুপ</label>
                  <input
                    type="text"
                    value={formData.section || ''}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    placeholder="ক / বিজ্ঞান"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">রোল নম্বর *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.roll}
                    onChange={(e) => setFormData({ ...formData, roll: parseInt(e.target.value, 10) || 1 })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">পিতার নাম *</label>
                  <input
                    type="text"
                    required
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">মাতার নাম *</label>
                  <input
                    type="text"
                    required
                    value={formData.motherName}
                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">অভিভাবকের মোবাইল নম্বর *</label>
                  <input
                    type="text"
                    required
                    value={formData.guardianMobile}
                    onChange={(e) => setFormData({ ...formData, guardianMobile: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">জন্ম তারিখ</label>
                  <input
                    type="date"
                    value={formData.birthDate || ''}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">রক্তের গ্রুপ</label>
                  <input
                    type="text"
                    value={formData.bloodGroup || ''}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    placeholder="B+, A+, O+"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">বর্তমান ও স্থায়ী ঠিকানা</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <ImageUploader
                value={formData.photoUrl}
                onChange={(url) => setFormData({ ...formData, photoUrl: url })}
                folder="students"
                label="শিক্ষার্থীর ছবি"
              />;