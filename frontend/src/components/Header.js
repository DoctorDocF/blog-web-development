import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';

const Header = () => {
  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <CodeIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Web Development Blog
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Typography variant="body1">Статьи</Typography>
          <Typography variant="body1">Обо мне</Typography>
          <Typography variant="body1">Контакты</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
