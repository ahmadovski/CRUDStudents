import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useStudents } from "../hooks/useStudents";
import { Button, Box } from "@mui/material";
import StudentsTable from "../components/Students/StudentsTable";
import Heading from "../components/UI/Heading";
import { Student } from "../types/student";
import StudentsForm from "../components/Students/StudentsForm";
import { exportStudentsToExcel } from "../utils/exportToExcel";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleOpenCreate = () => {
    setEditingStudent(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (student: Student) => {
    setEditingStudent(student);
    setModalOpen(true);
  };

  const handleSave = (student: Omit<Student, "id"> | Student) => {
    if ("id" in student) {
      editStudent(student as Student);
    } else {
      addStudent(student);
    }
  };
  const { addStudent, editStudent, removeStudent, students } = useStudents();

  const { t } = useTranslation();

  //students

  return (
    <>
      <Box display='flex' flexDirection='column' gap={6} sx={{ marginTop: 6 }}>
        <Heading title={t("home")} />
        <StudentsTable
          students={students}
          onEdit={handleOpenEdit}
          onDelete={removeStudent}
        />
        <StudentsForm
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initialData={editingStudent || undefined}
        />
      </Box>

      <Box display='flex' gap={4} sx={{ marginTop: 2, marginBottom: 10 }}>
        <Button variant='contained' color='primary' onClick={handleOpenCreate}>
          Create New Item
        </Button>
        <Button
          variant='outlined'
          color='secondary'
          onClick={() => exportStudentsToExcel(students)}
        >
          Save as Excel
        </Button>
      </Box>
    </>
  );
};
export default Home;
