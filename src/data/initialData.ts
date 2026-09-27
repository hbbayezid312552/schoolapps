import { Teacher, Student, RoutinePeriod, Examination, StudentResult, Notice, SchoolInfo, PrincipalMessage, GalleryItem } from '../types';

export const initialSchoolInfo: SchoolInfo = {
  schoolNameBn: 'মোসলেমগঞ্জ উচ্চ বিদ্যালয়',
  schoolNameEn: 'Moslemganj High School',
  eiinNumber: '১২৮৪৫৬',
  establishedYear: '১৯৬৮',
  motto: 'জ্ঞান • শৃঙ্খলা • মানবিকতা',
  shortDescription: 'শিক্ষা, নৈতিকতা ও প্রযুক্তির সমন্বয়ে আগামীর প্রজন্ম গড়ে তোলার অঙ্গীকার।',
  history: 'মোসলেমগঞ্জ উচ্চ বিদ্যালয় ১৯৬৮ সালে এলাকার গণ্যমান্য ব্যক্তিবর্গ এবং শিক্ষানুরাগী সমাজসেবকদের ঐকান্তিক প্রচেষ্টায় প্রতিষ্ঠিত হয়। সেই থেকে অদ্যাবধি বিদ্যালয়টি উত্তরবঙ্গের অন্যতম স্বনামধন্য মাধ্যমিক বিদ্যাপীঠ হিসেবে সুখ্যাতি বজায় রেখে চলেছে। প্রাকৃতিক সবুজে ঘেরা মনোরম পরিবেশে ছাত্র-ছাত্রীদের মেধা ও মনন বিকাশে বিদ্যালয়টি নিরলসভাবে কাজ করে যাচ্ছে।',
  mission: 'প্রত্যেক শিক্ষার্থীর সুপ্ত প্রতিভা বিকাশ, প্রযুক্তি-বান্ধব আধুনিক যুগোপযোগী শিক্ষা প্রদান এবং চারিত্রিক সততা ও মানবিক মূল্যবোধসম্পন্ন আদর্শ সুনাগরিক গড়ে তোলা।',
  vision: 'ডিজিটাল ও স্মার্ট বাংলাদেশের উপযোগী দক্ষ, নৈতিকতাসম্পন্ন, নেতৃত্বদানকারী এবং সৃষ্টিশীল ভবিষ্যৎ প্রজন্ম তৈরি করে দেশের শীর্ষস্থানীয় বিদ্যাপীঠে রূপান্তর।',
  objectives: [
    'জাতীয় শিক্ষাক্রম অনুযায়ী শতভাগ মানসম্মত ও কার্যকর পাঠদান নিশ্চিত করা।',
    'আইসিটি ল্যাব ও আধুনিক মাল্টিমিডিয়া শ্রেণিকক্ষের মাধ্যমে প্রযুক্তিভিত্তিক শিক্ষা প্রদান।',
    'নিয়মিত সহশিক্ষা কার্যক্রম (বিতর্ক, বিজ্ঞান মেলা, খেলাধুলা, স্কাউট) পরিচালনা।',
    'দুর্বল শিক্ষার্থীদের জন্য বিশেষ নিবিড় পরিচর্যা ক্লাসের ব্যবস্থা।',
    'নৈতিকতা, শৃঙ্খলা ও দেশপ্রেমে উদ্বুদ্ধ মানবিক গুণাবলি বিকাশ।'
  ],
  campusEnvironment: 'বিদ্যালয়টি প্রায় ৩ একর মনোরম সবুজ প্রাঙ্গণে অবস্থিত। রয়েছে বিশাল খেলার মাঠ, সুসজ্জিত দ্বিতল ও ত্রিতল একাডেমিক ভবন, আধুনিক বিজ্ঞানাগার, সমৃদ্ধ কম্পিউটার ল্যাব, গ্রন্থাগার এবং শহীদ মিনার। বিদ্যালয়ের চারপাশের শান্ত ও স্নিগ্ধ ছায়াঘেরা পরিবেশ শিক্ষার্থীদের পাঠগ্রহণে বিশেষ অনুপ্রেরণা জোগায়।',
  phone: '+৮৮০ ১৭ ১২৩৪ ৫৬৭৮',
  email: 'info@moslemganjhighschool.edu.bd',
  address: 'ডাকঘর: মোসলেমগঞ্জ, উপজেলা: মহাদেবপুর, জেলা: নওগাঁ, বাংলাদেশ।'
};

