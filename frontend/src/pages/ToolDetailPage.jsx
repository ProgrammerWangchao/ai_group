
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Chip, Divider, Grid, Paper } from '@mui/material';
import api from '../services/api';

function ToolDetailPage() {
  const { id } = useParams();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const data = await api.getToolById(id);
        setTool(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTool();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!tool) return <Typography>Tool not found</Typography>;

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Box
              component="img"
              src={tool.logo || '/placeholder-tool-logo.png'}
              alt={tool.name}
              sx={{ 
                width: '100%', 
                maxWidth: 200,
                height: 'auto',
                mb: 2
              }}
            />
            <Button 
              variant="contained" 
              color="primary" 
              href={tool.url} 
              target="_blank"
              fullWidth
              sx={{ mb: 2 }}
            >
              Visit Website
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Typography variant="h3" component="h1" gutterBottom>
            {tool.name}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            {tool.tags.map(tag => (
              <Chip key={tag.id} label={tag.name} />
            ))}
          </Box>
          
          <Typography variant="body1" paragraph>
            {tool.description}
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h5" gutterBottom>
            Features
          </Typography>
          {/* 这里可以添加工具的具体功能描述 */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default ToolDetailPage;
