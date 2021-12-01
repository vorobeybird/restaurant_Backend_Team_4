import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';
import InputIcon from '@mui/icons-material/InputOutlined';
import MenuIcon from '@mui/icons-material/MenuOutlined';
import logo from '../../../assets/logo.svg';

interface IAdminProps {
  onMobileNavOpen: any;
}

const AdminNavBar = ({ onMobileNavOpen, ...rest }: IAdminProps ) => {
  const [notifications] = useState([]);

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
<div style={{color: 'white', fontSize: '2rem'}}><img src={logo} height="50px"/><span style={{verticalAlign: 'super', marginLeft: '1rem'}}>Ocean Bar</span></div>
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <IconButton color="inherit" size="large">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" size="large">
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen} size="large">
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};


export default AdminNavBar;