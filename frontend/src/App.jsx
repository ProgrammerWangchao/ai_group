
import { Container } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ToolDetailPage from './pages/ToolDetailPage';
import CategoryPage from './pages/CategoryPage';
import SubmitToolPage from './pages/SubmitToolPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminToolsPage from './pages/AdminToolsPage';
import AdminEditToolPage from './pages/AdminEditToolPage';
import AdminCategoriesPage from './pages/AdminCategoriesPage';
import AdminTagsPage from './pages/AdminTagsPage';
import AdminUsersPage from './pages/AdminUsersPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tools/:id" element={<ToolDetailPage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/submit" element={<SubmitToolPage />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/tools" 
            element={
              <ProtectedRoute>
                <AdminToolsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/tools/:id" 
            element={
              <ProtectedRoute>
                <AdminEditToolPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/tools/new" 
            element={
              <ProtectedRoute>
                <AdminEditToolPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/categories" 
            element={
              <ProtectedRoute>
                <AdminCategoriesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/tags" 
            element={
              <ProtectedRoute>
                <AdminTagsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute>
                <AdminUsersPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
