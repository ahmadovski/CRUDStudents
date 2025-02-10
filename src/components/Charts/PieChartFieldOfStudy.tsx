import { Card, CardContent, Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Student } from "../../types/student";
import { Chart as Chartjs } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

//register the data labels for pie chart manually (not included in default chartjs)
// Chartjs.register(ChartDataLabels);
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

  // Options to display percentages on the chart
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce(
              (acc: number, val: number) => acc + val,
              0
            );
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${percentage}%`;
          },
        },
      },
      datalabels: {
        formatter: function (value: number, ctx: any) {
          const total = ctx.dataset.data.reduce(
            (acc: number, val: number) => acc + val,
            0
          );
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`;
        },
        color: "white",
        font: {
          weight: 700,
        },
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant='h6'>Students per Field of Study</Typography>
        <Pie data={data} options={options} />
      </CardContent>
    </Card>
  );
};

export default PieChartFieldOfStudy;
