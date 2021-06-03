import React from 'react';

import { Link } from 'gatsby';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

import useGhostNavigation from '../hooks/useGhostNavigation';

const MainMenu = ({ menuProps = {}, ...props }) => {
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const { primary: navigation } = useGhostNavigation();

  const handleMenuClick = event => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <>
      <IconButton
        onClick={handleMenuClick}
        {...props}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        anchorEl={menuAnchor}
        keepMounted
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        {...menuProps}
      >
        {navigation.map(({ label, url }) => (
          <MenuItem
            component={Link}
            to={url}
            key={label}
            onClick={handleMenuClose}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default React.memo(MainMenu);
