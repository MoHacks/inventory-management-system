import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import { useSelector, useDispatch  } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { themeSettings } from "theme";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import { Navigate } from "react-router-dom";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";

import './index.css';
import Login from "scenes/login";
// import { setLogin } from "state/index";  // import setLogin action
import SessionTimeoutWrapper from "components/SessionTimeoutWrapper";

function App() {
  const mode = useSelector((state) => state.global.mode); //grabs it from src/state/index.js global: { mode: "light" }
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.global.token));
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />  {/* resets the default css styles */}
          <Routes>
            {/* default route is to redirect to Login Page */}
            <Route path="/" element={<Login/>} />
            <Route element={<Layout />} > {/* any Route within Routes component will render the Layout component as the main parent */}
                                              {/*Since every Route within Routes component will render the Layout component, it will 
                                                contain the navbar and a sidebar  */}
              {console.log("isAuth: ", isAuth)}
              {console.log("isAuth Value: ", useSelector((state) => state.token))}
          
              <Route path="/dashboard" element={isAuth ? (
                <SessionTimeoutWrapper>
                  <Dashboard />
                </SessionTimeoutWrapper>
              ): <Navigate to="/" />}/>

              <Route path="/inventory" element={isAuth ? (
                <SessionTimeoutWrapper> 
                  <Products /> 
                </SessionTimeoutWrapper>
              ): <Navigate to="/" />} />

              <Route path="/customers" element={isAuth ? (
                <SessionTimeoutWrapper> 
                  <Customers />
                </SessionTimeoutWrapper>
                ) : <Navigate to="/" />} />

              <Route path="/transactions" element={isAuth ? (
                <SessionTimeoutWrapper> 
                  <Transactions /> 
                </SessionTimeoutWrapper>
              ) : <Navigate to="/" /> } />

              <Route path="/geography" element={isAuth ? (
                <SessionTimeoutWrapper> 
                  <Geography /> 
                </SessionTimeoutWrapper>
              ) : <Navigate to="/" /> } />

              <Route path="/overview" element={isAuth ? (
                <SessionTimeoutWrapper> 
                  <Overview /> 
                </SessionTimeoutWrapper>
              ) : <Navigate to="/" />} />

              <Route path="/daily" element={isAuth ? (
                <SessionTimeoutWrapper> 
                  <Daily /> 
                </SessionTimeoutWrapper>
              ) : <Navigate to="/" />} />

              <Route path="/monthly" element={isAuth ? (
                <SessionTimeoutWrapper> 
                  <Monthly />
                </SessionTimeoutWrapper>
              ) : <Navigate to="/" />} />

              <Route path="/breakdown" element={isAuth ? (
                <SessionTimeoutWrapper> 
                  <Breakdown /> 
                </SessionTimeoutWrapper>
              ) : <Navigate to="/" />} />

              <Route path="/admin" element={isAuth ? (
                <SessionTimeoutWrapper> 
                  <Admin /> 
                </SessionTimeoutWrapper>
              ) : <Navigate to="/" />} />

            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
