import React from 'react';
import { Box, useTheme } from '@mui/material';
import { useGetAdminsQuery } from 'state/api';
import { DataGrid, gridColumnsTotalWidthSelector } from '@mui/x-data-grid';
import Headers from 'components/Header';
import CustomColumnMenu from "components/DataGridCustomColumnMenu";

const Admin = () => {
    
    const theme = useTheme();
    const {data, isLoading} = useGetAdminsQuery();

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
        <Headers title="ADMINS" subtitle="Managing Admins and list of Admins" />
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
                }
            }}
        >
            <DataGrid
                loading={isLoading || !data}
                getRowId={(row) => row.id}
                rows={data || []}
                columns={columns}
                components={
                    {
                        ColumnMenu: CustomColumnMenu
                    }
                }

            />
        </Box>
    </Box>
  )
}

export default Admin