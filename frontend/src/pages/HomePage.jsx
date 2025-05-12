
import { Box, Typography, Grid } from '@mui/material';
import ToolCard from '../components/ToolCard';
import { mockFeaturedTools } from '../data/mockData';

function HomePage() {
  return (
    <Box>
      {/* 欢迎标题 */}
      <Typography variant="h3" component="h1" gutterBottom>
        Discover the Best AI Tools
      </Typography>
      
      {/* 特色工具部分 */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        Featured Tools
      </Typography>
      <Grid container spacing={3}>
        {mockFeaturedTools.map((tool) => (
          <Grid item xs={12} sm={6} md={4} key={tool.id}>
            <ToolCard tool={tool} />
          </Grid>
        ))}
      </Grid>

      {/* 分类导航部分 */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 6 }}>
        Browse by Category
      </Typography>
      {/* 这里将添加分类导航组件 */}
    </Box>
  );
}

export default HomePage;
