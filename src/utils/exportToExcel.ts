import * as XLSX from "xlsx";
import { Student } from "../types/student";

export const exportStudentsToExcel = async (students: Student[]) => {
  // Convert data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(students);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

  // Generate Excel file as a Blob
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Check if the browser supports the File System Access API
  if ("showSaveFilePicker" in window) {
    try {
      const fileHandle = await (window as any).showSaveFilePicker({
        suggestedName: "students.xlsx",
        types: [
          {
            description: "Excel File",
            accept: {
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                [".xlsx"],
            },
          },
        ],
      });

      // Write the file to the selected location
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
    } catch (error) {
      console.error("File save canceled or failed:", error);
    }
  } else {
    // Fallback: Use file-saver if the API is not available
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "students.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