export const initialPrincipalMessage: PrincipalMessage = {
  name: 'মোঃ রফিকুল ইসলাম',
  designation: 'প্রধান শিক্ষক',
  qualification: 'এম.এ (ইংরেজি), বি.এড (১ম শ্রেণি)',
  photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop',
  message: `বিসমিল্লাহির রাহমানির রাহিম।
সুধী অভিভাবক, প্রাণপ্রিয় শিক্ষার্থীবৃন্দ ও শুভানুধ্যায়ীগণ—
মোসলেমগঞ্জ উচ্চ বিদ্যালয়ের প্রাতিষ্ঠানিক ডিজিটাল পোর্টালে আপনাদের সবাইকে আন্তরিক শুভেচ্ছা ও অভিনন্দন।

বিদ্যালয় কেবল পাঠ্যপুস্তকের জ্ঞান অর্জনের স্থান নয়; এটি মূল্যবোধ, মানবিকতা এবং আত্মবিশ্বাস তৈরির পবিত্র পীঠস্থান। ১৯৬৮ সাল থেকে এই বিদ্যাপীঠ আলোর দিশারি হিসেবে অগণিত শিক্ষার্থীকে সুনাগরিক হিসেবে গড়ে তুলেছে। আমরা শিক্ষার্থীদের মুখস্থ বিদ্যার গণ্ডি পেরিয়ে সৃজনশীলতা, প্রযুক্তি দক্ষতা এবং দেশপ্রেমের মন্ত্রে দীক্ষিত করতে নিরবচ্ছিন্ন চেষ্টা চালিয়ে যাচ্ছি।

আমাদের সুযোগ্য ও নিবেদিতপ্রাণ শিক্ষকবৃন্দ এবং সচেতন অভিভাবকদের সহযোগিতায় মোসলেমগঞ্জ উচ্চ বিদ্যালয় এস.এস.সি পরীক্ষায় প্রতিবছর শতভাগ সাফল্য অর্জন করছে। আমাদের লক্ষ্য প্রতিটি শিশুকে আধুনিক পৃথিবীর চ্যালেঞ্জ মোকাবিলার যোগ্য করে গড়ে তোলা। 

বিদ্যালয়ের উত্তরোত্তর সমৃদ্ধিতে আপনাদের সুচিন্তিত পরামর্শ ও দোয়া একান্তভাবে কাম্য।`
};

