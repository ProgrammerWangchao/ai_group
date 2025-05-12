
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl, 
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import api from '../services/api';
import { mockCategories } from '../data/mockData';

function SubmitToolPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    category: '',
    tags: [],
    newTag: '',
    is_featured: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setCategories(mockCategories); // Fallback to mock data
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (formData.newTag && !formData.tags.includes(formData.newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag],
        newTag: ''
      }));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await api.submitTool({
        name: formData.name,
        description: formData.description,
        url: formData.url,
        category: formData.category,
        tags: formData.tags,
        is_featured: formData.is_featured
      });
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to submit tool');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Alert severity="success" sx={{ my: 4 }}>
        Tool submitted successfully! It will be reviewed by our team.
      </Alert>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Submit a New AI Tool
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      
      <TextField
        fullWidth
        label="Tool Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        margin="normal"
      />
      
      <TextField
        fullWidth
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        multiline
        rows={4}
        margin="normal"
      />
      
      <TextField
        fullWidth
        label="Website URL"
        name="url"
        value={formData.url}
        onChange={handleChange}
        required
        type="url"
        margin="normal"
      />
      
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={formData.category}
          onChange={handleChange}
          label="Category"
        >
          {categories.map(category => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Box sx={{ my: 2 }}>
        <TextField
          label="Add Tag"
          name="newTag"
          value={formData.newTag}
          onChange={handleChange}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
          margin="normal"
        />
        <Button 
          onClick={handleAddTag} 
          sx={{ ml: 2, mt: 2 }}
          disabled={!formData.newTag}
        >
          Add Tag
        </Button>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
          {formData.tags.map(tag => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleRemoveTag(tag)}
            />
          ))}
        </Box>
      </Box>
      
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={loading}
        sx={{ mt: 3 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Submit Tool'}
      </Button>
    </Box>
  );
}

export default SubmitToolPage;
