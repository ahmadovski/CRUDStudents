import { Student } from "../types/student";

// Reducer actions
type Action =
  | { type: "SET_STUDENTS"; payload: Student[] }
  | { type: "ADD_STUDENT"; payload: Student }
  | { type: "UPDATE_STUDENT"; payload: Student }
  | { type: "DELETE_STUDENT"; payload: Student["id"] };

// State type
type State = { students: Student[] };

// Reducer function
export const studentsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_STUDENTS":
      return { ...state, students: action.payload };
    case "ADD_STUDENT":
      return {
        ...state,
        students: [...state.students, action.payload],
      };
    case "UPDATE_STUDENT":
      return {
        ...state,
        students: state.students.map((s) => {
          return s.id == action.payload.id ? action.payload : s;
        }),
      };
    case "DELETE_STUDENT":
      return {
        ...state,
        students: state.students.filter((s) => s.id !== action.payload),
      };
    default:
      return state;
  }
};