export const initialTeachers: Teacher[] = [
  {
    id: 't-1',
    name: 'মোঃ রফিকুল ইসলাম',
    designation: 'প্রধান শিক্ষক',
    subject: 'প্রশাসন ও ইংরেজি',
    qualification: 'এম.এ (ইংরেজি), বি.এড (১ম শ্রেণি)',
    mobile: '০১৭১১-২২৩৩৪৪',
    email: 'headmaster@moslemganj.edu.bd',
    bio: '২৫ বছরের শিক্ষকতা ও প্রশাসনিক অভিজ্ঞতা। বিদ্যালয়ের একাডেমিক উৎকর্ষ ও শৃঙ্খলার প্রধান চালিকাশক্তি।',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop',
    order: 1
  },
  {
    id: 't-2',
    name: 'মোসাঃ খালেদা আক্তার',
    designation: 'সহকারী প্রধান শিক্ষক',
    subject: 'গণিত ও উচ্চতর গণিত',
    qualification: 'এম.এসসি (গণিত), বি.এড',
    mobile: '০১৭২২-৩৩৪৪৫৫',
    email: 'khaleda.math@moslemganj.edu.bd',
    bio: 'সহজ ও আনন্দময় পদ্ধতিতে গণিত শিক্ষাদানে পারদর্শী। জাতীয় পর্যায়ে সেরা শিক্ষক পুরষ্কারপ্রাপ্ত।',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    order: 2
  },
  {
    id: 't-3',
    name: 'মোঃ আব্দুল জলিল',
    designation: 'সিনিয়র শিক্ষক',
    subject: 'বাংলা সাহিত্য ও ব্যাকরণ',
    qualification: 'এম.এ (বাংলা), এম.এড',
    mobile: '০১৭৩৩-৪৫৫৫৬৬',
    bio: 'বাংলা ভাষা ও সংস্কৃতির অনুরাগী, বিদ্যালয়ের বিতর্ক ক্লাব ও সাংস্কৃতিক অনুষ্ঠানের সমন্বয়কারী।',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    order: 3
  },
  {
    id: 't-4',
    name: 'ফাতেমা খাতুন',
    designation: 'সহকারী শিক্ষক',
    subject: 'সাধারণ বিজ্ঞান ও জীববিজ্ঞান',
    qualification: 'বি.এসসি (অনার্স), এম.এসসি (উদ্ভিদবিজ্ঞান)',
    mobile: '০১৭৪৪-৫৬৬৭৭৮',
    bio: 'ব্যবহারিক বিজ্ঞান ল্যাব পরিচালনায় বিশেষ দক্ষতা। বিজ্ঞান মেলার প্রধান প্রশিক্ষক।',
    photoUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=600&auto=format&fit=crop',
    order: 4
  },
  {
    id: 't-5',
    name: 'মোঃ শাহ আলম',
    designation: 'সহকারী শিক্ষক',
    subject: 'তথ্য ও যোগাযোগ প্রযুক্তি (আইসিটি)',
    qualification: 'বি.এসসি (কম্পিউটার সায়েন্স), ডিপ্লোমা ইন আইসিটি',
    mobile: '০১৭৫৫-৬৭৭৮৮৯',
    bio: 'বিদ্যালয়ের কম্পিউটার ল্যাব ও ডিজিটাল ক্লাসরুম ব্যবস্থাপনার দায়িত্বে নিয়োজিত।',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    order: 5
  },
  {
    id: 't-6',
    name: 'নাসরিন সুলতানা',
    designation: 'সহকারী শিক্ষক',
    subject: 'ইংরেজি ভাষা ও সাহিত্য',
    qualification: 'বি.এ (অনার্স), এম.এ (ইংরেজি)',
    mobile: '০১৭৬৬-৭৮৮৯৯০',
    bio: 'ইংরেজি কথোপকথন ও ব্যাকরণ শেখানোর আধুনিক কৌশল প্রয়োগে সিদ্ধহস্ত।',
    photoUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=600&auto=format&fit=crop',
    order: 6
  },
  {
    id: 't-7',
    name: 'মোঃ তানভীর হাসান',
    designation: 'সহকারী শিক্ষক',
    subject: 'বাংলাদেশ ও বিশ্বপরিচয়',
    qualification: 'এম.এস.এস (ইতিহাস), বি.এড',
    mobile: '০১৭৭৭-৮৯৯০০১',
    bio: 'ইতিহাস, ঐতিহ্য ও সমসাময়িক সাধারণ জ্ঞানের শিক্ষক। বিদ্যালয় স্কাউট দলের ইউনিট লিডার।',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop',
    order: 7
  },
  {
    id: 't-8',
    name: 'মোঃ মিজানুর রহমান',
    designation: 'সহকারী শিক্ষক',
    subject: 'ইসলাম ও নৈতিক শিক্ষা',
    qualification: 'ফাজিল (অনার্স), কামিল (হাদিস)',
    mobile: '০১৭৮৮-৯০০১১২',
    bio: 'শিক্ষার্থীদের নৈতিক ও চারিত্রিক উৎকর্ষ সাধনে নিবেদিত শিক্ষক ও সুবক্তা।',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop',
    order: 8
  }
];

