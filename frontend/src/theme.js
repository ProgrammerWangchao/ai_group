
import { createTheme } from '@mui/material/styles';

// 创建自定义主题
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // 主色调蓝色
    },
    secondary: {
      main: '#dc004e', // 辅助色调粉色
    },
    background: {
      default: '#f5f5f5', // 默认背景色
      paper: '#ffffff', // 卡片背景色
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    // 其他文本样式...
  },
  shape: {
    borderRadius: 8, // 统一圆角大小
  },
});

export default theme;
