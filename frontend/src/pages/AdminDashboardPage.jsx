
import { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress, Alert } from '@mui/material';
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

function AdminDashboardPage() {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const response = await api.get('/health/');
        setHealthData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthData();
    const interval = setInterval(fetchHealthData, 30000); // 每30秒刷新一次
    
    return () => clearInterval(interval);
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography variant="h4" gutterBottom>
          System Dashboard
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>System Status</Typography>
            <Typography color={healthData.status === 'running' ? 'success.main' : 'error.main'}>
              {healthData.status === 'running' ? 'Operational' : 'Service Disruption'}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Database Status</Typography>
            <Typography color={healthData.database === 'healthy' ? 'success.main' : 'error.main'}>
              {healthData.database === 'healthy' ? 'Connected' : 'Connection Failed'}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>System Version</Typography>
            <Typography>{healthData.version}</Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminDashboardPage;
