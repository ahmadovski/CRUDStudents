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
import AuthProvider from "./contexts/AuthProvider";
import { ReactNode } from "react";

const App = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position='top-right' autoClose={3000} />
      <AuthProvider>
        {/* <Router> */}
        <StudentsProvider>
          <ItemsProvider>
            <Container>
              {children}
              {/* <NavBar /> */}
              {/* <AppRoutes /> */}
            </Container>
          </ItemsProvider>
        </StudentsProvider>
        {/* </Router> */}
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
