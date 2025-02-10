import { useContext } from "react";
import {
  StudentsContext,
  StudentsContextType,
} from "../contexts/StudentsContext";

export const useStudents = (): StudentsContextType => {
  const context = useContext(StudentsContext);
  if (!context) {
    throw new Error("useStudents must be used within a StudentsProvider");
  }
  return context;
};
