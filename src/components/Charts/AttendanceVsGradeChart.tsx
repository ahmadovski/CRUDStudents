import { Card, CardContent, Typography } from "@mui/material";
import { Scatter } from "react-chartjs-2";
import { Student } from "../../types/student";

type AttendanceVsGradeChartProps = {
  students: Student[];
};

const AttendanceVsGradeChart = ({ students }: AttendanceVsGradeChartProps) => {
  const data = {
    datasets: [
      {
        label: "Attendance vs Grade",
        data: students.map((student) => ({
          x: student.attendanceRate,
          y: student.grade,
        })),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Attendance Rate (%)",
        },
        min: 0,
        max: 100,
      },
      y: {
        title: {
          display: true,
          text: "Grade (0-100)",
        },
        min: 0,
        max: 100,
      },
    },
    // maintainAspectRatio: true, // to determine the ratio by parent div
    // aspectRatio: 1, // make it square
  };

  return (
    <Card>
      <CardContent>
        <Typography variant='h6'>Attendance vs Grade</Typography>
        <Scatter data={data} options={options} />
      </CardContent>
    </Card>
  );
};

export default AttendanceVsGradeChart;
