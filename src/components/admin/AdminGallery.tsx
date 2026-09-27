import React, { useState } from 'react';
import { GalleryItem } from '../../types';
import { Plus, Trash2, Image, X } from 'lucide-react';
import { ImageUploader } from './ImageUploader';

interface AdminGalleryProps {
  gallery: GalleryItem[];
  onSaveGalleryItem: (item: GalleryItem) => Promise<void>;
  onDeleteGalleryItem: (id: string) => Promise<void>;
}

export const AdminGallery: React.FC<AdminGalleryProps> = ({
  gallery,
  onSaveGalleryItem,
  onDeleteGalleryItem
}) => {
  const [isAdding, setIsAdding] = useState(false);

  const emptyItem: GalleryItem = {
    id: '',
    title: '',
    category: 'ক্যাম্পাস',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=900&auto=format&fit=crop',
    date: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState<GalleryItem>(emptyItem);

  const handleOpenAdd = () => {
    setFormData({
      ...emptyItem,
      id: `gallery-${Date.now()}`
    });
    setIsAdding(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl) return;
    await onSaveGalleryItem(formData);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('আপনি কি এই ছবিটি গ্যালারি থেকে মুছে ফেলতে চান?')) {
      await onDeleteGalleryItem(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">গ্যালারি ব্যবস্থাপনা (Gallery Management)</h3>
          <p className="text-xs text-slate-500">ফটোগ্রাফি ও উৎসবের ছবি সংযোজন ও মুছে ফেলা</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন ছবি যুক্ত করুন</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative h-44 bg-slate-100">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white backdrop-blur-sm">
                {item.category}
              </span>
            </div>

            <div className="p-3.5 flex items-center justify-between gap-2">
              <div className="truncate">
                <p className="text-xs font-bold text-slate-800 truncate">{item.title}</p>
                <p className="text-[10px] text-slate-400">{item.date}</p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h4 className="text-base font-bold text-slate-900">গ্যালারিতে নতুন ছবি যোগ করুন</h4>
              <button
                onClick={() => setIsAdding(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ছবির শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="যেমন: বিজ্ঞান মেলার প্রজেক্ট প্রদর্শনী"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ক্যাটাগরি *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                >
                  <option value="ক্যাম্পাস">ক্যাম্পাস</option>
                  <option value="ক্রীড়া ও সংস্কৃতি">ক্রীড়া ও সংস্কৃতি</option>
                  <option value="বিজ্ঞান মেলা">বিজ্ঞান মেলা</option>
                  <option value="পুরস্কার বিতরণ">পুরস্কার বিতরণ</option>
                </select>
              </div>

              <ImageUploader
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                folder="gallery"
                label="ছবি আপলোড *"
              />

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold"
                >
                  যোগ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
