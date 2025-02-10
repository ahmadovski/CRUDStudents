import * as Yup from "yup";
export const studentFormSchema = Yup.object({
  name: Yup.string().required("Name is required"),

  gender: Yup.mixed<"Male" | "Female">()
    .oneOf(["Male", "Female"], "Gender must be Male or Female")
    .required("Gender is required"),

  fieldOfStudy: Yup.string().required("Field of Study is required"),

  grade: Yup.number()
    .min(0, "Grade cannot be less than 0")
    .max(100, "Grade cannot be more than 100")
    .required("Grade is required"),

  graduationYear: Yup.number()
    .min(2018, "Graduation year cannot be before 2018")
    .max(2025, "Graduation year cannot be after 2025")
    .required("Graduation year is required"),

  attendanceRate: Yup.number()
    .min(0, "Attendance rate cannot be less than 0%")
    .max(100, "Attendance rate cannot be more than 100%")
    .required("Attendance rate is required"),

  scholarship: Yup.boolean(),
});
