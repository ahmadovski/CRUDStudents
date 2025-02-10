import axios from "axios";
import { Student } from "../types/student";

const API_URL = "http://localhost:3000/students"; // Update endpoint

export const getStudents = async (): Promise<Student[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createStudent = async (
  newStudent: Omit<Student, "id">
): Promise<Student> => {
  const response = await axios.post(API_URL, newStudent);
  return response.data;
};

export const updateStudent = async (
  id: Student["id"],
  updatedStudent: Student
): Promise<Student> => {
  const response = await axios.put(`${API_URL}/${id}`, updatedStudent);
  return response.data;
};

export const deleteStudent = async (id: Student["id"]): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
