import {React, useState, useEffect} from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useGetSalesQuery } from "state/api";

const BreakdownChart = ({ isDashboard = false, width, height }) => {
  const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();
  const [boxSize, setBoxSize] = useState(window.innerWidth / 2.75);
  // const isSmallScreen = useMediaQuery("(max-width: 560px)")
  // const minHeight = isSmallScreen ? "50vh" : "80vh";

  useEffect(() => {
    const handleResize = () => {
      setBoxSize(window.innerWidth / 2.75);
    };

    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  

  if (!data || isLoading) return "Loading...";
  // console.log("breakdownData: ", data)
  
  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[600],
    theme.palette.secondary[600],
    theme.palette.secondary[500],
  ];
  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales,
      color: colors[i],
    })
  );

  // console.log("formattedData: ", formattedData)

  return (
    <Box

      height={height}
      width={width}
      minHeight="20rem"
      minWidth="20rem"
      position="relative"
      
    >

      <Typography variant="body2" textAlign="center" position="absolute" top={isDashboard ? "38%" : "45%"} left={isDashboard ? `${Number(41) + boxSize/300}%`: `${Number(41) + boxSize/75}%`} >
        {data.yearlySalesTotal}  
      </Typography>
      <ResponsivePie
        data={formattedData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[200],
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          tooltip: {
            container: {
              color: theme.palette.mode === "dark" ? theme.palette.primary.main : theme.palette.primary[600],
            },
          },
        }}
        colors={{ datum: "data.color" }}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={!isDashboard}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 20 : 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary[500],
                },
              },
            ],
          },
        ]}

        
      />
    </Box>
  );
};

export default BreakdownChart;
