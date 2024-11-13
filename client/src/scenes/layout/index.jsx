import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';
import { useGetUserQuery } from 'state/api';
// the Box component in materialUI that allows you to pass in css properties
const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.global.id); // going to grab from the redux toolkit the super user id
  // console.log("userId within Layout:", userId)
  const {data}  = useGetUserQuery(userId);
  // console.log("UserId data:", data)
  const theme = useTheme();

  return <Box 
            display={isNonMobile ? "flex" : "block"} 
            width="100%" 
            height="100%" 
            bgcolor={theme.palette.secondary[800]}
          >
    <Sidebar
      user={data || {}} //when data is empty, return an empty object {}
      isNonMobile={isNonMobile}
      drawerWidth="250px"
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
    />

    {/* flexGrow={1} means take up all the remaining space INSTANTLY */}
    <Box flexGrow={1}>
      <Navbar
        user={data || {}}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      {/* Serves as a placeholder where child routes are rendered within the parent route component */}
      <Outlet />
    </Box>
  </Box>
}

export default Layout