import { Card, CardContent, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Student } from "../../types/student";

type BarChartStudentGradesProps = {
  students: Student[];
};

const fieldColors: Record<string, string> = {
  "Mechanical Engineering": "rgba(255, 99, 132, 0.6)", // Red
  "Computer Science": "rgba(54, 162, 235, 0.6)", // Blue
  Mathematics: "rgba(75, 192, 192, 0.6)", // Green
};

const BarChartStudentGrades = ({ students }: BarChartStudentGradesProps) => {
  const data = {
    labels: students.map((student) => student.name),
    datasets: [
      {
        label: "Student Grades",
        data: students.map((student) => student.grade),
        backgroundColor: students.map(
          (student) =>
            fieldColors[student.fieldOfStudy] || "rgba(201, 203, 207, 0.6)" // Default gray if no match
        ),
        borderColor: students.map(
          (student) =>
            fieldColors[student.fieldOfStudy]?.replace("0.6", "1") ||
            "rgba(201, 203, 207, 1)"
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      //   legend: { display: false }, // Hide legend since we use colors for fields
    },
    scales: {
      x: {
        title: { display: true, text: "Students" },
      },
      y: {
        title: { display: true, text: "Grade (0-100)" },
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant='h6'>Student Grades</Typography>
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  );
};

export default BarChartStudentGrades;
