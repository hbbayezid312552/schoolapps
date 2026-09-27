import React, { useState } from 'react';
import { SchoolInfo, PrincipalMessage } from '../../types';
import { Save, CheckCircle2, School, User, Target, BookOpen } from 'lucide-react';
import { ImageUploader } from './ImageUploader';

interface AdminSchoolInfoProps {
  info: SchoolInfo;
  principal: PrincipalMessage;
  onSaveInfo: (info: SchoolInfo) => Promise<void>;
  onSavePrincipal: (principal: PrincipalMessage) => Promise<void>;
}

export const AdminSchoolInfo: React.FC<AdminSchoolInfoProps> = ({
  info,
  principal,
  onSaveInfo,
  onSavePrincipal
}) => {
  const [schoolData, setSchoolData] = useState<SchoolInfo>({ ...info });
  const [principalData, setPrincipalData] = useState<PrincipalMessage>({ ...principal });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSaveInfo(schoolData);
    await onSavePrincipal(principalData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <form onSubmit={handleSaveAll} className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">বিদ্যালয়ের তথ্য ও প্রধান শিক্ষকের বাণী</h3>
          <p className="text-xs text-slate-500">ইতিহাস, লক্ষ্য, উদ্দেশ্য ও নেতৃত্বের বাণী পরিবর্তন করুন</p>
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold shadow-sm transition-all"
        >
          <Save className="w-4 h-4" />
          <span>সকল পরিবর্তন সংরক্ষণ করুন</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl flex items-center gap-2 text-xs font-bold text-emerald-900">
          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          <span>বিদ্যালয়ের তথ্য ও প্রধান শিক্ষকের বাণী সফলভাবে আপডেট করা হয়েছে!</span>
        </div>
      )}

      {/* Basic School Identity */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-800 font-bold border-b border-slate-100 pb-3">
          <School className="w-5 h-5" />
          <h4>প্রাথমিক পরিচয় ও কোড</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">বিদ্যালয়ের নাম (বাংলা)</label>
            <input
              type="text"
              value={schoolData.schoolNameBn}
              onChange={(e) => setSchoolData({ ...schoolData, schoolNameBn: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">বিদ্যালয়ের নাম (ইংরেজি)</label>
            <input
              type="text"
              value={schoolData.schoolNameEn}
              onChange={(e) => setSchoolData({ ...schoolData, schoolNameEn: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">EIIN নম্বর</label>
            <input
              type="text"
              value={schoolData.eiinNumber}
              onChange={(e) => setSchoolData({ ...schoolData, eiinNumber: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">প্রতিষ্ঠা সাল</label>
            <input
              type="text"
              value={schoolData.establishedYear}
              onChange={(e) => setSchoolData({ ...schoolData, establishedYear: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">মূলনীতি (Motto)</label>
            <input
              type="text"
              value={schoolData.motto}
              onChange={(e) => setSchoolData({ ...schoolData, motto: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">সংক্ষিপ্ত বিবরণ (Short Description)</label>
          <textarea
            rows={2}
            value={schoolData.shortDescription}
            onChange={(e) => setSchoolData({ ...schoolData, shortDescription: e.target.value })}
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      {/* History, Mission & Environment */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-800 font-bold border-b border-slate-100 pb-3">
          <BookOpen className="w-5 h-5" />
          <h4>ইতিহাস, মিশন, ভিশন ও পরিবেশ</h4>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">প্রতিষ্ঠার ইতিহাস (History)</label>
          <textarea
            rows={4}
            value={schoolData.history}
            onChange={(e) => setSchoolData({ ...schoolData, history: e.target.value })}
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">মিশন (Mission)</label>
            <textarea
              rows={3}
              value={schoolData.mission}
              onChange={(e) => setSchoolData({ ...schoolData, mission: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">ভিশন (Vision)</label>
            <textarea
              rows={3}
              value={schoolData.vision}
              onChange={(e) => setSchoolData({ ...schoolData, vision: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">ক্যাম্পাস পরিবেশ (Campus Environment)</label>
          <textarea
            rows={3}
            value={schoolData.campusEnvironment}
            onChange={(e) => setSchoolData({ ...schoolData, campusEnvironment: e.target.value })}
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      {/* Principal Message Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-800 font-bold border-b border-slate-100 pb-3">
          <User className="w-5 h-5" />
          <h4>প্রধান শিক্ষকের তথ্য ও বাণী</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">প্রধান শিক্ষকের নাম</label>
            <input
              type="text"
              value={principalData.name}
              onChange={(e) => setPrincipalData({ ...principalData, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">পদবি</label>
            <input
              type="text"
              value={principalData.designation}
              onChange={(e) => setPrincipalData({ ...principalData, designation: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">শিক্ষাগত যোগ্যতা</label>
            <input
              type="text"
              value={principalData.qualification}
              onChange={(e) => setPrincipalData({ ...principalData, qualification: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl"
            />
          </div>
        </div>

        <ImageUploader
          value={principalData.photoUrl}
          onChange={(url) => setPrincipalData({ ...principalData, photoUrl: url })}
          folder="principal"
          label="প্রধান শিক্ষকের ছবি"
        />
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">প্রধান শিক্ষকের বাণী (Message)</label>
          <textarea
            rows={5}
            value={principalData.message}
            onChange={(e) => setPrincipalData({ ...principalData, message: e.target.value })}
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl"
          />
        </div>
      </div>
    </form>
  );
};