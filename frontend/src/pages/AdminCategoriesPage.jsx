
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
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Alert
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
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

function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ id: null, name: '', icon: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleOpenDialog = (category = { id: null, name: '', icon: '' }) => {
    setCurrentCategory(category);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCategory({ id: null, name: '', icon: '' });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (currentCategory.id) {
        await api.updateCategory(currentCategory.id, currentCategory);
        setCategories(categories.map(cat => 
          cat.id === currentCategory.id ? { ...cat, ...currentCategory } : cat
        ));
      } else {
        const newCategory = await api.createCategory(currentCategory);
        setCategories([...categories, newCategory]);
      }
      handleCloseDialog();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteCategory(id);
      setCategories(categories.filter(cat => cat.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading && !openDialog) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography variant="h4" gutterBottom>
          Manage Categories
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Add New Category
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Icon</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.icon}</TableCell>
                  <TableCell>
                    <IconButton 
                      color="primary"
                      onClick={() => handleOpenDialog(category)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton 
                      color="error"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>
            {currentCategory.id ? 'Edit Category' : 'Add New Category'}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Category Name"
              fullWidth
              value={currentCategory.name}
              onChange={(e) => setCurrentCategory({...currentCategory, name: e.target.value})}
            />
            <TextField
              margin="dense"
              label="Icon Class"
              fullWidth
              value={currentCategory.icon}
              onChange={(e) => setCurrentCategory({...currentCategory, icon: e.target.value})}
              helperText="Font Awesome or Material Icons class name"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button 
              onClick={handleSubmit} 
              color="primary"
              disabled={loading || !currentCategory.name}
            >
              {loading ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default AdminCategoriesPage;
