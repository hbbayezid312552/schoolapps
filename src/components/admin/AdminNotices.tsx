import React, { useState } from 'react';
import { Notice } from '../../types';
import { Plus, Edit2, Trash2, Bell, X, Calendar, AlertCircle } from 'lucide-react';

interface AdminNoticesProps {
  notices: Notice[];
  onSaveNotice: (notice: Notice) => Promise<void>;
  onDeleteNotice: (id: string) => Promise<void>;
}

export const AdminNotices: React.FC<AdminNoticesProps> = ({
  notices,
  onSaveNotice,
  onDeleteNotice
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const emptyNotice: Notice = {
    id: '',
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    category: 'সাধারণ',
    isImportant: false
  };

  const [formData, setFormData] = useState<Notice>(emptyNotice);

  const handleOpenAdd = () => {
    setFormData({
      ...emptyNotice,
      id: `notice-${Date.now()}`
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (n: Notice) => {
    setFormData({ ...n });
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;
    await onSaveNotice(formData);
    setIsEditing(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('আপনি কি এই নোটিশটি মুছে ফেলতে চান?')) {
      await onDeleteNotice(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">নোটিশ বোর্ড ব্যবস্থাপনা (Notice Management)</h3>
          <p className="text-xs text-slate-500">জরুরি বিজ্ঞপ্তি প্রকাশ ও একাডেমিক সার্কুলার প্রকাশ</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন নোটিশ প্রকাশ করুন</span>
        </button>
      </div>

      {/* Notices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-4">তারিখ</th>
                <th className="py-3 px-4">ক্যাটাগরি</th>
                <th className="py-3 px-4">শিরোনাম</th>
                <th className="py-3 px-4">স্ট্যাটাস</th>
                <th className="py-3 px-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {notices.map((n) => (
                <tr key={n.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{n.date}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                      {n.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900 max-w-md truncate">{n.title}</td>
                  <td className="py-3 px-4">
                    {n.isImportant ? (
                      <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                        জরুরি
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs">
                        সাধারণ
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(n)}
                        className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(n.id)}
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

      {/* Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h4 className="text-lg font-bold text-slate-900">
                {formData.id ? 'নোটিশ সম্পাদনা' : 'নতুন নোটিশ তৈরি করুন'}
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
                <label className="block text-xs font-bold text-slate-700 mb-1">নোটিশের শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="যেমন: ২০২৪ সালের বার্ষিক পরীক্ষার রুটিন প্রকাশ"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ক্যাটাগরি *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  >
                    <option value="একাডেমিক">একাডেমিক</option>
                    <option value="পরীক্ষা">পরীক্ষা</option>
                    <option value="ছুটি">ছুটি</option>
                    <option value="সাধারণ">সাধারণ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">তারিখ *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">নোটিশের বিষয়বস্তু / বিবরণ *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="বিস্তারিত নোটিশের টেক্সট লিখুন..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="importantNoticeCheckbox"
                  checked={formData.isImportant}
                  onChange={(e) => setFormData({ ...formData, isImportant: e.target.checked })}
                  className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                />
                <label htmlFor="importantNoticeCheckbox" className="text-xs font-bold text-red-700">
                  জরুরি নোটিশ হিসেবে মার্ক করুন (হোমপেজ ব্যানারে প্রদর্শিত হবে)
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
