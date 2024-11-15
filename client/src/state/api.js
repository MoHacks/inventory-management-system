import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BASE_URL}),
    reducerPath: "adminApi",
    tagTypes: ["User", "Inventory", "Customers", "Transactions", "Geography", "Sales", "Admins", "Dashboard"],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),
        getProducts: build.query({
            query: () => "client/inventory",
            providesTags: ["Inventory"],
        }),
        getCustomers: build.query({
            query: ({page, pageSize, sort, search}) => ({
                url: "client/customers",
                method: "GET",
                params: {page, pageSize, sort, search}
            }),
            providesTags: ["Customers"],
        }),
        getTransactions: build.query({
            query: ({page, pageSize, sort, search}) => ({
                url: "client/transactions",
                method: "GET",
                params : {page, pageSize, sort, search}
            }),
            providesTags: ["Transactions"]
        }),
        getGeography: build.query({
            query: () => "client/geography",
            providesTags: ["Geography"],
        }),
        getSales: build.query({
            query: () => "sales/sales",
            providesTags: ["Sales"],
        }),
        getAdmins: build.query({
            query: () => "management/admins",
            providesTags: ["Admins"],
        }),
        getDashboard: build.query({
            query: () => "general/dashboard",
            providesTags: ["Dashboard"]
        })
    }),
})

// Hooks that are coming from the respective endpoints above
export const {
    useGetUserQuery, useGetProductsQuery, useGetCustomersQuery, useGetTransactionsQuery, useGetGeographyQuery, useGetSalesQuery, useGetAdminsQuery,
    useGetDashboardQuery
} = api;