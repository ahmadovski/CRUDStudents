import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

interface StatCardProps {
  title: string;
  result?: string | number; // For Single Result Card
  items?: string[]; // For List Card
}

const StatCard: React.FC<StatCardProps> = ({ title, result, items }) => {
  return (
    <Card sx={{ minWidth: 275, margin: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant='h6' component='div' gutterBottom>
          {title}
        </Typography>
        {result !== undefined && (
          <Typography
            variant='h4'
            component='div'
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            {result}
          </Typography>
        )}
        {items !== undefined && (
          <List>
            {items.map((item, index) => (
              <ListItem key={index} sx={{ padding: 0 }}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
