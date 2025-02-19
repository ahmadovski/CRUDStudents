import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import { ReactNode } from "react";
import { useAuth } from "./hooks/useAuth";

type ProtectedRouteProps = {
  isProtected: boolean;
  path: string;
  children: ReactNode;
};

const ProtectedRoute = ({
  children,
  isProtected,
  path,
}: ProtectedRouteProps) => {
  if (isProtected) {
    return <Navigate to={path} replace />;
  }
  return <>{children}</>;
};
const AppRoutes = () => {
  const { loggedInUser } = useAuth();
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/createAccount' element={<CreateAccount />} />
      <Route
        path='/'
        element={
          <ProtectedRoute path='/login' isProtected={!loggedInUser}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute path='/login' isProtected={!loggedInUser}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