export const initialStudents: Student[] = [
  {
    id: 's-601',
    studentId: 'MGHS-2024-0601',
    roll: 1,
    name: 'তাহমিদ হাসান',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop',
    class: '৬ষ্ঠ',
    section: 'ক',
    fatherName: 'মোঃ আবুল কাশেম',
    motherName: 'তসলিমা বেগম',
    dateOfBirth: '২০১২-০৩-১৫',
    gender: 'ছাত্র',
    address: 'গ্রাম: মোসলেমগঞ্জ, নওগাঁ',
    guardianMobile: '০১৭০১-১১২২৩৩',
    admissionYear: 2024
  },
  {
    id: 's-602',
    studentId: 'MGHS-2024-0602',
    roll: 2,
    name: 'সুমাইয়া আক্তার',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop',
    class: '৬ষ্ঠ',
    section: 'ক',
    fatherName: 'মোঃ জাহিদুল ইসলাম',
    motherName: 'নাজমুন নাহার',
    dateOfBirth: '২০১২-০৭-২২',
    gender: 'ছাত্রী',
    address: 'গ্রাম: চকগৌরী, নওগাঁ',
    guardianMobile: '০১৭০২-২২৩৪৪৪',
    admissionYear: 2024
  },
  {
    id: 's-701',
    studentId: 'MGHS-2024-0701',
    roll: 1,
    name: 'আরিফুল ইসলাম রিফাত',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
    class: '৭ম',
    section: 'ক',
    fatherName: 'মোঃ শফিকুল ইসলাম',
    motherName: 'রোকেয়া বেগম',
    dateOfBirth: '২০১১-০৫-১০',
    gender: 'ছাত্র',
    address: 'গ্রাম: শিবগঞ্জ, নওগাঁ',
    guardianMobile: '০১৭০৩-৩৩৪৫৫৫',
    admissionYear: 2023
  },
  {
    id: 's-801',
    studentId: 'MGHS-2024-0801',
    roll: 1,
    name: 'সাদিয়া জাহান স্নেহা',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    class: '৮ম',
    section: 'ক',
    fatherName: 'মোঃ শাহজাহান আলী',
    motherName: 'মমতাজ বেগম',
    dateOfBirth: '২০১০-০২-১৮',
    gender: 'ছাত্রী',
    address: 'গ্রাম: রামচন্দ্রপুর, নওগাঁ',
    guardianMobile: '০১৭০৪-৪৪৫৫৬৬',
    admissionYear: 2022
  },
  {
    id: 's-901',
    studentId: 'MGHS-2024-0901',
    roll: 1,
    name: 'ফারহান আহমেদ তানভীর',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=400&auto=format&fit=crop',
    class: '৯ম',
    section: 'বিজ্ঞান',
    fatherName: 'প্রকৌশলী রফিকুল হক',
    motherName: 'শাহনাজ পারভীন',
    dateOfBirth: '২০০৯-০৮-১২',
    gender: 'ছাত্র',
    address: 'গ্রাম: বালুকাপাড়া, নওগাঁ',
    guardianMobile: '০১৭০৫-৫৫৬৬৭৭',
    admissionYear: 2021
  },
  {
    id: 's-1001',
    studentId: 'MGHS-2024-1001',
    roll: 1,
    name: 'নুসরাত জাহান মিথিলা',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    class: '১০ম',
    section: 'বিজ্ঞান',
    fatherName: 'ডাঃ মোস্তাফিজুর রহমান',
    motherName: 'ডালিয়া রহমান',
    dateOfBirth: '২০০৮-১১-০৫',
    gender: 'ছাত্রী',
    address: 'উপজেলা সদর, মহাদেবপুর, নওগাঁ',
    guardianMobile: '০১৭০৬-৬৬৭৭৮৮',
    admissionYear: 2020
  },
  {
    id: 's-1002',
    studentId: 'MGHS-2024-1002',
    roll: 2,
    name: 'সাকিব আল হাসান',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
    class: '১০ম',
    section: 'ব্যবসায় শিক্ষা',
    fatherName: 'মোঃ আনোয়ার হোসেন',
    motherName: 'লতিফা খাতুন',
    dateOfBirth: '২০০৮-০৬-২০',
    gender: 'ছাত্র',
    address: 'গ্রাম: মধুরাপুর, নওগাঁ',
    guardianMobile: '০১৭০৭-৭৭৮৮৯৯',
    admissionYear: 2020
  }
];

