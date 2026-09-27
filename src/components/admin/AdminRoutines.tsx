import React, { useState } from 'react';
import { RoutinePeriod, ClassGrade, Teacher } from '../../types';
import { Plus, Edit2, Trash2, Calendar, X, Clock } from 'lucide-react';

interface AdminRoutinesProps {
  routines: RoutinePeriod[];
  teachers: Teacher[];
  onSaveRoutine: (routine: RoutinePeriod) => Promise<void>;
  onDeleteRoutine: (id: string) => Promise<void>;
}

export const AdminRoutines: React.FC<AdminRoutinesProps> = ({
  routines,
  teachers,
  onSaveRoutine,
  onDeleteRoutine
}) => {
  const [selectedClass, setSelectedClass] = useState<ClassGrade>('১০ম');
  const [isEditing, setIsEditing] = useState(false);

  const classes: ClassGrade[] = ['৬ষ্ঠ', '৭ম', '৮ম', '৯ম', '১০ম'];
  const days = ['শনিবার', 'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার'];
  const periods = ['১ম', '২য়', '৩য়', '৪র্থ', '৫ম', '৬ষ্ঠ'];

  const emptyRoutine: RoutinePeriod = {
    id: '',
    class: '১০ম',
    day: 'শনিবার',
    period: '১ম',
    time: '১০:০০ - ১০:৪৫',
    subject: 'বাংলা ১ম পত্র',
    teacher: teachers[0]?.name || 'মোঃ জিল্লুর রহমান'
  };

  const [formData, setFormData] = useState<RoutinePeriod>(emptyRoutine);

  const handleOpenAdd = () => {
    setFormData({
      ...emptyRoutine,
      class: selectedClass,
      id: `routine-${Date.now()}`
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (r: RoutinePeriod) => {
    setFormData({ ...r });
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSaveRoutine(formData);
    setIsEditing(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('আপনি কি এই রুটিন পিরিয়ডটি মুছে ফেলতে চান?')) {
      await onDeleteRoutine(id);
    }
  };

  const filtered = routines.filter((r) => r.class === selectedClass);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">ক্লাস রুটিন ব্যবস্থাপনা (Routine Management)</h3>
          <p className="text-xs text-slate-500">শ্রেণিভিত্তিক সাপ্তাহিক সময়সূচি ও শিক্ষক বণ্টন</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>রুটিনে পিরিয়ড যোগ করুন</span>
        </button>
      </div>

      {/* Class selector */}
      <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200">
        <span className="text-xs font-bold text-slate-500 px-2">শ্রেণি:</span>
        {classes.map((cls) => (
          <button
            key={cls}
            onClick={() => setSelectedClass(cls)}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedClass === cls
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cls} শ্রেণি
          </button>
        ))}
      </div>

      {/* Routines Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-4">দিন / বার</th>
                <th className="py-3 px-4">পিরিয়ড</th>
                <th className="py-3 px-4">সময়</th>
                <th className="py-3 px-4">বিষয়</th>
                <th className="py-3 px-4">শিক্ষক</th>
                <th className="py-3 px-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-950">{item.day}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                      {item.period}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{item.time}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">{item.subject}</td>
                  <td className="py-3 px-4 text-slate-700">{item.teacher}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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

      {/* Add / Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h4 className="text-lg font-bold text-slate-900">
                {formData.id ? 'রুটিন পিরিয়ড সম্পাদনা' : 'নতুন পিরিয়ড যোগ করুন'}
              </h4>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">দিন / বার *</label>
                  <select
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  >
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">পিরিয়ড *</label>
                  <select
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  >
                    {periods.map((p) => (
                      <option key={p} value={p}>
                        {p} পিরিয়ড
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">সময় সীমা *</label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="১০:০০ - ১০:৪৫"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">পাঠ্য বিষয় *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="যেমন: সাধারণ গণিত"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">বিষয় শিক্ষক *</label>
                <select
                  value={formData.teacher}
                  onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                >
                  {teachers.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} ({t.subject})
                    </option>
                  ))}
                </select>
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
