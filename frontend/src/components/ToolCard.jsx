
import { Card, CardMedia, CardContent, Typography, Button, CardActions, Chip } from '@mui/material';
import { Link } from 'react-router-dom';

function ToolCard({ tool }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={tool.logo || '/placeholder-tool-logo.png'}
        alt={tool.name}
        sx={{ objectFit: 'contain', p: 2 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {tool.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {tool.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {tool.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Box>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          color="primary"
          component={Link}
          to={`/tools/${tool.id}`}
        >
          Learn More
        </Button>
        <Button 
          size="small" 
          color="secondary"
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit
        </Button>
      </CardActions>
    </Card>
  );
}

export default ToolCard;
