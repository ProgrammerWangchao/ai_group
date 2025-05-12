
import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Alert
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
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

function AdminEditToolPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    category: '',
    tags: [],
    is_featured: false,
    is_approved: false
  });
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [toolData, categoriesData, tagsData] = await Promise.all([
          id !== 'new' ? api.getToolById(id) : Promise.resolve(null),
          api.getCategories(),
          api.getTags()
        ]);
        
        setCategories(categoriesData);
        setTags(tagsData);
        
        if (toolData) {
          setFormData({
            name: toolData.name,
            description: toolData.description,
            url: toolData.url,
            category: toolData.category?.id || '',
            tags: toolData.tags.map(tag => tag.id),
            is_featured: toolData.is_featured,
            is_approved: toolData.is_approved
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (id === 'new') {
        await api.submitTool(formData);
      } else {
        await api.updateTool(id, formData);
      }
      navigate('/admin/tools');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
          {id === 'new' ? 'Add New Tool' : 'Edit Tool'}
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800 }}>
          <TextField
            fullWidth
            label="Tool Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
            multiline
            rows={4}
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Website URL"
            value={formData.url}
            onChange={(e) => setFormData({...formData, url: e.target.value})}
            required
            type="url"
            margin="normal"
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              label="Category"
              required
            >
              {categories.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Tags</InputLabel>
            <Select
              multiple
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              label="Tags"
            >
              {tags.map(tag => (
                <MenuItem key={tag.id} value={tag.id}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControlLabel
            control={
              <Checkbox 
                checked={formData.is_featured}
                onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
              />
            }
            label="Featured Tool"
          />
          
          <FormControlLabel
            control={
              <Checkbox 
                checked={formData.is_approved}
                onChange={(e) => setFormData({...formData, is_approved: e.target.checked})}
              />
            }
            label="Approved"
          />
          
          <Box sx={{ mt: 3 }}>
            <Button 
              type="submit" 
              variant="contained" 
              size="large"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminEditToolPage;
