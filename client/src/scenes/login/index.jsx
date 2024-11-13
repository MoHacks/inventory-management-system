import { green, lightBlue, lightGreen } from '@mui/material/colors';
import Form from '../../components/Form';
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { tsParticles } from "@tsparticles/engine";
import { loadTrianglesPreset } from '@tsparticles/preset-triangles';
import React, { useEffect } from 'react';

const loadTriangleParticles = async () => {
  await loadTrianglesPreset(tsParticles);
  await tsParticles.load({
    id: "tsparticles", // This is the id of the div where particles will be rendered
    options: {
      preset: "triangles",
    },
  });
};

const Login = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  console.log("we are in login scene");
  useEffect(() => {
    loadTriangleParticles(); // Load particles when the component mounts
  }, []);

  return (
    <Box>
      <div
          id="tsparticles"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            // width: '100%',
            // height: '100%',
            zIndex: -1, // Ensures particles are in the background
          }}
        />
      <Box
        width="100%"
        backgroundColor={"rgba(216, 198, 255, 0.1)"} //{"rgba(128, 0, 128, 0.1)"}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="orange">
          Inventory Management & Sales System
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        textAlign="center"
        // backgroundColor={theme.palette.background.alt}
        backgroundColor={"rgba(216, 198, 255, 0.1)"} //"rgba(128, 0, 128, 0.1)"
        // sx={{
        //   opacity: 0.2
        // }}
      >
        <Typography 
        fontWeight="500" 
        variant="h5" 
        // backgroundColor={theme.palette.background.alt} 
        sx={{ mb: "1.5rem" }}>
          An Inventory and Sales Tracker to handle your basic Business Needs
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default Login;
