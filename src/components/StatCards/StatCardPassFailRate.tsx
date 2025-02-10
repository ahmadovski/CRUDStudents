import React from "react";
import { Student } from "../../types/student";
import { calculatePassFailRate } from "../../utils/statisticsFn";
import StatCard from "../UI/StatCard";

interface StatCardPassFailRateProps {
  students: Student[];
}

const StatCardPassFailRate: React.FC<StatCardPassFailRateProps> = ({
  students,
}) => {
  const { passPercentage } = calculatePassFailRate(students);

  return <StatCard title='Pass Rate' result={passPercentage} />;
};

export default StatCardPassFailRate;
