
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/authSlice';

function Header() {
  const user = useSelector(selectCurrentUser);

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/"
          sx={{ 
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          AI Tools Hub
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" aria-label="search">
            <SearchIcon />
          </IconButton>
          <Button 
            component={Link} 
            to="/submit" 
            color="inherit"
            variant="outlined"
            sx={{ ml: 2 }}
          >
            Submit Tool
          </Button>
          {user?.is_staff && (
            <Button 
              component={Link} 
              to="/admin/dashboard" 
              color="inherit"
              variant="outlined"
              sx={{ ml: 2 }}
            >
              Admin
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
