import React from "react";
import { Student } from "../../types/student";
import { getTopPerformers } from "../../utils/statisticsFn";
import StatCard from "../UI/StatCard";

interface StatCardTopPerformersProps {
  students: Student[];
}

const StatCardTopPerformers: React.FC<StatCardTopPerformersProps> = ({
  students,
}) => {
  const topPerformers = getTopPerformers(students, 3); // Top 3 performers
  const performerNames = topPerformers.map((performer) => performer.name);

  return <StatCard title='Top Performers' items={performerNames} />;
};

export default StatCardTopPerformers;
