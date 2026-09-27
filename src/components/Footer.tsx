import React from 'react';
import { SchoolLogo } from './SchoolLogo';
import { Phone, Mail, MapPin, Award, Heart, Shield, ArrowUp } from 'lucide-react';
import { SchoolInfo } from '../types';

interface FooterProps {
  info: SchoolInfo;
  onNavigate: (tab: string) => void;
  onOpenAdminLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ info, onNavigate, onOpenAdminLogin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-emerald-950 text-slate-300 pt-16 pb-12 border-t-4 border-amber-500 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-900/80">
          {/* Col 1: School Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <SchoolLogo size={48} />
              <div>
                <h3 className="text-xl font-bold font-bengali text-white">
                  {info.schoolNameBn}
                </h3>
                <p className="text-xs text-emerald-300 font-medium">{info.schoolNameEn}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-normal">
              ১৯৬৮ সালে প্রতিষ্ঠিত ঐতিহ্যবাহী মোসলেমগঞ্জ উচ্চ বিদ্যালয় উত্তরবঙ্গের এক আদর্শ বিদ্যাপীঠ। আমরা শিক্ষার্থীদের নৈতিক ও আধুনিক শিক্ষায় গড়ে তুলতে অঙ্গীকারবদ্ধ।
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-900/80 border border-emerald-800 text-xs text-amber-300 font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>EIIN: {info.eiinNumber} | স্থাপিত: {info.establishedYear}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-emerald-800 pb-2">
              গুরুত্বপূর্ণ লিঙ্ক
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-400 transition-colors"
                >
                  হোম পেজ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  আমাদের সম্পর্কে
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('teachers')}
                  className="hover:text-amber-400 transition-colors"
                >
                  শিক্ষকমণ্ডলী
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('students')}
                  className="hover:text-amber-400 transition-colors"
                >
                  শিক্ষার্থী তালিকা
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('routine')}
                  className="hover:text-amber-400 transition-colors"
                >
                  ক্লাস রুটিন
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('results')}
                  className="hover:text-amber-400 transition-colors"
                >
                  অনলাইন ফলাফল
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('notices')}
                  className="hover:text-amber-400 transition-colors"
                >
                  বিজ্ঞপ্তি বোর্ড
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Government Emergency & Education Portals */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-emerald-800 pb-2">
              সরকারি জরুরি সেবা
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200">
              <li className="flex items-center justify-between p-2 rounded bg-emerald-900/40">
                <span>জাতীয় জরুরি সেবা:</span>
                <span className="font-bold text-amber-400 font-mono">৯৯৯</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded bg-emerald-900/40">
                <span>নারী ও শিশু নির্যাতন প্রতিরোধ:</span>
                <span className="font-bold text-amber-400 font-mono">১০৯</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded bg-emerald-900/40">
                <span>শিশু হেল্পলাইন:</span>
                <span className="font-bold text-amber-400 font-mono">১০৯৮</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded bg-emerald-900/40">
                <span>সরকারি তথ্য ও সেবা:</span>
                <span className="font-bold text-amber-400 font-mono">৩৩৩</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Admin */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-emerald-800 pb-2">
              যোগাযোগ
            </h4>
            <div className="space-y-2.5 text-xs text-emerald-100">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{info.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${info.phone}`} className="hover:text-amber-300">
                  {info.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${info.email}`} className="hover:text-amber-300">
                  {info.email}
                </a>
              </div>

              <div className="pt-3">
                <button
                  onClick={onOpenAdminLogin}
                  className="w-full py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-emerald-700"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>প্রশাসনিক প্রবেশদ্বার (Admin Portal)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400">
          <p>
            © {new Date().getFullYear()} {info.schoolNameBn}। সর্বস্বত্ব সংরক্ষিত।
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-emerald-300 hover:text-white transition-colors"
            >
              <span>শীর্ষে যান</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
