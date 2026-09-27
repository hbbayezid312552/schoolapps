import React, { useState } from 'react';
import { ImagePlus, Loader2 } from 'lucide-react';
import { uploadImage } from '../../supabase/client';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  folder: string;
  label?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange, folder, label = 'ছবি' }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (file?: File) => {
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (err: any) {
      setError(err?.message || 'ছবি আপলোড করা যায়নি।');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-xs font-bold text-slate-700 mb-1">{label}</label>
      <div className="flex items-center gap-3">
        <label className="flex-1 cursor-pointer rounded-xl border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50 px-4 py-3 text-center transition-colors">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            disabled={uploading}
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          {uploading ? (
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <Loader2 className="w-4 h-4 animate-spin" /> আপলোড হচ্ছে...
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700">
              <ImagePlus className="w-4 h-4 text-emerald-700" /> JPG / PNG / WEBP আপলোড করুন
            </span>
          )}
        </label>
        {value && <img src={value} alt="preview" className="w-16 h-16 rounded-xl object-cover border border-slate-200" />}
      </div>
      {error && <p className="mt-1 text-[11px] text-red-600">{error}</p>}
      <p className="mt-1 text-[10px] text-slate-400">সর্বোচ্চ ৫ MB • Supabase Storage-এ সংরক্ষিত হবে</p>
    </div>
  );
};
