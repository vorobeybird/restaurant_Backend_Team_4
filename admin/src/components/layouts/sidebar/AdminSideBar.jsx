import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@mui/material';
import {
  ErrorOutline,
  BarChart,
  ShoppingBasket,
  Person,
  PersonAdd,
  PeopleAlt, 
  Fastfood,
  Event
} from '@mui/icons-material';
import NavItem from '../navbar/navitem/NavItem';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Admin',
  name: 'OceanBar Admin'
};

const items = [
  {
    href: '/dashboard',
    icon: BarChart,
    title: 'Статистика'
  },
  {
    href: '/orders',
    icon: ShoppingBasket,
    title: 'Заказы'
  },
  {
    href: '/dishes',
    icon: Fastfood,
    title: 'Блюда'
  },
  {
    href: '/reservations',
    icon: Event,
    title: 'Бронирование'
  }
];

const AdminSideBar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={Link}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          backgroundColor: 'background.default',
          m: 2,
          p: 2
        }}
      >
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

AdminSideBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

AdminSideBar.defaultProps = {
  onMobileClose: () => {
  },
  openMobile: false
};

export default AdminSideBar;