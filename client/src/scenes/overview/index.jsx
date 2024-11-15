import React, { useState } from "react";
import { FormControl, MenuItem, InputLabel, Box, Select, useTheme} from "@mui/material";
import Header from "components/Header";
import OverviewChart from "components/OverviewChart";

const Overview = () => {
  const [view, setView] = useState("units");
  const [chartType, setChartType] = useState("line");
  const theme = useTheme();
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="OVERVIEW"
        subtitle="Overview of general revenue and profit"
      />
      <Box height="75vh">
        <FormControl sx={{ mt: "1rem", minWidth: "4rem" }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        {/* TODO: Continue Working on the chart type... */}
        {/* <FormControl sx={{ mt: "1rem", minWidth: "5rem" }}>
          <InputLabel>Chart Type</InputLabel>
          <Select
            value={chartType}
            label="ChartType"
            onChange={(e) => setChartType(e.target.value)}
          >
            <MenuItem value="line">Line Chart</MenuItem>
            <MenuItem value="bar">Bar Chart</MenuItem>
          </Select>
        </FormControl> */}
        <OverviewChart view={view} chartType={chartType}/>
      </Box>
    </Box>
  );
};

export default Overview;