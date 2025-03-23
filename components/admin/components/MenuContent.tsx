import * as React from 'react';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Category, Info, ProductionQuantityLimits } from '@mui/icons-material';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, href: '/admin/dashboard' },
  { text: 'Category', icon: <Category />, href: '/admin/dashboard/category' },
  { text: 'Orders', icon: <ProductionQuantityLimits />, href: '/admin/dashboard/orders' },
  { text: 'Products', icon: <Info />, href: '/admin/dashboard/products' },
  { text: 'Brands', icon: <Info />, href: '/admin/dashboard/brands' },

];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link}
              href={item.href}
              selected={index === 0}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
