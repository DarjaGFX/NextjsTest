import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Dashboard from '@mui/icons-material/Dashboard';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import QuizIcon from '@mui/icons-material/Quiz';
import Settings from '@mui/icons-material/Settings';
import Work from '@mui/icons-material/Work';
import { Box, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import MuiAppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Router from "next/router";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
    })  (({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
    }));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));


const Header =  () => {
    const auth = useAuth();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const theme = useTheme();
    const [open, setOpen] = useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
    
    
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (setting) => {
        setAnchorElUser(null);
        switch (setting) {
            case 'LogOut':
                logOut();
                break;
            case 'Dashboard':
                Router.push('/Dashboard');
                break;
            default:
                break;
        }
    };

    const logOut = () => {
        auth.signout();
    }
    
    const handleDrawerButtonClick = (text) => {
        switch (text) {
            case 'میزکار':
                Router.push("/Dashboard");
                break;
            case 'آزمون':
                Router.push("/Tests");
                break;
            // case "حساب کاربری":
                // Router.push("/Account");
                break;
            case 'مدیریت آزمون':
                Router.push("/Tests/Manage");
                break;
            default:
                break;
        }
    }


    return (
        <>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar dir="rtl" position="fixed" open={open}>
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerOpen}
                    sx={{ ...(open && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        سنجش و پایش
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="حساب کاربری">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            {/* <AccountCircle /> */}
                            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                        </IconButton>
                        </Tooltip>
                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                            {auth.user? (
                                    <>
                                        <MenuItem key={"Dashboard"} onClick={() => handleCloseUserMenu("Dashboard")}>
                                            <ListItemIcon>
                                                <Dashboard fontSize="small" />
                                            </ListItemIcon>
                                            <Typography textAlign="center">میزکار</Typography>
                                        </MenuItem>
                                        <MenuItem key={"Account"} onClick={() => handleCloseUserMenu("Account")}>
                                            <ListItemIcon>
                                                <Settings fontSize="small" />
                                            </ListItemIcon>
                                            <Typography textAlign="center">حساب کاربری</Typography>
                                        </MenuItem>
                                        <MenuItem key={"LogOut"} onClick={() => handleCloseUserMenu("LogOut")}>
                                            <ListItemIcon>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            <Typography textAlign="center">خروج</Typography>
                                        </MenuItem>
                                    </>
                                ) :   (
                                <MenuItem key={"login"} onClick={()=>Router.push('/Auth/login')}>
                                    <Typography textAlign="center">ورود</Typography>
                                </MenuItem>)
                            }
                        </Menu>
                        
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['آزمون'].map((text, index) => (
            <ListItem  key={text} disablePadding>
              <ListItemButton  onClick={() => {handleDrawerButtonClick(text)}}>
                <ListItemIcon>
                <QuizIcon/>
                </ListItemIcon>
                <ListItemText className='flex justify-end' primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['میزکار', 'حساب کاربری', 'مدیریت آزمون'].map((text, index) => (
            <ListItem  key={text} disablePadding>
              <ListItemButton  onClick={() => {handleDrawerButtonClick(text)}}>
                <ListItemIcon>
                {
                    index == 0 ? (<Dashboard />) : (index == 1? (<Settings />) : (<Work />))
                }
                </ListItemIcon>
                <ListItemText className='flex justify-end' primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      </Drawer>
        </Box>
        </>
    )
}


export default Header;