export const initialRoutines: RoutinePeriod[] = [
  // Class 10 Saturday
  { id: 'r-1', class: '১০ম', day: 'শনিবার', period: '১ম', time: '১০:০০ - ১০:৪৫', subject: 'বাংলা', teacher: 'মোঃ আব্দুল জলিল' },
  { id: 'r-2', class: '১০ম', day: 'শনিবার', period: '২য়', time: '১০:৪৫ - ১১:৩০', subject: 'ইংরেজি', teacher: 'মোঃ রফিকুল ইসলাম' },
  { id: 'r-3', class: '১০ম', day: 'শনিবার', period: '৩য়', time: '১১:৩০ - ১২:১৫', subject: 'গণিত', teacher: 'মোসাঃ খালেদা আক্তার' },
  { id: 'r-4', class: '১০ম', day: 'শনিবার', period: '৪র্থ', time: '১২:১৫ - ০১:০০', subject: 'পদার্থ / বিজ্ঞান', teacher: 'ফাতেমা খাতুন' },
  { id: 'r-5', class: '১০ম', day: 'শনিবার', period: '৫ম', time: '০১:৩০ - ০২:১৫', subject: 'আইসিটি', teacher: 'মোঃ শাহ আলম' },
  { id: 'r-6', class: '১০ম', day: 'শনিবার', period: '৬ষ্ঠ', time: '০২:১৫ - ০৩:০০', subject: 'ধর্ম ও নৈতিক শিক্ষা', teacher: 'মোঃ মিজানুর রহমান' },

  // Class 10 Sunday
  { id: 'r-7', class: '১০ম', day: 'রবিবার', period: '১ম', time: '১০:০০ - ১০:৪৫', subject: 'ইংরেজি', teacher: 'নাসরিন সুলতানা' },
  { id: 'r-8', class: '১০ম', day: 'রবিবার', period: '২য়', time: '১০:৪৫ - ১১:৩০', subject: 'উচ্চতর গণিত', teacher: 'মোসাঃ খালেদা আক্তার' },
  { id: 'r-9', class: '১০ম', day: 'রবিবার', period: '৩য়', time: '১১:৩০ - ১২:১৫', subject: 'রসায়ন / বিজ্ঞান', teacher: 'ফাতেমা খাতুন' },
  { id: 'r-10', class: '১০ম', day: 'রবিবার', period: '৪র্থ', time: '১২:১৫ - ০১:০০', subject: 'বাংলা ২য় পত্র', teacher: 'মোঃ আব্দুল জলিল' },
  { id: 'r-11', class: '১০ম', day: 'রবিবার', period: '৫ম', time: '০১:৩০ - ০২:১৫', subject: 'বাংলাদেশ ও বিশ্বপরিচয়', teacher: 'মোঃ তানভীর হাসান' },
  { id: 'r-12', class: '১০ম', day: 'রবিবার', period: '৬ষ্ঠ', time: '০২:১৫ - ০৩:০০', subject: 'আইসিটি ল্যাব', teacher: 'মোঃ শাহ আলম' },

  // Class 9 Saturday
  { id: 'r-13', class: '৯ম', day: 'শনিবার', period: '১ম', time: '১০:০০ - ১০:৪৫', subject: 'গণিত', teacher: 'মোসাঃ খালেদা আক্তার' },
  { id: 'r-14', class: '৯ম', day: 'শনিবার', period: '২য়', time: '১০:৪৫ - ১১:৩০', subject: 'বাংলা', teacher: 'মোঃ আব্দুল জলিল' },
  { id: 'r-15', class: '৯ম', day: 'শনিবার', period: '৩য়', time: '১১:৩০ - ১২:১৫', subject: 'ইংরেজি', teacher: 'নাসরিন সুলতানা' },
  { id: 'r-16', class: '৯ম', day: 'শনিবার', period: '৪র্থ', time: '১২:১৫ - ০১:০০', subject: 'বিজ্ঞান', teacher: 'ফাতেমা খাতুন' },
  { id: 'r-17', class: '৯ম', day: 'শনিবার', period: '৫ম', time: '০১:৩০ - ০২:১৫', subject: 'আইসিটি', teacher: 'মোঃ শাহ আলম' },
  { id: 'r-18', class: '৯ম', day: 'শনিবার', period: '৬ষ্ঠ', time: '০২:১৫ - ০৩:০০', subject: 'ধর্ম', teacher: 'মোঃ মিজানুর রহমান' },

  // Class 8 Saturday
  { id: 'r-19', class: '৮ম', day: 'শনিবার', period: '১ম', time: '১০:০০ - ১০:৪৫', subject: 'ইংরেজি', teacher: 'নাসরিন সুলতানা' },
  { id: 'r-20', class: '৮ম', day: 'শনিবার', period: '২য়', time: '১০:৪৫ - ১১:৩০', subject: 'গণিত', teacher: 'মোসাঃ খালেদা আক্তার' },
  { id: 'r-21', class: '৮ম', day: 'শনিবার', period: '৩য়', time: '১১:৩০ - ১২:১৫', subject: 'বিজ্ঞান', teacher: 'ফাতেমা খাতুন' },
  { id: 'r-22', class: '৮ম', day: 'শনিবার', period: '৪র্থ', time: '১২:১৫ - ০১:০০', subject: 'বাংলা', teacher: 'মোঃ আব্দুল জলিল' },
  { id: 'r-23', class: '৮ম', day: 'শনিবার', period: '৫ম', time: '০১:৩০ - ০২:১৫', subject: 'বাংলাদেশ ও বিশ্বপরিচয়', teacher: 'মোঃ তানভীর হাসান' },

  // Class 7 Saturday
  { id: 'r-24', class: '৭ম', day: 'শনিবার', period: '১ম', time: '১০:০০ - ১০:৪৫', subject: 'বাংলা', teacher: 'মোঃ আব্দুল জলিল' },
  { id: 'r-25', class: '৭ম', day: 'শনিবার', period: '২য়', time: '১০:৪৫ - ১১:৩০', subject: 'বিজ্ঞান', teacher: 'ফাতেমা খাতুন' },
  { id: 'r-26', class: '৭ম', day: 'শনিবার', period: '৩য়', time: '১১:৩০ - ১২:১৫', subject: 'ইংরেজি', teacher: 'নাসরিন সুলতানা' },
  { id: 'r-27', class: '৭ম', day: 'শনিবার', period: '৪র্থ', time: '১২:১৫ - ০১:০০', subject: 'গণিত', teacher: 'মোসাঃ খালেদা আক্তার' },

  // Class 6 Saturday
  { id: 'r-28', class: '৬ষ্ঠ', day: 'শনিবার', period: '১ম', time: '১০:০০ - ১০:৪৫', subject: 'বিজ্ঞান', teacher: 'ফাতেমা খাতুন' },
  { id: 'r-29', class: '৬ষ্ঠ', day: 'শনিবার', period: '২য়', time: '১০:৪৫ - ১১:৩০', subject: 'বাংলা', teacher: 'মোঃ আব্দুল জলিল' },
  { id: 'r-30', class: '৬ষ্ঠ', day: 'শনিবার', period: '৩য়', time: '১১:৩০ - ১২:১৫', subject: 'গণিত', teacher: 'মোসাঃ খালেদা আক্তার' },
  { id: 'r-31', class: '৬ষ্ঠ', day: 'শনিবার', period: '৪র্থ', time: '১২:১৫ - ০১:০০', subject: 'ইংরেজি', teacher: 'নাসরিন সুলতানা' }
];

