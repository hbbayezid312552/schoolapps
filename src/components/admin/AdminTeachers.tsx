import React, { useState } from 'react';
import { Teacher } from '../../types';
import { Plus, Edit2, Trash2, Search, X, Check, Upload, UserPlus } from 'lucide-react';
import { ImageUploader } from './ImageUploader';

interface AdminTeachersProps {
  teachers: Teacher[];
  onSaveTeacher: (teacher: Teacher) => Promise<void>;
  onDeleteTeacher: (id: string) => Promise<void>;
}

export const AdminTeachers: React.FC<AdminTeachersProps> = ({
  teachers,
  onSaveTeacher,
  onDeleteTeacher
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const emptyTeacher: Teacher = {
    id: '',
    name: '',
    designation: 'সহকারী শিক্ষক',
    subject: '',
    qualification: '',
    mobile: '',
    email: '',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop',
    bio: '',
    order: 1,
    joinDate: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState<Teacher>(emptyTeacher);

  const handleOpenAdd = () => {
    setEditingTeacher(null);
    setFormData({
      ...emptyTeacher,
      id: `teacher-${Date.now()}`
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (t: Teacher) => {
    setEditingTeacher(t);
    setFormData({ ...t });
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.subject) return;
    await onSaveTeacher(formData);
    setIsEditing(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিতভাবে এই শিক্ষকের তথ্য মুছে ফেলতে চান?')) {
      await onDeleteTeacher(id);
    }
  };

  const filtered = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">শিক্ষক ব্যবস্থাপনা (Teacher Management)</h3>
          <p className="text-xs text-slate-500">শিক্ষকদের তথ্য সংযোজন, সম্পাদনা এবং মুছে ফেলা</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold shadow-sm transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>নতুন শিক্ষক যোগ করুন</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="শিক্ষকের নাম বা বিষয় দিয়ে খুঁজুন..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-4">ছবি</th>
                <th className="py-3 px-4">নাম</th>
                <th className="py-3 px-4">পদবি</th>
                <th className="py-3 px-4">বিষয়</th>
                <th className="py-3 px-4">মোবাইল</th>
                <th className="py-3 px-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <img
                      src={teacher.photoUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop'}
                      alt={teacher.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">{teacher.name}</td>
                  <td className="py-3 px-4 text-emerald-800 font-medium">{teacher.designation}</td>
                  <td className="py-3 px-4 text-slate-600">{teacher.subject}</td>
                  <td className="py-3 px-4 text-slate-600">{teacher.mobile}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(teacher)}
                        title="সম্পাদনা"
                        className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(teacher.id)}
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

      {/* Add / Edit Teacher Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h4 className="text-lg font-bold text-slate-900">
                {editingTeacher ? 'শিক্ষকের তথ্য সম্পাদনা করুন' : 'নতুন শিক্ষক যোগ করুন'}
              </h4>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">শিক্ষকের পুরো নাম *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">পদবি *</label>
                  <select
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                  >
                    <option value="প্রধান শিক্ষক">প্রধান শিক্ষক</option>
                    <option value="সহকারী প্রধান শিক্ষক">সহকারী প্রধান শিক্ষক</option>
                    <option value="সিনিয়র শিক্ষক">সিনিয়র শিক্ষক</option>
                    <option value="সহকারী শিক্ষক">সহকারী শিক্ষক</option>
                    <option value="আইসিটি শিক্ষক">আইসিটি শিক্ষক</option>
                    <option value="শরীরচর্চা শিক্ষক">শরীরচর্চা শিক্ষক</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">পাঠ্য বিষয় *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="যেমন: বাংলা, ইংরেজি, গণিত"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">শিক্ষাগত যোগ্যতা *</label>
                  <input
                    type="text"
                    required
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    placeholder="যেমন: এম.এ (বাংলা), বি.এড"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">মোবাইল নম্বর *</label>
                  <input
                    type="text"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="০১৭১২-৩৪৫৬৭৮"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ইমেইল (ঐচ্ছিক)</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="teacher@school.edu.bd"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <ImageUploader
                value={formData.photoUrl}
                onChange={(url) => setFormData({ ...formData, photoUrl: url })}
                folder="teachers"
                label="শিক্ষকের ছবি *"
              />
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">সংক্ষিপ্ত পরিচিতি (Short Bio)</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                />
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