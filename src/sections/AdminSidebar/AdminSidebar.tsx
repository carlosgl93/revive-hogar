import { Link, useLocation } from 'react-router';

import DefaultIcon from '@mui/icons-material/Deblur';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@mui/material';

import adminNavItems from '@/routes';

import { useSidebar } from './hooks';

function AdminSidebar() {
  const { isOpen, open, close } = useSidebar();
  const location = useLocation();

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onClose={close}
      onOpen={open}
      disableBackdropTransition={false}
      swipeAreaWidth={30}
      data-pw="sidebar"
    >
      <List sx={{ width: 250, pt: (theme) => `${theme.mixins.toolbar.minHeight}px` }}>
        {adminNavItems.map(({ path, title, icon: Icon }) => (
          <ListItem sx={{ p: 0 }} key={path} onClick={close}>
            <ListItemButton component={Link} to={path} selected={location.pathname === path}>
              <ListItemIcon>{Icon ? <Icon /> : <DefaultIcon />}</ListItemIcon>
              <ListItemText>{title}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  );
}

export default AdminSidebar;
