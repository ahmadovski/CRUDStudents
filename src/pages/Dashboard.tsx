import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PieChartFieldOfStudy from "../components/Charts/PieChartFieldOfStudy";
import Heading from "../components/UI/Heading";
import { useStudents } from "../hooks/useStudents";
import AttendanceVsGradeChart from "../components/Charts/AttendanceVsGradeChart";
import BarChartStudentGrades from "../components/Charts/BarChartStudentGrades";
import StatCardAverageGrade from "../components/StatCards/StatCardAverageGrade";
import StatCardTopPerformers from "../components/StatCards/StatCardTopPerformers";

const Dashboard = () => {
  const { students } = useStudents();
  return (
    <>
      <Heading title='Dashboard' />
      <Container>
        <Grid container spacing={3}>
          {/* Pie Chart - Students per Field of Study */}
          <Grid size={4}>
            <PieChartFieldOfStudy students={students} />
          </Grid>

          {/* Scatter Chart - Attendance vs Grade */}
          <Grid size={8}>
            <AttendanceVsGradeChart students={students} />
          </Grid>
          <Grid size={8}>
            <BarChartStudentGrades students={students} />
          </Grid>
          <Grid size={4}>
            <Box>
              <StatCardAverageGrade students={students} />
              <StatCardTopPerformers students={students} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