export const initialExams: Examination[] = [
  {
    id: 'exam-1',
    name: 'বার্ষিক পরীক্ষা ২০২৪',
    category: '৩. ফাইনাল পরীক্ষা',
    year: 2024,
    class: '১০ম',
    examDate: '২০২৪-১১-১৫',
    fullMarks: 600
  },
  {
    id: 'exam-2',
    name: 'অর্ধবার্ষিক মূল্যায়ন পরীক্ষা ২০২৪',
    category: '২. অর্ধবার্ষিক পরীক্ষা',
    year: 2024,
    class: '১০ম',
    examDate: '২০২৪-০৬-১০',
    fullMarks: 600
  },
  {
    id: 'exam-3',
    name: '১ম শ্রেণি অভীক্ষা ২০২৪',
    category: '১. ক্লাস টেস্ট',
    year: 2024,
    class: '১০ম',
    examDate: '২০২৪-০৩-২০',
    fullMarks: 150
  },
  {
    id: 'exam-4',
    name: 'বার্ষিক পরীক্ষা ২০২৪',
    category: '৩. ফাইনাল পরীক্ষা',
    year: 2024,
    class: '৯ম',
    examDate: '২০২৪-১১-১৫',
    fullMarks: 600
  },
  {
    id: 'exam-5',
    name: 'বার্ষিক পরীক্ষা ২০২৪',
    category: '৩. ফাইনাল পরীক্ষা',
    year: 2024,
    class: '৬ষ্ঠ',
    examDate: '২০২৪-১১-১৫',
    fullMarks: 600
  }
];

