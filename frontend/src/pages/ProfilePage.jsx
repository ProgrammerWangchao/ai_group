
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, 
  Typography, 
  Avatar, 
  Button, 
  Divider, 
  List, 
  ListItem, 
  ListItemText,
  CircularProgress
} from '@mui/material';
import api from '../services/api';
import { selectCurrentUser } from '../store/authSlice';

function ProfilePage() {
  const user = useSelector(selectCurrentUser);
  const [submittedTools, setSubmittedTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmittedTools = async () => {
      try {
        if (user?.username) {
          const tools = await api.getTools({ submitted_by: user.username });
          setSubmittedTools(tools);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmittedTools();
  }, [user]);

  if (!user) {
    return (
      <Typography variant="h6" color="error">
        Please sign in to view your profile
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar sx={{ width: 80, height: 80, mr: 3 }}>
          {user.username.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h4">{user.username}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Member since {new Date(user.date_joined).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Submitted Tools
      </Typography>
      
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : submittedTools.length === 0 ? (
        <Typography>You haven't submitted any tools yet.</Typography>
      ) : (
        <List>
          {submittedTools.map(tool => (
            <ListItem key={tool.id}>
              <ListItemText
                primary={tool.name}
                secondary={tool.is_approved ? 'Approved' : 'Pending approval'}
              />
            </ListItem>
          ))}
        </List>
      )}

      <Button 
        variant="contained" 
        color="primary" 
        sx={{ mt: 3 }}
        href="/submit"
      >
        Submit New Tool
      </Button>
    </Box>
  );
}

export default ProfilePage;
