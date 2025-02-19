import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/loginSchema";
import { useNavigate } from "react-router-dom";
import { UserCredentials } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = () => {
  const { logIn } = useAuth();
  const formik = useFormik<UserCredentials>({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async () => {
      try {
        const response = await logIn(formik.values);
        if (response === "success") {
          navigate("/");
        }
      } catch (error) {
        console.log(error, "failed to log in");
        toast.error("wrong User credentials");
      }
    },
  });

  const navigate = useNavigate();
  return (
    <>
      <Box display='flex' justifyContent='center'>
        <Card sx={{ minWidth: 600, boxShadow: 3 }}>
          <form onSubmit={formik.handleSubmit}>
            <CardContent>
              <Box display='flex' flexDirection='column' gap={6}>
                <Typography>Log in to your account</Typography>
                <Box display='flex' flexDirection='column' gap={4}>
                  <TextField
                    name='userName'
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.userName && Boolean(formik.errors.userName)
                    }
                    helperText={
                      formik.touched.userName && formik.errors.userName
                    }
                    label='User name'
                  />
                  <TextField
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    label='Password'
                    type='password'
                  />
                </Box>
                <Box display='flex' gap={4}>
                  <Button variant='contained' fullWidth type='submit'>
                    Login
                  </Button>
                  <Button
                    variant='text'
                    color='info'
                    fullWidth
                    type='button'
                    onClick={() => navigate("/createAccount")}
                  >
                    Create account
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </form>
        </Card>
      </Box>
    </>
  );
};
export default LoginForm;