export const initialResults: StudentResult[] = [
  {
    id: 'res-1001',
    examId: 'exam-1',
    examName: 'বার্ষিক পরীক্ষা ২০২৪',
    examYear: 2024,
    studentDocId: 's-1001',
    studentId: 'MGHS-2024-1001',
    studentName: 'নুসরাত জাহান মিথিলা',
    studentPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    class: '১০ম',
    section: 'বিজ্ঞান',
    roll: 1,
    subjects: {
      bangla: 88,
      english: 92,
      mathematics: 96,
      science: 94,
      ict: 48,
      religion: 95
    },
    subjectDetails: [
      { subjectName: 'বাংলা (Bangla)', fullMarks: 100, obtainedMarks: 88, grade: 'A+', gradePoint: 5.0 },
      { subjectName: 'ইংরেজি (English)', fullMarks: 100, obtainedMarks: 92, grade: 'A+', gradePoint: 5.0 },
      { subjectName: 'গণিত (Mathematics)', fullMarks: 100, obtainedMarks: 96, grade: 'A+', gradePoint: 5.0 },
      { subjectName: 'বিজ্ঞান (Science)', fullMarks: 100, obtainedMarks: 94, grade: 'A+', gradePoint: 5.0 },
      { subjectName: 'আইসিটি (ICT)', fullMarks: 50, obtainedMarks: 48, grade: 'A+', gradePoint: 5.0 },
      { subjectName: 'ইসলাম ও নৈতিক শিক্ষা (Religion)', fullMarks: 100, obtainedMarks: 95, grade: 'A+', gradePoint: 5.0 }
    ],
    totalMarks: 513,
    percentage: 93.27,
    gpa: 5.0,
    grade: 'A+',
    status: 'উত্তীর্ণ',
    isPublished: true,
    publishedAt: '২০২৪-১২-১০'
  },
  {
    id: 'res-1002',
    examId: 'exam-1',
    examName: 'বার্ষিক পরীক্ষা ২০২৪',
    examYear: 2024,
    studentDocId: 's-1002',
    studentId: 'MGHS-2024-1002',
    studentName: 'সাকিব আল হাসান',
    studentPhoto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
    class: '১০ম',
    section: 'ব্যবসায় শিক্ষা',
    roll: 2,
    subjects: {
      bangla: 78,
      english: 74,
      mathematics: 82,
      science: 71,
      ict: 42,
      religion: 85
    },
    subjectDetails: [
      { subjectName: 'বাংলা (Bangla)', fullMarks: 100, obtainedMarks: 78, grade: 'A', gradePoint: 4.0 },
      { subjectName: 'ইংরেজি (English)', fullMarks: 100, obtainedMarks: 74, grade: 'A', gradePoint: 4.0 },
      { subjectName: 'গণিত (Mathematics)', fullMarks: 100, obtainedMarks: 82, grade: 'A+', gradePoint: 5.0 },
      { subjectName: 'বিজ্ঞান (Science)', fullMarks: 100, obtainedMarks: 71, grade: 'A', gradePoint: 4.0 },
      { subjectName: 'আইসিটি (ICT)', fullMarks: 50, obtainedMarks: 42, grade: 'A+', gradePoint: 5.0 },
      { subjectName: 'ইসলাম ও নৈতিক শিক্ষা (Religion)', fullMarks: 100, obtainedMarks: 85, grade: 'A+', gradePoint: 5.0 }
    ],
    totalMarks: 432,
    percentage: 78.54,
    gpa: 4.33,
    grade: 'A',
    status: 'উত্তীর্ণ',
    isPublished: true,
    publishedAt: '২০২৪-১২-১০'
  },
  {
    id: 'res-601',
    examId: 'exam-5',
    examName: 'বার্ষিক পরীক্ষা ২০২৪',
    examYear: 2024,
    studentDocId: 's-601',
    studentId: 'MGHS-2024-0601',
    studentName: 'তাহমিদ হাসান',
    studentPhoto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop',
    class: '৬ষ্ঠ',
    section: 'ক',
    roll: 1,
    subjects: {
      bangla: 85,
      english: 89,
      mathematics: 95,
      science: 90,
      ict: 45,
      religion: 92
    },
    subjectDetails: [
      { subjectName: 'বাংলা (Bangla)', fullMarks: 100, obtainedMarks: 85, grade: 'A+', gradePoint: 5.0 },
      { subjectName: 'ইংরেজি (English)', fullMarks: 100, obtainedMarks: 89, grade: 'A+', gradePoint: 5.0 },
      { subjectName: 'গণিত (Mathematics)', fullMarks: 100, obtainedMarks: 95, grade: 'A+', gradePoint: 5.0 },
      { subjectName: 'বিজ্ঞান (Science)', fullMarks: 100, obtainedMarks: 90, grade: 'A+', gradePoint: 5.0 },
      { subjectName: 'আইসিটি (ICT)', fullMarks: 50, obtainedMarks: 45, grade: 'A+', gradePoint: 5.0 },
      { subjectName: 'ইসলাম ও নৈতিক শিক্ষা (Religion)', fullMarks: 100, obtainedMarks: 92, grade: 'A+', gradePoint: 5.0 }
    ],
    totalMarks: 496,
    percentage: 90.18,
    gpa: 5.0,
    grade: 'A+',
    status: 'উত্তীর্ণ',
    isPublished: true,
    publishedAt: '২০২৪-১২-১০'
  }
];

