import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { createAccountSchema } from "../../schemas/loginSchema";
import { User } from "../../types/user";
import { createUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const CreateAccountForm = () => {
  const formik = useFormik<Omit<User, "id">>({
    initialValues: {
      userName: "",
      password: "",
      email: "",
    },
    validationSchema: createAccountSchema,
    onSubmit: async () => {
      const response = await createUser(formik.values);
      if (response === "succsess") {
        navigate("/login");
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
                <Typography>Create an account</Typography>
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
                  <TextField
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    label='Email'
                    type='email'
                  />
                </Box>
                <Button variant='contained' fullWidth type='submit'>
                  Create
                </Button>
              </Box>
            </CardContent>
          </form>
        </Card>
      </Box>
    </>
  );
};
export default CreateAccountForm;
