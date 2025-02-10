import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/NavBar";
import { ItemsProvider } from "./contexts/ItemsProvider";
import { StudentsProvider } from "./contexts/StudentsProvider";
import "chart.js/auto"; // register default plagins automaticaly

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position='top-right' autoClose={3000} />
      <StudentsProvider>
        <ItemsProvider>
          <Router>
            <Container>
              <NavBar />
              <AppRoutes />
            </Container>
          </Router>
        </ItemsProvider>
      </StudentsProvider>
    </ThemeProvider>
  );
};

export default App;
