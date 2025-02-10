import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Student } from "../../types/student";
import Modal from "../UI/Modal";
import { useState } from "react";

type StudentsTableProps = {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
};

const StudentsTable = ({ students, onEdit, onDelete }: StudentsTableProps) => {
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [selectedIDForDelete, setSelectedIDForDelete] = useState<
    Student["id"] | null
  >(null);
  const columns: GridColDef<Student>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    { field: "name", headerName: "Name", width: 150, editable: true },
    { field: "gender", headerName: "Gender", width: 120, sortable: false },
    { field: "fieldOfStudy", headerName: "Field of Study", width: 180 },
    { field: "grade", headerName: "Grade", type: "number", width: 100 },
    {
      field: "graduationYear",
      headerName: "Graduation Year",
      type: "number",
      width: 140,
    },
    {
      field: "attendanceRate",
      headerName: "Attendance Rate (%)",
      type: "number",
      width: 160,
    },
    {
      field: "scholarship",
      headerName: "Scholarship",
      width: 120,
      //TODO change to icons
      valueGetter: (value, row) => (row.scholarship ? "Yes" : "No"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button
            variant='contained'
            size='small'
            onClick={() => onEdit(params.row)}
          >
            Edit
          </Button>
          <Button
            variant='outlined'
            color='error'
            size='small'
            sx={{ ml: 1 }}
            onClick={() => {
              setSelectedIDForDelete(params.row.id);
              setOpenConfirmDelete(true);
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={students}
        columns={columns}
        columnVisibilityModel={{ id: false }} // Hides the ID column
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}

        // //TODO : you can get selected rows here to save as excel instead of all of them (maybe add to context)
        // onRowSelectionModelChange={(selectionModel: GridRowSelectionModel) => {
        //   // Convert selected row IDs into student objects
        //   const selectedStudents = students.filter((student) =>  //selectionModel is array of selected Id's[]
        //     selectionModel.includes(student.id)
        //   );
        //   setSelectedRows(selectedStudents);
        // }}
        // checkboxSelection
        // disableRowSelectionOnClick // Prevents row selection
        // hideFooterSelectedRowCount // Removes the "x rows selected" text in footer
      />
      <Modal //nested modal for confirmation
        type='confirmation'
        title='Confirm Delete'
        confirmText='Delete'
        open={openConfirmDelete}
        onClose={() => {
          setOpenConfirmDelete(false);
        }}
        onConfirm={() => {
          if (selectedIDForDelete) {
            onDelete(selectedIDForDelete);
          }
          setOpenConfirmDelete(false); //close the modal
        }}
      >
        are you sure you want to Delete this Student ?
      </Modal>
    </Box>
  );
};

export default StudentsTable;
