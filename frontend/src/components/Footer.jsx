
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <Box 
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} AI Tools Hub
          </Typography>
          <Box>
            <MuiLink 
              component={Link} 
              to="/about" 
              color="text.secondary" 
              sx={{ mr: 2 }}
            >
              About
            </MuiLink>
            <MuiLink 
              component={Link} 
              to="/privacy" 
              color="text.secondary" 
              sx={{ mr: 2 }}
            >
              Privacy
            </MuiLink>
            <MuiLink 
              component={Link} 
              to="/contact" 
              color="text.secondary"
            >
              Contact
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
