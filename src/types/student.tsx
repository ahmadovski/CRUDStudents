export type Student = {
  id: number;
  name: string;
  gender: "Male" | "Female";
  fieldOfStudy: string;
  grade: number; // 0-100 scale
  graduationYear: number; // 2019 ~ 2025
  attendanceRate: number; // Percentage (0-100)
  scholarship: boolean;
};
