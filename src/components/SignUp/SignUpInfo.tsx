import React, { useState, FocusEvent } from "react";
import "./SignUp";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import theme from "../../styles/theme";
import { useFormik } from "formik";
import * as yup from "yup";
import axiosClient from "../../utils/axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface EmailError {
  status: boolean;
  helperText: string;
}

const {
  palette: {
    red: { main, dark }
  }
} = theme;

const SignUpInfoTextField = styled(TextField)({
  width: "100%",
  height: "40px",
  lineHeight: "30px",
  marginBottom: "45px",
  paddingLeft: "0",
  letterSpacing: "0.05rem",
  borderRadius: "3px",
  fontSize: "1.5rem",
  fontWeight: "400"
});

const SignUpInfoButton = styled(Button)({
  width: "100%",
  height: "50px",
  marginTop: "10px",
  backgroundColor: main,
  "&:hover": {
    backgroundColor: dark
  }
});

const validationSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .matches(/[A-Z]+/, "At least One uppercase character required")
    .matches(/\d+/, "At least One number required")
    .matches(/[@#$%^&+=]+/, "At least one special character required")
    .required("Password is required")
});

const SignUpInfo = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    }
  });

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const initialEmailError: EmailError = { status: false, helperText: "" };
  const [emailError, setEmailError] = useState(initialEmailError);

  const checkIfEmailIsUnique = async (e: FocusEvent<HTMLInputElement>) => {
    try {
      const url = `/agents?email=${e.target.value}`;
      await axiosClient.head(url);
      setEmailError({ status: true, helperText: "The email is already exist..." });
    } catch (error) {
      setEmailError(initialEmailError);
    }
  };

  return (
    <Box width="100%">
      <form onSubmit={formik.handleSubmit} noValidate>
        <SignUpInfoTextField
          required
          fullWidth
          id="email"
          type="email"
          label="Email address"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={checkIfEmailIsUnique}
          onBlurCapture={formik.handleBlur}
          error={(formik.touched.email && Boolean(formik.errors.email)) || emailError.status}
          helperText={(formik.touched.email && formik.errors.email) || emailError.helperText}
          onKeyDown={() => setEmailError(initialEmailError)}
        />
        <SignUpInfoTextField
          required
          fullWidth
          id="password"
          label="Password"
          type={values.showPassword ? "text" : "password"}
          onChange={formik.handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                  {values.showPassword && <Visibility />}
                  {!values.showPassword && <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <SignUpInfoButton variant="contained" type="submit">
          Create account
        </SignUpInfoButton>
      </form>
    </Box>
  );
};

export default SignUpInfo;