export const initialNotices: Notice[] = [
  {
    id: 'not-1',
    title: '২০২৪-২৫ শিক্ষাবর্ষে ৬ষ্ঠ থেকে ৯ম শ্রেণিতে ভর্তি সংক্রান্ত জরুরি বিজ্ঞপ্তি',
    date: '২০২৪-১২-০৫',
    category: 'একাডেমিক',
    content: 'মোসলেমগঞ্জ উচ্চ বিদ্যালয়ে ৬ষ্ঠ থেকে ৯ম শ্রেণিতে নতুন শিক্ষাবর্ষে ভর্তির আবেদন গ্রহণ শুরু হয়েছে। আগ্রহীদের বিদ্যালয়ের অফিস কক্ষ অথবা অনলাইন থেকে ফরম সংগ্রহ করে আগামী ২৫ ডিসেম্বরের মধ্যে জমা দেওয়ার জন্য অনুরোধ করা যাচ্ছে।',
    isImportant: true
  },
  {
    id: 'not-2',
    title: 'বার্ষিক পরীক্ষার চূড়ান্ত ফলাফল প্রকাশ ও পুরষ্কার বিতরণী অনুষ্ঠান',
    date: '২০২৪-১২-১০',
    category: 'পরীক্ষা',
    content: 'সকল শ্রেণির বার্ষিক পরীক্ষার ফলাফল ওয়েবসাইটে প্রকাশ করা হয়েছে। আগামী ১৫ ডিসেম্বর সকাল ১০:০০ ঘটিকায় বিদ্যালয় প্রাঙ্গণে কৃতি শিক্ষার্থীদের পুরষ্কার ও মেধাবৃত্তি প্রদান করা হবে। সম্মানিত অভিভাবকবৃন্দ আমন্ত্রিত।',
    isImportant: true
  },
  {
    id: 'not-3',
    title: 'শহীদ বুদ্ধিজীবী দিবস ও মহান বিজয় দিবস উদযাপনের সময়সূচি',
    date: '২০২৪-১২-১১',
    category: 'সাধারণ',
    content: 'আগামী ১৪ ডিসেম্বর শহীদ বুদ্ধিজীবী দিবস এবং ১৬ ডিসেম্বর মহান বিজয় দিবস যথাযোগ্য মর্যাদায় উদযাপন উপলক্ষে জাতীয় পতাকা উত্তোলন, কুচকাওয়াজ, আলোচনা সভা ও সাংস্কৃতিক অনুষ্ঠানের আয়োজন করা হয়েছে।',
    isImportant: false
  },
  {
    id: 'not-4',
    title: 'শীতকালীন অবকাশ ও নতুন শিক্ষাবর্ষের ক্লাস শুরুর তারিখ',
    date: '২০২৪-১২-২০',
    category: 'ছুটি',
    content: 'আগামী ২২ ডিসেম্বর থেকে ৩১ ডিসেম্বর পর্যন্ত বিদ্যালয়ের সকল একাডেমিক কার্যক্রম বন্ধ থাকবে। ১ জানুয়ারি ২০২৫ যথারীতি বই বিতরণ উৎসব ও নতুন শ্রেণির ক্লাস শুরু হবে।',
    isImportant: false
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'বিদ্যালয়ের দৃষ্টিনন্দন ক্যাম্পাস ও সুপ্রশস্ত খেলার মাঠ',
    category: 'ক্যাম্পাস',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop',
    date: '২০২৪'
  },
  {
    id: 'gal-2',
    title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ও সাংস্কৃতিক অনুষ্ঠান',
    category: 'ক্রীড়া ও সংস্কৃতি',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop',
    date: '২০২৪'
  },
  {
    id: 'gal-3',
    title: 'আন্তঃবিদ্যালয় বিজ্ঞান মেলায় শিক্ষার্থীদের উদ্ভাবনী প্রজেক্ট',
    category: 'বিজ্ঞান মেলা',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    date: '২০২৪'
  },
  {
    id: 'gal-4',
    title: 'মেধাবী ছাত্র-ছাত্রীদের মাঝে সনদ ও মেডেল প্রদান',
    category: 'পুরস্কার বিতরণ',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
    date: '২০২৪'
  },
  {
    id: 'gal-5',
    title: 'শেখ রাসেল ডিজিটাল কম্পিউটার ল্যাব ও তথ্যপ্রযুক্তি ক্লাস',
    category: 'ক্যাম্পাস',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    date: '২০২৪'
  },
  {
    id: 'gal-6',
    title: 'বিদ্যালয় স্কাউট দলের বার্ষিক ক্যাম্পিং ও মহড়া',
    category: 'ক্রীড়া ও সংস্কৃতি',
    imageUrl: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=800&auto=format&fit=crop',
    date: '২০২৪'
  }
];
