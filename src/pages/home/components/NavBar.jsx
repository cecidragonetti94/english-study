import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Menu, ExitToApp, VolunteerActivism } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import * as colors from '../../../theme/colors';  
import logo from '../../../assets/logo.png'; 
import TranslateIcon from '@mui/icons-material/Translate';

const menuItems = [
  { id: 1, text: "Words", icon: <VolunteerActivism sx={{ color: colors.secondary }} />, route: '/home' },
  { id: 2, text: "Verbs", icon: <TranslateIcon sx={{ color: colors.secondary }} />, route: '/verbs' },
  { id: 3, text: "Log out", icon: <ExitToApp sx={{ color: colors.secondary }} />, action: '/' }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

 
  return (
    <>
      <AppBar position="static" color="secondary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <IconButton onClick={toggleDrawer(true)} color="inherit">
            <Menu />
          </IconButton>
          <IconButton onClick={() => navigate('/')} color="inherit">
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { backgroundColor: colors.primary.light, color: colors.text, width: 250 } }}
      >
        <List>
          <Box
            component="img"
            src={logo}
            alt="MerendApp Logo"
            sx={{ height: 180, display: "block", margin: "0 auto", marginBottom: 5 }}
          />
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton onClick={() => navigate(item.route || '#')}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  slotProps={{ primary: { sx: { fontWeight: 'bold', color: colors.secondary } } }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
