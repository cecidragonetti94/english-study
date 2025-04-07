import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Menu, ExitToApp, Person, VolunteerActivism } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import * as colors from '../../../theme/colors';  
import logo from '../../../assets/logo.png'; // Asegúrate de que la ruta sea correcta

const menuItems = [
  { id:1, text: "Words", icon: <VolunteerActivism sx={{ color: colors.secondary }} /> },
  { id:2, text: "Log out", icon: <ExitToApp sx={{ color: colors.secondary }} /> }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <>
      <AppBar position="static" color="secondary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <IconButton onClick={toggleDrawer(true)} color="inherit">
            <Menu />
          </IconButton>
          <IconButton onClick={handleLogout} color="inherit">
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}
        PaperProps={{ sx: { backgroundColor: colors.primary.light, color: colors.text, width: 250 } }}
      >
        <List>
          <Box
            component="img"
            src={logo}
            alt="MerendApp Logo"
            sx={{ height: 180, display: "block", margin: "0 auto", marginBottom: 5 }}
          />
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={item.id === 2 ? handleLogout : null}>
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