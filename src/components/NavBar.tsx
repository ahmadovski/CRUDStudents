import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
const pages = [
  { title: "Home", path: "/" },
  { title: "Dashboard", path: "/dashboard" },
];

// const navItems = ["Home", "About", "Contact"];

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' component='nav'>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                component={Link}
                to={page.path}
                key={page.title}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          {/* <LanguageSwitcher /> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
