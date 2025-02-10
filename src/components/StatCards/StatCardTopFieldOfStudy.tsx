import React from "react";
import { Student } from "../../types/student";
import { getTopFieldOfStudy } from "../../utils/statisticsFn";
import StatCard from "../UI/StatCard";

interface StatCardTopFieldOfStudyProps {
  students: Student[];
}

const StatCardTopFieldOfStudy: React.FC<StatCardTopFieldOfStudyProps> = ({
  students,
}) => {
  const topField = getTopFieldOfStudy(students);

  return <StatCard title='Top Field of Study' result={topField} />;
};

export default StatCardTopFieldOfStudy;
