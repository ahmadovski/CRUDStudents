import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import { studentFormSchema } from "../../schemas/studentFormSchema";
import { Student } from "../../types/student";
import Modal from "../UI/Modal";
import { useState } from "react";

type StudentFormProps = {
  open: boolean;
  onClose: () => void;
  onSave: (student: Omit<Student, "id"> | Student) => void;
  initialData?: Student;
};

// Explicit type for Formik values (excluding 'id')
type StudentFormValues = Omit<Student, "id">;

const StudentForm = ({
  open,
  onClose,
  onSave,
  initialData,
}: StudentFormProps) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const formik = useFormik<StudentFormValues>({
    initialValues: initialData || {
      name: "",
      gender: "Male", //  default value must match type
      fieldOfStudy: "",
      grade: 0,
      graduationYear: new Date().getFullYear(),
      attendanceRate: 100,
      scholarship: false,
    },
    validationSchema: studentFormSchema,
    enableReinitialize: true, // Ensures form updates when initialData changes
    onSubmit: () => {
      setOpenConfirmation(true); // Show confirmation modal before saving
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>{initialData ? "Edit Student" : "Add Student"}</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin='dense'
            label='Name'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          {/* Gender Select Input */}
          <TextField
            select
            fullWidth
            margin='dense'
            label='Gender'
            name='gender'
            value={formik.values.gender}
            onChange={formik.handleChange}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
          >
            {["Male", "Female"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          {/* Field of Study Select Input */}
          <TextField
            select
            fullWidth
            margin='dense'
            label='Field of Study'
            name='fieldOfStudy'
            value={formik.values.fieldOfStudy}
            onChange={formik.handleChange}
            error={
              formik.touched.fieldOfStudy && Boolean(formik.errors.fieldOfStudy)
            }
            helperText={
              formik.touched.fieldOfStudy && formik.errors.fieldOfStudy
            }
          >
            {["Mechanical Engineering", "Computer Science", "Mathematics"].map(
              (option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              )
            )}
          </TextField>

          <TextField
            fullWidth
            margin='dense'
            label='Grade'
            type='number'
            name='grade'
            value={formik.values.grade}
            onChange={formik.handleChange}
            error={formik.touched.grade && Boolean(formik.errors.grade)}
            helperText={formik.touched.grade && formik.errors.grade}
          />

          <TextField
            fullWidth
            margin='dense'
            label='Graduation Year'
            type='number'
            name='graduationYear'
            value={formik.values.graduationYear}
            onChange={formik.handleChange}
            error={
              formik.touched.graduationYear &&
              Boolean(formik.errors.graduationYear)
            }
            helperText={
              formik.touched.graduationYear && formik.errors.graduationYear
            }
          />

          <TextField
            fullWidth
            margin='dense'
            label='Attendance Rate'
            type='number'
            name='attendanceRate'
            value={formik.values.attendanceRate}
            onChange={formik.handleChange}
            error={
              formik.touched.attendanceRate &&
              Boolean(formik.errors.attendanceRate)
            }
            helperText={
              formik.touched.attendanceRate && formik.errors.attendanceRate
            }
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.scholarship}
                onChange={formik.handleChange}
                name='scholarship'
              />
            }
            label='Scholarship'
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={formik.submitForm} variant='contained'>
          {initialData ? "Update" : "Create"}
        </Button>
      </DialogActions>

      {/* Confirmation Modal */}
      <Modal
        type='confirmation'
        title='Confirm'
        open={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
        onConfirm={() => {
          onSave(formik.values);
          setOpenConfirmation(false);
          onClose();
        }}
      >
        Are you sure you want to save the changes?
      </Modal>
    </Dialog>
  );
};

export default StudentForm;
