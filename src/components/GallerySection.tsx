import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { Image, X, ZoomIn, PlusCircle, Sparkles } from 'lucide-react';

interface GallerySectionProps {
  gallery: GalleryItem[];
  isAdminLoggedIn?: boolean;
  onManageGalleryClick?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  gallery,
  isAdminLoggedIn,
  onManageGalleryClick
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('সব');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const categories = ['সব', 'ক্যাম্পাস', 'ক্রীড়া ও সংস্কৃতি', 'বিজ্ঞান মেলা', 'পুরস্কার বিতরণ'];

  const filteredGallery = gallery.filter((item) => {
    return selectedCategory === 'সব' || item.category === selectedCategory;
  });

  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>স্মৃতিময় মুহূর্তগুলো</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-emerald-950 font-bengali">
              ফটো গ্যালারি
            </h2>
            <p className="mt-1 text-slate-600 text-sm sm:text-base">
              বিদ্যালয়ের বিভিন্ন শিক্ষামূলক, সাংস্কৃতিক ও ক্রীড়া কার্যক্রমের স্থিরচিত্র।
            </p>
          </div>

          {isAdminLoggedIn && onManageGalleryClick && (
            <button
              onClick={onManageGalleryClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition-all shrink-0"
            >
              <PlusCircle className="w-4 h-4 text-emerald-200" />
              <span>ছবি যোগ / পরিচালনা (Admin)</span>
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredGallery.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImage(item)}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer bg-slate-200 border border-slate-200 transition-all duration-300"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 text-emerald-950 backdrop-blur-md shadow-sm">
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div className="text-white">
                    <p className="text-sm font-bold line-clamp-2 leading-snug">{item.title}</p>
                    {item.date && <p className="text-[11px] text-emerald-200 mt-0.5">{item.date}</p>}
                  </div>
                  <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
            <Image className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-slate-700">কোনো ছবি পাওয়া যায়নি</h4>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white rounded-full bg-black/50 hover:bg-black/80 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-h-[75vh] flex items-center justify-center bg-black">
              <img
                src={lightboxImage.imageUrl}
                alt={lightboxImage.title}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-400 font-semibold">{lightboxImage.category}</span>
                <h4 className="text-base font-bold">{lightboxImage.title}</h4>
              </div>
              <span className="text-xs text-slate-400">{lightboxImage.date}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
