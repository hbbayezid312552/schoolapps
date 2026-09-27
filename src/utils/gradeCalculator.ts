import { SubjectMark } from '../types';

export function calculateSubjectGrade(obtained: number, fullMarks: number = 100): { grade: string; gradePoint: number } {
  if (fullMarks <= 0) return { grade: 'F', gradePoint: 0.0 };
  const percentage = (obtained / fullMarks) * 100;

  if (percentage >= 80) {
    return { grade: 'A+', gradePoint: 5.0 };
  } else if (percentage >= 70) {
    return { grade: 'A', gradePoint: 4.0 };
  } else if (percentage >= 60) {
    return { grade: 'A-', gradePoint: 3.5 };
  } else if (percentage >= 50) {
    return { grade: 'B', gradePoint: 3.0 };
  } else if (percentage >= 40) {
    return { grade: 'C', gradePoint: 2.0 };
  } else if (percentage >= 33) {
    return { grade: 'D', gradePoint: 1.0 };
  } else {
    return { grade: 'F', gradePoint: 0.0 };
  }
}

export function computeOverallResult(
  subjects: {
    bangla: number;
    english: number;
    mathematics: number;
    science: number;
    ict: number;
    religion: number;
    other?: number;
  },
  otherSubjectName: string = 'অন্যান্য বিষয়'
): {
  subjectDetails: SubjectMark[];
  totalMarks: number;
  percentage: number;
  gpa: number;
  grade: string;
  status: 'উত্তীর্ণ' | 'অনুত্তীর্ণ';
} {
  const subjectList: { name: string; full: number; obtained: number }[] = [
    { name: 'বাংলা (Bangla)', full: 100, obtained: Math.max(0, subjects.bangla || 0) },
    { name: 'ইংরেজি (English)', full: 100, obtained: Math.max(0, subjects.english || 0) },
    { name: 'গণিত (Mathematics)', full: 100, obtained: Math.max(0, subjects.mathematics || 0) },
    { name: 'বিজ্ঞান (Science)', full: 100, obtained: Math.max(0, subjects.science || 0) },
    { name: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)', full: 50, obtained: Math.max(0, subjects.ict || 0) },
    { name: 'ধর্ম ও নৈতিক শিক্ষা (Religion)', full: 100, obtained: Math.max(0, subjects.religion || 0) }
  ];

  if (subjects.other !== undefined && subjects.other !== null) {
    subjectList.push({
      name: otherSubjectName || 'ঐচ্ছিক বিষয়',
      full: 100,
      obtained: Math.max(0, subjects.other)
    });
  }

  let totalObtained = 0;
  let totalFull = 0;
  let hasFailedSubject = false;
  let totalGradePoints = 0;

  const subjectDetails: SubjectMark[] = subjectList.map((sub) => {
    const { grade, gradePoint } = calculateSubjectGrade(sub.obtained, sub.full);
    totalObtained += sub.obtained;
    totalFull += sub.full;
    totalGradePoints += gradePoint;
    if (grade === 'F') {
      hasFailedSubject = true;
    }
    return {
      subjectName: sub.name,
      fullMarks: sub.full,
      obtainedMarks: sub.obtained,
      grade,
      gradePoint
    };
  });

  const percentage = Number(((totalObtained / totalFull) * 100).toFixed(2));

  let gpa = 0.0;
  let grade = 'F';
  let status: 'উত্তীর্ণ' | 'অনুত্তীর্ণ' = 'অনুত্তীর্ণ';

  if (!hasFailedSubject && subjectList.length > 0) {
    const calculatedGpa = totalGradePoints / subjectList.length;
    gpa = Number(Math.min(5.0, calculatedGpa).toFixed(2));
    status = 'উত্তীর্ণ';

    if (gpa >= 5.0) {
      grade = 'A+';
    } else if (gpa >= 4.0) {
      grade = 'A';
    } else if (gpa >= 3.5) {
      grade = 'A-';
    } else if (gpa >= 3.0) {
      grade = 'B';
    } else if (gpa >= 2.0) {
      grade = 'C';
    } else if (gpa >= 1.0) {
      grade = 'D';
    } else {
      grade = 'F';
      status = 'অনুত্তীর্ণ';
    }
  }

  return {
    subjectDetails,
    totalMarks: totalObtained,
    percentage,
    gpa,
    grade,
    status
  };
}

export function calculateFinalGPA(subjectDetails: { fullMarks: number; obtainedMarks: number; grade: string; gradePoint: number }[]): {
  totalMarks: number;
  percentage: number;
  gpa: number;
  grade: string;
  status: 'উত্তীর্ণ' | 'অনুত্তীর্ণ';
} {
  let totalObtained = 0;
  let totalFull = 0;
  let totalPoints = 0;
  let hasFailed = false;

  subjectDetails.forEach((sub) => {
    totalObtained += sub.obtainedMarks;
    totalFull += sub.fullMarks;
    totalPoints += sub.gradePoint;
    if (sub.grade === 'F' || sub.obtainedMarks < (sub.fullMarks * 0.33)) {
      hasFailed = true;
    }
  });

  const percentage = totalFull > 0 ? Number(((totalObtained / totalFull) * 100).toFixed(2)) : 0;

  if (hasFailed || subjectDetails.length === 0) {
    return {
      totalMarks: totalObtained,
      percentage,
      gpa: 0.0,
      grade: 'F',
      status: 'অনুত্তীর্ণ'
    };
  }

  const rawGpa = totalPoints / subjectDetails.length;
  const gpa = Number(Math.min(5.0, rawGpa).toFixed(2));

  let grade = 'F';
  if (gpa >= 5.0) grade = 'A+';
  else if (gpa >= 4.0) grade = 'A';
  else if (gpa >= 3.5) grade = 'A-';
  else if (gpa >= 3.0) grade = 'B';
  else if (gpa >= 2.0) grade = 'C';
  else if (gpa >= 1.0) grade = 'D';

  return {
    totalMarks: totalObtained,
    percentage,
    gpa,
    grade,
    status: 'উত্তীর্ণ'
  };
}

// Convert English numbers to Bengali numerals
export function toBengaliNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return '';
  const str = String(num);
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.replace(/[0-9]/g, (w) => bengaliDigits[+w]);
}
