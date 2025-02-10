import React from "react";
import { Student } from "../../types/student";
import { getScholarshipRecipients } from "../../utils/statisticsFn";
import StatCard from "../UI/StatCard";

interface StatCardScholarshipRecipientsProps {
  students: Student[];
}

const StatCardScholarshipRecipients: React.FC<
  StatCardScholarshipRecipientsProps
> = ({ students }) => {
  const { percentage } = getScholarshipRecipients(students);

  return <StatCard title='Scholarship Recipients' result={percentage} />;
};

export default StatCardScholarshipRecipients;
