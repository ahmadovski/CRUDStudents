import { Card, CardContent, Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Student } from "../../types/student";

type PieChartFieldOfStudyProps = {
  students: Student[];
};
const fieldColors: Record<string, string> = {
  "Mechanical Engineering": "rgba(255, 99, 132, 0.6)", // Red
  "Computer Science": "rgba(54, 162, 235, 0.6)", // Blue
  Mathematics: "rgba(75, 192, 192, 0.6)", // Green
};
const PieChartFieldOfStudy = ({ students }: PieChartFieldOfStudyProps) => {
  // Count the number of students in each field of study
  //TODO understand this logic
  const fieldCounts = students.reduce((acc, student) => {
    acc[student.fieldOfStudy] = (acc[student.fieldOfStudy] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(fieldCounts),
    datasets: [
      {
        data: Object.values(fieldCounts),
        backgroundColor: Object.keys(fieldCounts).map(
          (field) => fieldColors[field] || "rgba(201, 203, 207, 0.6)" // Default gray if no match
        ),
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <Typography variant='h6'>Students per Field of Study</Typography>
        <Pie data={data} />
      </CardContent>
    </Card>
  );
};

export default PieChartFieldOfStudy;
