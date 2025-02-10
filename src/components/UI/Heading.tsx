import { Typography } from "@mui/material";

type HeadingProps = {
  title: string;
  size?: "small" | "large";
};

const Heading = ({ title, size = "large" }: HeadingProps) => {
  return (
    <Typography variant={size === "large" ? "h4" : "h6"} component='h2'>
      {title}
    </Typography>
  );
};

export default Heading;
