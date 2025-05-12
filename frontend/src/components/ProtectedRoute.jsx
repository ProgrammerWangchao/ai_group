
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectCurrentToken } from '../store/authSlice';

function ProtectedRoute({ children }) {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  if (!token) {
    // 重定向到登录页面，保存当前路径以便登录后返回
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
