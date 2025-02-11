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
  const { students, selectedStudents } = useStudents();
  // show selected students if user has selected ! else show all
  const data = selectedStudents.length !== 0 ? selectedStudents : students;

  return (
    <>
      <Box display='flex' flexDirection='column' gap={6} sx={{ marginTop: 6 }}>
        <Heading title='Dashboard' />
        <Container>
          <Grid container spacing={3}>
            <Grid size={8}>
              <BarChartStudentGrades students={data} />
            </Grid>
            <Grid size={4}>
              {/* Stats */}
              <Box>
                <StatCardAverageGrade students={data} />
                <StatCardTopPerformers students={students} />
              </Box>
            </Grid>
            {/* Pie Chart - Students per Field of Study */}
            <Grid size={4}>
              <PieChartFieldOfStudy students={data} />
            </Grid>

            {/* Scatter Chart - Attendance vs Grade */}
            <Grid size={8}>
              <AttendanceVsGradeChart students={data} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
