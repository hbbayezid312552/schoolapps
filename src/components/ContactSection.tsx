import React, { useState } from 'react';
import { SchoolInfo } from '../types';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

interface ContactSectionProps {
  info: SchoolInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ info }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setFormSubmitted(true);
    setFormData({ name: '', phone: '', subject: '', message: '' });
    setTimeout(() => {
      setFormSubmitted(false);
    }, 6000);
  };

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-200">
            <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
            <span>যোগাযোগ ও সহায়তা</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-emerald-950 font-bengali">
            আমাদের সাথে যোগাযোগ করুন
          </h2>
          <p className="mt-1 text-slate-600 text-sm sm:text-base">
            যেকোনো তথ্য, ভর্তি সংক্রান্ত জিজ্ঞাসা বা পরামর্শের জন্য সরাসরি যোগাযোগ করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-6 relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-bengali text-amber-300">
                    {info.schoolNameBn}
                  </h3>
                  <p className="text-xs text-emerald-200 mt-1">
                    EIIN: {info.eiinNumber} | স্থাপিত: {info.establishedYear}
                  </p>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-emerald-300 text-xs block">ঠিকানা:</span>
                      <p className="text-slate-100 font-medium leading-relaxed">{info.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-emerald-300 text-xs block">মোবাইল ও টেলিফোন:</span>
                      <a href={`tel:${info.phone}`} className="text-slate-100 hover:text-amber-300 font-medium">
                        {info.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-emerald-300 text-xs block">ইমেইল:</span>
                      <a href={`mailto:${info.email}`} className="text-slate-100 hover:text-amber-300 font-medium">
                        {info.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-emerald-300 text-xs block">অফিস সময়:</span>
                      <p className="text-slate-100 font-medium">
                        শনিবার - বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৪:০০<br />
                        (শুক্রবার ও সরকারি ছুটির দিনে বন্ধ)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* School Campus Map / Location Mockup */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-xs font-bold text-slate-700 block mb-2">বিদ্যালয়ের অবস্থান:</span>
              <div className="h-44 rounded-xl overflow-hidden border border-slate-200 relative bg-emerald-50 flex items-center justify-center text-center p-4">
                <div>
                  <MapPin className="w-8 h-8 text-emerald-700 mx-auto mb-1 animate-bounce" />
                  <p className="text-xs font-bold text-emerald-950">মোসলেমগঞ্জ বাজার সংলগ্ন, মহাদেবপুর, নওগাঁ</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">উত্তরবঙ্গের শান্ত-সবুজ শ্যামল প্রাকৃতিক পরিবেশে অবস্থিত</p>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                বার্তা বা জিজ্ঞাসা পাঠান
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                আপনার বার্তাটি প্রধান শিক্ষক ও বিদ্যালয় প্রশাসনের কাছে সরাসরি পৌঁছে যাবে।
              </p>

              {formSubmitted ? (
                <div className="p-6 bg-emerald-100/70 border border-emerald-300 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-900">আপনার বার্তা সফলভাবে গ্রহণ করা হয়েছে!</h4>
                  <p className="text-xs text-emerald-800">
                    ধন্যবাদ। বিদ্যালয় প্রশাসন শীঘ্রই আপনার প্রদত্ত মোবাইল নম্বরে যোগাযোগ করবে।
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        আপনার পুরো নাম <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: মোঃ জিল্লুর রহমান"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        মোবাইল নম্বর <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="যেমন: ০১৭১২-৩৪৫৬৭৮"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      বিষয় / আলোচ্য প্রসঙ্গ
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: ৬ষ্ঠ শ্রেণিতে ভর্তি সংক্রান্ত জিজ্ঞাসা"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      আপনার বিস্তারিত বার্তা <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="এখানে আপনার বার্তা বা প্রশ্ন লিখুন..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>বার্তা পাঠান (Send Message)</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
