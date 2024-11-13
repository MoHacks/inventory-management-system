import { React, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { useGetCustomersQuery } from 'state/api';
import Headers from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';
import { render } from '@testing-library/react';
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Customers = () => {

    const theme = useTheme();
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState({});
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);

    const { data, isLoading } = useGetCustomersQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search
    });
    // console.log("Customer DATA:", data);
    
    const [searchInput, setSearchInput] = useState("");

    const columns = [
        {
            field: "id",
            headerName: "ID",
            flex: 1
        },
        {
            field: "name",
            headerName: "Name",
            flex: 0.5
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1
        },
        {
            field: "country",
            headerName: "Country",
            flex: 0.4
        },
        {
            field: "occupation",
            headerName: "Occupation",
            flex: 1
        },
        {
            field: "role",
            headerName: "Role",
            flex: 0.5
        },
    ]

    return (
        <Box m="1.5rem 2.5rem">
            <Headers title="CUSTOMERS" subtitle="List of Customers" />
            <Box
                mt="40px"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none"
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none"
                    },  
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none"
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`
                    },
                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row.id}
                    rows={data && data.users || []}
                    rowCount={(data && data.total) || 0}  //NOTE: data & data.total IS SO IMPORTANT
                    columns={columns}
                    rowsPerPageOptions={[20, 50, 100]}
                    pageSize={pageSize}
                    paginationMode="server" //NOTE: Tell MuiDataGrid that pagination is done on server-side is SO IMPORTANT!
                    onPageChange={(newPage) => setPage(newPage)}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    components={{ Toolbar: DataGridCustomToolbar }}
                    componentsProps={{
                        toolbar: { searchInput, setSearchInput, setSearch },
                    }}
                />
            </Box>
        </Box>
    )
}

export default Customers