export type ClassGrade = '৬ষ্ঠ' | '৭ম' | '৮ম' | '৯ম' | '১০ম';

export interface Teacher {
  id: string;
  name: string;
  designation: string; // প্রধান শিক্ষক, সহকারী প্রধান শিক্ষক, সহকারী শিক্ষক, etc.
  subject: string;
  qualification: string;
  mobile: string;
  email?: string;
  bio: string;
  photoUrl: string;
  order: number;
  joinDate?: string;
}

export interface Student {
  id: string; // Firestore doc ID
  studentId: string; // e.g. "MGHS-2024-0601"
  roll: number;
  name: string;
  photoUrl: string;
  class: ClassGrade;
  section: string; // "ক", "খ", "বিজ্ঞান", "মানবিক", "ব্যবসায় শিক্ষা"
  fatherName: string;
  motherName: string;
  dateOfBirth?: string; // YYYY-MM-DD
  birthDate?: string; // YYYY-MM-DD
  bloodGroup?: string;
  gender: 'ছাত্র' | 'ছাত্রী' | 'অন্যান্য' | string;
  address: string;
  guardianMobile: string;
  admissionYear: number;
}

export interface RoutinePeriod {
  id: string;
  day: 'শনিবার' | 'রবিবার' | 'সোমবার' | 'মঙ্গলবার' | 'বুধবার' | 'বৃহস্পতিবার' | string;
  period: string; // "১ম", "২য়", "৩য়", "৪র্থ", "৫ম", "৬ষ্ঠ"
  time: string; // "১০:০০ - ১০:৪৫"
  subject: string;
  teacher: string;
  class: ClassGrade;
  section?: string;
}

export type ExamCategory = '১. ক্লাস টেস্ট' | '২. অর্ধবার্ষিক পরীক্ষা' | '৩. ফাইনাল পরীক্ষা' | string;

export interface Examination {
  id: string;
  name: string; // e.g. "বার্ষিক পরীক্ষা ২০২৪"
  category?: ExamCategory;
  term?: string;
  year: number;
  class: ClassGrade;
  subject?: string;
  examDate?: string;
  startDate?: string;
  endDate?: string;
  fullMarks?: number;
  isPublished?: boolean;
}

export interface SubjectMark {
  subjectName: string;
  fullMarks: number;
  obtainedMarks: number;
  grade: string;
  gradePoint: number;
}

export type SubjectDetail = SubjectMark;

export interface StudentResult {
  id: string;
  examId: string;
  examName: string;
  examYear: number;
  studentDocId?: string;
  studentId: string;
  studentName: string;
  studentPhoto?: string;
  class: ClassGrade;
  section: string;
  roll: number;
  subjects?: {
    bangla: number;
    english: number;
    mathematics: number;
    science: number;
    ict: number;
    religion: number;
    other?: number;
  };
  subjectDetails: SubjectMark[];
  totalMarks: number;
  percentage: number;
  gpa: number;
  grade: string;
  status: 'উত্তীর্ণ' | 'অনুত্তীর্ণ';
  isPublished: boolean;
  publishedAt?: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: 'একাডেমিক' | 'পরীক্ষা' | 'ছুটি' | 'সাধারণ' | string;
  content: string;
  isImportant?: boolean;
  fileUrl?: string;
}

export interface SchoolInfo {
  schoolNameBn: string;
  schoolNameEn: string;
  eiinNumber: string;
  establishedYear: string;
  motto: string;
  shortDescription: string;
  history: string;
  mission: string;
  vision: string;
  objectives: string[];
  campusEnvironment: string;
  phone: string;
  email: string;
  address: string;
}

export interface PrincipalMessage {
  name: string;
  designation: string;
  qualification: string;
  photoUrl: string;
  message: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'ক্যাম্পাস' | 'ক্রীড়া ও সংস্কৃতি' | 'বিজ্ঞান মেলা' | 'পুরস্কার বিতরণ' | string;
  imageUrl: string;
  date?: string;
}

