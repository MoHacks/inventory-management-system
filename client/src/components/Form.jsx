import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, updateUserId } from 'state';
import './../index.css';
import { jwtDecode } from 'jwt-decode';


import { tsParticles } from "@tsparticles/engine";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),

});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [showPreloader, setShowPreloader] = useState(false);

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image

    // console.log("onSubmitProps: ", onSubmitProps)
    const savedUserResponse = await fetch("https://inventory-management-system-p65j.onrender.com/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indicates that the body is JSON
        },
        body: JSON.stringify(values),
      }
    );
    if (!savedUserResponse.ok) {
      onSubmitProps.setFieldError('general', 'Email already exists, try again');
      return;
    }
    const savedUser = await savedUserResponse.json();
    // console.log("savedUser: ", savedUser);
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await fetch("https://inventory-management-system-p65j.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      // console.log("Sending to the front end....:", JSON.stringify(values))
      const response = await loggedInResponse.json();
      onSubmitProps.resetForm();
      // console.log("loggedin status response: ", response);

      if (!loggedInResponse.ok) {
        onSubmitProps.setFieldError('general', 'Incorrect email or password');
        return;
        // throw new Error(`request failed with status ${loggedInResponse.status}`)
      }

      const token = response.access_token;
      const decoded = jwtDecode(token);
      // Store token in sessionStorage
      // console.log("decoded.email: ", decoded.email);
      // console.log("decoded.user_id: ", decoded.user_id);
      // console.log("decoded.first_name: ", decoded.first_name); 
      // Send the user and token to the Redux Store
      dispatch(
        setLogin({
          user: decoded.email,
          id: decoded.user_id,
          token: token,

        }),
        // updateUserFirstName({ 
        //   firstName: decoded.first_name 
        // })
      );

      // persist the user and token information in the browser so that it can hydrate on page refresh
      // sessionStorage.setItem('user', JSON.stringify(response.user));
      // sessionStorage.setItem('token', response.token);
      setShowPreloader(true);

      setTimeout(() => {
        setShowPreloader(false);
        const particles = tsParticles.domItem(0); // Get the first tsParticles instance
        if (particles) {
          particles.destroy(); // Stops and removes the particles instance
        }
        navigate("/dashboard");
      }, 2000); // Adjust delay as needed
    }
    catch (error) {
      onSubmitProps.setFieldError('general', 'Incorrect Email or Password! Please try again.');
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) {
      // console.log("within isLogin")
      await login(values, onSubmitProps);
    }
    if (isRegister) {
      // console.log("within isRegister");
      await register(values, onSubmitProps);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "1" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "2" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "1" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "2" }}
                />
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{
                    gridColumn: "1",
                    // justifyContent: "center"
                  }}
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "2" }}
                />

              </>
            )}

            {isLogin && (
              <>
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{
                    gridColumn: "1 / 3",
                  }}
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "1 / 3" }}
                />
              </>
            )}
            {showPreloader && <div id="preloader"></div>}
          </Box>

          {/* Error Message */}
          {errors.general && (
            <Typography
              color="error"
              variant="body2"
              align="center">

              {errors.general}

            </Typography>
          )}

          {/* BUTTONS */}
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
          >
            <Button
              type="submit"
              sx={{
                m: "1rem 0",
                p: "1rem",
                backgroundColor: palette.secondary.main,
                color: palette.background.alt,
                "&:hover": { color: "red" },
                gridColumn: "1/3"

              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.secondary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: "red",
                },
                gridColumn: "1 / 3",
                textAlign: "center",
              }}
              align="left"
            >
              {isLogin
                ? "Don't have an account? Sign Up here"
                : "Already have an account? Login here"
              }
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
