import { Student } from "../types/student";

export const calculateAverageGrade = (students: Student[]): number => {
  const totalGrade = students.reduce((sum, student) => sum + student.grade, 0);
  return parseFloat((totalGrade / students.length).toFixed(2)); // Round to 2 decimal places
};

export const getTopFieldOfStudy = (students: Student[]): string => {
  const fieldCounts: Record<string, number> = students.reduce(
    (acc, student) => {
      acc[student.fieldOfStudy] = (acc[student.fieldOfStudy] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(fieldCounts).sort((a, b) => b[1] - a[1])[0][0];
};
export const getScholarshipRecipients = (
  students: Student[]
): { count: number; percentage: string } => {
  const recipients = students.filter((student) => student.scholarship).length;
  return {
    count: recipients,
    percentage: ((recipients / students.length) * 100).toFixed(2) + "%",
  };
};

export const calculateAverageAttendanceRate = (students: Student[]): number => {
  const totalAttendance = students.reduce(
    (sum, student) => sum + student.attendanceRate,
    0
  );
  return parseFloat((totalAttendance / students.length).toFixed(2)); // Round to 2 decimal places
};

export const getTopPerformers = (
  students: Student[],
  topN: number = 5
): { name: string; grade: number }[] => {
  return students
    .sort((a, b) => b.grade - a.grade)
    .slice(0, topN)
    .map((student) => ({ name: student.name, grade: student.grade }));
};

export const calculatePassFailRate = (
  students: Student[],
  passingGrade: number = 60
): { passPercentage: string; failPercentage: string } => {
  const passCount = students.filter(
    (student) => student.grade >= passingGrade
  ).length;
  const failCount = students.length - passCount;

  return {
    passPercentage: ((passCount / students.length) * 100).toFixed(2) + "%",
    failPercentage: ((failCount / students.length) * 100).toFixed(2) + "%",
  };
};
