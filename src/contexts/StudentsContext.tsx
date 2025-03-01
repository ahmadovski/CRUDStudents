import { createContext } from "react";
import { Student } from "../types/student";

export type StudentsContextType = {
  students: Student[];
  selectedStudents: Student[];
  fetchStudents: () => Promise<void>;
  setSelectedStudents: (selectedStudents: Student[]) => void;
  addStudent: (newStudent: Omit<Student, "id">) => Promise<void>;
  editStudent: (updatedStudent: Student) => Promise<void>;
  removeStudent: (id: Student["id"]) => Promise<void>;
};

export const StudentsContext = createContext<StudentsContextType | null>(null);
