
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import ToolCard from '../components/ToolCard';
import api from '../services/api';

function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoryData, toolsData] = await Promise.all([
          api.getCategories().then(categories => 
            categories.find(c => c.id === id)
          ),
          api.getTools({ category: id })
        ]);
        
        if (!categoryData) throw new Error('Category not found');
        
        setCategory(categoryData);
        setTools(toolsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
  if (!category) return <Alert severity="warning" sx={{ m: 2 }}>Category not found</Alert>;

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        {category.name} Tools
      </Typography>
      
      {tools.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No tools found in this category.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {tools.map(tool => (
            <Grid item xs={12} sm={6} md={4} key={tool.id}>
              <ToolCard tool={tool} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default CategoryPage;
