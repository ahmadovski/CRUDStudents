import React from "react";
import { Student } from "../../types/student";
import StatCard from "../UI/StatCard";
import { getTopFieldOfStudy } from "../../utils/statisticsFn";

interface StatCardFieldOfStudyHighestAverageGradeProps {
  students: Student[];
}

const StatCardFieldOfStudyHighestAverageGrade: React.FC<
  StatCardFieldOfStudyHighestAverageGradeProps
> = ({ students }) => {
  const topField = getTopFieldOfStudy(students);

  return (
    <StatCard title='Field with Highest Average Grade' result={topField} />
  );
};

export default StatCardFieldOfStudyHighestAverageGrade;
