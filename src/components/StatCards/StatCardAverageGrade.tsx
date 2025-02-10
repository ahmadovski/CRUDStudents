import React from "react";
import { Student } from "../../types/student";
import { calculateAverageGrade } from "../../utils/statisticsFn";
import StatCard from "../UI/StatCard";

interface StatCardAverageGradeProps {
  students: Student[];
}

const StatCardAverageGrade: React.FC<StatCardAverageGradeProps> = ({
  students,
}) => {
  const averageGrade = calculateAverageGrade(students);

  return <StatCard title='Average Grade' result={`${averageGrade}%`} />;
};

export default StatCardAverageGrade;
