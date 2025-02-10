import React from "react";
import { Student } from "../../types/student";
import { calculateAverageAttendanceRate } from "../../utils/statisticsFn";
import StatCard from "../UI/StatCard";

interface StatCardAverageAttendanceRateProps {
  students: Student[];
}

const StatCardAverageAttendanceRate: React.FC<
  StatCardAverageAttendanceRateProps
> = ({ students }) => {
  const averageAttendance = calculateAverageAttendanceRate(students);

  return (
    <StatCard
      title='Average Attendance Rate'
      result={`${averageAttendance}%`}
    />
  );
};

export default StatCardAverageAttendanceRate;
