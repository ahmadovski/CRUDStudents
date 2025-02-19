import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import AuthProvider from "../contexts/AuthProvider";
import { ItemsProvider } from "../contexts/ItemsProvider";
import { StudentsProvider } from "../contexts/StudentsProvider";
import theme from "../theme";

const Root = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer position='top-right' autoClose={3000} />
        <AuthProvider>
          <StudentsProvider>
            <ItemsProvider>
              <Container>
                <NavBar />
                <Outlet />
              </Container>
            </ItemsProvider>
          </StudentsProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};
export default Root;
