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
import { toast } from "react-toastify";

const initialState = { students: [], selectedStudents: [] };

export const StudentsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(studentsReducer, initialState);
  // console.log(state.students, "from PRovider");

  const fetchStudents = async () => {
    try {
      const fetchedStudents = await getStudents();
      dispatch({ type: "SET_STUDENTS", payload: fetchedStudents });
    } catch (error) {
      toast.error("Failed to load students!");
      console.log(error);
    }
  };

  const setSelectedStudents = (selectedStudents: Student[]) => {
    dispatch({ type: "SET_SELECTED_STUDENTS", payload: selectedStudents });
  };

  const addStudent = async (newStudent: Omit<Student, "id">) => {
    try {
      const createdStudent = await createStudent(newStudent);
      dispatch({ type: "ADD_STUDENT", payload: createdStudent });
      toast.success("Student added successfully!");
    } catch (error) {
      toast.error("Failed to add student!");
      console.log(error);
    }
  };

  const editStudent = async (updatedStudent: Student) => {
    try {
      const result = await updateStudent(updatedStudent.id, updatedStudent);
      dispatch({ type: "UPDATE_STUDENT", payload: result });
      toast.success("Student updated successfully!");
    } catch (error) {
      toast.error("Failed to update student!");
      console.log(error);
    }
  };

  const removeStudent = async (id: Student["id"]) => {
    try {
      await deleteStudent(id);
      dispatch({ type: "DELETE_STUDENT", payload: id });
      toast.success("Student deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete student!");
      console.log(error);
    }
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
