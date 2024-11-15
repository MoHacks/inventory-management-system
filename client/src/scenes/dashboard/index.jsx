import { DownloadOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardQuery } from "state/api";
import Geography from "scenes/geography";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 930px)");
  const { data, isLoading } = useGetDashboardQuery();

  // console.log("DASHBOARD data: ", data);

  // Prepare data for Download
  const convertToCSV = (data) => {
    if (!data || !data.length) return "";
    // console.log("CSV data: ", data);
    const headers = [
      "id",
      "user_id",
      "created_at",
      "updated_at",
      "products",
      "cost",
    ];

    const csvRows = [
      headers.join(","), // header row
      ...data.map((row) =>
        headers
          .map((header) => {
            // const key = headerToKey[header]
            if (header === "products") {
              return JSON.stringify((row[header] || []).length);
            }
            return JSON.stringify(row[header], (key, value) => value ?? "");
          })
          .join(",")
      ),
    ];
    // console.log("csvRows: ", csvRows);
    return csvRows.join("\n");
  };

  // Create a Download Function
  const downloadCSV = (data) => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create a link and simulate a click to download the file
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // integrate the downloadCSV function with your button’s onClick event
  const handleDownloadReports = () => {
    if (data && data.transactions) {
      downloadCSV(data.transactions);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "user_id",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box
      m="1.5rem 2.5rem"
      bgcolor={theme.palette.secondary[800]}
    >
      <FlexBetween>
        <Header
          title="DASHBOARD"
          subtitle="Welcome to your Dashboard Sales & Inventory System"
        />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary[600],
              "&:hover": {
                backgroundColor: "red", // Maintain red background color on hover
              },
            }}
            onClick={handleDownloadReports}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Transactions
          </Button>
        </Box>
      </FlexBetween>

      {/* grid for the charts depending on size of screen */}
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": {
            gridColumn: isNonMediumScreens ? undefined : "span 12",
            backgroundColor: theme.palette.secondary[900], // This works perfectly
          },
        }}
      >
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          bgcolor={theme.palette.secondary[900]} // This works perfectly
          pb="1rem"
        >
          <OverviewChart view="units" isDashboard={true} />
        </Box>

        <Box
          display="flex"
          gridColumn="span 4"
          gridRow="span 2"
          bgcolor={theme.palette.background.alt}
          p="1.5rem"
          sx={{
            "& .MuiBox-root": {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.secondary[500]
                  : theme.palette.secondary[600],
            },
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            display="flex"
            justifyContent="center"
          >
            Sales By Category
          </Typography>
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            textAlign="center"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown by category for revenue made this year
          </Typography>
          <Box
            display="flex"
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
            ml="1rem"
          >
            <BreakdownChart isDashboard={true} width="100%" height="100%" />
          </Box>
        </Box>

        {/* Row 2 */}
        <Box 
          gridColumn="span 6"
          gridRow="span 4"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              color: theme.palette.secondary[1000],
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.secondary[900],
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.secondary[900],
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.secondary[900],
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row.id}
            rows={(data && data.transactions) || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 4"
        >
          <Geography isDashboard={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
