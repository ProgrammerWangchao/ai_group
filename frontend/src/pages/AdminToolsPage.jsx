
import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Button,
  IconButton,
  CircularProgress,
  Alert
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import AdminSidebar from '../components/AdminSidebar';
import api from '../services/api';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function AdminToolsPage() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const data = await api.getTools({ all: true });
        setTools(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.deleteTool(id);
      setTools(tools.filter(tool => tool.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography variant="h4" gutterBottom>
          Manage Tools
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Button 
            variant="contained" 
            color="primary"
            component={Link}
            to="/admin/tools/new"
          >
            Add New Tool
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Featured</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tools.map((tool) => (
                <TableRow key={tool.id}>
                  <TableCell>{tool.name}</TableCell>
                  <TableCell>{tool.category?.name}</TableCell>
                  <TableCell>
                    {tool.is_approved ? 'Approved' : 'Pending'}
                  </TableCell>
                  <TableCell>
                    {tool.is_featured ? 'Yes' : 'No'}
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      color="primary"
                      component={Link}
                      to={`/admin/tools/edit/${tool.id}`}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton 
                      color="error"
                      onClick={() => handleDelete(tool.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default AdminToolsPage;
