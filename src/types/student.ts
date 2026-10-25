export type Grade = 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
export type PassStatus = 'Passed' | 'Failed';

export interface Student {
  id: number;
  studentId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  branch: string;
  yearOfStudy: string;
  marks: number;
  grade: Grade;
  status: PassStatus;
  createdAt: string;
  updatedAt: string;
}

export interface StudentFormData {
  studentId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  branch: string;
  yearOfStudy: string;
  marks: string | number;
}

export function calculateGrade(marks: number): { grade: Grade; status: PassStatus } {
  const score = Number(marks);
  let grade: Grade = 'F';
  if (score >= 90) grade = 'A+';
  else if (score >= 80) grade = 'A';
  else if (score >= 70) grade = 'B';
  else if (score >= 60) grade = 'C';
  else if (score >= 50) grade = 'D';
  else grade = 'F';

  const status: PassStatus = score >= 50 ? 'Passed' : 'Failed';
  return { grade, status };
}

export const BRANCH_OPTIONS = [
  'Computer Science & Engineering',
  'Data Science & AI',
  'Information Technology',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Electrical Engineering',
];

export const YEAR_OPTIONS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
];
