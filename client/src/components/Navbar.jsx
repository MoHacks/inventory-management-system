import React, {useState} from 'react'
import { 
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search, 
    SettingsOutlined,
    ArrowDropDownOutlined

 } from '@mui/icons-material'

import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from 'state'
import {AppBar, Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useTheme} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { setLogout } from "state";
import { PiSunBold } from "react-icons/pi";
import { FaRegMoon } from "react-icons/fa6";

const Navbar = ({user, isSidebarOpen, setIsSidebarOpen}) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    console.log("user: ", user)
    //menu dropdown open/close
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleLogout = () => {
        dispatch(setLogout());
        navigate('/');
    }
    return (
        <AppBar sx={{
            position: 'static', 
            background: 'none', 
            boxShadow: 'none',
            backgroundColor: theme.palette.secondary[800],
            borderBottom: '2px solid #333'
        }}>

        <Toolbar sx={{justifyContent: 'space-between'}}>    

            {/* LEFT SIDE, OPEN SIDE BAR */}
            <FlexBetween>
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <MenuIcon/>
                </IconButton>
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === 'dark' ? (
                        console.log("DARK MODE"),
                        <FaRegMoon size="1.5rem" />
                    
                    ) : (
                        console.log("LIGHT MODE"),
                        <PiSunBold size="1.5rem" />
                        
                    )}
                </IconButton>
            </FlexBetween>

            {/* RIGHT SIDE */}
            {/* NOTE: THIS TOGGLES BETWEEN LIGHT AND DARK MODE */}
            <FlexBetween gap="3rem">
                
                {/* <IconButton>
                    <SettingsOutlined sx={{fontSize: '25px'}}/>
                </IconButton> */}
                <FlexBetween>
                    <Button 
                        onClick={handleClick}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            textTransform: 'none',
                            gap: '1rem'
                        }}
                        >
                       
                        <Box textAlign="left">
                            <Typography
                                fontWeight="bold"
                                fontSize="0.85rem"
                                sx={{ color: theme.palette.secondary[100] }}
                            >
                                {user.first_name}
                            </Typography>
                            <Typography
                                fontSize="0.75rem"
                                sx={{ color: theme.palette.secondary[200] }}
                            >
                                {user.role}
                            </Typography>
                        </Box>
                    <ArrowDropDownOutlined 
                        sx={{ color: theme.palette.secondary[300], fontSize: '25px' }} />
                
                    </Button>
                    <Menu 
                        anchorEl={anchorEl} 
                        open={isOpen} 
                        onClose={handleClose} 
                        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                    >
                        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                    </Menu>
                </FlexBetween>
            </FlexBetween>
        </Toolbar>
    </AppBar>
    )
}

export default Navbar
