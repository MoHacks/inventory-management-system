import {React, useState, useEffect} from 'react'
import { Box, useTheme } from '@mui/material';
import Header from 'components/Header';
import BreakdownChart from 'components/BreakdownChart';


const Breakdown = () => {
  const [boxSize, setBoxSize] = useState(window.innerWidth);
  const theme = useTheme();
  useEffect(() => {

    const handleResize = () => {
      setBoxSize(window.innerWidth)
    }
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])
  
  return (
    <Box 
      m="1.5rem" 
      display="flex"
      width={boxSize / 1.5}
      height="40rem"
      justifyContent="center"
      alignContent="center"
      sx={{
        flexDirection: 'column',
        "& .MuiBox-root": {
              color: theme.palette.mode === "dark" ? theme.palette.secondary[500] : theme.palette.secondary[600],
            },
      }}

    >
      <Header title="BREAKDOWN" subtitle="Breakdown of Sales By Category" />
        <BreakdownChart isDashboard={false} width="100%" height="100%"/>
      </Box>
    // </Box>
  );
};

export default Breakdown;