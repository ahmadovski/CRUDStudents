import { ReactNode, useEffect, useReducer } from "react";
import { StudentsContext } from "./StudentsContext";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService";
import { Student } from "../types/student";
import { studentsReducer } from "./StudentsReducer";

const initialState = { students: [], selectedStudents: [] };

export const StudentsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(studentsReducer, initialState);
  // console.log(state.students, "from PRovider");

  const fetchStudents = async () => {
    const fetchedStudents = await getStudents();
    dispatch({ type: "SET_STUDENTS", payload: fetchedStudents });
  };

  const setSelectedStudents = (selectedStudents: Student[]) => {
    dispatch({ type: "SET_SELECTED_STUDENTS", payload: selectedStudents });
  };

  const addStudent = async (newStudent: Omit<Student, "id">) => {
    const createdStudent = await createStudent(newStudent);
    dispatch({ type: "ADD_STUDENT", payload: createdStudent });
  };

  const editStudent = async (updatedStudent: Student) => {
    const result = await updateStudent(updatedStudent.id, updatedStudent);
    dispatch({ type: "UPDATE_STUDENT", payload: result });
  };

  const removeStudent = async (id: Student["id"]) => {
    await deleteStudent(id);
    dispatch({ type: "DELETE_STUDENT", payload: id });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <StudentsContext.Provider
      value={{
        students: state.students,
        selectedStudents: state.selectedStudents,
        fetchStudents,
        setSelectedStudents,
        addStudent,
        editStudent,
        removeStudent,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
};
