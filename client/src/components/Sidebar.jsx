import React from 'react';
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";

import {
    ChevronLeft,
    ChevronRightOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    PieChartOutlined
} from '@mui/icons-material';

import ApiIcon from '@mui/icons-material/Api';
import InventoryIcon from '@mui/icons-material/Inventory';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';

const navItems = [
  {
    text: "Dashboard",
    icon: <ApiIcon />,
  },
  {
    text: "User",
    icon: null,
  },
  {
    text: "Inventory",
    icon: <InventoryIcon />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales Data",
    icon: null,
  },
  {
    text: "Overview",
    icon: <MonetizationOnIcon />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <DonutSmallIcon />,
  },
  {
    text: "Staff",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },

]

const Sidebar = ({ user, drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
  const {pathname} = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  // keeps track of current URL
  useEffect(() => {
    setActive(pathname.substring(1)); // anytime the pathname (url) changes, we are going to set the active value to the current page
  }, [pathname])


  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary.main,
              backgroundColor: theme.palette.secondary[800],
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth
            }
          }}
        >
        <Box width="100%">
          <Box m="1rem 0rem 1rem 2rem">
            <FlexBetween color={theme.palette.secondary.main}>
              <Box display="flex" alignItems="center" gap="0rem">
                <Typography variant="h4" fontWeight="bold" fontFamily="Arial sans-serif">
                  Inventory & Sales Management System
                </Typography>
              </Box>
              {/* if on mobile screen and menu sidebar is open, close it */}
              {!isNonMobile && (
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <ChevronLeft />
                </IconButton>
              )}
            </FlexBetween>

        </Box>

        <List>
          {navItems.map(({ text, icon }) => {
            if (!icon) {
              return (
                <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                  {text}
                </Typography>
              );
            }
            const lcText = text.toLowerCase();

            
            return (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(`/${lcText}`); // list item button on click, navigate to the corresponding page
                    setActive(lcText); // set page as active version to highlight color
                  }}
                  sx={{
                    backgroundColor:
                      active === lcText
                        ? theme.palette.secondary[300]
                        : "transparent",
                    color:
                      active === lcText
                        ? theme.palette.secondary[100]
                        : theme.palette.secondary[100],
                  }}
                >
                  <ListItemIcon
                    sx={{
                      ml: "2rem",
                      color:
                        active === lcText
                          ? theme.palette.secondary[100]
                          : theme.palette.secondary[100],
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                  {active === lcText && (
                    <ChevronRightOutlined sx={{ ml: "auto" }} />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
    
    )}
    </Box>
  );
};

export default Sidebar;