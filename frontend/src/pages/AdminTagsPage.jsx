
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

function AdminTagsPage() {
  const [tags, setTags] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTag, setCurrentTag] = useState({ id: null, name: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await api.getTags();
        setTags(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  const handleOpenDialog = (tag = { id: null, name: '' }) => {
    setCurrentTag(tag);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentTag({ id: null, name: '' });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (currentTag.id) {
        await api.updateTag(currentTag.id, { name: currentTag.name });
        setTags(tags.map(tag => tag.id === currentTag.id ? { ...tag, name: currentTag.name } : tag));
      } else {
        const newTag = await api.createTag({ name: currentTag.name });
        setTags([...tags, newTag]);
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
      await api.deleteTag(id);
      setTags(tags.filter(tag => tag.id !== id));
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
          Manage Tags
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Add New Tag
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tags.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell>{tag.name}</TableCell>
                  <TableCell>
                    <IconButton 
                      color="primary"
                      onClick={() => handleOpenDialog(tag)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton 
                      color="error"
                      onClick={() => handleDelete(tag.id)}
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
            {currentTag.id ? 'Edit Tag' : 'Add New Tag'}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Tag Name"
              fullWidth
              value={currentTag.name}
              onChange={(e) => setCurrentTag({...currentTag, name: e.target.value})}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button 
              onClick={handleSubmit} 
              color="primary"
              disabled={loading || !currentTag.name}
            >
              {loading ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default AdminTagsPage;
